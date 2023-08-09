
const weaponManager= {
    weaponsIdArray : [],
    heavyWeaponArray : [],
    riffleWeaponArray : [],
    shotgunWeaponArray : [],
    sidearmWeaponArray : [],
    sniperWeaponArray : [],
    smgWeaponArray : [],
    mediumWeaponArray: [],

    // Methode de récupération de toutes les armes
    fetchWeapons: async function() {
        const url = 'https://valorant-api.com/v1/weapons?language=fr-FR';
        const response = await fetch(url);

        try {
            const weaponsData = await response.json();
            const weapons = weaponsData.data;
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
    fetchOneWeapon: async function(id) {
        const url =`https://valorant-api.com/v1/weapons/${id}?language=fr-FR`;
        const response = await fetch(url);

        try {
            const weaponData = await response.json();
            return weaponData;
        } catch (error) {
            console.error(error)
        }

    },
    // Methode pour générer un nombre aléatoire et récupérer un id (aléatoire)
    fetchRandomWeaponEasy: async function() {
        try {
            const weapons = await this.fetchWeapons();

            // Ajout des armes dans un tableau selon leur type :

            //Reset des tableaux
            this.weaponsIdArray = [];
            this.heavyWeaponArray = [];
            this.riffleWeaponArray = [];
            this.shotgunWeaponArray = [];
            this.sidearmWeaponArray = [];
            this.sniperWeaponArray = [];
            this.smgWeaponArray = [];
            this.mediumWeaponArray= [];
            // Push des armes dans les tableaux adéquate
            weapons.forEach(weapon => {
                const typeOfWeapon = weapon.category
                switch (typeOfWeapon) {
                    case 'EEquippableCategory::Heavy':
                        this.heavyWeaponArray.push(weapon);
                        break;
                    case 'EEquippableCategory::Rifle':
                        this.riffleWeaponArray.push(weapon);
                        break;
                    case 'EEquippableCategory::Shotgun':
                        this.shotgunWeaponArray.push(weapon)
                        break;
                    case 'EEquippableCategory::Sidearm':
                        this.sidearmWeaponArray.push(weapon)
                        break;
                    case 'EEquippableCategory::Sniper':
                        this.sniperWeaponArray.push(weapon)
                        break;
                    case 'EEquippableCategory::SMG':
                        this.smgWeaponArray.push(weapon)
                        break;
            }
        });
        } catch (error) {
            console.error(error)
        }
    
    },

    displayRandomWeaponEasy: async function() {
        try {
            //Appel de la méthode générant les tableaux
            await this.fetchRandomWeaponEasy();
            //Selection du container des armes
            const weaponContainer = document.querySelector('#weapon_container_easy');
            weaponContainer.textContent = "";
            //Heavy
            const randomHeavyNumber = Math.floor(Math.random() * this.heavyWeaponArray.length)
            const randomHeavyWeapon = this.heavyWeaponArray[randomHeavyNumber];
            const heavyWeapon = document.createElement('p');
            heavyWeapon.textContent = randomHeavyWeapon.displayName;
            weaponContainer.appendChild(heavyWeapon);
            //Riffle
            const randomRiffleNumber = Math.floor(Math.random() * this.riffleWeaponArray.length)
            const randomRiffleWeapon = this.riffleWeaponArray[randomRiffleNumber];
            const riffleWeapon = document.createElement('p');
            riffleWeapon.textContent = randomRiffleWeapon.displayName;
            weaponContainer.appendChild(riffleWeapon);
            //Shotgun
            const randomShotgunNumber = Math.floor(Math.random() * this.shotgunWeaponArray.length)
            const randomShotgunWeapon = this.shotgunWeaponArray[randomShotgunNumber];
            const shotgunWeapon = document.createElement('p');
            shotgunWeapon.textContent = randomShotgunWeapon.displayName;
            weaponContainer.appendChild(shotgunWeapon);
            //Sidearm
            const randomSidearmNumber = Math.floor(Math.random()* this.sidearmWeaponArray.length)
            const randomSidearmWeapon = this.sidearmWeaponArray[randomSidearmNumber];
            const sidearmWeapon = document.createElement('p');
            sidearmWeapon.textContent = randomSidearmWeapon.displayName;
            weaponContainer.appendChild(sidearmWeapon);
            //Sniper
            const randomSniperNumber = Math.floor(Math.random() * this.sniperWeaponArray.length)
            const randomSniperWeapon = this.sniperWeaponArray[randomSniperNumber];
            const sniperWeapon = document.createElement('p');
            sniperWeapon.textContent = randomSniperWeapon.displayName;
            weaponContainer.appendChild(sniperWeapon);
            //SMG
            const randomSMGNumber = Math.floor(Math.random() * this.smgWeaponArray.length)
            const randomSMGWeapon = this.smgWeaponArray[randomSMGNumber];
            const smgWeapon = document.createElement('p');
            smgWeapon.textContent = randomSMGWeapon.displayName;
            weaponContainer.appendChild(smgWeapon);     
        } catch (error) {
            console.error(error);
            
        }

    },

    fetchRandomWeaponMedium: async function() {
        try {
            const weapons = await this.fetchWeapons();
            // Nombre total d'armes 
            const nbOfWeapons= weapons.length - 2;
            console.log(this.weaponsIdArray)
            console.log(nbOfWeapons)
            // Tableau qui regroupera les 3 armes générés aléatoirement (reset)
            this.mediumWeaponArray = [];

            // Génération de la première arme
            const randomNumberOne = Math.floor(Math.random() * nbOfWeapons);
            const randomWeaponOne = this.weaponsIdArray[randomNumberOne];
            const weaponOneFetch = await this.fetchOneWeapon(randomWeaponOne);
            const weaponOne = weaponOneFetch.data;
            this.mediumWeaponArray.push(weaponOne);
    
            
            // Génération de la seconde arme
            let randomNumberTwo = Math.floor(Math.random() * nbOfWeapons);
            while (randomNumberTwo === randomNumberOne) {
                randomNumberTwo = Math.floor(Math.random() * nbOfWeapons);
            }
            const randomWeaponTwo = this.weaponsIdArray[randomNumberTwo];
            const weaponTwoFetch = await this.fetchOneWeapon(randomWeaponTwo);
            const weaponTwo = weaponTwoFetch.data
            this.mediumWeaponArray.push(weaponTwo);
    
            
            // Génération de la troisième arme
            let randomNumberThree = Math.floor(Math.random() * nbOfWeapons);
            while (randomNumberThree === randomNumberOne || randomNumberThree === randomNumberTwo) {
                randomNumberThree = Math.floor(Math.random() * nbOfWeapons);
            }
            const randomWeaponThree = this.weaponsIdArray[randomNumberThree];
            const weaponThreeFetch = await this.fetchOneWeapon(randomWeaponThree);
            const weaponThree = weaponThreeFetch.data
            this.mediumWeaponArray.push(weaponThree);
    
        } catch (error) {
            console.error(error)
        }

    },
    
    displayRandomWeaponMedium: async function() {
        // Methode qui génére les 3 armes et push ces dernières dans le tableau correspondant
        await this.fetchRandomWeaponMedium();
        
        //Selection du container des armes
        const weaponContainer = document.querySelector('#weapon_container_medium');
        weaponContainer.textContent = "";

        // Display 1re arme
        const weaponElementOne = document.createElement('p');
        weaponElementOne.textContent = this.mediumWeaponArray[0].displayName;
        weaponContainer.appendChild(weaponElementOne);

        // Display 2re arme
        const weaponElementTwo = document.createElement('p');
        weaponElementTwo.textContent = this.mediumWeaponArray[1].displayName;
        weaponContainer.appendChild(weaponElementTwo);

        // Display 3e arme
        const weaponElementThree = document.createElement('p');
        weaponElementThree.textContent = this.mediumWeaponArray[2].displayName;
        weaponContainer.appendChild(weaponElementThree)
    },

    fetchRandomWeaponHard: async function() {
        // Methode pou récuperer les armes
        const weapons = await this.fetchWeapons();
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

    displayRandomWeaponHard: async function() {
        const weapon = await this.fetchRandomWeaponHard();

        // Ajout de l'arme
        const weaponContainer = document.querySelector('#weapon_container_hard')
        weaponContainer.textContent = "";
        const weaponElement = document.createElement('p');
        weaponElement.textContent = weapon.displayName;
        weaponContainer.appendChild(weaponElement)
    }
}