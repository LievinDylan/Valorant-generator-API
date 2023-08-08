
const agentManager = {
    agentsIdArray : [],

    fetchAgents: async function() {
        const url = 'https://valorant-api.com/v1/agents?language=fr-FR&isPlayableCharacter=true';
        const response = await fetch(url);

        try {
            const agentsData = await response.json();
            const agents = agentsData.data;
            this.agentsIdArray = [];
            agents.forEach(agent => {
                const agentId = agent.uuid
                this.agentsIdArray.push(agentId)
            });
            return agents;
        } catch (error) {
            console.error(error);
        }
    },

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

    fetchRandomAgent: async function() {
        const agents = await this.fetchAgents();
        const nbOfagents = agents.length;
        const randomNumber = Math.floor(Math.random() * nbOfagents)
        console.log(this.agentsIdArray);
        const randomAgentNumber = this.agentsIdArray[randomNumber];
        const randomAgentData = await this.fetchOneAgent(randomAgentNumber);
        const agent = randomAgentData.data;
        return agent;
    },

    displayAgent: async function() {
        const agent = await this.fetchRandomAgent();
        console.log(agent)

        const nameElement = document.querySelector('#agent_name');
        nameElement.textContent = agent.displayName;

        const descriptionElement = document.querySelector('#agent_description');
        descriptionElement.textContent = agent.description;

        const roleElement = document.querySelector('#agent_role');
        roleElement.textContent = agent.role.displayName;

        const imgElement = document.querySelector('#agent_img')
        imgElement.setAttribute('src', `${agent.fullPortrait}`)

        const skillsElement = document.querySelector('#skills');
        skillsElement.textContent = "";
        agent.abilities.forEach(ability => {
            if (ability.slot !== "Passive") {
            const skillContainer = document.createElement('div');
            skillContainer.classList.add('skill_container')
            const skillElement = document.createElement('p');
            const skillImg = document.createElement('img');
            skillImg.classList.add('skill_img')
            skillImg.setAttribute('src', `${ability.displayIcon}`)
            skillElement.textContent = ability.displayName;
            skillContainer.appendChild(skillImg)
            skillContainer.appendChild(skillElement)
            skillsElement.appendChild(skillContainer)
            }
        });
    }


};

