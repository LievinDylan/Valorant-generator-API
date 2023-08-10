
const agentManager = {
    agentsIdArray: [],
    currentAgent: "",
    french: true,
    english: false,
    agentData: {},
    skillsData: {},

    languageSelection: async function () {
        //Selection des différents éléments
        const frenchBtn = document.querySelector('.french_button');
        const englishBtn = document.querySelector('.english_button');

        // Selection des différentes options pour les cachés lors du changement de langues
        containerToHide = document.querySelectorAll('.items_contrainer');
        btnToUnselect = document.querySelectorAll('.selected');

        frenchBtn.addEventListener("click", () => {
            containerToHide.forEach(container => {
                container.classList.add('hidden');
            });
            btnToUnselect.forEach(btn => {
                btn.classList.remove('selected')
            });
            const agentLoadingAnimation = document.querySelector('#loading_animation');
            agentLoadingAnimation.style.display = 'block';
            setTimeout(() => {
                agentLoadingAnimation.style.display = 'none';
                this.displayAgent();
                this.french = true;
                this.english = false;
            }, 200)

        })

        englishBtn.addEventListener("click", () => {
            containerToHide.forEach(container => {
                container.classList.add('hidden');
            });
            btnToUnselect.forEach(btn => {
                btn.classList.remove('selected')
            });
            const agentLoadingAnimation = document.querySelector('#loading_animation');
            agentLoadingAnimation.style.display = 'block';
            setTimeout(() => {
                agentLoadingAnimation.style.display = 'none';
                this.displayAgent();
                this.french = false;
                this.english = true;
            }, 200)

        })
        this.languageDisplay()
    },

    languageDisplay: function () {
        const arsenalTitle = document.querySelector('#arsenal_title');
        const skillTitle = document.querySelector('#skill_title');
        const easyWeaponBtn = document.querySelector('#easy_mode');
        const mediumWeaponBtn = document.querySelector('#medium_mode');
        const hardWeaponBtn = document.querySelector('#hard_mode');
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
            generateBtn.textContent = "PARTIE TROUVÉE"
        } else if (this.english) {
            arsenalTitle.textContent = "Weapons avaible :"
            skillTitle.textContent = "Skills avaible :"
            easyWeaponBtn.textContent = "A LOT"
            mediumWeaponBtn.textContent = "LESS"
            hardWeaponBtn.textContent = "LIKE NOTHING"
            easySkillBtn.textContent = "ALMOST ALL"
            mediumSkillBtn.textContent = "HALF"
            hardSkillBtn.textContent = "UNIQUE"
            generateBtn.textContent = "MATCH FOUND"
        }
    },

    // Methode de récupération de tout les agents
    fetchAgents: async function () {
        this.languageSelection();
        if (this.french === true) {
            const url = 'https://valorant-api.com/v1/agents?language=fr-FR&isPlayableCharacter=true';
            const response = await fetch(url);
            try {
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
                const agentsData = await response.json();
                const agents = agentsData.data;
                console.log(agentsData.data);
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
        this.currentAgent = agent;
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
        const agent = this.currentAgent;
        console.log(this.currentAgent)
        const skillEasyContainer = document.querySelector('#skills_container_easy');
        skillEasyContainer.textContent = "";
        const abilitiesArray = [];
        agent.abilities.forEach(ability => {
            if (ability.slot !== "Passive") {
                abilitiesArray.push(ability);
            }
        });
        const randomNumber = Math.floor(Math.random() * abilitiesArray.length);
        // Retire l'élément du tableau
        abilitiesArray.splice(randomNumber, 1);

        abilitiesArray.forEach(ability => {
            const skillContainer = document.createElement('div');
            skillContainer.classList.add("skill_row")
            const skillImg = document.createElement('img');
            skillImg.setAttribute('src', `${ability.displayIcon}`)
            const skillElement = document.createElement('p');
            skillElement.textContent = ability.displayName
            skillElement.classList.add('animate-text-skill-easy')

            skillContainer.appendChild(skillImg);
            skillContainer.appendChild(skillElement);
            skillEasyContainer.appendChild(skillContainer);
            animationManager.animateTextSkillEasy();
        })


    },
    // Méthode de traitement des compétences de l'agent (medium)
    displaySkillsMedium: function () {
        const agent = this.currentAgent;
        const skillMediumContainer = document.querySelector('#skills_container_medium');
        skillMediumContainer.textContent = "";
        const abilitiesArray = [];
        agent.abilities.forEach(ability => {
            if (ability.slot !== "Passive") {
                abilitiesArray.push(ability);
            }
        });
        const randomNumberOne = Math.floor(Math.random() * abilitiesArray.length);
        let randomNumberTwo = Math.floor(Math.random() * abilitiesArray.length);
        while (randomNumberTwo === randomNumberOne) {
            randomNumberTwo = Math.floor(Math.random() * abilitiesArray.length)
        }

        let newArraySkills = [];
        const avaibleSkillOne = abilitiesArray[randomNumberOne];
        const avaibleSkillTwo = abilitiesArray[randomNumberTwo];
        newArraySkills.push(avaibleSkillOne);
        newArraySkills.push(avaibleSkillTwo);

        newArraySkills.forEach(ability => {
            const skillContainer = document.createElement('div');
            skillContainer.classList.add("skill_row")
            const skillImg = document.createElement('img');
            skillImg.setAttribute('src', `${ability.displayIcon}`)
            const skillElement = document.createElement('p');
            skillElement.textContent = ability.displayName
            skillElement.classList.add('animate-text-skill-medium')

            skillContainer.appendChild(skillImg);
            skillContainer.appendChild(skillElement);
            skillMediumContainer.appendChild(skillContainer);
            animationManager.animateTextSkillMedium();
        });

    },
    // Méthode de traitement pour une compétence
    displaySkillsHard: async function () {
        const agent = this.currentAgent;
        const skillHardContainer = document.querySelector('#skills_container_hard');
        skillHardContainer.textContent = "";
        const abilitiesArray = [];
        agent.abilities.forEach(ability => {
            if (ability.slot !== "Passive") {
                abilitiesArray.push(ability);
            }
        });
        const randomNumber = Math.floor(Math.random() * abilitiesArray.length);
        const ability = abilitiesArray[randomNumber];
        const skillContainer = document.createElement('div');
        skillContainer.classList.add("skill_row")
        const skillImg = document.createElement('img');
        skillImg.setAttribute('src', `${ability.displayIcon}`)
        const skillElement = document.createElement('p');
        skillElement.textContent = ability.displayName
        skillElement.classList.add('animate-text-skill-hard')

        skillContainer.appendChild(skillImg);
        skillContainer.appendChild(skillElement);
        skillHardContainer.appendChild(skillContainer);
        animationManager.animateTextSkillHard();
    },


};

