const generatorManager = {
    // Génération d'un agent au clic du bouton
    generateAgent: function() {
        const generateBtn = document.querySelector('#agent_generator_btn');
        generateBtn.addEventListener("click",(event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            // Appel de la méthode pour construire l'agent
            agentManager.displayAgent();
            
            //Rappel de la génération d'arme en cas de click sur "Encore"
            const easyContainerWeapon = document.querySelector('#weapon_container_easy');
            const mediumContainerWeapon = document.querySelector('#weapon_container_medium');
            const hardContainerWeapon = document.querySelector('#weapon_container_hard');
            if(!easyContainerWeapon.classList.contains('hidden')) {
                weaponManager.displayRandomWeaponEasy();
                mediumContainerWeapon.classList.add('hidden');
                hardContainerWeapon.classList.add('hidden');
            } else if (!mediumContainerWeapon.classList.contains('hidden')) {
                weaponManager.displayRandomWeaponMedium();
                easyContainerWeapon.classList.add('hidden');
                hardContainerWeapon.classList.add('hidden');
            } else if (!hardContainerWeapon.classList.contains('hidden')) {
                weaponManager.displayRandomWeaponHard();
                easyContainerWeapon.classList.add('hidden');
                mediumContainerWeapon.classList.add('hidden');
            }

            const agentContainerElement = document.querySelector('#agent_container');
            const agentContainerRightSide = document.querySelector('.right_side');
            // Apparition des informations de l'agent
            agentContainerRightSide.classList.remove('hidden');
            agentContainerElement.classList.remove('hidden');   
            generateBtn.textContent = "ENCORE !";
            
        })
    },
    // Génération des armes aléatoire (une par type / mode facile)
    generateWeaponEasyMode: function() {
        const generateEasyBtn = document.querySelector('#easy_mode');
        generateEasyBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            // Appel de la méthode pour générer les armes
            weaponManager.displayRandomWeaponEasy();
            const weaponContainer = document.querySelector('#weapon_container_easy')
            weaponContainer.classList.remove('hidden');
            document.querySelector('#weapon_container_medium').classList.add('hidden');
            document.querySelector('#weapon_container_hard').classList.add('hidden');
        })
    },
    // Génération des armes aléatoire (3 armes / mode médium)
    generateWeaponMediumMode: function() {
        const generateMediumBtn = document.querySelector('#medium_mode');
        generateMediumBtn.addEventListener("click", (event) => {
             // Préviens l'event par défaut
            event.preventDefault();
            // Appel de la méthode pour générer les armes
            weaponManager.displayRandomWeaponMedium();
            const weaponContainer = document.querySelector('#weapon_container_medium')
            weaponContainer.classList.remove('hidden');
            document.querySelector('#weapon_container_easy').classList.add('hidden');
            document.querySelector('#weapon_container_hard').classList.add('hidden');               
        })
    },
    // Génération d'une arme aléatorie (une seule)
    generateWeaponHardMode: function() {
        const generateHardBtn = document.querySelector('#hard_mode');
        generateHardBtn.addEventListener("click", (event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            console.log('coucou')
            // Appel de la méthode pour générer l'arme
            weaponManager.displayRandomWeaponHard();
            const weaponContainer = document.querySelector('#weapon_container_hard')
            weaponContainer.classList.remove('hidden');
            document.querySelector('#weapon_container_easy').classList.add('hidden');
            document.querySelector('#weapon_container_medium').classList.add('hidden');  
        })
    }
}