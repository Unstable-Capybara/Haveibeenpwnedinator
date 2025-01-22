// Fonction pour lancer la vérification avec la touche Entrée
document.getElementById('emailInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkEmail();
    }
});


async function checkEmail() {
    const email = document.getElementById('emailInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!email) {
        resultDiv.innerHTML = "<p>Oups ! Il semble que l'adresse e-mail entrée ne soit pas valide. Pourriez-vous vérifier ?</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Nous vérifions discrètement en coulisses...</p>";

    // Vérification spécifique pour Guy Liguili
    if (email.toLowerCase() === 'guy.liguili@goodenough.fr') {
        // Afficher le résultat spécifique sans appel à l'API
        displayGuyLiguiliResult();
        updateStats(email, 5); // Supposons 5 fuites pour l'exemple
        return;
    }
    // Vérification spécifique pour les nouvelles entrées
    if (email.toLowerCase() === 'eleonore.ileosud@goodenough.fr') {
        displayEleonoreResult();
        updateStats(email, 1); // Simuler une fuite
        return;
    }

    if (email.toLowerCase() === 'jean-paul.ochon@goodenough.fr') {
        displayJeanPaulResult();
        updateStats(email, 1); // Simuler une fuite
        return;
    }

    if (email.toLowerCase() === 'sacha.cale@goodenough.fr') {
        displaySachaResult();
        updateStats(email, 1); // Simuler une fuite
        return;
    }

    if (email.toLowerCase() === 'aby.cyclette@goodenough.fr') {
        displayAbyResult();
        updateStats(email, 1); // Simuler une fuite
        return;
    }

    try {
        const response = await fetch('/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const data = await response.json();
            const breaches = data.breaches;

            if (breaches.length > 0) {
                displayResult(breaches);
                updateStats(email, breaches.length);
            } else {
                resultDiv.innerHTML = "<p>🦉 Chouette ! Votre adresse e-mail n'apparaît dans aucune fuite de données connue. Continuez à naviguer en toute sérénité (mais faites quand même attention à comment vous gérez vos mots de passe) !</p>";
                updateStats(email, 0);
            }
        } else if (response.status === 429) {
            resultDiv.innerHTML = "<p>Vous êtes trop rapide pour nous ! Veuillez patienter quelques instants avant de réessayer.</p>";
        } else if (response.status === 400) {
            resultDiv.innerHTML = "<p>Oups ! Une erreur s'est produite. Veuillez vérifier l'adresse e-mail fournie.</p>";
        } else if (response.status === 401) {
            resultDiv.innerHTML = "<p>Il semble que nous ayons des difficultés techniques. Merci de réessayer plus tard.</p>";
        } else if (response.status === 503) {
            resultDiv.innerHTML = "<p>Service indisponible. Veuillez réessayer plus tard.</p>";
        } else {
            resultDiv.innerHTML = "<p>Oups ! Une erreur s'est produite. Veuillez réessayer dans quelques instants.</p>";
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Oups ! Une erreur s'est produite. Veuillez réessayer dans quelques instants.</p>";
    }
}

function displayResult(breaches) {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🪈 Flûte ! Votre adresse e-mail est apparue dans <strong>${breaches.length}</strong> fuite(s) de données.</h2>`;
    html += "<p>Voici les détails :</p>";
    html += "<ul>";
    breaches.forEach(breach => {
        html += `<li><strong>${breach.Title}</strong> (Date de la fuite : ${breach.BreachDate})</li>`;
    });
    html += "</ul>";
    html += "<h3>Que se passe-t-il ?</h3>";
    html += "<p>Certaines de vos données personnelles (email, mot de passe, coordonnées) ont été compromises lors d'une cyberattaque sur un site où vous êtes inscrit(e). Ces informations circulent probablement sur le dark web à présent. C'est une situation sérieuse, mais pas de panique : nous sommes là pour vous accompagner !</p>";
    html += "<h3>Voici quelques étapes simples pour renforcer votre sécurité :</h3>";
    html += "<ol>";
    html += "<li><strong>Changez vos mots de passe</strong> sur les sites concernés. Optez pour des combinaisons uniques et robustes.</li>";
    html += "<li><strong>Évitez de réutiliser le même mot de passe</strong> sur différents sites. Chaque compte mérite sa propre clé secrète !</li>";
    html += "<li><strong>Activez la double authentification (2FA)</strong> là où c'est possible. Une couche de sécurité supplémentaire ne fait jamais de mal.</li>";
    html += "<li><strong>Utilisez un gestionnaire de mots de passe</strong> (voir la suite de nos ateliers pour plus d'informations).</li>";
    html += "<li><strong>Restez vigilant</strong> face aux e-mails ou messages suspects. Si quelque chose semble trop beau pour être vrai, méfiez-vous !</li>";
    html += "</ol>";
    resultDiv.innerHTML = html;
}

function displayGuyLiguiliResult() {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🔍 Rapport d'analyse pour Guy Liguili</h2>`;
    html += "<p><strong>Résumé :</strong> Plusieurs de vos données personnelles ont été exposées lors de fuites récentes. Une personne mal intentionnée pourrait exploiter ces informations, mais fort heureusement, ce n’est pas votre cas. 😉</p>";
    html += "<div style='background-color: #ffe6e6; padding: 1rem; border-radius: 5px;'>";
    html += "<h3>Données identifiées :</h3>";
    html += "<ul>";
    html += "<li><strong>Adresse e-mail :</strong> guy.liguili@goodenough.fr</li>";
    html += "<li><strong>Adresse postale :</strong> 123 Rue Imaginaire, 75000 Paris</li>";
    html += "<li><strong>Numéro de carte de crédit :</strong> 5123 4589 0973 7643</li>";
    html += "<li style='color: red;'><strong>Mot de passe (LinkedIn):</strong> Mozart</li>";
    html += "</ul>";
    html += "</div>";
    html += "<h3>Recommandations :</h3>";
    html += "<ol>";
    html += "<li><strong>Changez immédiatement ce mot de passe</strong>, surtout si vous l’utilisez ailleurs.</li>";
    html += "<li>Évitez de stocker des informations sensibles comme vos numéros de carte dans des comptes en ligne sans protection accrue.</li>";
    html += "<li>Envisagez une surveillance de vos transactions bancaires pour détecter d'éventuelles activités frauduleuses.</li>";
    html += "</ol>";
    resultDiv.innerHTML = html;
}

function displayEleonoreResult() {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🔍 Rapport d'analyse pour Éléonore Iléosud</h2>`;
    html += "<ul>";
    html += "<li><strong>Adresse e-mail professionnelle :</strong> eleonore.ileosud@goodenough.fr</li>";
    html += "<li><strong>Activité professionnelle :</strong> Commerciale chez GoodEnough depuis 4 ans</li>";
    html += "<li><strong>Centres d'intérêt :</strong> Fan de Kpop (groupe préféré : IVE) et passionnée de bagels</li>";
    html += "<li><strong>Animaux de compagnie :</strong> possède un chat : Dadou</li>";
    html += "<li><strong>Activité sur les réseaux :</strong> Interagit fréquemment avec des collègues sur Instagram</li>";
    html += "<li style='color: red;'><strong>Mot de passe :</strong> Le mot de passe d'Eleonore était dans la fuite de données de Linkedin en 2016. Son mot de passe (chiffré) était :</li>";
    html += "</ul>";

    // Ajout de l'image
    html += `
        <div class="image-container">
            <img src="/src/CapchaEleonore.png" alt="Illustration du profil d'Éléonore">
        </div>
    `;

    resultDiv.innerHTML = html;
}

function displayAbyResult() {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🔍 Rapport d'analyse pour Aby Cyclette</h2>`;
    html += "<ul>";
    html += "<li><strong>Adresse e-mail professionnelle :</strong> aby.cyclette@goodenough.fr</li>";
    html += "<li><strong>Activité professionnelle :</strong> Chargée de logistique chez GoodEnough depuis 5 ans</li>";
    html += "<li><strong>Centres d'intérêt :</strong> Fan de vélo (fait du cyclisme amateur) et collectionneuse de timbres vintage</li>";
    html += "<li><strong>Animaux de compagnie :</strong> possède un chien : Rocky</li>";
    html += "<li><strong>Activité sur les réseaux :</strong> Partage des photos de ses randonnées sur Twitter et Instagram</li>";
    html += "<li style='color: red;'><strong>Mot de passe :</strong> Le mot de passe d'Aby était dans la fuite de données de Strava en 2019. Son mot de passe (chiffré) était :</li>";
    html += "</ul>";
    

    // Ajout de l'image
    html += `
        <div class="image-container">
            <img src="/src/CaptchaAby.png" alt="Illustration du profil d'Aby">
        </div>
    `;

    resultDiv.innerHTML = html;
}

function displayJeanPaulResult() {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🔍 Rapport d'analyse pour Jean-Paul Ochon</h2>`;
    html += "<ul>";
    html += "<li><strong>Adresse e-mail :</strong> jean-paul.ochon@goodenough.fr</li>";
    html += "<li><strong>Activité professionnelle :</strong> Développeur logiciel chez GoodEnough depuis 3 mois</li>";
    html += "<li><strong>Centres d'intérêt :</strong> Participe à des forums de programmation et partage ses voyages sur YouTube</li>";
    html += "<li><strong>Vie privée :</strong> Père d’un fils nommé Paul, né le 21/02/2023</li>";
    html += "<li style='color: red;'><strong>Mot de passe :</strong> Le mot de passe de Jean-Paul était dans la fuite de données de Dropbox en 2012, son mot de passe (chiffré) était :</li>";
    html += "</ul>";
        // Ajout de l'image
        html += `
        <div class="image-container">
            <img src="/src/CapchaJeanPaul.png" alt="Illustration du profil de Jean-Paul">
        </div>
    `;

    resultDiv.innerHTML = html;
}

function displaySachaResult() {
    const resultDiv = document.getElementById('result');
    let html = `<h2>🔍 Rapport d'analyse pour Sacha Cale</h2>`;
    html += "<ul>";
    html += "<li><strong>Adresse e-mail :</strong> sacha.cale@goodenough.fr</li>";
    html += "<li><strong>Activité professionnelle :</strong> Producteur de valeurs chez GoodEnough depuis 2 ans</li>";
    html += "<li><strong>Centres d'intérêt :</strong> Très actif sur Strava</li>";
    html += "<li><strong>Famille :</strong> Trois enfants : Anna, Lise et Mehdi</li>";
    html += "<li style='color: red;'><strong>Mot de passe :</strong> Le mot de passe de Sacha était dans la fuite de données de Shein en 2018, son mot de passe (chiffré) était le suivant. Il semble que Sacha utilise un gestionnaire de mots de passe, ce mot de passe sera très difficile à déchiffrer et il est peu probable que Sacha réutilise ce mot de passe ailleurs :</li>";
    html += "</ul>";
        // Ajout de l'image
        html += `
        <div class="image-container">
            <img src="/src/CapchaSacha.png" alt="Illustration du profil de Sacha">
        </div>
    `;
    resultDiv.innerHTML = html;
}



function updateStats(email, leakCount) {
    let uniqueEmails = JSON.parse(localStorage.getItem('uniqueEmails')) || [];
    let leakRecord = parseInt(localStorage.getItem('leakRecord')) || 0;

    if (!uniqueEmails.includes(email)) {
        uniqueEmails.push(email);
        localStorage.setItem('uniqueEmails', JSON.stringify(uniqueEmails));
    }

    document.getElementById('uniqueCount').textContent = uniqueEmails.length;

    if (leakCount > leakRecord) {
        leakRecord = leakCount;
        localStorage.setItem('leakRecord', leakRecord);
    }

    document.getElementById('leakRecord').textContent = leakRecord;
}

window.onload = function() {
    let uniqueEmails = JSON.parse(localStorage.getItem('uniqueEmails')) || [];
    let leakRecord = parseInt(localStorage.getItem('leakRecord')) || 0;
    document.getElementById('uniqueCount').textContent = uniqueEmails.length;
    document.getElementById('leakRecord').textContent = leakRecord;
}