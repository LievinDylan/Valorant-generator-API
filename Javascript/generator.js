const generatorManager = {
    // Génération d'un agent au clic du bouton
    generateAgent: function() {
        const generateBtn = document.querySelector('#agent_generator_btn');
        generateBtn.addEventListener("click",(event) => {
            // Préviens l'event par défaut
            event.preventDefault();
            agentManager.displayAgent();
            const agentContainerElement = document.querySelector('#agent_container');
            const agentContainerRightSide = document.querySelector('.right_side');
            agentContainerRightSide.classList.remove('hidden');
            agentContainerElement.classList.remove('hidden');   
            generateBtn.textContent = "AGAIN";
            
        })
    }
}