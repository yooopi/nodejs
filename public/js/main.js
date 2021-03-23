const socket = io();
const messageEl = document.getElementById("message-input");

function submitMessage(e) {
  e.preventDefault();
  if (messageEl.value === "") {
    alert("Write something");
    return false;
  }
  
  socket.emit("chatMessage", {
    message: messageEl.value,
    chatId: messageEl.dataset.chatid,
  });

  messageEl.value = "";
  messageEl.focus();
  return false;
}

socket.emit("joinRoom", messageEl.dataset.chatid);

socket.on("chatMessage", (msg) => {
  const messagesEl = document.getElementById("messages");

  const messageEl = document.createElement("li");
  messageEl.className = "messages__item";
  messageEl.innerHTML = `
  <span class="messages__author">${msg.author}</span>
  <span class="messages__txt">${msg.message}</span>`;
  messagesEl.appendChild(messageEl);
  messageEl.scrollIntoView();
});
