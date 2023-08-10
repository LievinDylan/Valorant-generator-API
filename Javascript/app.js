
const app = {
    init: function () {
        // Initialisation de la génération d'agent
        generatorManager.generateAgent();
        generatorManager.generateWeaponEasyMode();
        generatorManager.generateWeaponMediumMode();
        generatorManager.generateWeaponHardMode();
    }
}

// Initialisation de l'app au lancement de la page
document.addEventListener('DOMContentLoaded', app.init);