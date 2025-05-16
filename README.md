**PRESENTAZIONE PUBBLICA DI "CORRIDOR 2193: LAST RUN"**

**ITALIANO:**

**Corridor 2193: Last Run - Un Thriller Interattivo Sci-Fi**

Immergiti nell'atmosfera cupa e disperata di **Corridor 2193: Last Run**, un'avventura testuale interattiva che ti getterà nel cuore di una guerra futuristica brutale. Sviluppato con le moderne tecnologie web (HTML, CSS e JavaScript puro), questo progetto nasce da un racconto originale intitolato "La Fuga" dell'autore Simone Pizzi, e trae profonda ispirazione dall'azione frenetica e dalle ambientazioni claustrofobiche dei classici sparatutto in prima persona degli anni '90, come l'iconico Doom.

**L'anno è il 2193.** Nei panni di Alpha-7, un soldato d'élite rimasto isolato dietro le linee nemiche, la tua unica missione è sopravvivere e trovare una via di fuga. Ogni tua scelta avrà un peso determinante: ti troverai a navigare corridoi metallici intrisi di pericolo, a gestire risorse sempre più scarse e ad affrontare non solo mostruosità biomeccaniche e soldati potenziati, ma anche i tuoi demoni interiori, la paura e il dubbio che attanagliano la mente di un sopravvissuto.

Ad accompagnarti in questa disperata corsa contro il tempo ci sarà "Echo", una voce enigmatica alla radio, il tuo unico contatto con il mondo esterno. Sarà una guida tattica, un flebile barlume di speranza, o forse l'ultimo suono amico che sentirai prima che il silenzio diventi definitivo?

**Corridor 2193: Last Run** mira a offrire una narrazione profonda e coinvolgente, dove le decisioni del giocatore plasmano attivamente il destino del protagonista, portando a molteplici percorsi e finali. L'intenzione dell'autore, Simone Pizzi, è quella di esplorare temi come la sopravvivenza, il costo psicologico della guerra e la natura dell'umanità in circostanze estreme, il tutto avvolto in un'estetica retrò-futuristica che omaggia i capisaldi del genere videoludico.

Preparati a fare scelte difficili. Preparati a fuggire. Preparati per **Corridor 2193: Last Run**.

