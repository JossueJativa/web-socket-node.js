const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
    }

    init() {
        const { today, tickets, last, lastFour } = require('../database/data.json');
        if(today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.lastFour = lastFour;
        } else {
            this.saveToDB();
        }
    }

    saveToDB() {
        const dbPath = path.join(__dirname, '../database/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    followTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveToDB();
        return 'Ticket ' + ticket.number;
    }

    attendTicket(desktop){
        if( this.tickets.length === 0 ) {
            return null;
        };

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;

        this.lastFour.unshift(ticket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1,1)
        }

        this.saveToDB();
        return ticket;
    }
}

module.exports = TicketControl;