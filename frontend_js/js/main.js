// for making connection
const socket = io.connect('http://localhost:5000');

// query Dom
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const send = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// emit event

send.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// listen to event

socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}</strong> :${data.message}</p>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em> ${data}Typing....</em></p>`;
});
console.log(socket);
