import { animationManager } from './animation.js'

const agentManager = {
    agentsIdArray: [],
    agentAbilities: [],
    french: true,
    english: false,
    generateBtnClicked : false,

    languageSelection: function () {
        //Selection des différents éléments
        const frenchBtn = document.querySelector('.french_button');
        const englishBtn = document.querySelector('.english_button');

        // Selection des différentes options pour les cachés lors du changement de langues
        const containerToHide = document.querySelectorAll('.items_container');
        const btnToUnselect = document.querySelectorAll('button');

        frenchBtn.addEventListener("click", () => {
            containerToHide.forEach(container => {
                container.classList.add('hidden');
            });
            console.log(btnToUnselect)
            btnToUnselect.forEach(btn => {
                btn.classList.remove('selected')
            });
            setTimeout(() => {           
                this.french = true;
                this.english = false;
                document.querySelector('.right_side').classList.add('hidden');
                document.querySelector('.left_side').classList.add('hidden');
                document.querySelector('#agent_generator_btn').textContent = "PARTIE TROUVÉE";
            }, 200)

        })

        englishBtn.addEventListener("click", () => {
            containerToHide.forEach(container => {
                container.classList.add('hidden');
            });
            btnToUnselect.forEach(btn => {
                btn.classList.remove('selected')
            });
            setTimeout(() => {
                this.french = false;
                this.english = true;
                document.querySelector('.right_side').classList.add('hidden');
                document.querySelector('.left_side').classList.add('hidden');
                document.querySelector('#agent_generator_btn').textContent = "MATCH FOUND";
            }, 200)
        })

        this.languageDisplay()
    },

    languageDisplay: function () {
        this.generatorClickedBtn();       
        const arsenalTitle = document.querySelector('#arsenal_title');
        const skillTitle = document.querySelector('#skill_title');
        const easyWeaponBtn = document.querySelector('#easy_weapon');
        const mediumWeaponBtn = document.querySelector('#medium_weapon');
        const hardWeaponBtn = document.querySelector('#hard_weapon');
        const easySkillBtn = document.querySelector('#easy_skill');
        const mediumSkillBtn = document.querySelector('#medium_skill');
        const hardSkillBtn = document.querySelector('#hard_skill');
        const generateBtn = document.querySelector('#agent_generator_btn');
        if (this.french) {
            arsenalTitle.textContent = "Arsenal disponible :"
            skillTitle.textContent = "Compétences disponibles :"
            easyWeaponBtn.textContent = "ÉQUIPÉ"
            mediumWeaponBtn.textContent = "PEU ÉQUIPÉ"
            hardWeaponBtn.textContent = "MAL ÉQUIPÉ"
            easySkillBtn.textContent = "PRESQUE TOUTES"
            mediumSkillBtn.textContent = "LA MOITIÉ"
            hardSkillBtn.textContent = "L'UNIQUE"            
            if (this.generateBtnClicked) {
                setTimeout(() => {
                  generateBtn.textContent = "ENCORE"  
                },500)
            } else {
                generateBtn.textContent = "PARTIE TROUVÉE"
            }
        } else if (this.english) {
            arsenalTitle.textContent = "Weapons available :"
            skillTitle.textContent = "Skills available :"
            easyWeaponBtn.textContent = "A LOT"
            mediumWeaponBtn.textContent = "A FEW"
            hardWeaponBtn.textContent = "JUST ONE"
            easySkillBtn.textContent = "ALMOST ALL"
            mediumSkillBtn.textContent = "HALF"
            hardSkillBtn.textContent = "UNIQUE"
            if (this.generateBtnClicked) {
                setTimeout(() => {
                    generateBtn.textContent = "AGAIN"  
                  },500)
            } else {
                generateBtn.textContent = "MATCH FOUND"
            }
        }
    },

    // Methode de récupération de tout les agents
    fetchAgents: async function () {
        this.languageSelection();
        if (this.french === true) {
            const url = 'https://valorant-api.com/v1/agents?language=fr-FR&isPlayableCharacter=true';
            const response = await fetch(url);
            try {
                this.agentsIdArray = [];
                const agentsData = await response.json();
                const agents = agentsData.data;
                agents.forEach(agent => {
                    const agentId = agent.uuid
                    this.agentsIdArray.push(agentId)
                });
                return agents;
            } catch (error) {
                console.error(error);
            }
        } else if (this.english === true) {
            const url = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true';
            const response = await fetch(url);
            try {
                this.agentsIdArray = [];
                const agentsData = await response.json();
                const agents = agentsData.data;
                agents.forEach(agent => {
                    const agentId = agent.uuid
                    this.agentsIdArray.push(agentId)
                });
                return agents;
            } catch (error) {
                console.error(error);
            }
        }
    },
    // Methode pour récupération d'un seul agent suivant l'id (uuid)
    fetchOneAgent: async function (id) {
        this.languageSelection();
        if (this.french === true) {
            const url = `https://valorant-api.com/v1/agents/${id}?language=fr-FR&isPlayableCharacter=true`;
            const response = await fetch(url);

            try {
                const agentData = await response.json();
                return agentData;
            } catch (error) {
                console.error(error);
            }
        } else if (this.english === true) {
            const url = `https://valorant-api.com/v1/agents/${id}?isPlayableCharacter=true`;
            const response = await fetch(url);

            try {
                const agentData = await response.json();
                return agentData;
            } catch (error) {
                console.error(error);
            }
        }

    },
    // Methode pour générer un nombre aléatoire afin de récuperer un id (aléatoire) dans le tableau des uuid puis générer l'agent aléatoire
    fetchRandomAgent: async function () {
        const agents = await this.fetchAgents();
        // Nombre total des agents
        const nbOfAgents = agents.length;
        // Génération du nombre aléatoire
        const randomNumber = Math.floor(Math.random() * nbOfAgents)
        // Selection aléatoire de l'uuid
        const randomAgentId = this.agentsIdArray[randomNumber];
        // Récupération de l'agent
        const randomAgentData = await this.fetchOneAgent(randomAgentId);
        const agent = randomAgentData.data;
        this.agentAbilities = agent.abilities.filter(agent => agent.slot !== "Passive");
        return agent;
    },
    // Méthode de traitement des données de l'agent
    displayAgent: async function () {
        const agent = await this.fetchRandomAgent();
        const agentInformationContainer = document.querySelector('.agent_information')
        agentInformationContainer.textContent = "";
        const agentPictureContainer = document.querySelector('.left_side');
        agentPictureContainer.textContent = "";

        // Ajout du nom de l'agent 
        const nameElement = document.createElement('h2');
        nameElement.classList.add('animate-text');
        nameElement.classList.add('agent_name');
        nameElement.textContent = agent.displayName;
        agentInformationContainer.appendChild(nameElement)
        // Ajout de la miniature pour le format mobile
        const iconElement = document.createElement('img');
        iconElement.setAttribute('src',`${agent.displayIcon}`);
        iconElement.setAttribute('id', 'agent_icon');
        iconElement.classList.add('hidden');
        agentInformationContainer.appendChild(iconElement);
        // Ajout du rôle de l'agent
        const roleElement = document.createElement('p');
        roleElement.classList.add('animate-text')
        roleElement.textContent = agent.role.displayName;
        agentInformationContainer.appendChild(roleElement)
        // Ajout de l'image de l'agent
        const imgElement = document.createElement('img');
        imgElement.setAttribute('id', 'agent_img');
        imgElement.setAttribute('src', `${agent.fullPortrait}`);
        agentPictureContainer.appendChild(imgElement);
        animationManager.animateText();
    },
    // Méthode de traitement des compétences de l'agent
    displaySkillsEasy: function () {
        const skillEasyContainer = document.querySelector('#skills_container_easy');
        skillEasyContainer.textContent = "";
        let abilitiesArray = [];
        const randomNumber = Math.floor(Math.random() * this.agentAbilities.length);
        abilitiesArray = this.agentAbilities.filter(agent => agent !== this.agentAbilities[randomNumber]);
        abilitiesArray.forEach(ability => {
            this.createSkillElement(ability, 'easy', skillEasyContainer);
            animationManager.animateTextSkillEasy();
        })
    },
    // Méthode de traitement des compétences de l'agent (medium)
    displaySkillsMedium: function () {
        const skillMediumContainer = document.querySelector('#skills_container_medium');
        skillMediumContainer.textContent = "";
        const randomNumberOne = Math.floor(Math.random() * this.agentAbilities.length);
        let randomNumberTwo = Math.floor(Math.random() * this.agentAbilities.length);
        while (randomNumberTwo === randomNumberOne) {
            randomNumberTwo = Math.floor(Math.random() * this.agentAbilities.length)
        }
        const newArraySkills = [
            this.agentAbilities[randomNumberOne],
            this.agentAbilities[randomNumberTwo]
          ];         
        newArraySkills.forEach(ability => {
            this.createSkillElement(ability, 'medium', skillMediumContainer);
            animationManager.animateTextSkillMedium();
        });
    },
    // Méthode de traitement pour une compétence
    displaySkillsHard: async function () {
        const skillHardContainer = document.querySelector('#skills_container_hard');
        skillHardContainer.textContent = "";
        const randomNumber = Math.floor(Math.random() * this.agentAbilities.length);
        const ability = this.agentAbilities[randomNumber];
        this.createSkillElement(ability, 'hard', skillHardContainer);
        animationManager.animateTextSkillHard();
    },
    createSkillElement: function(ability, difficulty, container, animation) {
        const skillContainer = document.createElement('div');
        skillContainer.classList.add("skill_row");
        const skillImg = document.createElement('img');
        skillImg.setAttribute('src', `${ability.displayIcon}`);
        const skillElement = document.createElement('p');
        skillElement.textContent = ability.displayName;
        skillElement.classList.add(`animate-text-skill-${difficulty}`);
        skillContainer.appendChild(skillImg);
        skillContainer.appendChild(skillElement);
        container.appendChild(skillContainer);
    },
    generatorClickedBtn: function () {
        document.querySelector('#agent_generator_btn').addEventListener("click",() => {
            this.generateBtnClicked = true;
        })
    },

};

export { agentManager };