const socket = io();

const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');

const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

socket.on('status-now', ( payload ) => {
    const [ tck1, tck2, tck3, tck4] = payload;

    if(tck1){
        lblTicket1.innerText = 'Ticket ' + tck1.number;
        lblEscritorio1.innerText = tck1.desktop;
    }

    if(tck2){
        lblTicket2.innerText = 'Ticket ' + tck2.number;
        lblEscritorio2.innerText = tck2.desktop;
    }

    if(tck3){
        lblTicket3.innerText = 'Ticket ' + tck3.number;
        lblEscritorio3.innerText = tck3.desktop;
    }

    if(tck4){
        lblTicket4.innerText = 'Ticket ' + tck4.number;
        lblEscritorio4.innerText = tck4.desktop;
    }
});