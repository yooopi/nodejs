// https = require('https');

const IAM_TOKEN = 't1.9f7L7euelZqRkorJx8-Yj5uUlMaVj8aRmeXz931HVQL67y9kB1v93fP3PXZSAvrvL2QHW_0.uYKo-ZaIngbf0rYpuUh7hFa4VqevWBkA7wKQbgqSXwQH80gG1e7VNCGSgNoI9E-pryJGA66RTnYEGsj0HZnvDw';
const FOLDER = 'b1gj7jt5nmetu6r752oc'

// var options = {
//     hostname: 'translate.api.cloud.yandex.net',
//     path: '/translate/v2/translate/',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'aaplication/json',
//         'Authorization': 'Bearer ' + IAM_TOKEN
//     }
// }

// var req = https.request(options, (res) => {
//     console.log('STATUS: ' + res.statusCode);
//     console.log('HEADERS: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         console.log('BODY: ' + chunk);
//     });
// })

// req.write(`{
//     "folder_id": "${FOLDER}",
//     "texts": ["В этом примере показано, как перевести на русский язык две строки с текстом", "World is very big"],
//     "targetLanguageCode": "en"
// }`);
// req.end();




















// var request = require('request');

// request.post(
//     'https://translate.api.cloud.yandex.net/translate/v2/translate/',
//     { json: {
//         "folder_id": FOLDER,
//         "texts": ["Hello", "World"],
//         "targetLanguageCode": "ru" 
//         },
//      headers: {
//             'Content-Type': 'aaplication/json',
//             'Authorization': 'Bearer ' + IAM_TOKEN
//         }
//     },
//     function (error, response, body) {
//         console.log('respcode:', response.statusCode);
//         console.log(body);
//         if (!error && response.statusCode == 200) {
//             console.log('response:', body);
//         } else {
//             console.log(error)
//         }
//     }
// );











const axios = require('axios');

module.exports = function yandexTranslate(request) {
    return axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
            "folder_id": FOLDER,
            ...request 
        }, {
            headers: {
                'Content-Type': 'aaplication/json',
                'Authorization': 'Bearer ' + IAM_TOKEN
            }
        })
        // .then((res) => {
        //     console.log(res.data);
        // }).catch((err) => {
        //     console.log(err);
        // })
}