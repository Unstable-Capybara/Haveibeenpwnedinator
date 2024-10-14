// server.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route POST pour vérifier l'adresse e-mail
app.post('/check-email', async (req, res) => {
    const email = req.body.email;
    const apiKey = process.env.HIBP_API_KEY;

    if (!email) {
        return res.status(400).json({ error: 'Adresse e-mail manquante.' });
    }

    const encodedEmail = encodeURIComponent(email);
    const userAgent = 'Havaibeenpwndinator'; // Remplacez par le nom de votre application

    try {
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodedEmail}?truncateResponse=false`, {
            method: 'GET',
            headers: {
                'hibp-api-key': apiKey,
                'user-agent': userAgent,
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            const breaches = await response.json();
            res.json({ breaches });
        } else if (response.status === 404) {
            // Aucune fuite trouvée pour cet e-mail
            res.json({ breaches: [] });
        } else if (response.status === 429) {
            res.status(429).json({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' });
        } else if (response.status === 400) {
            res.status(400).json({ error: 'Requête invalide. Vérifiez l\'adresse e-mail fournie.' });
        } else if (response.status === 401) {
            res.status(401).json({ error: 'Accès non autorisé. Vérifiez votre clé API.' });
        } else if (response.status === 503) {
            res.status(503).json({ error: 'Service indisponible. Veuillez réessayer plus tard.' });
        } else {
            res.status(response.status).json({ error: 'Erreur lors de la vérification.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
