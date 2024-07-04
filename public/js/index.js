
const button = document.querySelector('#send');


//COMUNICACION CON LOS WEB SOCKETS
const socket = io();

//EMITIR UN MENSAJE DESDE EL FRONTEND AL BACKEND
button.addEventListener('click', () => {
    let mensaje = document.querySelector('#message').value;
    socket.emit('mensaje_cliente', mensaje);

    socket.on('mensaje_cliente', (payload) => {
        console.log(payload);
    })
});
