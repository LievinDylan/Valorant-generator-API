import {agentManager} from './agents.js'
import {weaponManager} from './weapons.js'

const generatorManager = {
    // Génération d'un agent au clic du bouton
    generateAgent: function () {
        agentManager.languageSelection();
        const generateBtn = document.querySelector('#agent_generator_btn');
        generateBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            document.querySelector('.agent_information').textContent = "";
            //Rappel de la génération d'arme/skills en cas de click sur "Encore"
            const allGenerateContainer = document.querySelectorAll('.items_container');
            allGenerateContainer.forEach(container => {
                container.classList.add('hidden')
            });
            // Reset des boutons
            const allModeBtn = document.querySelectorAll('.mode_btn');
            allModeBtn.forEach(btn => {
                btn.classList.remove('selected');
            })
            // Lancement des animations de chargement
            const agentLoadingAnimation = document.querySelector('#loading_animation');
            agentLoadingAnimation.style.display = 'block';

            agentManager.displayAgent();
            setTimeout(() => {
                // Masquer l'animation de chargement
                agentLoadingAnimation.style.display = 'none';
    ;
                // Apparition des informations de l'agent
                document.querySelector('.left_side').classList.remove('hidden');
                document.querySelector('.right_side').classList.remove('hidden');
                document.querySelector('#agent_container').classList.remove('hidden');
                this.generateWeaponEasyMode();
                this.generateWeaponMediumMode();
                this.generateWeaponHardMode();
                this.generateSkillEasyMode();
                this.generateSkillMediumMode();
                this.generateSkillHardMode();
            }, 500);
        })
    }
    ,
    // Génération des armes aléatoire (une par type / mode facile)
    generateWeaponEasyMode: function () {
        const generateEasyBtn = document.querySelector('#easy_weapon');
        generateEasyBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();

            // Modification du button
            generateEasyBtn.classList.add('selected');
            document.querySelector('#medium_weapon').classList.remove('selected');
            document.querySelector('#hard_weapon').classList.remove('selected');

            document.querySelector('#weapon_container_medium').classList.add('hidden');
            document.querySelector('#weapon_container_hard').classList.add('hidden');
            const weaponContainer = document.querySelector('#weapon_container_easy')
            // Appel de la méthode pour générer les armes
            weaponManager.displayRandomWeaponEasy();
            setTimeout(() => {
                weaponContainer.classList.remove('hidden');
            }, 200);
        })
    },
    // Génération des armes aléatoire (3 armes / mode médium)
    generateWeaponMediumMode: function () {
        const generateMediumBtn = document.querySelector('#medium_weapon');
        generateMediumBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();

            // Modification du button
            generateMediumBtn.classList.add('selected');
            document.querySelector('#easy_weapon').classList.remove('selected');
            document.querySelector('#hard_weapon').classList.remove('selected');

            document.querySelector('#weapon_container_easy').classList.add('hidden');
            document.querySelector('#weapon_container_hard').classList.add('hidden');
            const weaponContainer = document.querySelector('#weapon_container_medium')
            // Appel de la méthode pour générer les armes
            weaponManager.displayRandomWeaponMedium();
            setTimeout(() => {
                weaponContainer.classList.remove('hidden');
            }, 200)
        })
    },
    // Génération d'une arme aléatoire (une seule)
    generateWeaponHardMode: function () {
        const generateHardBtn = document.querySelector('#hard_weapon');
        generateHardBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            // Modification du button
            generateHardBtn.classList.add('selected');
            document.querySelector('#easy_weapon').classList.remove('selected');
            document.querySelector('#medium_weapon').classList.remove('selected');

            document.querySelector('#weapon_container_easy').classList.add('hidden');
            document.querySelector('#weapon_container_medium').classList.add('hidden');
            // Appel de la méthode pour générer l'arme
            weaponManager.displayRandomWeaponHard();
            const weaponContainer = document.querySelector('#weapon_container_hard')
            setTimeout(() => {
                weaponContainer.classList.remove('hidden');
            }, 200)
        })
    },
    // Génération des compétences (easy mode)
    generateSkillEasyMode: function () {
        const generateEasyBtn = document.querySelector('#easy_skill');
        agentManager.displaySkillsEasy();
        generateEasyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            // Modification du btn
            generateEasyBtn.classList.add('selected');
            document.querySelector('#hard_skill').classList.remove('selected');
            document.querySelector('#medium_skill').classList.remove('selected');

            document.querySelector('#skills_container_hard').classList.add('hidden');
            document.querySelector('#skills_container_medium').classList.add('hidden');

            agentManager.displaySkillsEasy();
            const skillContainer = document.querySelector('#skills_container_easy')
            setTimeout(() => {
                skillContainer.classList.remove('hidden');
            }, 200)
        })
    },

    generateSkillMediumMode: function () {
        const generateMediumBtn = document.querySelector('#medium_skill');
        agentManager.displaySkillsMedium();
        generateMediumBtn.addEventListener("click", (event) => {
            event.preventDefault();
            // Modification du btn
            generateMediumBtn.classList.add('selected');
            document.querySelector('#hard_skill').classList.remove('selected');
            document.querySelector('#easy_skill').classList.remove('selected');

            document.querySelector('#skills_container_easy').classList.add('hidden');
            document.querySelector('#skills_container_hard').classList.add('hidden');

            agentManager.displaySkillsMedium();
            const skillContainer = document.querySelector('#skills_container_medium')
            setTimeout(() => {
                skillContainer.classList.remove('hidden');
            }, 200)
        })
    },

    generateSkillHardMode: function () {
        const generateHardBtn = document.querySelector('#hard_skill');
        agentManager.displaySkillsHard();
        generateHardBtn.addEventListener("click", (event) => {
            event.preventDefault();
            // Modification du btn
            generateHardBtn.classList.add('selected');
            document.querySelector('#medium_skill').classList.remove('selected');
            document.querySelector('#easy_skill').classList.remove('selected');

            document.querySelector('#skills_container_easy').classList.add('hidden');
            document.querySelector('#skills_container_medium').classList.add('hidden');

            agentManager.displaySkillsHard();
            const skillContainer = document.querySelector('#skills_container_hard')
            setTimeout(() => {
                skillContainer.classList.remove('hidden');
            }, 200)
        })
    },
}

export { generatorManager };