const storyData = {
    "StartScreen": {
        isTitleScreen: true,
        content: `
            <h1 class="story-title">Corridor 2193: Last Run</h1>
            <p class="story-subtitle">Un racconto interattivo sci-fi di Simone Pizzi.<br/>Ispirato ai classici FPS degli anni '90.</p>
        `,
        choices: [
            { text: "INIZIA L'INCUBO", target: "AppoggiatoAlMuro_Setup", classes: "start-button" }
        ]
    },
    "AppoggiatoAlMuro_Setup": {
        onEnter: function(gs) {
            gs.variables = { // Resetta le variabili all'inizio di un nuovo gioco
                echoPresente: false,
                echoRapporto: 2,
                protagonistaStress: 3,
                adrenalinaSinteticaUsata: 0,
                medikitExtra: false,
                codiceAccessoArmeria: false,
                granataEmp: false
            };
            gs.history = []; // Inizia cronologia pulita
            console.log("Variabili inizializzate:", JSON.parse(JSON.stringify(gs.variables)));
            return "AppoggiatoAlMuro"; // Ritorna l'ID del prossimo passaggio da visualizzare
        },
        content: "", // Passaggio puramente logico
        choices: []
    },
    "AppoggiatoAlMuro": {
        content: `
            <p>APPOGGIATO al <button type="button" class="inline-link" data-passage-link="desc_muro">muro</button>, nascosto nell'ombra e coperto da un elevatore pesante, si prese un istante per respirare e per calmarsi. Intorno a se l'odore di questa <button type="button" class="inline-link" data-passage-link="desc_guerra">guerra</button> che sperava di poter dimenticare per un istante. L'adrenalina in battaglia era importante come l'acqua nel deserto, ma ne andava ponderato l'uso.</p>
            <div class="echo-communication">Qui Echo. Rilevo i tuoi parametri vitali... sei ancora intero, soldato. Rapporto situazione.</div>
            <p>Era il contatto radio standard per le operazioni in solitaria. Una formalità, spesso inutile, a volte l'unica compagnia prima della fine.</p>
        `,
        choices: [
            { text: "Ignora la comunicazione e concentrati sulla sopravvivenza", target: "AppoggiatoAlMuro_DecisioneAdrenalina" },
            { text: "\"Echo, sono nell'hangar di stoccaggio principale. Pressato, ma per ora al sicuro.\" (Rispondi alla radio)", target: "AppoggiatoAlMuro_RispostaAEcho" }
        ]
    },
    "AppoggiatoAlMuro_RispostaAEcho": {
        onEnter: function(gs) {
            gs.variables.echoPresente = true;
            gs.variables.echoRapporto = Math.min(5, (gs.variables.echoRapporto || 0) + 1);
        },
        content: `
            <div class="echo-communication">Ricevuto. L'hangar principale è un labirinto, ma anche una trappola. Le scansioni a lungo raggio sono disturbate, ma rilevo attività nemica in aumento nella tua zona. Suggerisco prudenza.</div>
            <p>Il suo tono era professionale, ma c'era una nota di... qualcosa. Forse solo la stanchezza di un'altra giornata di guerra.</p>
            <hr>
            <p>L'adrenalina era una componente fondamentale della sua vita e ne era assuefatto. Si sentiva perso se non poteva ricorrere ad essa, non poteva sopravvivere in una situazione impossibile come quella. Eppure ne era uscito vivo tante di quelle volte che oramai non sentiva più l'emozione della paura ne il piacere della morte.</p>
        `,
        choices: [
            { text: "Ricorrere all'adrenalina in modo artificiale", target: "LAdrenalinaScorreva" },
            { text: "Cercare di resistere alla bruciante tentazione di prenderne ancora", target: "IlRespiroEMenoRegolare" }
        ]
    },
    "AppoggiatoAlMuro_DecisioneAdrenalina": {
        onEnter: function(gs) {
            if (!gs.variables.echoPresente) { // Se non ha mai risposto
                gs.variables.echoPresente = true; // Ora Echo è consapevole che è vivo ma non collaborativo
                gs.variables.echoRapporto = Math.max(0, (gs.variables.echoRapporto || 2) - 1);
                gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
            } else { // Se ha risposto prima e ora ignora
                 gs.variables.echoRapporto = Math.max(0, (gs.variables.echoRapporto || 0) - 1);
            }
        },
        contentFunction: function(gs) {
            let html = "";
            if (gs.variables.echoRapporto < 2) {
                html += `<div class="echo-communication">Nessuna risposta? Soldato, un minimo di protocollo è richiesto anche in situazioni critiche. Oltre che una questione di cortesia. Procedi a tuo rischio.</div>`;
            }
            html += `
                <p>Il silenzio radio autoimposto era quasi più inquietante della voce. Si sentiva ancora più solo.</p>
                <p>L'adrenalina era una componente fondamentale della sua vita e ne era assuefatto. Si sentiva perso se non poteva ricorrere ad essa, non poteva sopravvivere in una situazione impossibile come quella. Eppure ne era uscito vivo tante di quelle volte che oramai non sentiva più l'emozione della paura ne il piacere della morte.</p>
            `;
            return html;
        },
        choices: [
            { text: "Ricorrere all'adrenalina in modo artificiale", target: "LAdrenalinaScorreva" },
            { text: "Cercare di resistere alla bruciante tentazione di prenderne ancora", target: "IlRespiroEMenoRegolare" }
        ]
    },
    "LAdrenalinaScorreva": {
        onEnter: function(gs) {
            gs.variables.adrenalinaSinteticaUsata = (gs.variables.adrenalinaSinteticaUsata || 0) + 1;
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        contentFunction: function(gs) {
            let echoMsg = "";
            if (gs.variables.echoPresente) {
                if (gs.variables.echoRapporto > 1) {
                    echoMsg = `<div class="echo-communication">Attento con quella roba, Alpha-7. Ti tiene vivo, ma ti consuma. Ho visto troppi soldati bruciarsi così, finire come gusci vuoti o peggio.</div>`;
                } else {
                    echoMsg = `<div class="echo-communication">Echo a Alpha-7. Rilevo picchi di adrenalina sintetica. Stai bene? Modera l'uso, se possibile.</div>`;
                }
            }
            return `
                <p>Infatti fu così. Una scarica brutale, quasi dolorosa, ma efficace. I sensi si acuirono, il mondo rallentò, i suoni distanti si fecero più nitidi, il sangue pompava con un ritmo controllato ma potente.</p>
                <p>Ora, nascosto, lui e la sua fondamentale ed irrinunciabile compagna <button type="button" class="inline-link" data-passage-link="desc_adren">adrenalina</button> (o forse era meglio dire la sua <button type="button" class="inline-link" data-passage-link="desc_adren_dipendenza">dipendenza</button>), appoggiato a quel muro e ben nascosto dalla luce, cercò di concentrarsi nuovamente. Aveva esagerato con l'adrenalina sintetica.</p>
                ${echoMsg}
                <p>Doveva cercare di ricompensare il flusso di <button type="button" class="inline-link" data-passage-link="desc_cervel">sangue al cervello</button> (o era meglio definirlo un fiume in piena che minacciava di rompere gli argini dell'autocontrollo?), stava perdendo la lucidità e la concentrazione. Non voleva finire morto, non più, e non voleva essere fatto <button type="button" class="inline-link" data-passage-link="desc_prigione">prigioniero</button> - non dopo quello che aveva visto.</p>
            `;
        },
        choicesFunction: function(gs) {
            const choices = [];
            if (gs.variables.echoPresente && gs.variables.echoRapporto > 2 && gs.variables.adrenalinaSinteticaUsata < 3) {
                choices.push({ text: "Chiedi a Echo un parere tattico", target: "ChiediParereEcho_PostAdrenalina" });
            }
            choices.push({ text: "Proseguire dritto verso l'uscita nota, sperando che la via sia ancora libera.", target: "ProntoAllAzione" });
            choices.push({ text: "Fermarsi a controllare lo stato dell'armatura e le proprie ferite.", target: "DiagnosiArmatura" });
            return choices;
        }
    },
    "IlRespiroEMenoRegolare": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2);
        },
        contentFunction: function(gs) {
            let echoMsg = "";
            let stressPensiero = "";
            if (gs.variables.echoPresente) {
                if (gs.variables.echoRapporto > 0) {
                    echoMsg = `<div class="echo-communication">Soldato? Tutto ok? I tuoi parametri sono irregolari. Se non ti dai una mossa, o non ti stabilizzi con un medkit o della sintetica, finirai male. Non fare l'eroe morente.</div>`;
                    if (gs.variables.protagonistaStress >= 5) {
                        gs.variables.protagonistaStress = Math.min(10, gs.variables.protagonistaStress + 1);
                    }
                } else {
                    echoMsg = `<div class="echo-communication">Rilevo parametri vitali instabili. Azione consigliata: stabilizzazione immediata o somministrazione di stimolanti.</div>`;
                }
            }
            if (gs.variables.protagonistaStress > 6) {
                stressPensiero = "<p><em>Un pensiero lo attraversò, amaro come fiele: 'Facile parlare per te, Echo. Non sei tu quello con le budella attorcigliate dalla paura e dalla carenza di sostanze che ti tengono in piedi mentre il mondo ti crolla addosso.'</em></p>";
            }
            return `
                <p>Non lo sapeva nemmeno lui cosa gli fosse venuto in mente. Perché quella decisione? Sentiva probabilmente gli effetti dell'abuso, un vuoto gelido dove prima c'era il fuoco chimico. Il respiro affannoso non era solo per lo sforzo precedente; era il suo corpo che urlava per la sostanza a cui era assuefatto. Non stava più tanto bene. Sapeva che esagerando, o privandosene troppo a lungo, qualche parte di lui sarebbe esplosa, o implosa, per l'eccesso di corroboranti usati o per la loro improvvisa mancanza. Ma il vero problema fu proprio l'aver deciso in quel momento, in quel frangente.</p>
                <p>Dopo qualche secondo, prima di decidere di dare un'occhiata alla diagnostica della sua armatura, sentì di non avere la forza necessaria nemmeno per elaborare un pensiero complesso, figuriamoci muovere un muscolo. Il mondo intorno a lui sembrava ovattato, distante, i suoni attutiti come se fosse sott'acqua.</p>
                ${echoMsg}
                ${stressPensiero}
                <p>Si sentì sciocco, ingenuo, quasi infantile quando, ritornando sui suoi passi, sentendo nuovamente dentro di se il richiamo prepotente, la necessità quasi fisica di quella scarica.</p>
            `;
        },
        choicesFunction: function(gs) {
            const choices = [];
            choices.push({ text: "Cedi e prendi l'adrenalina sintetica.", target: "LAdrenalinaScorreva" });
            if ((gs.variables.protagonistaStress || 0) < 8) {
                 choices.push({ text: "Prova a resistere ancora un po', controlla l'armatura.", target: "DiagnosiArmatura_Debole" });
            } else {
                 choices.push({ text: "Sei troppo debole per resistere, prendi l'adrenalina e poi controlla l'armatura.", target: "LAdrenalinaScorreva_PoiDiagnosi" });
            }
            return choices;
        }
    },
    "ChiediParereEcho_PostAdrenalina": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) - 1);
        },
        content: `
            <p>"Echo, che ne pensi? Meglio muoversi o controllare l'equipaggiamento?" chiese, la voce leggermente alterata dal surplus chimico, un ronzio persistente nelle orecchie.</p>
            <p>Una breve pausa, carica di statica, poi la risposta filtrata:</p>
            <div class="echo-communication">L'adrenalina sintetica può mascherare danni critici, Alpha-7. Un controllo rapido potrebbe salvarti la vita, specialmente se hai incassato colpi di cui non ti sei reso conto. Ricorda il protocollo: autovalutazione post-stimolazione. Ma...</div>
            <p>Un altro crepitio, più lungo.</p>
            <div class="echo-communication">...se sono troppo vicini, ogni secondo perso a giocherellare con la diagnostica è un invito a una tomba prematura. Dipende da quanto rumore hai sentito e da quanto ti fidi della tua fortuna. Oppure, da quanto ti fidi di me per tenerti aggiornato sulla loro prossimità. A te la scelta.</div>
        `,
        choices: [
            { text: "Fidati di Echo e della procedura, controlla l'armatura.", target: "DiagnosiArmatura" },
            { text: "Ignora il consiglio, muoviti subito. La fortuna aiuta gli audaci.", target: "ProntoAllAzione" }
        ]
    },
    "desc_adren_dipendenza": {
        isDescription: true,
        content: `<div class="description-passage"><p>Dipendenza. Una parola sgradevole, ma onesta. Quella sostanza non era più solo uno strumento, era diventata una stampella, una necessità viscerale. Senza di essa, il mondo diventava un incubo sfuocato, i pensieri lenti, i muscoli traditori. Con essa, era un dio della guerra temporaneo, ma ogni dose scavava un po' più a fondo il vuoto che avrebbe lasciato.</p></div>`
        // Le scelte verranno aggiunte dinamicamente da game-logic.js
    },
    "DiagnosiArmatura_Debole": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        contentFunction: function(gs) {
            let echoMsg = "";
            if (gs.variables.echoPresente && gs.variables.echoRapporto > 1) {
                echoMsg = `<div class="echo-communication">Scelta coraggiosa, Alpha-7. O testarda. Speriamo sia quella giusta. Esegui la diagnostica rapidamente.</div>`;
            }
            return `
                <p>Con uno sforzo di volontà che gli costò ogni fibra del suo essere, ignorò l'impulso di iniettarsi un'altra dose. 'Resisti... resisti, maledizione!'</p>
                <p>Il tremore alle mani rendeva difficile attivare la diagnostica dell'armatura. Ogni secondo sembrava un'eternità. La sua mente era annebbiata, i pensieri frammentati.</p>
                ${echoMsg}
                <p>Finalmente, le luci diagnostiche si accesero sul suo HUD...</p>
                <p><em>(Qui verrà inserito il testo aggiornato di "DiagnosiArmatura", adattato per riflettere la debolezza e i potenziali errori del protagonista dovuti al suo stato.)</em></p>
                <p>L'armatura, quanto di più protettivo il genio umano dedicato alla morte poteva inventare. Un misto perfetto di <button type="button" class="inline-link" data-passage-link="desc_dotazione">tecnologia, armamento e resistenza</button>...</p>
            `;
        },
        choices: [
            { text: "(Procedi con la diagnosi in stato di debolezza)", target: "DiagnosiArmatura" }
        ]
    },
    "LAdrenalinaScorreva_PoiDiagnosi": { // Nuovo passaggio per chi è troppo debole per resistere
        onEnter: function(gs) {
            gs.variables.adrenalinaSinteticaUsata = (gs.variables.adrenalinaSinteticaUsata || 0) + 1;
            // Lo stress potrebbe diminuire leggermente grazie all'adrenalina, ma non troppo
            gs.variables.protagonistaStress = Math.max(3, (gs.variables.protagonistaStress || 0) - 2);
        },
        content: `
            <p>Il corpo ha avuto la meglio. Con mano tremante, ti inietti un'altra dose di adrenalina sintetica. La scarica ti riporta al mondo, anche se con una sgradevole sensazione di artificialità.</p>
            <p>'Al diavolo la resistenza,' pensi. 'Vivo oggi, morto domani. Ma oggi, vivo.'</p>
            <p>Ora, con i nervi un po' più saldi, ti concentri sulla diagnostica dell'armatura.</p>
        `,
        choices: [
            { text: "Controlla l'armatura", target: "DiagnosiArmatura" }
        ]
    },

    // ----- PASSAGGI DESCRITTIVI ORIGINALI ADATTATI -----
    "desc_muro": {
        isDescription: true,
        content: `<div class="description-passage"><p>Il muro era come una piccola fotografia arrugginita, scrostata, metallica e deformata di quel luogo, di quell'incubo assurdo nel quale ora si trovava a cercare di sopravvivere da solo.</p></div>`
    },
    "desc_guerra": {
        isDescription: true,
        content: `<div class="description-passage"><p>Quando aveva iniziato quella guerra sapeva perfettamente che prima o poi sarebbe morto. La riteneva assurda e, con il passare del tempo, vedendo tutti i suoi compagni cadere in battaglia, cominciò a sperare di essere ucciso quanto prima, non solo per farla finita con quella storia, quanto per l'atrocità delle morti, la mostruosità delle battaglie e la malvagità del nemico. Ma tutti loro erano stati addestrati per quello e prima o poi, si convinse, ci avrebbe fatto l'abitudine e non sarebbe più rimasto scottato dalla brutalità e dal sistematico compimento di atrocità indicibili.</p></div>`
    },
    "desc_adren": {
        isDescription: true,
        content: `<div class="description-passage"><p>L'adrenalina gli permetteva di correre e di avere i riflessi prontissimi, sentiva la frenesia e l'istinto scorrere nelle sue vene come un fuoco e che faceva sparire la paura, aumentando l'odio.</p></div>`
    },
    "desc_cervel": {
        isDescription: true,
        content: `<div class="description-passage"><p>Tamburi, feroci tamburi nella sua testa. Sapore di ferro nella bocca. La gola era come un cuore che impazziva e pulsava ferocemente. Questo era pericoloso. Era ora di regolarizzare per non perdere il controllo, per non fare qualche azione avventata, fomentata da quello stato di iper eccitazione e paura.</p></div>`
    },
    "desc_prigione": {
        isDescription: true,
        content: `<div class="description-passage"><p>Proprio quella mattina aveva fatto un assalto nelle prigioni e dopo aver ammazzato tutti quei bastardi, disattivò i campi di forza che relegavano in cella i prigionieri. Quando i passaggi furono accessibili e i raggi di detenzione spenti, poté vedere chiaramente quello che esisteva all'interno delle celle. Uomini inchiodati, sangue sulle pareti in una quantità che sembrava impossibile e prigionieri che si straziavano dal dolore, mutilati e storpiati. Alcuni si gettarono ai suoi piedi come degli zombie, in ginocchio, implorando... la morte probabilmente. Altri cominciarono a correre, schizzando ovunque e da nessuna parte. Non erano stati solo feriti nel corpo, ma anche nella persona. Menti annullate, schoccate, che non esistevano più. Quelli, una volta erano i suoi compagni. Lo schifo nel quale erano costretti a vivere – e di certo non si trattava di vivere (sangue, cadaveri in decomposizione, feci) – lo costrinse a prendere una decisione grave.</p><p>Inorridito, dovette ucciderli tutti.</p><p>Per ognuno di quei disperati, lui poteva regalare un colpo ravvicinato, solo spappolando le loro membra sarebbero morti immediatamente a causa delle loro armature da guerra. Alcuni infatti non morirono subito.</p></div>`
    },
     "desc_dotazione": {
        isDescription: true,
        content: `<div class="description-passage"><p>Per rendersi conto di quanta geniale capacità si impieghi per rendere una guerra atrocemente assurda, quando già di per se lo è, bisognava dare solo un fugace sguardo alle armi in dotazione e alla loro capacità di distruzione. Spesso non servivano a distruggere cose o corazzati, servivano a distruggere corpi, renderli poltiglie irriconoscibili.</p></div>`
    },
    "desc_fucile": {
        isDescription: true,
        content: `<div class="description-passage"><p>Non sapeva se i suoi nemici avessero la <button type="button" class="inline-link" data-passage-link="desc_culture">stessa attenzione per i morti</button> che avevano quelli della sua specie, di certo c'era che un colpo ben posizionato di un fucile al plasma, non lasciava molto da seppellire. Un colpo era la disintegrazione e la cancellazione totale di un'esistenza, del suo corpo e, quindi, della sua memoria da perpetuare.</p></div>`
    },
    "desc_cibo": {
        isDescription: true,
        content: `<div class="description-passage"><p>Qualcuno lo chiamava cibo. In accademia conosceva anche un tizio che ci andava matto per quelle barrette iper proteiche di un colore nero intenso, sconcertante e dal sapore nullo. A primo sguardo potrebbero sembrare barrette di cioccolato. Del cioccolato avevano però solo la consistenza. Di cosa fossero fatte lui non lo sapeva. Giravano mille voci, leggende per lo più, dalle più pittoresche alle più allarmanti. La cosa sicura era che un morso di una tavoletta dava energia e sostentamento per oltre 30 ore se necessario.</p></div>`
    },
    "desc_culture": {
        isDescription: true,
        content: `<div class="description-passage"><p>La cosa triste era che in quella guerra e nelle battaglie o nelle incursioni, loro erano diventati come i nemici e questi, a loro volta, come quelli della sua parte. Ci si confondeva nei modi e nella cultura delle cose, ognuno, buono o cattivo, non avrebbe avuto rispetto, un morto era uno in meno e basta.</p><p>Pensò che era ora di finirla di pensare.</p></div>`
    },
    "desc_nemico": {
        isDescription: true,
        content: `<div class="description-passage"><p>Preferiva ammazzarli da lontano. Non amava sentirseli vicino. Per prima cosa, nelle battaglie ravvicinate li temeva abbastanza per tenersene alla larga. Poi li odiava e quindi questo sentimento misto alla paura avrebbe fatto scorrere troppa adrenalina nel corpo. Ma c'era ancora un motivo: quelle maledette ed infami creature gli facevano talmente schifo, erano così mostruose e rivoltanti che non riusciva a guardarli in faccia, se si aveva il coraggio di chiamarla faccia.</p><p>Erano creature di ogni specie. Musi mutilati, storpiati, sembravano animali, robot usciti dalla fantasia di qualche fumettista pazzo. Demoni più brutti della peggiore rappresentazione grafica dei mitologici mostri di ogni cultura che avesse incontrato. Erano i demoni del Divieto, orribili Troll della Terra di Mezzo, creature allucinanti di Landover, orde di Gargoyle su Britannia, vampiri della Terra dove è sempre Notte, i guardiani degli Inferi, gli orribili suini delle leggende celtiche che divoravano le anime. Erano i traghettatori dei morti.</p></div>`
    },
    "desc_ricerca": {
        isDescription: true,
        content: `<div class="description-passage"><p>Ma se era logico che prima o poi sarebbe morto, perché lo stavano cercando con tanto scrupolo e insistenza. Era dunque vero quello che dicevano i rapporti su questo nuovo nemico e cioè che queste creature, venute dallo spazio, questi demoni usciti dall'inferno erano amanti dello sterminio e che non badavano allo spreco di mezzi o materiali per vedere morte e distruzione. Odio. Dopo avere visto le peggiori atrocità e aver osservato la micidiale cattiveria con la quale aggredivano nel corpo a corpo, negli assalti ravvicinati e come uccidevano coloro che davano il convenzionale segno di resa. Ma quella era una specie aliena, venuta da chi sa dove e che di certo, dei segni convenzionali di resa se ne fottevano. Un soldato alzava le mani e le loro risposte erano colpi ravvicinati alla nuca e quel loro gesto di soddisfazione nel vedere le cervella della vittima saltare in tutte le direzioni. Avevano un rito assurdo: prendevano un pezzo del cranio di coloro che avevano appena abbattuto e ci si incisevano, con una botta secca, la pelle del braccio, come a segnare la tacca dell'ennesima barbarie compiuta.</p></div>`
    },
    "desc_porta_laterale": {
        isDescription: true,
        onEnter: function(gs) {
            gs.variables.porta_laterale_notata = true; // Il giocatore ora sa della porta
            console.log("Variabile porta_laterale_notata impostata a true");
        },
        content: `<div class="description-passage"><p>Una robusta porta metallica, probabilmente un'uscita di manutenzione o un accesso a un'area secondaria. Sembra vecchia e poco usata. Potrebbe essere un'alternativa, ma anche una trappola o un vicolo cieco. Non c'è tempo per ispezionarla ora, ma tenerla a mente potrebbe tornare utile.</p></div>`,
        choices: (gs) => getDescriptionChoices(gs)
    },

    // Placeholder per i principali punti di snodo della storia originale
    // Questi verranno riempiti e modificati con la nuova logica nelle prossime fasi
    "ProntoAllAzione": {
        content: "<p>PLACEHOLDER: Contenuto originale di 'pronto all\'azione' da integrare con logica Echo e stress...</p>",
        choices: [
            { text: "Devi muoverti, non c'è tempo da perdere!", target: "SecondaParte" }
        ]
    },
    "DiagnosiArmatura": {
        content: "<p>PLACEHOLDER: Contenuto originale di 'diagnosi dell\'armatura' da integrare con logica Echo e stress...</p>",
        choices: [
            { text: "Ora sei pronto all\'azione.", target: "ProntoAllAzione" }
        ]
    },
    "SecondaParte": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1); // Stress per il cambio di situazione
            if (!gs.temporaryFlags) { // <<< AGGIUNGI QUESTO CONTROLLO
                gs.temporaryFlags = {};
            }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) < 1) {
                // Se Echo è presente ma il rapporto è basso, flag per commento speciale
                gs.temporaryFlags.echoSilenziosoCommento = true;
            }
            // Potremmo aggiungere un controllo qui: se il giocatore arriva qui molto stressato o con poca vita (se la implementiamo)
            // Echo potrebbe fare un commento diverso o potrebbero esserci conseguenze.
        },
        contentFunction: function(gs) {
            let html = "<p>Il cuore gli martellava nel petto come un maglio da assedio. Ogni fibra del suo essere urlava pericolo. La relativa calma del suo nascondiglio era svanita, sostituita dalla cruda realtà del campo di battaglia.</p>";
            if ((gs.variables.protagonistaStress || 0) > 7) {
                html += "<p>Le mani gli tremavano leggermente, un sintomo che conosceva fin troppo bene. Stava raggiungendo il limite.</p>";
            }
            // Dentro la contentFunction di "SecondaParte"
            if (gs.temporaryFlags && gs.temporaryFlags.echoSilenziosoCommento) { // <<< RIGA CORRETTA
                html += `<div class="echo-communication">Echo: Ancora vivo, Alpha-7? Impressionante. O forse solo fortunato. Non fare affidamento sulla fortuna per troppo tempo.</div>`;
                delete gs.temporaryFlags.echoSilenziosoCommento; // Rimuovi il flag dopo averlo usato
            } else if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 2) {
                html += `<div class="echo-communication">Echo: Attenzione, Alpha-7. Le mie scansioni rilevano un aumento significativo di attività ostile nella tua zona. Sembra che abbiano ristretto il campo. Preparati a un contatto imminente.</div>`;
            }
            html += "<p>Davanti a lui, la sala depositi si apriva in un vasto e caotico spazio. Casse, container e macchinari offrivano una miriade di coperture, ma anche innumerevoli nascondigli per i nemici. Luci d'emergenza rosse pulsavano, gettando ombre danzanti che trasformavano ogni angolo in una potenziale minaccia.</p>";
            return html;
        },
        choicesFunction: function(gs) {
            const choices = [];
            choices.push({ text: "Cercare una posizione difensiva e prepararsi all'inevitabile scontro.", target: "Scappare" });

            if ((gs.variables.protagonistaStress || 0) > 6) {
                choices.push({ text: "(Stress Elevato) Forse è meglio sedersi un attimo e riflettere... o arrendersi.", target: "Seduto_Finale_Considera" });
            }
            // Esempio di scelta condizionata da un item (da implementare)
            // if (gs.variables.medikitExtra) {
            //     choices.push({ text: "Usare un medikit extra per prepararsi", target: "UsaMedikit_PreScontro" });
            // }
            return choices;
        }
    },
    "Scappare": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1); // Aumenta lo stress per la decisione difficile
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) < 1) {
                // Se Echo è presente ma il rapporto è basso, potrebbe fare un commento sarcastico o preoccupato
                // gs.temporaryFlags.echoCommentoScappare = true;
            }
        },
        contentFunction: function(gs) {
            let html = "<p>La porta principale sembrava un miraggio lontano, un invito alla libertà o a una morte rapida. Poteva sentire il ronzio delle pattuglie nemiche, il metallo che strisciava sul metallo, i richiami gutturali.</p>";
            // if (gs.temporaryFlags.echoCommentoScappare) {
            //     html += `<div class="echo-communication">Echo: Scappare? Davvero originale, Alpha-7. Spero tu abbia un piano migliore di 'correre e sperare'.</div>`;
            // }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 2) {
                 html += `<div class="echo-communication">Echo: Le uscite principali sono probabilmente le più sorvegliate. Hai considerato alternative? Condotti di ventilazione? Passaggi di servizio? Se ti muovi allo scoperto, sii pronto a tutto.</div>`;
            }
            return html;
        },
        choicesFunction: function(gs) {
            const choices = [];
            if ((gs.variables.protagonistaStress || 0) < 5) {
                choices.push({ text: "Tentare la sorte e correre verso l'uscita principale", target: "Seduto" }); // Target modificato
            } else {
                choices.push({ text: "Rischiare il tutto per tutto verso l'uscita principale", target: "Seduto" }); // Target modificato
            }
            choices.push({ text: "Cercare un condotto di ventilazione nelle vicinanze", target: "FugaNelCondotto_Entrata" });

            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 1) {
                choices.push({ text: "Sparare all'impazzata per creare un diversivo e poi fuggire", target: "SparareAllImpazzata" });
            } else {
                 choices.push({ text: "Sparare all'impazzata per aprirsi la strada", target: "SparareAllImpazzata" });
            }

            choices.push({ text: "Muoversi silenziosamente lungo le pareti, cercando una via meno ovvia", target: "MuoversiSilenziosamente" });
            return choices;
        }
    },

    // Finali originali (testo da integrare)
    "Seduto_Finale": { content: "<p>Testo originale del finale 'seduto'...</p>", choices: [{ text: "Crediti", target: "credits" }] },
    "MuoversiSilenziosamente": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        content: `
            <p>Muovendosi nel silenzio assoluto, se non fosse stato per le luci intermittenti d'emergenza, per l'enorme distanza da percorrere e per la sua armatura che, per quanto avanzata, non possedeva alcun sistema di dissimulazione ottica attiva, sarebbe sicuramente riuscito nel suo folle intento. Ma la distanza era enorme e per quanto, sorprendentemente, riuscì a fare diversi metri in avanti prima che il gruppo di cercatori lo individuasse, sperare in un successo totale sarebbe stata una follia.</p>
            <p>Al primo nemico che iniziò leggermente a voltarsi nella sua direzione, lanciò una raffica di proiettili al plasma alla cieca, più per creare confusione che per colpire, e iniziò a correre disperatamente verso l'angolo dell'enorme sala dove aveva intravisto una possibile via d'uscita verso l'alto, verso la luce fioca che filtrava da un'apertura... magari verso la salvezza.</p>
            <p>Correva e sparava, sparava e correva, sentendo le esplosioni dietro di lui, frutto di tutto quello che stava sganciando nel tentativo di rallentarli, ma sentiva anche il sibilo agghiacciante delle loro armi pesanti che rispondevano al fuoco. Finché tutto divenne buio, un buio improvviso e definitivo.</p>
            <p>Colpito in pieno dalle armi pesanti di un drone che non aveva notato, appostato su una passerella superiore, di lui e della sua armatura rimase poco o niente. La caccia dei suoi assalitori finì prima di quanto avessero sperato, lasciando solo l'eco della sua ultima, vana corsa.</p>
        `,
        choices: [
            { text: "La caccia è finita.", target: "credits" }
        ]
    },
    "Seduto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = 10; // Resa totale
            // gs.variables.finaleOttenuto = "seduto"; // Per futuri messaggi nei crediti
        },
        contentFunction: function(gs) {
            let html = `<p>Appoggiandosi ad una parete fredda e metallica, disattivando il sistema diagnostico che continuava a lanciare allarmi inutili, aprendo i servomeccanismi della sua armatura con un sibilo stanco, sentì muscoli, cuore e anima rilassarsi quasi dolorosamente. Improvvisamente, un profondo, inatteso senso di pace lo avvolse.</p>`;
            if ((gs.variables.adrenalinaSinteticaUsata || 0) > 3 || (gs.variables.protagonistaStress || 0) >= 9) {
                html += `<p>Forse era l'abuso di adrenalina che finalmente presentava il conto, forse la paura accumulata che si trasformava in rassegnazione, o forse era semplicemente l'inizio della follia, ma non ricordava da quanto tempo non provava quel senso di serenità e quel disperato, infantile bisogno di riposo.</p>`;
            } else {
                 html += `<p>Era una calma strana, innaturale, come il silenzio prima della tempesta definitiva. Non ricordava da quanto tempo non provava quel senso di resa.</p>`;
            }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 1) {
                html += `<div class="echo-communication">Alpha-7! Cosa stai facendo?! Rialzati! Non puoi mollare ora! Rilevo... rilevo che hai disattivato i sistemi di combattimento... Alpha-7, rispondi!</div>`;
                if ((gs.variables.echoRapporto || 0) > 3) {
                     html += `<div class="echo-communication">Simone... dannazione, Simone, non farlo! Parla con me! C'è ancora una possibilità!</div>`;
                }
            }
            html += `<p>Si voltò lentamente, o almeno così gli parve, e vide qualcosa di grosso e armato arrivare verso di lui. Un mezzo sorriso amaro gli increspò le labbra. Tra sé e sé, recitò qualcosa che doveva aver sentito da qualche parte, in un vecchio film o in un libro dimenticato, qualcosa che gli sembrava abbastanza melodrammatico e solenne per l'occasione: "Nel luogo dove solo la morte di un essere vivente diviene spettacolo, sedere è la soluzione migliore. Ecco, ora, fate attenzione, si apre il sipario e si muore."</p>`;
            return html;
        },
        choices: [
            { text: "Sipario.", target: "credits" }
        ]
    },

    // ----- PASSAGGI NUOVI PER MECCANICA CONDOTTO -----
    "Seduto_Finale_Considera": {
        content: `
        <p>L'idea di lasciar perdere tutto, di sedersi e aspettare, ha un fascino perverso. La pace dell'oblio contro l'agonia della lotta. Per un lungo istante, fissi un punto vuoto sulla parete di fronte a te, il rumore della battaglia che si fa eco distante.</p>
        <p><em>'Quanto ancora?'</em> pensi. <em>'Quanto ancora posso correre prima che le gambe cedano, prima che la mente si spezzi?'</em></p>
    `,
        choices: [
            { text: "No, non ancora. Devo continuare a lottare.", target: "Scappare" },
            { text: "Sì. Sono stanco. Che sia finita.", target: "Seduto_Finale" }
        ]
    },
    "FugaNelCondotto_Entrata": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) -1); // Un barlume di speranza riduce lo stress
        },
        contentFunction: function(gs) {
            let html = `<p>'Un condotto... Echo, a volte le tue informazioni sono oro colato,' pensò, una rara scintilla di gratitudine che attraversava la nebbia della sua stanchezza.</p>`;
            if (gs.variables.echoPresente) {
                 html += `<div class="echo-communication">La grata di accesso dovrebbe essere vicina alla tua posizione attuale, contrassegnata con il seriale 'VNT-7B'. È vecchia, potrebbe richiedere un po' di persuasione o un bypass del meccanismo di chiusura.</div>`;
            }
            html += `<p>Individuò rapidamente la grata indicata da Echo. Era arrugginita e sembrava saldamente fissata alla parete metallica.</p>`;
            return html;
        },
        choices: [
            { text: "Forza la grata con la forza bruta (Rumoroso ma veloce).", target: "ForzaGrataCondotto" },
            { text: "Cerca un pannello di controllo per sbloccarla (Richiede più tempo, ma silenzioso).", target: "CercaPannelloCondotto" }
        ]
    },
    "ForzaGrataCondotto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1); // Sforzo e rischio
        },
        textFunction: function(gs) {
            let outcomeText = "";
            const alertedRoll = Math.floor(Math.random() * 3) + 1; // Random 1-3
            if (alertedRoll === 1) {
                outcomeText = "<p>Un grido gutturale si levò non lontano. <span style='color:var(--accent-danger);'>\"Qualcosa là! Controllate quel rumore!\"</span> Ti hanno sentito. Devi muoverti, e in fretta.</p>";
                gs.variables.nemiciAllertatiCondotto = true; // Flag per il prossimo passaggio
                gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2);
            } else {
                outcomeText = "<p>Fortunatamente, il frastuono delle loro ricerche e delle esplosioni distanti coprì il tuo. Per ora, sembri non essere stato notato.</p>";
                gs.variables.nemiciAllertatiCondotto = false;
            }
            return `
            <p>Con uno strattone potente e il cigolio metallico dell'acciaio che si piegava, la grata cedette con un rumore sordo. Il suono echeggiò per un istante nell'hangar, sovrastato solo dal battito del tuo cuore.</p>
            ${outcomeText}
        `;
        },
        choices: [
            { text: "Scivola dentro e prega.", target: "DentroIlCondotto" }
        ]
    },
    "CercaPannelloCondotto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) -1); // Successo e discrezione
        },
        textFunction: function(gs) {
            let html = `<p>Scansionando rapidamente l'area vicino al condotto con l'HUD tattico, individuasti un piccolo pannello di manutenzione, quasi invisibile sotto uno strato di sporcizia e ruggine. Qualche secondo di lavoro preciso con il multi-tool dell'armatura e la grata scattò aprendosi con un leggero sibilo pneumatico, quasi inudibile.</p>`;
            if (gs.variables.echoPresente) {
                 html += `<div class="echo-communication">Ottimo lavoro, Alpha-7. Discrezione premiata. Il condotto è aperto. Procedi.</div>`;
            }
            gs.variables.nemiciAllertatiCondotto = false;
            return html;
        },
        choices: [
            { text: "Scivola dentro silenziosamente.", target: "DentroIlCondotto" }
        ]
    },
    "DentroIlCondotto": { // Unico passaggio per entrare nel condotto, la logica interna gestirà se sono allertati
        contentFunction: function(gs) {
            let html = "";
            if (gs.variables.nemiciAllertatiCondotto) {
                html += `<p>Ti gettasti nel condotto proprio mentre sentivi passi pesanti e ringhi gutturali avvicinarsi alla tua precedente posizione. <span style='color:var(--accent-danger);'>\"CONTROLLATE QUEL CONDOTTO!\"</span> abbaiò una voce metallica. Non c'è tempo per la cautela, devi muoverti!</p>`;
                if (gs.variables.echoPresente) {
                    html += `<div class="echo-communication">Stanno venendo per te! Accelera! Cerco sulla mappa una via d'uscita alternativa da questo reticolo! Stai attento a eventuali blocchi o ventole attive!</div>`;
                }
            } else {
                html += `<p>Il condotto era stretto, buio e puzzava di olio stantio, ozono e polvere millenaria. Avanzavi a fatica, il metallo dell'armatura che strisciava contro le pareti con un suono sordo che speravi non fosse udibile all'esterno.</p>`;
                if (gs.variables.echoPresente) {
                    html += `<div class="echo-communication">Dovrebbe portarti oltre la sala principale. Segui il flusso d'aria più forte, se riesci a percepirlo, o affidati al mio tracciamento. Dovrebbe esserci una diramazione principale tra poco.</div>`;
                }
            }
            html += "<p>Dopo qualche minuto di claustrofobica avanzata nel buio quasi totale, illuminato solo dalle flebili luci di stato del tuo elmo...</p>";
            return html;
        },
        choices: [
            { text: "Prosegui nel condotto principale.", target: "Condotto_BivioPrincipale" },
            { text: "Esplora una stretta diramazione laterale che sembra meno utilizzata.", target: "Condotto_DiramazioneLaterale" }
        ]
    },
    // Placeholder per i prossimi passaggi del condotto
    "Condotto_BivioPrincipale": {
        content: "<p>Il condotto principale si allarga leggermente. Senti dei rumori indistinti ma minacciosi provenire da più avanti. L'aria è più viziata qui, sa di metallo surriscaldato e... qualcos'altro, di organico e putrido.</p>",
        choices: [
            { text: "Avanza con cautela nel condotto principale.", target: "UscitaCondotto_A_Placeholder" },
            { text: "Prova a tornare indietro al bivio precedente.", target: "DentroIlCondotto" }
        ]
    },
    "Condotto_DiramazioneLaterale": {
        content: `
            <p>La diramazione è ancora più stretta, costringendoti a muoverti quasi carponi. Il metallo freddo preme contro la tua armatura. Dopo una curva a gomito, che gratta rumorosamente contro le placche della tua spalla, vedi una grata arrugginita più avanti. Delle flebili luci filtrano attraverso di essa, rivelando i contorni di una stanza poco illuminata, forse un piccolo locale tecnico o un magazzino dimenticato.</p>
            <p>Senti un leggero ronzio elettrico provenire da oltre la grata.</p>
        `,
        choices: [
            { text: "Esamina più da vicino la grata e prova ad aprirla.", target: "UscitaCondotto_B_Placeholder" },
            { text: "Questa via è troppo rischiosa/stretta. Torna al bivio principale.", target: "DentroIlCondotto" }
        ]
    },
    "UscitaCondotto_A_Placeholder": {
        content: `
            <p>Prosegui lungo il condotto principale. Dopo quella che sembra un'eternità passata a strisciare nel buio, intravedi una luce più intensa. È un'altra grata, ma questa sembra condurre direttamente all'esterno o in un'area molto più ampia e illuminata.</p>
            <p>Purtroppo, senti anche delle voci concitate e il rumore di passi pesanti proprio al di là della grata. Sembra una zona di pattuglia attiva.</p>
            <p><em>(Sviluppo futuro: opzioni per osservare, creare un diversivo, o tentare un'uscita rischiosa)</em></p>
        `,
        choices: [
            { text: "[PLACEHOLDER] Prova a forzare l'uscita.", target: "credits" }, // Temporaneamente va ai crediti
            { text: "[PLACEHOLDER] Cerca un'altra via nel condotto.", target: "Condotto_BivioPrincipale" } // Temporaneamente torna indietro
        ]
    },
    "UscitaCondotto_B_Placeholder": {
        content: `
            <p>Ti avvicini alla grata della diramazione laterale. È vecchia e corrosa, ma sembra meno robusta di quella principale. Oltre, riesci a distinguere degli scaffali carichi di vecchi componenti elettronici e quello che sembra un terminale di computer inattivo.</p>
            <p>Il ronzio elettrico è più forte qui, ma non ci sono segni di movimento immediato.</p>
            <p><em>(Sviluppo futuro: opzioni per forzare la grata silenziosamente, usare il terminale se si trova un modo, o trovare un oggetto utile)</em></p>
        `,
        choices: [
            { text: "[PLACEHOLDER] Tenta di aprire la grata con discrezione.", target: "credits" }, // Temporaneamente va ai crediti
            { text: "[PLACEHOLDER] Lascia perdere e torna al bivio principale.", target: "DentroIlCondotto" }
        ]
    },
    "Scappare_Placeholder": { // Questo andrà rinominato in Scappare
        onEnter: function(gs) {
            // Logica da definire, forse un aumento di stress?
        },
        content: "<p>Testo per Scappare_Placeholder. Da implementare.</p>",
        choices: [
            { text: "Opzione 1", target: "Placeholder_Target1" },
            { text: "Opzione 2", target: "Placeholder_Target2" }
        ]
    },
    "SparareAllImpazzata": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2); // L'azione intensa aumenta lo stress
            // Qui potremmo aggiungere logica se il giocatore ha item speciali, come la granata EMP
            if (gs.variables.granataEmp) {
                // gs.temporaryFlags.puoLanciareEMP = true; // Un flag temporaneo per la scelta
            }
        },
        contentFunction: function(gs) {
            let html = `
                <p>Un ruggito primordiale gli squarciò la gola mentre si lanciava fuori dal nascondiglio. Gettò verso il centro della sala depositi sei granate a frammentazione con una rapidità fenomenale, un balletto mortale di precisione e furia.</p>
                <p>Impugnò in una mano un lanciarazzi di medio taglio e con l'altro braccio una mitragliatrice Gatling caricata con proiettili al plasma perforanti. Con la prima arma cominciò ad indirizzare colpi micidiali contro il drone e le armature più pesanti, con la seconda, sventagliava una pioggia incandescente sulla fanteria nemica.</p>
                <p>Le granate esplosero quasi simultaneamente, dilaniando la maggior parte dei soldati semplici e mandando in pezzi le coperture improvvisate. I missili impattarono sul drone, danneggiandolo gravemente; una delle sue gambe meccaniche si staccò con uno stridio metallico, facendolo inclinare pericolosamente. I proiettili al plasma falciarono gli ufficiali e i nemici restanti, trasformandoli in torce urlanti prima che potessero anche solo capire da dove provenisse l'attacco.</p>
                <p>Le creature che stavano ancora osservando il risultato della loro precedente cannonata, o che si stavano riorganizzando, rimasero a terra, alcune lanciando urla strazianti di dolore e sorpresa, altre semplicemente smettendo di esistere. Il drone da combattimento, benché menomato, si voltò lentamente, con un rumore di meccanismi inceppati e ormai poco funzionanti, mandando fiammate e scintille da ogni giuntura del suo corpo meccanizzato. Alla fine, con uno sforzo immane, riuscì a puntare le sue armi residue verso di te.</p>
            `;
            if (gs.variables.echoPresente) {
                html += `<div class="echo-communication">Attacco frontale audace, Alpha-7! Il drone è danneggiato ma ancora operativo! Hai scatenato l'inferno, ora non fermarti!</div>`;
            }
            html += `
                <p>Decise di uscire completamente dalla sua tana. Ora il drone, rimasto quasi solo e gravemente danneggiato, non poteva più essere un pericolo insormontabile. Era troppo lento per impensierirlo seriamente in uno scontro diretto e mobile. Uscì allo scoperto prima che quest'ultimo essere rimasto vivo riuscisse a sparare un colpo efficace. Eri abbastanza lontano quando lo fece e sapeva che nella sua posizione laterale rispetto al nemico, guadagnata con la sua sortita, gli dava il vantaggio finale per il colpo di grazia.</p>
                <p>Godere dello spettacolo della distruzione sarebbe stato meraviglioso, ma ogni risorsa, ogni secondo, in guerra è prezioso.</p>
            `;
            return html;
        },
        choicesFunction: function(gs) {
            const choices = [];
            // if (gs.temporaryFlags.puoLanciareEMP) { // Logica futura per EMP
            //     choices.push({ text: "Lancia la granata EMP contro il drone per finirlo rapidamente.", target: "LanciaEMP_ControDrone" });
            // }
            choices.push({ text: "Dedicare il prossimo missile al drone per una vendetta spettacolare.", target: "Vendetta" });
            choices.push({ text: "Ignorare il drone quasi inerme e andarsene di corsa per proseguire la fuga.", target: "ProseguendoLaFuga" });
            return choices;
        }
    },
    "MuoversiSilenziosamente": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        content: `
            <p>Muovendosi nel silenzio assoluto, se non fosse stato per le luci intermittenti d'emergenza, per l'enorme distanza da percorrere e per la sua armatura che, per quanto avanzata, non possedeva alcun sistema di dissimulazione ottica attiva, sarebbe sicuramente riuscito nel suo folle intento. Ma la distanza era enorme e per quanto, sorprendentemente, riuscì a fare diversi metri in avanti prima che il gruppo di cercatori lo individuasse, sperare in un successo totale sarebbe stata una follia.</p>
            <p>Al primo nemico che iniziò leggermente a voltarsi nella sua direzione, lanciò una raffica di proiettili al plasma alla cieca, più per creare confusione che per colpire, e iniziò a correre disperatamente verso l'angolo dell'enorme sala dove aveva intravisto una possibile via d'uscita verso l'alto, verso la luce fioca che filtrava da un'apertura... magari verso la salvezza.</p>
            <p>Correva e sparava, sparava e correva, sentendo le esplosioni dietro di lui, frutto di tutto quello che stava sganciando nel tentativo di rallentarli, ma sentiva anche il sibilo agghiacciante delle loro armi pesanti che rispondevano al fuoco. Finché tutto divenne buio, un buio improvviso e definitivo.</p>
            <p>Colpito in pieno dalle armi pesanti di un drone che non aveva notato, appostato su una passerella superiore, di lui e della sua armatura rimase poco o niente. La caccia dei suoi assalitori finì prima di quanto avessero sperato, lasciando solo l'eco della sua ultima, vana corsa.</p>
        `,
        choices: [
            { text: "La caccia è finita.", target: "credits" }
        ]
    },
    "Seduto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = 10; // Resa totale
            // gs.variables.finaleOttenuto = "seduto"; // Per futuri messaggi nei crediti
        },
        contentFunction: function(gs) {
            let html = `<p>Appoggiandosi ad una parete fredda e metallica, disattivando il sistema diagnostico che continuava a lanciare allarmi inutili, aprendo i servomeccanismi della sua armatura con un sibilo stanco, sentì muscoli, cuore e anima rilassarsi quasi dolorosamente. Improvvisamente, un profondo, inatteso senso di pace lo avvolse.</p>`;
            if ((gs.variables.adrenalinaSinteticaUsata || 0) > 3 || (gs.variables.protagonistaStress || 0) >= 9) {
                html += `<p>Forse era l'abuso di adrenalina che finalmente presentava il conto, forse la paura accumulata che si trasformava in rassegnazione, o forse era semplicemente l'inizio della follia, ma non ricordava da quanto tempo non provava quel senso di serenità e quel disperato, infantile bisogno di riposo.</p>`;
            } else {
                 html += `<p>Era una calma strana, innaturale, come il silenzio prima della tempesta definitiva. Non ricordava da quanto tempo non provava quel senso di resa.</p>`;
            }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 1) {
                html += `<div class="echo-communication">Alpha-7! Cosa stai facendo?! Rialzati! Non puoi mollare ora! Rilevo... rilevo che hai disattivato i sistemi di combattimento... Alpha-7, rispondi!</div>`;
                if ((gs.variables.echoRapporto || 0) > 3) {
                     html += `<div class="echo-communication">Simone... dannazione, Simone, non farlo! Parla con me! C'è ancora una possibilità!</div>`;
                }
            }
            html += `<p>Si voltò lentamente, o almeno così gli parve, e vide qualcosa di grosso e armato arrivare verso di lui. Un mezzo sorriso amaro gli increspò le labbra. Tra sé e sé, recitò qualcosa che doveva aver sentito da qualche parte, in un vecchio film o in un libro dimenticato, qualcosa che gli sembrava abbastanza melodrammatico e solenne per l'occasione: "Nel luogo dove solo la morte di un essere vivente diviene spettacolo, sedere è la soluzione migliore. Ecco, ora, fate attenzione, si apre il sipario e si muore."</p>`;
            return html;
        },
        choices: [
            { text: "Sipario.", target: "credits" }
        ]
    },

    "credits": {
        isCreditsScreen: true, // Flag per la logica di gioco
        content: `
            <div style="text-align: center;">
                <h2>LA FUGA</h2>
                <p>Racconto sci-fi ispirato alle partite di Doom e Quake degli anni '90.</p>
                <p>Scritto da Simone Pizzi.</p>
                <p>Espanso e rielaborato con l'assistenza di un LLM.</p>
                <br>
                <p>Corridor2193 v0.01</p>
                <p>IFID Originale: 855043D3-FCC4-42C6-A3A3-CE24379D7BF2</p>
            </div>
        `,
        choices: [
            { text: "GIOCA ANCORA", target: "StartScreen", classes: "start-button" }
        ]
    },
    "Seduto_Finale_Considera": {
        content: `
        <p>L'idea di lasciar perdere tutto, di sedersi e aspettare, ha un fascino perverso. La pace dell'oblio contro l'agonia della lotta. Per un lungo istante, fissi un punto vuoto sulla parete di fronte a te, il rumore della battaglia che si fa eco distante.</p>
        <p><em>'Quanto ancora?'</em> pensi. <em>'Quanto ancora posso correre prima che le gambe cedano, prima che la mente si spezzi?'</em></p>
    `,
        choices: [
            { text: "No, non ancora. Devo continuare a lottare.", target: "Scappare" },
            { text: "Sì. Sono stanco. Che sia finita.", target: "Seduto_Finale" }
        ]
    },
    "FugaNelCondotto_Entrata": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) -1); // Un barlume di speranza riduce lo stress
        },
        contentFunction: function(gs) {
            let html = `<p>'Un condotto... Echo, a volte le tue informazioni sono oro colato,' pensò, una rara scintilla di gratitudine che attraversava la nebbia della sua stanchezza.</p>`;
            if (gs.variables.echoPresente) {
                 html += `<div class="echo-communication">La grata di accesso dovrebbe essere vicina alla tua posizione attuale, contrassegnata con il seriale 'VNT-7B'. È vecchia, potrebbe richiedere un po' di persuasione o un bypass del meccanismo di chiusura.</div>`;
            }
            html += `<p>Individuò rapidamente la grata indicata da Echo. Era arrugginita e sembrava saldamente fissata alla parete metallica.</p>`;
            return html;
        },
        choices: [
            { text: "Forza la grata con la forza bruta (Rumoroso ma veloce).", target: "ForzaGrataCondotto" },
            { text: "Cerca un pannello di controllo per sbloccarla (Richiede più tempo, ma silenzioso).", target: "CercaPannelloCondotto" }
        ]
    },
    "ForzaGrataCondotto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1); // Sforzo e rischio
        },
        textFunction: function(gs) {
            let outcomeText = "";
            const alertedRoll = Math.floor(Math.random() * 3) + 1; // Random 1-3
            if (alertedRoll === 1) {
                outcomeText = "<p>Un grido gutturale si levò non lontano. <span style='color:var(--accent-danger);'>\"Qualcosa là! Controllate quel rumore!\"</span> Ti hanno sentito. Devi muoverti, e in fretta.</p>";
                gs.variables.nemiciAllertatiCondotto = true; // Flag per il prossimo passaggio
                gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2);
            } else {
                outcomeText = "<p>Fortunatamente, il frastuono delle loro ricerche e delle esplosioni distanti coprì il tuo. Per ora, sembri non essere stato notato.</p>";
                gs.variables.nemiciAllertatiCondotto = false;
            }
            return `
            <p>Con uno strattone potente e il cigolio metallico dell'acciaio che si piegava, la grata cedette con un rumore sordo. Il suono echeggiò per un istante nell'hangar, sovrastato solo dal battito del tuo cuore.</p>
            ${outcomeText}
        `;
        },
        choices: [
            { text: "Scivola dentro e prega.", target: "DentroIlCondotto" }
        ]
    },
    "CercaPannelloCondotto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) -1); // Successo e discrezione
        },
        textFunction: function(gs) {
            let html = `<p>Scansionando rapidamente l'area vicino al condotto con l'HUD tattico, individuasti un piccolo pannello di manutenzione, quasi invisibile sotto uno strato di sporcizia e ruggine. Qualche secondo di lavoro preciso con il multi-tool dell'armatura e la grata scattò aprendosi con un leggero sibilo pneumatico, quasi inudibile.</p>`;
            if (gs.variables.echoPresente) {
                 html += `<div class="echo-communication">Ottimo lavoro, Alpha-7. Discrezione premiata. Il condotto è aperto. Procedi.</div>`;
            }
            gs.variables.nemiciAllertatiCondotto = false;
            return html;
        },
        choices: [
            { text: "Scivola dentro silenziosamente.", target: "DentroIlCondotto" }
        ]
    },
    "DentroIlCondotto": { // Unico passaggio per entrare nel condotto, la logica interna gestirà se sono allertati
        contentFunction: function(gs) {
            let html = "";
            if (gs.variables.nemiciAllertatiCondotto) {
                html += `<p>Ti gettasti nel condotto proprio mentre sentivi passi pesanti e ringhi gutturali avvicinarsi alla tua precedente posizione. <span style='color:var(--accent-danger);'>\"CONTROLLATE QUEL CONDOTTO!\"</span> abbaiò una voce metallica. Non c'è tempo per la cautela, devi muoverti!</p>`;
                if (gs.variables.echoPresente) {
                    html += `<div class="echo-communication">Stanno venendo per te! Accelera! Cerco sulla mappa una via d'uscita alternativa da questo reticolo! Stai attento a eventuali blocchi o ventole attive!</div>`;
                }
            } else {
                html += `<p>Il condotto era stretto, buio e puzzava di olio stantio, ozono e polvere millenaria. Avanzavi a fatica, il metallo dell'armatura che strisciava contro le pareti con un suono sordo che speravi non fosse udibile all'esterno.</p>`;
                if (gs.variables.echoPresente) {
                    html += `<div class="echo-communication">Dovrebbe portarti oltre la sala principale. Segui il flusso d'aria più forte, se riesci a percepirlo, o affidati al mio tracciamento. Dovrebbe esserci una diramazione principale tra poco.</div>`;
                }
            }
            html += "<p>Dopo qualche minuto di claustrofobica avanzata nel buio quasi totale, illuminato solo dalle flebili luci di stato del tuo elmo...</p>";
            return html;
        },
        choices: [
            { text: "Prosegui nel condotto principale.", target: "Condotto_BivioPrincipale" },
            { text: "Esplora una stretta diramazione laterale che sembra meno utilizzata.", target: "Condotto_DiramazioneLaterale" }
        ]
    },
    // Placeholder per i prossimi passaggi del condotto
    "Condotto_BivioPrincipale": {
        content: "<p>Il condotto principale si allarga leggermente. Senti dei rumori indistinti ma minacciosi provenire da più avanti. L'aria è più viziata qui, sa di metallo surriscaldato e... qualcos'altro, di organico e putrido.</p>",
        choices: [
            { text: "Avanza con cautela nel condotto principale.", target: "UscitaCondotto_A_Placeholder" },
            { text: "Prova a tornare indietro al bivio precedente.", target: "DentroIlCondotto" }
        ]
    },
    "Condotto_DiramazioneLaterale": {
        content: `
            <p>La diramazione è ancora più stretta, costringendoti a muoverti quasi carponi. Il metallo freddo preme contro la tua armatura. Dopo una curva a gomito, che gratta rumorosamente contro le placche della tua spalla, vedi una grata arrugginita più avanti. Delle flebili luci filtrano attraverso di essa, rivelando i contorni di una stanza poco illuminata, forse un piccolo locale tecnico o un magazzino dimenticato.</p>
            <p>Senti un leggero ronzio elettrico provenire da oltre la grata.</p>
        `,
        choices: [
            { text: "Esamina più da vicino la grata e prova ad aprirla.", target: "UscitaCondotto_B_Placeholder" },
            { text: "Questa via è troppo rischiosa/stretta. Torna al bivio principale.", target: "DentroIlCondotto" }
        ]
    },
    "UscitaCondotto_A_Placeholder": {
        content: `
            <p>Prosegui lungo il condotto principale. Dopo quella che sembra un'eternità passata a strisciare nel buio, intravedi una luce più intensa. È un'altra grata, ma questa sembra condurre direttamente all'esterno o in un'area molto più ampia e illuminata.</p>
            <p>Purtroppo, senti anche delle voci concitate e il rumore di passi pesanti proprio al di là della grata. Sembra una zona di pattuglia attiva.</p>
            <p><em>(Sviluppo futuro: opzioni per osservare, creare un diversivo, o tentare un'uscita rischiosa)</em></p>
        `,
        choices: [
            { text: "[PLACEHOLDER] Prova a forzare l'uscita.", target: "credits" }, // Temporaneamente va ai crediti
            { text: "[PLACEHOLDER] Cerca un'altra via nel condotto.", target: "Condotto_BivioPrincipale" } // Temporaneamente torna indietro
        ]
    },
    "UscitaCondotto_B_Placeholder": {
        content: `
            <p>Ti avvicini alla grata della diramazione laterale. È vecchia e corrosa, ma sembra meno robusta di quella principale. Oltre, riesci a distinguere degli scaffali carichi di vecchi componenti elettronici e quello che sembra un terminale di computer inattivo.</p>
            <p>Il ronzio elettrico è più forte qui, ma non ci sono segni di movimento immediato.</p>
            <p><em>(Sviluppo futuro: opzioni per forzare la grata silenziosamente, usare il terminale se si trova un modo, o trovare un oggetto utile)</em></p>
        `,
        choices: [
            { text: "[PLACEHOLDER] Tenta di aprire la grata con discrezione.", target: "credits" }, // Temporaneamente va ai crediti
            { text: "[PLACEHOLDER] Lascia perdere e torna al bivio principale.", target: "DentroIlCondotto" }
        ]
    },
    "Scappare_Placeholder": { // Questo andrà rinominato in Scappare
        onEnter: function(gs) {
            // Logica da definire, forse un aumento di stress?
        },
        content: "<p>Testo per Scappare_Placeholder. Da implementare.</p>",
        choices: [
            { text: "Opzione 1", target: "Placeholder_Target1" },
            { text: "Opzione 2", target: "Placeholder_Target2" }
        ]
    },
    "SparareAllImpazzata": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2); // L'azione intensa aumenta lo stress
            // Qui potremmo aggiungere logica se il giocatore ha item speciali, come la granata EMP
            if (gs.variables.granataEmp) {
                // gs.temporaryFlags.puoLanciareEMP = true; // Un flag temporaneo per la scelta
            }
        },
        contentFunction: function(gs) {
            let html = `
                <p>Un ruggito primordiale gli squarciò la gola mentre si lanciava fuori dal nascondiglio. Gettò verso il centro della sala depositi sei granate a frammentazione con una rapidità fenomenale, un balletto mortale di precisione e furia.</p>
                <p>Impugnò in una mano un lanciarazzi di medio taglio e con l'altro braccio una mitragliatrice Gatling caricata con proiettili al plasma perforanti. Con la prima arma cominciò ad indirizzare colpi micidiali contro il drone e le armature più pesanti, con la seconda, sventagliava una pioggia incandescente sulla fanteria nemica.</p>
                <p>Le granate esplosero quasi simultaneamente, dilaniando la maggior parte dei soldati semplici e mandando in pezzi le coperture improvvisate. I missili impattarono sul drone, danneggiandolo gravemente; una delle sue gambe meccaniche si staccò con uno stridio metallico, facendolo inclinare pericolosamente. I proiettili al plasma falciarono gli ufficiali e i nemici restanti, trasformandoli in torce urlanti prima che potessero anche solo capire da dove provenisse l'attacco.</p>
                <p>Le creature che stavano ancora osservando il risultato della loro precedente cannonata, o che si stavano riorganizzando, rimasero a terra, alcune lanciando urla strazianti di dolore e sorpresa, altre semplicemente smettendo di esistere. Il drone da combattimento, benché menomato, si voltò lentamente, con un rumore di meccanismi inceppati e ormai poco funzionanti, mandando fiammate e scintille da ogni giuntura del suo corpo meccanizzato. Alla fine, con uno sforzo immane, riuscì a puntare le sue armi residue verso di te.</p>
            `;
            if (gs.variables.echoPresente) {
                html += `<div class="echo-communication">Attacco frontale audace, Alpha-7! Il drone è danneggiato ma ancora operativo! Hai scatenato l'inferno, ora non fermarti!</div>`;
            }
            html += `
                <p>Decise di uscire completamente dalla sua tana. Ora il drone, rimasto quasi solo e gravemente danneggiato, non poteva più essere un pericolo insormontabile. Era troppo lento per impensierirlo seriamente in uno scontro diretto e mobile. Uscì allo scoperto prima che quest'ultimo essere rimasto vivo riuscisse a sparare un colpo efficace. Eri abbastanza lontano quando lo fece e sapeva che nella sua posizione laterale rispetto al nemico, guadagnata con la sua sortita, gli dava il vantaggio finale per il colpo di grazia.</p>
                <p>Godere dello spettacolo della distruzione sarebbe stato meraviglioso, ma ogni risorsa, ogni secondo, in guerra è prezioso.</p>
            `;
            return html;
        },
        choicesFunction: function(gs) {
            const choices = [];
            // if (gs.temporaryFlags.puoLanciareEMP) { // Logica futura per EMP
            //     choices.push({ text: "Lancia la granata EMP contro il drone per finirlo rapidamente.", target: "LanciaEMP_ControDrone" });
            // }
            choices.push({ text: "Dedicare il prossimo missile al drone per una vendetta spettacolare.", target: "Vendetta" });
            choices.push({ text: "Ignorare il drone quasi inerme e andarsene di corsa per proseguire la fuga.", target: "ProseguendoLaFuga" });
            return choices;
        }
    },
    "MuoversiSilenziosamente": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        content: `
            <p>Muovendosi nel silenzio assoluto, se non fosse stato per le luci intermittenti d'emergenza, per l'enorme distanza da percorrere e per la sua armatura che, per quanto avanzata, non possedeva alcun sistema di dissimulazione ottica attiva, sarebbe sicuramente riuscito nel suo folle intento. Ma la distanza era enorme e per quanto, sorprendentemente, riuscì a fare diversi metri in avanti prima che il gruppo di cercatori lo individuasse, sperare in un successo totale sarebbe stata una follia.</p>
            <p>Al primo nemico che iniziò leggermente a voltarsi nella sua direzione, lanciò una raffica di proiettili al plasma alla cieca, più per creare confusione che per colpire, e iniziò a correre disperatamente verso l'angolo dell'enorme sala dove aveva intravisto una possibile via d'uscita verso l'alto, verso la luce fioca che filtrava da un'apertura... magari verso la salvezza.</p>
            <p>Correva e sparava, sparava e correva, sentendo le esplosioni dietro di lui, frutto di tutto quello che stava sganciando nel tentativo di rallentarli, ma sentiva anche il sibilo agghiacciante delle loro armi pesanti che rispondevano al fuoco. Finché tutto divenne buio, un buio improvviso e definitivo.</p>
            <p>Colpito in pieno dalle armi pesanti di un drone che non aveva notato, appostato su una passerella superiore, di lui e della sua armatura rimase poco o niente. La caccia dei suoi assalitori finì prima di quanto avessero sperato, lasciando solo l'eco della sua ultima, vana corsa.</p>
        `,
        choices: [
            { text: "La caccia è finita.", target: "credits" }
        ]
    },
    "Seduto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = 10; // Resa totale
            // gs.variables.finaleOttenuto = "seduto"; // Per futuri messaggi nei crediti
        },
        contentFunction: function(gs) {
            let html = `<p>Appoggiandosi ad una parete fredda e metallica, disattivando il sistema diagnostico che continuava a lanciare allarmi inutili, aprendo i servomeccanismi della sua armatura con un sibilo stanco, sentì muscoli, cuore e anima rilassarsi quasi dolorosamente. Improvvisamente, un profondo, inatteso senso di pace lo avvolse.</p>`;
            if ((gs.variables.adrenalinaSinteticaUsata || 0) > 3 || (gs.variables.protagonistaStress || 0) >= 9) {
                html += `<p>Forse era l'abuso di adrenalina che finalmente presentava il conto, forse la paura accumulata che si trasformava in rassegnazione, o forse era semplicemente l'inizio della follia, ma non ricordava da quanto tempo non provava quel senso di serenità e quel disperato, infantile bisogno di riposo.</p>`;
            } else {
                 html += `<p>Era una calma strana, innaturale, come il silenzio prima della tempesta definitiva. Non ricordava da quanto tempo non provava quel senso di resa.</p>`;
            }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 1) {
                html += `<div class="echo-communication">Alpha-7! Cosa stai facendo?! Rialzati! Non puoi mollare ora! Rilevo... rilevo che hai disattivato i sistemi di combattimento... Alpha-7, rispondi!</div>`;
                if ((gs.variables.echoRapporto || 0) > 3) {
                     html += `<div class="echo-communication">Simone... dannazione, Simone, non farlo! Parla con me! C'è ancora una possibilità!</div>`;
                }
            }
            html += `<p>Si voltò lentamente, o almeno così gli parve, e vide qualcosa di grosso e armato arrivare verso di lui. Un mezzo sorriso amaro gli increspò le labbra. Tra sé e sé, recitò qualcosa che doveva aver sentito da qualche parte, in un vecchio film o in un libro dimenticato, qualcosa che gli sembrava abbastanza melodrammatico e solenne per l'occasione: "Nel luogo dove solo la morte di un essere vivente diviene spettacolo, sedere è la soluzione migliore. Ecco, ora, fate attenzione, si apre il sipario e si muore."</p>`;
            return html;
        },
        choices: [
            { text: "Sipario.", target: "credits" }
        ]
    },
    "Vendetta": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) - 1); // La vendetta può essere catartica
            gs.variables.ultimo_missile_usato = true;
            console.log("Stato dopo Vendetta onEnter:", JSON.parse(JSON.stringify(gs.variables)));
        },
        contentFunction: function(gs) {
            let html = `
                <p>Continuava a guardarlo con mille pensieri turbinanti, fulminei, un misto di odio freddo e una macabra soddisfazione. Non era mai stato così vicino ad un essere tanto grande e potente, ora ridotto a un rottame fumante. Il drone stava ancora provando a voltarsi, i suoi attuatori stridevano in un lamento metallico, ma questa volta i suoi circuiti erano quasi completamente andati.</p>
                <p>Sapeva bene di non poter restare lì a godersi la sua distruzione troppo a lungo. Con un ghigno quasi impercettibile, fece partire l'ultimo missile che gli restava nel lanciatore portatile, indirizzandolo con precisione chirurgica proprio al centro del bersaglio, oramai quasi inerme.</p>
            `;
            if (gs.variables.echoPresente) {
                if ((gs.variables.echoRapporto || 0) > 2) {
                    html += `<div class="echo-communication">Confermo, missile in volo... impatto! Bersaglio neutralizzato definitivamente, Alpha-7. Ottima mira, ma era il tuo ultimo razzo pesante, giusto? Occhio alle risorse.</div>`;
                } else {
                    html += `<div class="echo-communication">Drone annientato. Risparmia i fuochi d'artificio, soldato, la festa non è ancora finita.</div>`;
                }
            }
            html += `
                <p>Si concesse comunque il lusso fugace di osservare quella bellissima, catartica esplosione, un fungo di fuoco e metallo contorto, contornata dal rumore assordante e dalle urla furibonde dell'essere meccanico che stava morendo definitivamente. Un peso sembrò sollevarsi dalle sue spalle, anche se solo per un istante.</p>
                <p><em>'Questo è per voi, bastardi,'</em> pensò, un'immagine fugace dei compagni caduti che gli attraversava la mente. Ma la tregua fu breve.</p>
            `;
            return html;
        },
        choices: [
            { text: "La soddisfazione svanisce rapidamente: devi muoverti.", target: "Continua2" }
        ]
    },
    "Continua2": { // Proviene dal percorso "Vendetta"
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2); // L'imboscata aumenta lo stress
        },
        contentFunction: function(gs) {
            let html = `
                <p>Un grido d'allarme, acuto e disumano, giunse improvviso dalla sua sinistra. Voltando la testa immediatamente, con i riflessi pompati al massimo, vide che dall'entrata principale dell\'hangar, un soldato nemico – uno di quelli più agili e corazzati – stava correndo verso di lui con l'arma spianata.</p>
                <p>Un proiettile energetico di un colore violaceo fu scagliato dal fucile del mostro e lo colpì sul fianco destro, là dove l\'armatura era già stata compromessa. Nonostante la corazza residua, nonostante gli scudi che cercavano disperatamente di deviare l\'impatto, il dolore e il calore concentrato di quel colpo gli provocarono un'improvvisa, intensa sofferenza. Un breve ma profondo bruciore si irradiò su tutto il corpo, facendogli perdere per un istante il controllo del respiro.</p>
                <p><em>'Maledizione! Un'imboscata!'</em> Ecco quando serviva veramente l'adrenalina, quella pura, non quella sintetica che ti lasciava svuotato. Quando non si doveva provare dolore e si doveva avere la prontezza fulminea per reagire. Quella, ben orchestrata, era chiaramente un'imboscata, dove le creature che lo cercavano erano state solo l'esca e lui, stupidamente perso nel momento della sua piccola vendetta, aveva fatto scoprire la sua posizione.</p>
            `;
            if (gs.variables.echoPresente) {
                html += `<div class="echo-communication">Contatto ostile! Fianco sinistro, distanza ravvicinata! Reagisci, Alpha-7! REAGISCI!</div>`;
            }
            html += `<p>Tra dolore lancinante e la confusione del momento, non era in grado di ragionare lucidamente. Era oramai una questione di frazioni di secondo, di istinto puro.</p>`;
            return html;
        },
        choices: [
            { text: "Ritirarsi dietro una cassa, cercare una nuova copertura.", target: "Ritirarsi_Imboscata" }, // Nuovo target
            { text: "Reagire d'istinto: sparare, sparare e sparare!", target: "Sparare_Imboscata" }  // Nuovo target
        ]
    },
    "Ritirarsi_Imboscata": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        contentFunction: function(gs) {
            let html = `<p>Preso da una improvvisa, disperata fretta, si gettò con tutta la forza che gli restava dietro un grosso contenitore di metallo di medie dimensioni. L'impatto con la sua superficie fredda gli fece gemere di dolore al fianco ferito. Si mise immediatamente in copertura e, cercando di non pensare al dolore che gli annebbiava la vista, respirò affannosamente per un istante. Poi si sporse con il fucile al plasma puntato verso il punto dove il nemico stava correndo verso di lui.</p>`;
            // Logica per l'esito del tentativo di ritirata
            const esitoRitirata = Math.random(); // Numero tra 0 e 1
            if (esitoRitirata < 0.6) { // 60% di probabilità di essere colpito
                gs.variables.finaleOttenuto = "morto_in_ritirata";
                html += `
                    <p>Fu sorpreso e spiazzato quando non lo vide immediatamente. O meglio, lo fu per quel millesimo di secondo necessario per ricevere un colpo energetico devastante alla testa. Il suo assalitore, più veloce e astuto, nel frattempo aveva cambiato posizione e si era messo vicino a un improvvisato riparo laterale, cogliendolo di sorpresa.</p>
                    <p>Il tempo che un bagliore accecante invase la sua vista e un enorme, insopportabile calore gli bruciò il cervello... e cadde a terra come un corpo esamine. Ossia, quello che era. Morto.</p>
                    <p>Il silenzio calò sull\'hangar, rotto solo dal crepitio lontano di qualche incendio.</p>
                `;
                return { text: html, choices: [{ text: "Fine della trasmissione.", target: "credits" }] };
            } else {
                gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) - 2); // Sollievo temporaneo
                if (gs.variables.echoPresente) {
                    html += `<div class="echo-communication">Copertura acquisita! Ma è temporanea, non puoi restare lì! Cerca un\'apertura!</div>`;
                }
                html += `
                    <p>Il nemico, colto di sorpresa dal suo movimento improvviso, sparò una raffica che si schiantò dove si trovava un istante prima. Per ora eri al sicuro, ma per quanto? La copertura era precaria.</p>
                    <p>Intravedi una <button type="button" class="inline-link" data-passage-link="desc_passaggio_stretto">strettoia tra i container</button> alla tua destra.</p>
                `;
                const choices = [
                    { text: "Sporgersi e tentare di colpire il nemico.", target: "Sparare_Imboscata_Copertura" }, // Nuovo passaggio
                    { text: "Tentare la fuga attraverso la strettoia tra i container.", target: "Fuga_Strettoia" } // Nuovo passaggio
                ];
                if (gs.variables.granataEmp) { // Se ha ancora la granata EMP
                    choices.push({ text: "Lanciare la granata EMP per stordirlo (se è un drone o ha molta elettronica).", target: "Lancia_EMP_Imboscata" }); // Nuovo passaggio
                }
                return { text: html, choices: choices };
            }
        },
        // choicesFunction non serve più qui perché il testo e le scelte sono determinate da contentFunction
    },
    "Sparare_Imboscata": {
        onEnter: function(gs) {
            // Lo stress potrebbe aumentare o diminuire a seconda dell'esito
        },
        contentFunction: function(gs) {
            let html = `<p>Non si guardò nemmeno intorno per cercare una via di scampo più sicura. L'istinto prese il sopravvento. Sparò. E sparò ancora, con tutto quello che aveva a portata di mano.</p>`;
            let outcomeText = "";
            let choices = [];

            if (gs.variables.ultimo_missile_usato === false && Math.random() < 0.5) { // 50% di usare il lanciarazzi se disponibile
                gs.variables.ultimo_missile_usato = true; // Ora è usato
                gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) - 1); // Successo catartico
                outcomeText = `
                    <p>Il lanciarazzi era ancora imbracciato. Un missile è tanto potente quanto prezioso, e sprecarne uno per sopprimere un solo individuo era una cosa ritenuta ingiustificabile dagli istruttori. La voce del Signor Istruttore risuonò beffarda nella sua mente: <em>"Ingiustificabile!"</em></p>
                    <p>Ma al diavolo gli istruttori e l\'Accademia. Le istruzioni e gli addestramenti valgono meno di nulla quando in gioco c'è la propria vita. Il mostro corazzato fu investito in pieno dal minirazzo e spinto con violenza contro la parete più vicina, dove si disintegrò in una pioggia di scintille e frammenti biomeccanici.</p>
                    <p>Silenzio. Per ora.</p>
                `;
                if (gs.variables.echoPresente) {
                    outcomeText += `<div class="echo-communication">Bersaglio eliminato! Sprecone, ma efficace! Controlla le munizioni del lanciarazzi, Alpha-7, credo fosse l\'ultimo.</div>`;
                }
                choices.push({ text: "Era ora di fermarsi e valutare i danni... o continuare.", target: "DopoImboscata_Valutazione" }); // Nuovo Passaggio
            } else {
                // Usa la mitragliatrice al plasma
                const miraRoll = Math.random();
                if (miraRoll < 0.7) { // 70% di successo
                    gs.variables.protagonistaStress = Math.max(0, (gs.variables.protagonistaStress || 0) -1);
                    outcomeText = `
                        <p>La mitragliatrice al plasma sibilò, vomitando una raffica di proiettili incandescenti. Diversi colpi andarono a segno, perforando la corazza del nemico in punti vitali. La creatura barcollò, emise un rantolo elettronico e crollò a terra, contorcendosi per qualche istante prima di immobilizzarsi.</p>
                        <p>Sei riuscito ad abbatterlo. Il corridoio ora è di nuovo silenzioso, ma per quanto?</p>
                    `;
                    if (gs.variables.echoPresente) {
                        outcomeText += `<div class="echo-communication">Bel lavoro con il plasma! Veloce e pulito. Mantieni alta la guardia.</div>`;
                    }
                    choices.push({ text: "Meglio curare quella ferita al fianco, ora che c'è un attimo di respiro.", target: "CurareFeritaFianco_Placeholder" }); // Placeholder
                    choices.push({ text: "Non c'è tempo per le cure, devo continuare la fuga.", target: "StannoArrivando" });
                } else { // Colpo mancato o inefficace
                    gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 2);
                    gs.variables.finaleOttenuto = "morto_contrattacco_imboscata";
                    outcomeText = `
                        <p>La tua raffica di plasma andò larga, o si infranse inefficacemente contro la sua corazza potenziata. Il nemico, per nulla intimorito, rispose al fuoco con una precisione mortale mentre eri ancora allo scoperto.</p>
                        <p>Un dolore accecante ti esplose nel petto. Poi, solo il buio.</p>
                    `;
                     if (gs.variables.echoPresente) {
                        outcomeText += `<div class="echo-communication">Alpha-7! Alpha-7, rispondi! Segnali vitali... persi. Maledizione...</div>`;
                    }
                    choices.push({ text: "Fine.", target: "credits" });
                }
            }
            return { text: html + outcomeText, choices: choices };
        }
    },
    "ProseguendoLaFuga": {
        onEnter: function(gs) {
            gs.variables.ultimo_missile_usato = false; // Non l'ha usato sul drone
            // Lo stress potrebbe aumentare leggermente per la fretta e il pericolo persistente
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
            console.log("Stato dopo ProseguendoLaFuga onEnter:", JSON.parse(JSON.stringify(gs.variables)));
        },
        contentFunction: function(gs) {
            let html = `
                <p>Voltandosi di scatto, sentì la fretta prendere il sopravvento sulla momentanea euforia della vittoria. Nei suoi ricordi, in caso fosse sopravvissuto, avrebbe potuto immaginarsi il drone esplodere tra sangue sintetico e ferro contorto, e gioire di quel trionfo. Ora non era il momento giusto per i replay mentali.</p>
                <p>Accelerando il passo già sostenuto dall\'adrenalina, si diresse verso un angolo di quella enorme sala da carico. Mentre correva, i suoi occhi scansionavano l\'ambiente, cercando il punto in cui enormi contenitori e box più piccoli si prestassero a formare una sorta di scala improvvisata verso l\'alto, unico punto da cui filtrava una luce che prometteva l\'esterno. Notò con la coda dell\'occhio una <button type="button" class="inline-link" data-passage-link="desc_porta_laterale">porta di servizio laterale</button>, probabilmente bloccata o allarmata, ma la registrò mentalmente.</p>
            `;
            if (gs.variables.echoPresente) {
                html += `<div class="echo-communication">Il drone sta ancora tentando di acquisirti come bersaglio, Alpha-7! Anche se danneggiato, il suo sistema di puntamento potrebbe essere ancora parzialmente funzionante! Esci dalla sua linea di tiro!</div>`;
            }
            html += `
                <p>Correva, portandosi rapidamente fuori dalla portata visiva diretta del Drone il quale, era evidente, per programmazione o per puro odio meccanico, stava cercando di ruotare il suo lanciarazzi superstite per distruggerlo definitivamente.</p>
                <p>Sentì un sibilo partire, ma il missile non era diretto verso la sua posizione attuale. Il drone, con la gamba distrutta, non riusciva a compiere l\'intera rotazione necessaria per un tiro preciso. Ma quel missile, che tra meno di due secondi sarebbe esploso contro un qualche ostacolo innocuo, avrebbe sicuramente attirato molta più attenzione sulla sua ultima posizione nota.</p>
            `;
            return html;
        },
        choices: [
            { text: "Fu così, naturalmente. Altri nemici stanno arrivando.", target: "StannoArrivando" }
        ]
    },
    "MuoversiSilenziosamente": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = Math.min(10, (gs.variables.protagonistaStress || 0) + 1);
        },
        content: `
            <p>Muovendosi nel silenzio assoluto, se non fosse stato per le luci intermittenti d'emergenza, per l'enorme distanza da percorrere e per la sua armatura che, per quanto avanzata, non possedeva alcun sistema di dissimulazione ottica attiva, sarebbe sicuramente riuscito nel suo folle intento. Ma la distanza era enorme e per quanto, sorprendentemente, riuscì a fare diversi metri in avanti prima che il gruppo di cercatori lo individuasse, sperare in un successo totale sarebbe stata una follia.</p>
            <p>Al primo nemico che iniziò leggermente a voltarsi nella sua direzione, lanciò una raffica di proiettili al plasma alla cieca, più per creare confusione che per colpire, e iniziò a correre disperatamente verso l'angolo dell'enorme sala dove aveva intravisto una possibile via d'uscita verso l'alto, verso la luce fioca che filtrava da un'apertura... magari verso la salvezza.</p>
            <p>Correva e sparava, sparava e correva, sentendo le esplosioni dietro di lui, frutto di tutto quello che stava sganciando nel tentativo di rallentarli, ma sentiva anche il sibilo agghiacciante delle loro armi pesanti che rispondevano al fuoco. Finché tutto divenne buio, un buio improvviso e definitivo.</p>
            <p>Colpito in pieno dalle armi pesanti di un drone che non aveva notato, appostato su una passerella superiore, di lui e della sua armatura rimase poco o niente. La caccia dei suoi assalitori finì prima di quanto avessero sperato, lasciando solo l'eco della sua ultima, vana corsa.</p>
        `,
        choices: [
            { text: "La caccia è finita.", target: "credits" }
        ]
    },
    "Seduto": {
        onEnter: function(gs) {
            gs.variables.protagonistaStress = 10; // Resa totale
            // gs.variables.finaleOttenuto = "seduto"; // Per futuri messaggi nei crediti
        },
        contentFunction: function(gs) {
            let html = `<p>Appoggiandosi ad una parete fredda e metallica, disattivando il sistema diagnostico che continuava a lanciare allarmi inutili, aprendo i servomeccanismi della sua armatura con un sibilo stanco, sentì muscoli, cuore e anima rilassarsi quasi dolorosamente. Improvvisamente, un profondo, inatteso senso di pace lo avvolse.</p>`;
            if ((gs.variables.adrenalinaSinteticaUsata || 0) > 3 || (gs.variables.protagonistaStress || 0) >= 9) {
                html += `<p>Forse era l'abuso di adrenalina che finalmente presentava il conto, forse la paura accumulata che si trasformava in rassegnazione, o forse era semplicemente l'inizio della follia, ma non ricordava da quanto tempo non provava quel senso di serenità e quel disperato, infantile bisogno di riposo.</p>`;
            } else {
                 html += `<p>Era una calma strana, innaturale, come il silenzio prima della tempesta definitiva. Non ricordava da quanto tempo non provava quel senso di resa.</p>`;
            }
            if (gs.variables.echoPresente && (gs.variables.echoRapporto || 0) > 1) {
                html += `<div class="echo-communication">Alpha-7! Cosa stai facendo?! Rialzati! Non puoi mollare ora! Rilevo... rilevo che hai disattivato i sistemi di combattimento... Alpha-7, rispondi!</div>`;
                if ((gs.variables.echoRapporto || 0) > 3) {
                     html += `<div class="echo-communication">Simone... dannazione, Simone, non farlo! Parla con me! C'è ancora una possibilità!</div>`;
                }
            }
            html += `<p>Si voltò lentamente, o almeno così gli parve, e vide qualcosa di grosso e armato arrivare verso di lui. Un mezzo sorriso amaro gli increspò le labbra. Tra sé e sé, recitò qualcosa che doveva aver sentito da qualche parte, in un vecchio film o in un libro dimenticato, qualcosa che gli sembrava abbastanza melodrammatico e solenne per l'occasione: "Nel luogo dove solo la morte di un essere vivente diviene spettacolo, sedere è la soluzione migliore. Ecco, ora, fate attenzione, si apre il sipario e si muore."</p>`;
            return html;
        },
        choices: [
            { text: "Sipario.", target: "credits" }
        ]
    },
};

