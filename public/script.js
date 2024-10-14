async function checkEmail() {
    const email = document.getElementById('emailInput').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = "<p>Vérification en cours...</p>";
    
    try {
        const response = await fetch('/api/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();
        
        if (data.breaches && data.breaches.length > 0) {
            displayResult(data.breaches);
        } else {
            resultDiv.innerHTML = "<p>Bonne nouvelle ! Votre adresse e-mail n'a pas été trouvée dans les fuites de données connues.</p>";
        }
    } catch (error) {
        console.error('Erreur:', error);
        resultDiv.innerHTML = "<p>Une erreur s'est produite lors de la vérification. Veuillez réessayer plus tard.</p>";
    }

    updateStats(email);
}

function displayResult(breaches) {
    const resultDiv = document.getElementById('result');
    let html = "<h2>Résultats de la vérification</h2>";
    html += "<p>Votre adresse e-mail a été trouvée dans les fuites de données suivantes :</p>";
    html += "<ul>";
    breaches.forEach(breach => {
        html += `<li>${breach.Name} (Date de la fuite : ${breach.BreachDate})</li>`;
    });
    html += "</ul>";
    html += "<h3>Que signifient ces informations ?</h3>";
    html += "<p>Ces résultats indiquent que votre adresse e-mail a été compromise dans une ou plusieurs fuites de données. Cela signifie que des informations associées à cette adresse (comme des mots de passe) pourraient être entre les mains de personnes malveillantes.</p>";
    html += "<h3>Que devez-vous faire pour vous sécuriser ?</h3>";
    html += "<ol>";
    html += "<li>Changez immédiatement vos mots de passe sur tous les sites concernés.</li>";
    html += "<li>Si vous avez utilisé le même mot de passe sur d'autres sites, changez-le également sur ces sites.</li>";
    html += "<li>Activez l'authentification à deux facteurs (2FA) partout où c'est possible.</li>";
    html += "<li>Utilisez un gestionnaire de mots de passe pour créer et stocker des mots de passe uniques et complexes pour chaque site.</li>";
    html += "<li>Restez vigilant face aux tentatives de phishing ou d'escroquerie qui pourraient utiliser vos informations personnelles.</li>";
    html += "</ol>";
    resultDiv.innerHTML = html;
}

function updateStats(email) {
    let uniqueEmails = JSON.parse(localStorage.getItem('uniqueEmails')) || [];
    let leakRecord = parseInt(localStorage.getItem('leakRecord')) || 0;

    if (!uniqueEmails.includes(email)) {
        uniqueEmails.push(email);
        localStorage.setItem('uniqueEmails', JSON.stringify(uniqueEmails));
    }

    document.getElementById('uniqueCount').textContent = uniqueEmails.length;

    const currentLeaks = Math.floor(Math.random() * 10);
    if (currentLeaks > leakRecord) {
        leakRecord = currentLeaks;
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