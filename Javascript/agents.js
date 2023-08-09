
const agentManager = {
    agentsIdArray : [],
    currentAgent: "",

    // Methode de récupération de tout les agents
    fetchAgents: async function() {
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
    },
    // Methode pour récupération d'un seul agent suivant l'id (uuid)
    fetchOneAgent: async function(id) {
        const url = `https://valorant-api.com/v1/agents/${id}?language=fr-FR&isPlayableCharacter=true`;
        const response = await fetch(url);

        try {
            const agentData = await response.json();
            return agentData;
        } catch (error) {
            console.error(error);
        }
    },
    // Methode pour générer un nombre aléatoire afin de récuperer un id (aléatoire) dans le tableau des uuid puis générer l'agent aléatoire
    fetchRandomAgent: async function() {
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
        return agent;
    },
    // Méthode de traitement des données de l'agent
    displayAgent: async function() {

        const agent = await this.fetchRandomAgent();

        const agentInformationContainer = document.querySelector('.agent_information')
        agentInformationContainer.textContent = "";

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
        const imgElement = document.querySelector('#agent_img')
        imgElement.setAttribute('src', `${agent.fullPortrait}`);
        animationManager.animateText();
        this.currentAgent = agent;
        console.log(this.currentAgent)
    },
    // Méthode de traitement des compétences de l'agent
    displaySkillsEasy: function() {
        const agent = this.currentAgent;
        const skillEasyContainer = document.querySelector('#skills_container_easy');
        skillEasyContainer.textContent = "";
        const abilitiesArray = [];
        agent.abilities.forEach(ability => {
            if(ability.slot !== "Passive"){
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
    displaySkillsMedium: function() {
        const agent = this.currentAgent;
        const skillMediumContainer = document.querySelector('#skills_container_medium');
        skillMediumContainer.textContent = "";
        const abilitiesArray = [];
        agent.abilities.forEach(ability => {
            if(ability.slot !== "Passive"){
                abilitiesArray.push(ability);
            }
        });
        const randomNumberOne = Math.floor(Math.random() * abilitiesArray.length);
        let randomNumberTwo = Math.floor(Math.random() * abilitiesArray.length);
        while (randomNumberTwo === randomNumberOne){
            randomNumberTwo = Math.floor(Math.random() * abilitiesArray.length)
        }

        let newArraySkills = [];
        console.log(randomNumberOne)
        console.log(randomNumberTwo)
        const avaibleSkillOne = abilitiesArray[randomNumberOne];
        const avaibleSkillTwo = abilitiesArray[randomNumberTwo];
        newArraySkills.push(avaibleSkillOne);
        newArraySkills.push(avaibleSkillTwo);
        console.log(newArraySkills)

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
        displaySkillsHard: function() {
            const agent = this.currentAgent;
            const skillHardContainer = document.querySelector('#skills_container_hard');
            skillHardContainer.textContent = "";
            const abilitiesArray = [];
            agent.abilities.forEach(ability => {
                if(ability.slot !== "Passive"){
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