// Funzione helper per i passaggi descrittivi (simula il comportamento dei link di Twine)
// Questa funzione deve essere definita primA che venga usata nel loop sottostante.
function getDescriptionChoices(gameState) {
    const historyNotEmpty = gameState.history && gameState.history.length > 0;
    let returnToPassageId = "AppoggiatoAlMuro"; // Fallback di default

    if (gameState.variables.returnToAfterDescription && storyData[gameState.variables.returnToAfterDescription]) {
        returnToPassageId = gameState.variables.returnToAfterDescription;
        console.log(`Descrizione: Trovato returnToAfterDescription: ${returnToPassageId}`);
    } else if (historyNotEmpty) {
        // Cerca l'ultimo passaggio non descrittivo nella cronologia
        for (let i = gameState.history.length - 1; i >= 0; i--) {
            const prevPassageId = gameState.history[i];
            if (storyData[prevPassageId] && !storyData[prevPassageId].isDescription) {
                returnToPassageId = prevPassageId;
                break;
            }
        }
        console.log(`Descrizione: Calcolato ritorno dalla cronologia: ${returnToPassageId}`);
    } else {
        console.warn("Descrizione: Cronologia vuota e nessun returnToAfterDescription, fallback ad AppoggiatoAlMuro");
    }

    return [{ text: "Smetti di osservare.", target: returnToPassageId }];
}

// Applica dinamicamente le scelte di ritorno ai passaggi descrittivi
for (const passageId in storyData) {
    if (storyData[passageId].isDescription) {
        // Se choices non è definito o è un array vuoto, assegna la funzione.
        if (!storyData[passageId].choices || (Array.isArray(storyData[passageId].choices) && storyData[passageId].choices.length === 0)) {
            storyData[passageId].choices = (gs) => getDescriptionChoices(gs);
        }
    }
}