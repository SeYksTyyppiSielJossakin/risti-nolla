// server.js
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Palvelin tarjoaa HTML-tiedostot (pelin frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Luo WebSocket-palvelin
const wss = new WebSocket.Server({ noServer: true });

let players = []; // Lista pelaajista

wss.on('connection', (ws) => {
    if (players.length >= 2) {
        ws.send(JSON.stringify({ message: "Odotetaan toista pelaajaa..." }));
        ws.close();
        return;
    }

    // Lisää pelaaja
    players.push(ws);
    ws.send(JSON.stringify({ message: "Olet liittynyt peliin!" }));

    if (players.length === 2) {
        // Lähetä pelin aloitusviesti molemmille pelaajille
        players.forEach(player => {
            player.send(JSON.stringify({ message: "Peli alkaa! Pelaaja X aloittaa." }));
        });
    }

    // Käsittele viestejä
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Lähetä pelitilan päivitykset kaikille pelaajille
        players.forEach(player => {
            if (player !== ws) {
                player.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
    });
});

// Käynnistä HTTP-palvelin
app.server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
