const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtmessage = document.querySelector('#txtmessage');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('send-message', (payload ) => {
    console.log('Desde el servidor', payload);
});

btnEnviar.addEventListener('click', () => {
    const message = txtmessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, (id)=> {
        console.log('Desde el server', id);
    });
})