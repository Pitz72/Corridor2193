document.addEventListener('DOMContentLoaded', () => {
    console.log("Corridor2193 v0.01: DOM Caricato - Motore JS Puro");

    // Elementi DOM principali
    const storyTitleScreen = document.getElementById('story-title-screen');
    const passageScreen = document.getElementById('passage-screen');
    const passageTextDiv = document.getElementById('passage-text');
    const passageChoicesDiv = document.getElementById('passage-choices');
    const descriptionScreen = document.getElementById('description-screen');
    const descriptionTextDiv = document.getElementById('description-text');
    const descriptionChoicesDiv = document.getElementById('description-choices');
    const creditsScreen = document.getElementById('credits-screen');
    const gameFooter = document.getElementById('game-footer'); // Per controlli futuri

    // Stato del gioco
    let gameState = {
        currentPassageId: null,
        variables: {},
        history: [], // Cronologia dei passaggi *narrativi* visitati (per undo e logica "return to")
        previousPassageForDescription: null, // Per sapere dove tornare dopo una descrizione
        temporaryFlags: {}
    };

    function showScreen(screenElementToShow) {
        console.log(`GAME LOGIC: Tentativo di mostrare Schermata: ${screenElementToShow ? screenElementToShow.id : 'ELEMENTO NULLO'}`);
        
        if (!screenElementToShow) {
            console.error("GAME LOGIC: showScreen chiamata con un elemento nullo!");
            // Nascondi tutto per sicurezza o mostra un errore generico
            [storyTitleScreen, passageScreen, descriptionScreen, creditsScreen].forEach(s => {
                if (s) s.style.display = 'none'; // Controlla se s esiste prima di accedere a style
            });
            if (gameFooter) gameFooter.style.display = 'none';
            // Potresti mostrare un messaggio di errore nel body o in un div apposito
            document.body.innerHTML = "<p style='color:red; font-size:2em;'>Errore critico nel mostrare la schermata. Controllare la console.</p>";
            return;
        }

        const allScreens = [storyTitleScreen, passageScreen, descriptionScreen, creditsScreen];
        
        allScreens.forEach(screen => {
            if (screen) { // Controlla se l'elemento DOM esiste
                screen.style.display = (screen === screenElementToShow) ? 'block' : 'none';
            } else {
                console.warn("GAME LOGIC: Un elemento screen non è stato trovato durante showScreen (probabile ID errato in HTML).");
            }
        });

        if (gameFooter) {
             gameFooter.style.display = (screenElementToShow === passageScreen || screenElementToShow === descriptionScreen) ? 'block' : 'none';
        }
    }

    function initializeGame() {
        console.log("GAME LOGIC: Inizializzazione Gioco...");
        gameState = {
            currentPassageId: "StartScreen",
            variables: {},
            history: [],
            previousPassageForDescription: null,
            temporaryFlags: {}
        };
        renderPassage(gameState.currentPassageId);
    }

    function executeOnEnter(passageId) {
        const passageData = storyData[passageId];
        console.log(`GAME LOGIC: Esecuzione onEnter per: ${passageId}`);
        if (passageData && typeof passageData.onEnter === 'function') {
            const nextPassageId = passageData.onEnter(gameState);
            if (nextPassageId && typeof nextPassageId === 'string' && storyData[nextPassageId]) {
                console.log(`GAME LOGIC: onEnter di ${passageId} reindirizza a: ${nextPassageId}`);
                return nextPassageId;
            }
        }
        return passageId;
    }

    function renderPassage(passageId) {
        const effectivePassageId = executeOnEnter(passageId);

        if (effectivePassageId !== passageId) {
            // onEnter ha causato un reindirizzamento, goToPassage lo gestirà.
            // Evita il rendering del passaggio di transizione/logica.
            goToPassage(effectivePassageId);
            return;
        }
        
        console.log(`GAME LOGIC: Renderizzazione effettiva per: ${effectivePassageId}`);
        gameState.currentPassageId = effectivePassageId;
        const passageData = storyData[effectivePassageId];

        if (!passageData) {
            console.error(`ERRORE CRITICO: Passaggio non trovato in storyData: ${effectivePassageId}`);
            showScreen(passageScreen); // Mostra l'area del passaggio per l'errore
            passageTextDiv.innerHTML = `<p style="color:var(--accent-danger);">Errore: Passaggio "${effectivePassageId}" non definito!</p>`;
            passageChoicesDiv.innerHTML = '';
            return;
        }

        // Aggiorna cronologia solo per passaggi narrativi (non setup, non descrizioni, non titoli)
        if (effectivePassageId !== "AppoggiatoAlMuro_Setup" && !passageData.isDescription && !passageData.isTitleScreen && effectivePassageId !== "credits") {
            if (gameState.history.length === 0 || gameState.history[gameState.history.length - 1] !== effectivePassageId) {
                gameState.history.push(effectivePassageId);
            }
        }
        console.log("GAME LOGIC: Stato Cronologia:", JSON.stringify(gameState.history));
        console.log("GAME LOGIC: Variabili Correnti:", JSON.parse(JSON.stringify(gameState.variables)));


        let currentContent = "";
        if (typeof passageData.contentFunction === 'function') {
            currentContent = passageData.contentFunction(gameState);
        } else {
            currentContent = passageData.content || passageData.titleHTML || ""; // Usa titleHTML per StartScreen
        }

        let currentChoices = [];
        if (typeof passageData.choicesFunction === 'function') {
            currentChoices = passageData.choicesFunction(gameState);
        } else if (Array.isArray(passageData.choices)) {
            currentChoices = passageData.choices;
        }

        if (passageData.isTitleScreen) {
            console.log("GAME LOGIC: Rilevato isTitleScreen. Chiamo showScreen per storyTitleScreen.");
            showScreen(storyTitleScreen); // Passa l'elemento DOM
            
            console.log("GAME LOGIC: Contenuto per storyTitleScreen (currentContent):", currentContent);
            storyTitleScreen.innerHTML = currentContent; // Inserisce h1 e p definiti in storyData

            console.log("GAME LOGIC: Chiamata a renderChoicesToArea per storyTitleScreen con scelte:", JSON.stringify(currentChoices));
            renderChoicesToArea(currentChoices, storyTitleScreen, true); // Aggiunge il bottone "INIZIA L'INCUBO"

            // Verifica dopo l'inserimento
            if (storyTitleScreen.innerHTML.trim() === "") {
                console.warn("GAME LOGIC: storyTitleScreen.innerHTML è vuoto dopo l'assegnazione!");
            } else {
                console.log("GAME LOGIC: storyTitleScreen.innerHTML ora è:", storyTitleScreen.innerHTML.substring(0, 200) + "..."); // Logga l'inizio dell'HTML
            }
            const startButton = storyTitleScreen.querySelector('button.start-button');
            if (startButton) {
                console.log("GAME LOGIC: Bottone 'start-button' trovato in storyTitleScreen.");
            } else {
                console.warn("GAME LOGIC: ATTENZIONE! Bottone 'start-button' NON trovato in storyTitleScreen dopo renderChoicesToArea.");
            }

        } else if (passageData.isDescription) {
            showScreen(descriptionScreen);
            descriptionTextDiv.innerHTML = currentContent;
            // Le scelte per le descrizioni ora sono gestite dalla funzione getDescriptionChoices
            // e passate a renderChoicesToArea
            const descChoices = typeof passageData.choices === 'function' ? passageData.choices(gameState) : passageData.choices;
            renderChoicesToArea(descChoices, descriptionChoicesDiv);
        } else if (effectivePassageId === "credits") {
            showScreen(creditsScreen);
            creditsScreen.innerHTML = currentContent; // Inserisce il testo dei crediti
            renderChoicesToArea(currentChoices, creditsScreen, true); // Aggiunge il bottone "Gioca Ancora"
        } else { // Passaggio narrativo normale o uno che restituisce {text, choices}
            showScreen(passageScreen);
            let passageHtml = currentContent;
            let passageChoices = currentChoices;

            if (typeof passageData.contentFunction === 'function') {
                const result = passageData.contentFunction(gameState);
                if (typeof result === 'object' && result.text !== undefined && result.choices !== undefined) {
                    passageHtml = result.text;
                    passageChoices = result.choices;
                     console.log("GAME LOGIC: contentFunction ha restituito un oggetto con testo e scelte.");
                } else {
                    passageHtml = result; // Si assume che contentFunction restituisca solo HTML se non è un oggetto {text, choices}
                }
            } else {
                passageHtml = passageData.content || "";
            }
            
            passageTextDiv.innerHTML = passageHtml;
            renderChoicesToArea(passageChoices, passageChoicesDiv);
        }

        attachInlineLinkHandlers();
        // updateUndoRedoButtons(); // Da implementare
    }

    function renderChoicesToArea(choicesArray, targetAreaElement, append = false) {
        if (!append) {
            targetAreaElement.innerHTML = ''; // Pulisci l'area solo se non stiamo appendendo (es. per StartScreen)
        }
        
        if (choicesArray && choicesArray.length > 0) {
            const choicesContainer = document.createElement('div');
            if (targetAreaElement.id !== 'story-title-screen' && targetAreaElement.id !== 'credits-screen') {
                 // Per passageChoices e descriptionChoices, usiamo la classe per il gap
                choicesContainer.className = 'choices-container-flex'; // Potrebbe non essere necessario se già flex
            }


            choicesArray.forEach(choiceData => {
                if (choiceData.condition && !choiceData.condition(gameState)) {
                    return; // Salta questa scelta se la condizione non è soddisfatta
                }
                const button = document.createElement('button');
                button.className = 'choice-button'; // Classe base
                 if (choiceData.classes) {
                     button.classList.add(...choiceData.classes.split(' '));
                }
                button.textContent = choiceData.text;
                button.onclick = () => handleChoice(choiceData);
                choicesContainer.appendChild(button);
            });
            targetAreaElement.appendChild(choicesContainer); // Appendi il contenitore con tutti i bottoni
        }
    }
    
    function attachInlineLinkHandlers() {
        const allContentAreas = [passageTextDiv, descriptionTextDiv]; // Aree dove possono esserci inline-link
        allContentAreas.forEach(area => {
            area.querySelectorAll('button.inline-link').forEach(button => {
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button); // Sostituisci per evitare listener duplicati
                
                newButton.addEventListener('click', () => {
                    const targetPassageId = newButton.getAttribute('data-passage-link');
                    if (targetPassageId && storyData[targetPassageId]) {
                        console.log(`GAME LOGIC: Link inline cliccato per: ${targetPassageId}`);
                        gameState.previousPassageForDescription = gameState.currentPassageId; // Salva da dove veniamo
                        goToPassage(targetPassageId);
                    } else {
                        console.error(`GAME LOGIC: Target link inline non trovato: ${targetPassageId}`);
                    }
                });
            });
        });
    }

    function handleChoice(choiceData) {
        console.log("GAME LOGIC: Scelta gestita:", choiceData.text, "Target:", choiceData.target);
        if (typeof choiceData.action === 'function') {
            console.log("GAME LOGIC: Esecuzione azione per scelta...");
            choiceData.action(gameState);
        }
        
        let targetPassageId;
        if (typeof choiceData.target === 'function') {
            targetPassageId = choiceData.target(gameState);
        } else {
            targetPassageId = choiceData.target;
        }
        console.log("GAME LOGIC: Target ID finale per la scelta:", targetPassageId);

        if (targetPassageId && storyData[targetPassageId]) {
            // Se la scelta corrente era in una descrizione, pulisci previousPassageForDescription
            if (storyData[gameState.currentPassageId]?.isDescription) {
                gameState.previousPassageForDescription = null;
            }
            goToPassage(targetPassageId);
        } else if (targetPassageId) {
            console.error(`ERRORE: Target della scelta "${choiceData.text}" non trovato in storyData: ${targetPassageId}`);
            passageTextDiv.innerHTML += `<p style="color:var(--accent-danger);">Errore di navigazione: destinazione scelta "${targetPassageId}" non trovata!</p>`;
        } else {
            // Se non c'è target (es. una scelta che modifica solo variabili o un bottone "torna indietro" da una descrizione che usa previousPassageForDescription)
            const currentPassageData = storyData[gameState.currentPassageId];
            if (currentPassageData?.isDescription && gameState.previousPassageForDescription) {
                const returnTarget = gameState.previousPassageForDescription;
                gameState.previousPassageForDescription = null; // Pulisci per il prossimo uso
                goToPassage(returnTarget);
            } else {
                 console.warn("GAME LOGIC: Scelta senza target valido. Ri-renderizzo passaggio corrente:", gameState.currentPassageId);
                 renderPassage(gameState.currentPassageId); // Ricarica il passaggio corrente per riflettere eventuali cambi di stato
            }
        }
    }

    function goToPassage(passageId) {
        console.log(`GAME LOGIC: Navigazione verso: ${passageId}`);
        renderPassage(passageId); // renderPassage ora chiama executeOnEnter e gestisce la history
        window.scrollTo(0, 0);
    }

    // Inizializza il gioco
    initializeGame();
});