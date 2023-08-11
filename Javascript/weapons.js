
const weaponManager = {
    weaponsIdArray: [],
    heavyWeaponArray: [],
    riffleWeaponArray: [],
    shotgunWeaponArray: [],
    sidearmWeaponArray: [],
    sniperWeaponArray: [],
    smgWeaponArray: [],
    mediumWeaponArray: [],

    // Methode de récupération de toutes les armes
    fetchAllWeapons: async function () {
        const url = 'https://valorant-api.com/v1/weapons?language=fr-FR';
        const response = await fetch(url);
        try {
            const weaponsData = await response.json();
            const weapons = weaponsData.data;
            this.weaponsIdArray = [];
            weapons.forEach(weapon => {
                if (weapon.displayName !== "Classic" && weapon.displayName !== "Mêlée") {
                    const weaponId = weapon.uuid
                    this.weaponsIdArray.push(weaponId)
                }
            });
            return weapons;
        } catch (error) {
            console.error(error);
        }
    },
    //Methode pour récupération d'une arme suivant l'id (uuid)
    fetchOneWeapon: async function (id) {
        const url = `https://valorant-api.com/v1/weapons/${id}?language=fr-FR`;
        const response = await fetch(url);

        try {
            const weaponData = await response.json();
            return weaponData;
        } catch (error) {
            console.error(error)
        }

    },
    // Methode pour générer un nombre aléatoire et récupérer un id (aléatoire)
    fetchRandomWeaponEasy: async function () {
        try {
            const weapons = await this.fetchAllWeapons();
            // Ajout des armes dans un tableau selon leur type :
            this.heavyWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::Heavy');
            this.riffleWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::Rifle');
            this.shotgunWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::Shotgun');
            this.sidearmWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::Sidearm');
            this.sniperWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::Sniper');
            this.smgWeaponArray = weapons.filter(weapon => weapon.category === 'EEquippableCategory::SMG')
        } catch (error) {
            console.error(error)
        }

    },

    displayRandomWeaponEasy: async function () {
        try {
            // Appel de la méthode générant les tableaux
            await this.fetchRandomWeaponEasy();

            const weaponContainer = document.querySelector('#weapon_container_easy');
            weaponContainer.textContent = "";

            // Fonction pour générer et afficher une arme
            function generateAndDisplayWeapon(weaponArray) {
                const randomWeaponNumber = Math.floor(Math.random() * weaponArray.length);
                const randomWeapon = weaponArray[randomWeaponNumber];
                const weaponElement = document.createElement('p');
                weaponElement.textContent = randomWeapon.displayName;
                weaponElement.classList.add('animate-text-easy');
                weaponContainer.appendChild(weaponElement);
            }

            // Génération et affichage des armes
            generateAndDisplayWeapon(this.sidearmWeaponArray);
            generateAndDisplayWeapon(this.heavyWeaponArray);
            generateAndDisplayWeapon(this.smgWeaponArray);
            generateAndDisplayWeapon(this.shotgunWeaponArray);
            generateAndDisplayWeapon(this.sniperWeaponArray);
            generateAndDisplayWeapon(this.riffleWeaponArray);

            //Lancement de l'animation
            animationManager.animateTextWeaponEasy();
        } catch (error) {
            console.error(error);
        }
    },

    fetchRandomWeaponMedium: async function () {
        try {
            const weapons = await this.fetchAllWeapons();
            // Nombre total d'armes (en enlevant le couteau et l'arme de base)
            const nbOfWeapons = weapons.length - 2;
            // Tableau qui regroupera les 3 armes générés aléatoirement (reset)
            this.mediumWeaponArray = [];

            // Fonction pour générer 3 armes
           async function generateMediumWeapon(randomNumber) {
                const randomId = weaponManager.weaponsIdArray[randomNumber]
                const randomWeapon = await weaponManager.fetchOneWeapon(randomId);
                const newWeapon = randomWeapon.data;
                weaponManager.mediumWeaponArray.push(newWeapon);
            }

            // Génération de 3 nombres aléatoire pour aller chercher 3 id différent
            const randomNumberOne = Math.floor(Math.random() * nbOfWeapons);
            let randomNumberTwo = Math.floor(Math.random() * nbOfWeapons);
            while (randomNumberTwo === randomNumberOne) {
                randomNumberTwo = Math.floor(Math.random() * nbOfWeapons);
            }
            let randomNumberThree = Math.floor(Math.random() * nbOfWeapons);
            while (randomNumberThree === randomNumberOne || randomNumberThree === randomNumberTwo) {
                randomNumberThree = Math.floor(Math.random() * nbOfWeapons);
            }

            // Mise en place des 3 armes
            await generateMediumWeapon(randomNumberOne);
            await generateMediumWeapon(randomNumberTwo);
            await generateMediumWeapon(randomNumberThree);

        } catch (error) {
            console.error(error)
        }

    },

    displayRandomWeaponMedium: async function () {
        // Methode qui génére les 3 armes et push ces dernières dans le tableau correspondant
        await this.fetchRandomWeaponMedium();

        //Selection du container des armes
        const weaponContainer = document.querySelector('#weapon_container_medium');
        weaponContainer.textContent = "";

        this.mediumWeaponArray.forEach(weapon => {
            const weaponElement = document.createElement('p');
            weaponElement.textContent = weapon.displayName;
            weaponElement.classList.add('animate-text-medium');
            weaponContainer.appendChild(weaponElement);
        });

        // Lancement de l'animation
        animationManager.animateTextWeaponMedium();
    },

    fetchRandomWeaponHard: async function () {
        // Methode pou récuperer les armes
        const weapons = await this.fetchAllWeapons();
        // Nombre total des armes
        const nbOfWeapons = weapons.length - 2;
        // Génération du nombre aléatoire
        let randomNumber = Math.floor(Math.random() * nbOfWeapons);
        // Selection aléatoire de l'uuid
        const randomWeaponId = this.weaponsIdArray[randomNumber];
        //Récupération de l'arme
        const randomWeaponData = await this.fetchOneWeapon(randomWeaponId);
        const weapon = randomWeaponData.data;
        return weapon;
    },

    displayRandomWeaponHard: async function () {
        const weapon = await this.fetchRandomWeaponHard();

        // Ajout de l'arme
        const weaponContainer = document.querySelector('#weapon_container_hard')
        weaponContainer.textContent = "";
        const weaponElement = document.createElement('p');
        weaponElement.textContent = weapon.displayName;
        weaponElement.classList.add('animate-text-hard');
        weaponContainer.appendChild(weaponElement)
        // Lancement de l'animation
        animationManager.animateTextWeaponHard();
    }
}