*(Questa versione è [v0.01], una prima build pubblica che introduce le meccaniche di base e l'inizio della storia. Il progetto è in continua evoluzione.)*

---

**INGLESE:**

**Corridor 2193: Last Run - An Interactive Sci-Fi Thriller**

Immerse yourself in the grim and desperate atmosphere of **Corridor 2193: Last Run**, an interactive text adventure that throws you into the heart of a brutal futuristic war. Developed with modern web technologies (pure HTML, CSS, and JavaScript), this project stems from an original short story titled "La Fuga" by author Simone Pizzi, and draws deep inspiration from the frantic action and claustrophobic environments of classic 1990s first-person shooters, like the iconic Doom.

**The year is 2193.** As Alpha-7, an elite soldier stranded deep behind enemy lines, your sole mission is to survive and find a way out. Every choice you make will carry significant weight: you'll navigate treacherous metallic corridors सफलता된 with danger, manage dwindling resources, and confront not only bio-mechanical monstrosities and augmented enemy soldiers but also your own inner demons—the fear and doubt that plague a survivor's mind.

Accompanying you on this desperate race against time is "Echo," an enigmatic voice on the comms, your only contact with the outside world. Will they be a tactical guide, a faint glimmer of hope, or perhaps the last friendly sound you hear before the silence becomes permanent?

**Corridor 2193: Last Run** aims to deliver a deep and engaging narrative where player decisions actively shape the protagonist's destiny, leading to multiple branching paths and endings. The author's, Simone Pizzi, intention is to explore themes such as survival, the psychological toll of war, and the nature of humanity under extreme circumstances, all wrapped in a retro-futuristic aesthetic that pays homage to a golden era of gaming.

Prepare to make tough choices. Prepare to run. Prepare for **Corridor 2193: Last Run**.

*(This version is [v0.01], an early public build introducing core mechanics and the story's beginning. The project is under active development.)*

---

**Note:**
*   Ho inserito un riferimento alla versione attuale (`[v0.01]`) che puoi aggiornare man mano.
*   Ho cercato di mantenere il tono e le intenzioni che hai espresso.
*   Fammi sapere se vuoi modificare o aggiungere qualcosa a queste presentazioni!

*LOG 16/05/2025*
----------------------------------------------------
LOG DI SVILUPPO - Corridor 2193: Last Run - v0.01
----------------------------------------------------

Versione: 0.01
Data: [Data Corrente]

Obiettivo di questa versione:
Stabilire le fondamenta del gioco con un motore JavaScript personalizzato, implementare la schermata iniziale, i primi passaggi narrativi, l'introduzione del contatto radio "Echo", e la gestione base delle scelte e delle variabili di stato.

Funzionalità Implementate in v0.01:

1.  **Struttura di Gioco Base (HTML/CSS/JS):**
    *   Il gioco ora opera come un'applicazione web autonoma, senza dipendenze dal motore Twine/Harlowe per l'esecuzione.
    *   File separati per HTML (struttura), CSS (stile) e JavaScript (logica di gioco e dati della storia).

2.  **Motore di Gioco Personalizzato (game-logic.js - Iniziale):**
    *   Gestione del caricamento e della visualizzazione dei passaggi definiti in `story-data.js`.
    *   Sistema per presentare scelte testuali al giocatore e navigare tra i passaggi in base alla selezione.
    *   Inizializzazione e tracciamento di base delle variabili di stato del giocatore (es. `echoPresente`, `echoRapporto`, `protagonistaStress`, `adrenalinaSinteticaUsata`).
    *   Implementazione di funzioni `onEnter` per i passaggi, che permettono di eseguire logica JavaScript all'entrata in un passaggio (es. modificare variabili, reindirizzare).
    *   Implementazione di `contentFunction` e `choicesFunction` per alcuni passaggi, permettendo al testo e alle scelte di variare dinamicamente in base allo stato del gioco.
    *   Sistema di cronologia di base (`gameState.history`) per tracciare i passaggi narrativi visitati.

3.  **Contenuto Narrativo Iniziale (story-data.js):**
    *   **Schermata Iniziale:** Implementata una schermata del titolo con il nome del gioco e un pulsante "Inizia".
    *   **Passaggio di Setup:** Un passaggio invisibile (`AppoggiatoAlMuro_Setup`) che inizializza le variabili di gioco.
    *   **Primi Passaggi della Storia:** Adattati i primi passaggi della storia originale ("Appoggiato al Muro", scelte sull'adrenalina) al nuovo sistema.
    *   **Introduzione di "Echo":** Il contatto radio Echo viene introdotto nei primi passaggi, con dialoghi iniziali e la possibilità per il giocatore di rispondere o ignorare, influenzando la variabile `$echoRapporto`.
    *   **Link Descrittivi:** I link ai passaggi descrittivi originali (es. `desc_muro`, `desc_guerra`) sono stati implementati come bottoni inline. Cliccandoli si visualizza la descrizione e un bottone "Smetti di osservare" riporta al passaggio precedente.

4.  **Stile Visivo (style.css - Iniziale):**
    *   Applicata una palette di colori "Doom-like" con alto contrasto (sfondi scuri, testo chiaro, accenti rossi/tech).
    *   Definiti font per i titoli e per il corpo del testo.
    *   Stilizzata la schermata iniziale, l'area di visualizzazione dei passaggi e i bottoni delle scelte.
    *   Creato uno stile distintivo per le comunicazioni di "Echo".
    *   Creato uno stile per i passaggi descrittivi.

Cosa Aspettarsi Giocando v0.01:
*   È possibile avviare il gioco dalla schermata del titolo.
*   Si può progredire attraverso i primi bivi narrativi relativi all'adrenalina e all'interazione con Echo.
*   Le variabili di stato vengono modificate in base alle scelte.
*   I link descrittivi sono funzionanti.
*   Molti percorsi narrativi successivi sono ancora placeholder (es. "ProntoAllAzione_Placeholder", "DiagnosiArmatura_Placeholder") e la storia si interromperà o non avrà un contenuto completo in quei punti.
*   Non ci sono ancora meccaniche di inventario, puzzle complessi, o un sistema di combattimento avanzato.
*   La funzione "Annulla" non è ancora implementata.

Problemi Noti / Aree da Sviluppare Successivamente:
*   Completare l'integrazione di tutti i passaggi e i finali della storia originale.
*   Espandere i percorsi narrativi con le nuove idee (es. fuga nel condotto, scelte tattiche più complesse).
*   Implementare monologhi interiori più frequenti per il protagonista.
*   Sviluppare ulteriormente la relazione e i dialoghi con Echo.
*   Introdurre elementi di inventario e puzzle ambientali.
*   Rifinire e testare a fondo tutta la logica delle variabili e delle condizioni.
*   Implementare la funzione "Annulla".

Grazie per il test!

**LOG PER SVILUPPATORI**

----------------------------------------------------
DEVELOPER LOG - Corridor 2193: Last Run - v0.01
----------------------------------------------------

Versione: 0.01
Data: [Data Corrente]
Branch/Commit (se applicabile): Iniziale

Panoramica Modifiche Architetturali:
*   Transizione da un output basato su Twine/Harlowe a una struttura "Vanilla JS" con file HTML, CSS, e JS separati.
*   Eliminazione della dipendenza dal file `engine-harlowe.js` (motore Harlowe).
*   Creazione di un motore di gioco custom minimale in `game-logic.js`.
*   Definizione della struttura dati della storia in `story-data.js` come un oggetto JavaScript, con passaggi definiti da ID, contenuto HTML/testuale, e array/funzioni per le scelte.

Dettagli Implementazione `game-logic.js` (v0.1):
*   **`gameState` Object:**
    *   `currentPassageId`: Stringa, traccia l'ID del passaggio attivo.
    *   `variables`: Oggetto {}, conterrà tutte le variabili dinamiche del gioco (es. `gameState.variables.echoPresente`).
    *   `history`: Array [], traccia gli ID dei passaggi *narrativi* per la navigazione e potenziale funzione "undo". Esclude passaggi di setup e descrittivi.
    *   `previousPassageForDescription`: Stringa, usata per memorizzare da quale passaggio si è arrivati a una descrizione, per permettere il corretto ritorno.

*   **Funzione `initializeGame()`:**
    *   Resetta/inizializza `gameState`.
    *   Imposta `currentPassageId` a "StartScreen".
    *   Chiama `renderPassage()` per avviare il gioco.

*   **Funzione `executeOnEnter(passageId)`:**
    *   Controlla se il `passageData[passageId]` ha una funzione `onEnter`.
    *   Se sì, la esegue passando `gameState`.
    *   Se `onEnter` restituisce un `string` (ID di un altro passaggio), tale ID viene restituito per un reindirizzamento immediato (gestito da `renderPassage` o `goToPassage`). Utile per passaggi di pura logica come `AppoggiatoAlMuro_Setup`.

*   **Funzione `renderPassage(passageIdToRender)`:**
    *   Flusso principale:
        1.  Chiama `executeOnEnter(passageIdToRender)` per ottenere l'`effectivePassageId`.
        2.  Se `effectivePassageId` è diverso da `passageIdToRender` (cioè `onEnter` ha causato un reindirizzamento), chiama `goToPassage(effectivePassageId)` e interrompe il rendering corrente.
        3.  Altrimenti, imposta `gameState.currentPassageId = effectivePassageId`.
        4.  Recupera `passageData` da `storyData`. Gestisce errore se non trovato.
        5.  Aggiorna `gameState.history` (escludendo setup, descrizioni, titoli, crediti).
        6.  Logga stato cronologia e variabili.
        7.  Determina `currentContent` (da `contentFunction` o `content`/`titleHTML`).
        8.  Determina `currentChoices` (da `choicesFunction` o `choices`).
        9.  Usa `showScreen(screenId)` per visualizzare l'area corretta (`storyTitleScreen`, `passageScreen`, `descriptionScreen`, `creditsScreen`) e nascondere le altre.
        10. Popola l'innerHTML dell'area testo appropriata (`storyTitleArea`, `passageTextDiv`, `descriptionTextDiv`, `creditsScreen`).
        11. Chiama `renderChoicesToArea()` per popolare l'area scelte appropriata.
        12. Chiama `attachInlineLinkHandlers()` per (ri)attaccare i listener ai bottoni descrittivi.

*   **Funzione `showScreen(screenToShowId)`:**
    *   Itera su un oggetto `screens` che mappa chiavi a elementi DOM.
    *   Imposta `display: 'block'` per `screens[key].id === screenToShowId` e `'none'` per gli altri.
    *   Gestisce la visibilità di `gameFooter`.

*   **Funzione `attachInlineLinkHandlers()`:**
    *   Seleziona tutti i `button.inline-link` all'interno delle aree di contenuto testuale.
    *   Clona e sostituisce ogni bottone per evitare listener duplicati su ri-renderizzazioni.
    *   Aggiunge un `click` listener che recupera `data-passage-link`, imposta `gameState.previousPassageForDescription`, e chiama `goToPassage()`.

*   **Funzione `renderChoicesToArea(choicesArray, targetAreaElement, append = false)`:**
    *   Pulisce `targetAreaElement.innerHTML` se `append` è falso.
    *   Itera su `choicesArray`.
    *   Se una scelta ha una proprietà `condition` (funzione), la valuta. Se `false`, salta la scelta.
    *   Crea un elemento `<button class="choice-button">`.
    *   Aggiunge classi extra se specificate in `choiceData.classes`.
    *   Imposta `textContent` e `onclick` (che chiama `handleChoice`).
    *   Appende il bottone a un `choicesContainer` temporaneo, poi appende il container all' `targetAreaElement`.

*   **Funzione `handleChoice(choiceData)`:**
    *   Esegue `choiceData.action(gameState)` se presente.
    *   Determina `targetPassageId` (da `choiceData.target` stringa o funzione).
    *   Se `targetPassageId` è valido e presente in `storyData`:
        *   Se il passaggio corrente era una descrizione, pulisce `gameState.previousPassageForDescription`.
        *   Chiama `goToPassage(targetPassageId)`.
    *   Se `targetPassageId` non è valido ma il passaggio corrente era una descrizione e `gameState.previousPassageForDescription` è impostato, torna a quel passaggio.
    *   Altrimenti, logga un avviso e ri-renderizza il passaggio corrente (per scelte che modificano solo variabili).

*   **Funzione `goToPassage(passageId)`:**
    *   Logga la navigazione.
    *   Chiama `renderPassage(passageId)`.
    *   Scrolla la finestra in cima.

Dettagli Implementazione `story-data.js` (v0.1):
*   `storyData` è un oggetto letterale che mappa ID di passaggio a oggetti.
*   **Struttura Oggetto Passaggio:**
    *   `isTitleScreen` (Boolean, opzionale): Per la schermata del titolo.
    *   `isDescription` (Boolean, opzionale): Per i passaggi descrittivi.
    *   `isCreditsScreen` (Boolean, opzionale): Per la schermata dei crediti.
    *   `content` (Stringa HTML, opzionale): Contenuto statico del passaggio.
    *   `titleHTML` (Stringa HTML, opzionale): Usato da `StartScreen` per il suo contenuto specifico.
    *   `contentFunction(gs)` (Funzione, opzionale): Restituisce stringa HTML o `{ text: "html", choices: [] }`. Permette contenuto dinamico.
    *   `choices` (Array, opzionale): Array di oggetti scelta statici.
    *   `choicesFunction(gs)` (Funzione, opzionale): Restituisce array di oggetti scelta. Permette scelte dinamiche.
    *   `onEnter(gs)` (Funzione, opzionale): Eseguita all'entrata. Può modificare `gs.variables` e/o restituire un ID di passaggio per reindirizzare.
*   **Struttura Oggetto Scelta:**
    *   `text` (Stringa): Testo del bottone.
    *   `target` (Stringa o Funzione): ID del passaggio destinazione o funzione che restituisce l'ID.
    *   `classes` (Stringa, opzionale): Classi CSS extra per il bottone.
    *   `action(gs)` (Funzione, opzionale): Eseguita al click, prima della navigazione.
    *   `condition(gs)` (Funzione, opzionale): Se restituisce `false`, la scelta non viene mostrata.
*   **`getDescriptionChoices(gs)`:** Funzione helper per generare dinamicamente la scelta "Torna indietro" per i passaggi descrittivi, utilizzando `gameState.previousPassageForDescription` o la cronologia.

Variabili Globali di Gioco Introdotte (`gameState.variables`):
*   `echoPresente`: Boolean
*   `echoRapporto`: Number (0-5)
*   `protagonistaStress`: Number (0-10)
*   `adrenalinaSinteticaUsata`: Number
*   `medikitExtra`, `codiceAccessoArmeria`, `granataEmp`: Boolean (per ora `false`)
*   `porta_laterale_notata`: Boolean (introdotta in questa fase)
*   `ultimo_missile_usato`: Boolean (introdotta in questa fase)
*   `nemiciAllertatiCondotto`: Boolean (per la logica del condotto)

Punti Critici o da Attenzionare per Sviluppi Futuri:
*   La gestione della cronologia (`gameState.history`) attualmente non esclude i passaggi descrittivi in modo perfetto se si naviga da descrizione a descrizione; questo dovrà essere raffinato se si implementa una funzione "undo" robusta. (Nota: La logica è stata leggermente migliorata per cercare l'ultimo passaggio *non* descrittivo.)
*   La funzione `renderChoicesToArea` e la gestione del ritorno di `{text, choices}` da `contentFunction` in `Sparare_Imboscata` sono una prima implementazione e potrebbero necessitare di raffinamenti.
*   Molti passaggi sono ancora placeholder e contengono solo il testo originale senza la nuova logica/interazioni.
*   Manca l'implementazione completa dei contenuti per i percorsi del condotto, e per i rami che partono da "Vendetta" e "ProseguendoLaFuga" dopo l'attacco al drone.

Test Eseguiti (Manuali, basati sui log della console e sulla navigazione):
*   Flusso dalla schermata iniziale fino al bivio dopo "Scappare" verificato.
*   Variabili di stato iniziali (`echoRapporto`, `protagonistaStress`, `adrenalinaSinteticaUsata`) sembrano aggiornarsi correttamente in base alle prime scelte.
*   Navigazione ai passaggi descrittivi e ritorno al passaggio precedente sembra funzionare.
*   Il nuovo passaggio `desc_adren_dipendenza` è accessibile.
*   I passaggi `ProntoAllAzione` e `DiagnosiArmatura` ora usano il contenuto originale (parzialmente integrato con nuova logica).
*   Implementati i passaggi `SecondaParte`, `Scappare`, `Seduto_Finale_Considera`, `FugaNelCondotto_Entrata`, `ForzaGrataCondotto`, `CercaPannelloCondotto`, `DentroIlCondotto` con la loro logica di base e testo.
*   Integrato il contenuto per `SparareAllImpazzata`, `MuoversiSilenziosamente`, `Seduto`, `Vendetta`, `ProseguendoLaFuga`, `Ritirarsi_Imboscata`, `Sparare_Imboscata`.

Prossimi Passi Previsti:
*   Completare il contenuto dei passaggi placeholder (es. `ProntoAllAzione`, `DiagnosiArmatura`, percorsi del condotto, ecc.).
*   Integrare più a fondo i monologhi interiori e le interazioni con Echo.
*   Definire e implementare l'uso degli oggetti (`medikitExtra`, `granataEmp`, `codice_accesso_armeria`).
*   Progettare e implementare il puzzle ambientale.
*   Sviluppare i finali alternativi.