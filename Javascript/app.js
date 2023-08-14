import { generatorManager } from './generator.js'

const app = {
    init: function () {
        // Initialisation de la génération d'agent
        generatorManager.generateAgent();
    }
}

// Initialisation de l'app au lancement de la page
document.addEventListener('DOMContentLoaded', app.init);