const express = require('express');
const path = require('path');
const fs = require('fs');
const yandexTranslate = require('./yandex.js');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

cache = {};

try {
    cache = JSON.parse(fs.readFileSync('cache.json', 'utf8'));
    console.log(cache);
} catch (e) {
    console.log(e);
}

function cachedTranslate(req, res, next) {
    if (req.body && req.body.text) {
        if (cache[req.body.text] && cache[req.body.text][req.body.sourceLanguageCode+"=>"+req.body.targetLanguageCode]) {
            console.log('Translation from cache:', req.body.text);
            res.render('translate', { text: cache[req.body.text][req.body.sourceLanguageCode+"=>"+req.body.targetLanguageCode].text});
            // res.json(cache[req.body.text][req.body.sourceLanguageCode+"=>"+req.body.targetLanguageCode])
        } else next();
    } else next();
}

templating.requires.handlebars.registerHelper('print_cache', (data) => {
    return `${data[0]} = [${Object.entries(data[1]).map((entry) => {
        return `${entry[0]}: ${entry[1].text}`;
    })}]`;
})

app.get('/', (req, res) => {
    res.redirect('/translate.html');
})

app.get('/cache', (req, res) => {
    console.log(Object.entries(cache));
    res.render('cache', { cache: Object.entries(cache) });
    // res.json(cache);
});

function updateCache(req, res) {
    console.log(req, res);
    if (!cache[req.text]) {
        cache[req.text] = {}
    }
    cache[req.text][req.sourceLanguageCode+"=>"+req.targetLanguageCode] = res;

    fs.writeFileSync('cache.json', JSON.stringify(cache));
}

app.post('/translate', cachedTranslate, (req, res) => {
    const request = req.body;

    console.log('Request yandex api for:', request);
    yandexTranslate({
        texts: [request.text],
        sourceLanguageCode: request.sourceLanguageCode,
        targetLanguageCode: request.targetLanguageCode
    }).then((yres) => {
        updateCache(request, yres.data.translations[0]);
        res.render('translate', { text: yres.data.translations[0].text })
        // res.json(yres.data.translations[0]);
    }).catch((err) => {
        console.log(err.message, err.response.data);
        res.status('400').render('translate', { error: err.message })
        // res.status('400').json({ message: "Error while tranlating your request:"+err.message });
    })
})

app.listen(3000, () => console.log('Listening on port 3000'));
