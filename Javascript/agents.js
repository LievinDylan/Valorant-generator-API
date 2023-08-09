
const agentManager = {
    agentsIdArray : [],

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

        // Ajout du nom de l'agent
        const nameElement = document.querySelector('#agent_name');
        nameElement.textContent = agent.displayName;
        // Ajout du rôle de l'agent
        const roleElement = document.querySelector('#agent_role');
        roleElement.textContent = agent.role.displayName;
        // Ajout de l'image de l'agent
        const imgElement = document.querySelector('#agent_img')
        imgElement.setAttribute('src', `${agent.fullPortrait}`);
    }


};

