async function checkEmail() {
    const email = document.getElementById('emailInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!email) {
        resultDiv.innerHTML = "<p>Oups ! Il semble que l'adresse e-mail entrée ne soit pas valide. Pourriez-vous vérifier ?</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Nous vérifions discrètement en coulisses...</p>";

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
                resultDiv.innerHTML = "<p>🎉 Bonne nouvelle ! Votre adresse e-mail n'apparaît dans aucune fuite de données connue. Continuez à naviguer en toute sérénité !</p>";
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
    let html = `<h2>😯 Attention ! Votre adresse e-mail est apparue dans <strong>${breaches.length}</strong> fuite(s) de données.</h2>`;
    html += "<p>Voici les détails :</p>";
    html += "<ul>";
    breaches.forEach(breach => {
        html += `<li><strong>${breach.Title}</strong> (Date de la fuite : ${breach.BreachDate})</li>`;
    });
    html += "</ul>";
    html += "<h3>Que se passe-t-il ?</h3>";
    html += "<p>Cela signifie que vos informations pourraient être accessibles à des personnes mal intentionnées. Mais pas de panique, nous sommes là pour vous guider !</p>";
    html += "<h3>Voici quelques étapes simples pour renforcer votre sécurité :</h3>";
    html += "<ol>";
    html += "<li><strong>Changez vos mots de passe</strong> sur les sites concernés. Optez pour des combinaisons uniques et robustes.</li>";
    html += "<li><strong>Évitez de réutiliser le même mot de passe</strong> sur différents sites. Chaque compte mérite sa propre clé secrète !</li>";
    html += "<li><strong>Activez la double authentification (2FA)</strong> là où c'est possible. Une couche de sécurité supplémentaire ne fait jamais de mal.</li>";
    html += "<li><strong>Utilisez un gestionnaire de mots de passe</strong> pour vous souvenir de toutes vos nouvelles combinaisons.</li>";
    html += "<li><strong>Restez vigilant</strong> face aux e-mails ou messages suspects. Si quelque chose semble trop beau pour être vrai, méfiez-vous !</li>";
    html += "</ol>";
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