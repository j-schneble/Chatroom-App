const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Msg from server 
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scrolling
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the text of msg
    const msg = e.target.elements.msg.value;

    // Msg emit to server
    socket.emit('chatMessage', msg);

    // Inputs clearing
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


// Output msg to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHtml = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}