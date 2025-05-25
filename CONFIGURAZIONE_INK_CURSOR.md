# 🎯 **Configurazione Completa Ink per Cursor**

## **🛡️ Progetto: Corridor 2193 - The Last Run**
*Storia Interattiva in Ink ispirata a Doom (1993)*

---

## **📋 Estensioni VS Code/Cursor da Installare**

### **1. Estensioni Ink Principali**

#### **A) bruno-dias.ink** ⭐ (GIÀ INSTALLATA)
- **ID Extension:** `bruno-dias.ink`
- **Funzioni:**
  - Syntax highlighting avanzato
  - Conteggio parole accurato (ignora commenti e logica)
  - IntelliSense per divert targets
  - Supporto "Go to Definition" per knots
  - Conteggio nodi (knot/stitch)

#### **B) inkle-vscode** (OPZIONALE)
- **Link:** https://marketplace.visualstudio.com/items?itemName=inkle.vscode
- **Installazione manuale:** Vai a Extensions → Cerca "inkle vscode"

### **2. Estensioni Aggiuntive Consigliate**

#### **A) Language Server Protocol Support**
```bash
code --install-extension ms-vscode.vscode-languageserver-protocol
```

#### **B) Better Comments**
```bash
code --install-extension aaron-bond.better-comments
```

#### **C) Bracket Pair Colorizer**
```bash
code --install-extension CoenraadS.bracket-pair-colorizer-2
```

#### **D) Word Count**
```bash
code --install-extension ms-vscode.wordcount
```

---

## **🔧 Strumenti di Compilazione e Testing**

### **1. Inklecate (Compilatore Ufficiale)**

#### **Opzione A: Download Diretto**
1. Vai su https://github.com/inkle/ink/releases
2. Scarica `ink-windows.zip`
3. Estrai in `C:\Tools\Ink\`
4. Aggiungi `C:\Tools\Ink\` al PATH di sistema

#### **Opzione B: Via Chocolatey (Richiede PowerShell Amministratore)**
```powershell
choco install inklecate
```

### **2. inkjs (Alternativa JavaScript)**

#### **Se hai Node.js installato:**
```bash
npm install -g inkjs
```

#### **Senza Node.js - Scarica binary precompilato:**
1. Vai su https://github.com/y-lohse/inkjs
2. Scarica la release più recente
3. Estrai in `C:\Tools\inkjs\`

### **3. Inky (Editor Ufficiale)**
- **Download:** https://github.com/inkle/inky/releases
- **Uso:** Per preview e testing rapido delle storie

---

## **⚙️ Configurazione Cursor/VS Code**

### **File già configurati nel progetto:**

#### **A) `.vscode/settings.json`**
Configurazione specifica per Ink con:
- Associazioni file `.ink`
- Word wrap ottimizzato
- IntelliSense personalizzato
- Regole di formattazione

#### **B) `.vscode/tasks.json`**
Task automatici per:
- **Compile Ink Story:** `Ctrl+Shift+P` → `Tasks: Run Task` → `Compile Ink Story`
- **Play Ink Story:** Test interattivo nel terminale
- **Count Words:** Conteggio parole del progetto
- **Validate Syntax:** Controllo errori di sintassi

#### **C) `.vscode/ink.code-snippets`**
Snippet personalizzati per Corridor2193:
- `echo` → Dialogo ECHO
- `maddog` → Dialogo Mad Dog
- `thought` → Pensieri del personaggio
- `healthcheck` → Controllo stato salute
- `ammocheck` → Controllo munizioni
- E molti altri!

---

## **🚀 Come Usare gli Strumenti**

### **1. Compilation & Testing**

#### **Build del progetto:**
```bash
# Con Inklecate
inklecate -o Corridor2193.json Corridor2193.ink

# Con inkjs
inkjs -o Corridor2193.json Corridor2193.ink
```

#### **Test interattivo:**
```bash
# Con Inklecate
inklecate -p Corridor2193.ink

# Con inkjs
inkjs -p Corridor2193.ink
```

#### **Conteggio parole:**
```bash
inklecate -c Corridor2193.ink
```

### **2. Task di Cursor**

1. **Apri Command Palette:** `Ctrl+Shift+P`
2. **Digita:** `Tasks: Run Task`
3. **Scegli uno dei task configurati:**
   - Compile Ink Story
   - Play Ink Story
   - Count Words in Ink Story
   - Validate Ink Syntax

### **3. Snippet Personalizzati**

Nel file `.ink`, digita:
- `echo` + `Tab` → Dialogo ECHO
- `maddog` + `Tab` → Dialogo protagonista
- `choice` + `Tab` → Scelta standard
- `knot` + `Tab` → Nuovo knot
- `healthcheck` + `Tab` → Controllo salute
- `ammocheck` + `Tab` → Controllo munizioni

---

## **🔍 Language Server Protocol (LSP)**

### **Ink Language Server (Sperimentale)**

#### **Installazione:**
```bash
npm install -g ink-language-server
```

#### **Configurazione in settings.json:**
```json
{
    "ink.languageServer.enabled": true,
    "ink.mainStoryPath": "./Corridor2193.ink",
    "ink.inklecateExecutablePath": "inklecate"
}
```

**⚠️ Nota:** Il Language Server è ancora in sviluppo attivo

---

## **🎨 Syntax Highlighting Avanzato**

### **Tema Consigliato:**
- **One Dark Pro:** Ottima evidenziazione per Ink
- **Monokai Pro:** Buon contrasto per codice Ink
- **Material Theme:** Supporto colori personalizzati

### **Personalizzazione Colori Ink:**
Aggiungi a `settings.json`:
```json
{
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "keyword.choice.ink",
                "settings": {
                    "foreground": "#F92672",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": "keyword.divert.ink",
                "settings": {
                    "foreground": "#A6E22E"
                }
            },
            {
                "scope": "string.label.ink",
                "settings": {
                    "foreground": "#E6DB74"
                }
            }
        ]
    }
}
```

---

## **📊 Analytics e Debugging**

### **1. Word Count Integration**
L'estensione `bruno-dias.ink` fornisce:
- Conteggio parole nella status bar
- Conta solo il testo effettivo (esclude logica)
- Conteggio nodi (knots/stitches)

### **2. Error Detection**
- Syntax errors evidenziati in tempo reale
- Problem panel con errori di compilazione
- Warnings per best practices

### **3. Navigation Tools**
- **Go to Definition:** `F12` sui knots
- **Find All References:** `Shift+F12`
- **Symbol Search:** `Ctrl+T`

---

## **🌐 Strumenti Web per Ink**

### **1. Borogove**
- **URL:** https://borogove.app/
- **Uso:** Editor online con preview in tempo reale
- **Vantaggi:** Nessuna installazione richiesta

### **2. Quill**
- **URL:** https://quill.ink/
- **Uso:** Sandbox testing online
- **Vantaggi:** Test rapidi senza setup locale

---

## **🚨 Troubleshooting**

### **Problemi Comuni:**

#### **1. Inklecate non trovato**
```bash
# Verifica installazione
where inklecate

# Aggiungi al PATH manualmente
$env:PATH += ";C:\Tools\Ink"
```

#### **2. Syntax highlighting non funziona**
1. Verifica estensione attiva
2. Ricarica window: `Ctrl+Shift+P` → `Developer: Reload Window`
3. Associa file: `Ctrl+Shift+P` → `Change Language Mode` → `Ink`

#### **3. Task non funzionano**
1. Verifica `tasks.json` presente
2. Controlla path di inklecate in `tasks.json`
3. Apri Command Palette: `Tasks: Configure Task`

---

## **📁 Struttura File Configurati**

```
Corridor2193/
├── .vscode/
│   ├── settings.json          # Configurazione progetto
│   ├── tasks.json             # Task automatici
│   └── ink.code-snippets      # Snippet personalizzati
├── Corridor2193.ink           # File principale
└── CONFIGURAZIONE_INK_CURSOR.md # Questa guida
```

---

## **🎯 Workflow Raccomandato**

### **Per Scrivere:**
1. Usa snippet per velocizzare: `echo`, `maddog`, `choice`
2. Sfrutta IntelliSense per divert: `->` + suggerimenti automatici
3. Controllo Word Count nella status bar

### **Per Testare:**
1. `Ctrl+Shift+P` → `Tasks: Run Task` → `Validate Ink Syntax`
2. Se ok: `Tasks: Run Task` → `Play Ink Story`
3. Per rilascio: `Tasks: Run Task` → `Compile Ink Story`

### **Per Debugging:**
1. Errors panel per problemi di sintassi
2. Terminal per output di compilazione
3. Inky per test visuale rapido

---

## **🔗 Risorse Aggiuntive**

### **Documentazione:**
- **Ink Manual:** https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md
- **Ink Library:** https://github.com/inkle/ink-library
- **Community:** https://discord.gg/inkle

### **Esempi e Template:**
- **ink-soaked:** Template per web deployment
- **PalimpsestNW:** Template per app desktop
- **ink-vn-engine:** Engine per visual novel

### **Tools Avanzati:**
- **graphink:** Visualizzazione grafo storia (deprecato ma funzionale)
- **ink-proof:** Testing conformità
- **ink-tools:** Wrapper con watch mode

---

## **✅ Checklist Setup Completo**

- [ ] Estensione `bruno-dias.ink` installata
- [ ] Inklecate o inkjs configurato
- [ ] File `.vscode/settings.json` presente
- [ ] File `.vscode/tasks.json` presente
- [ ] File `.vscode/ink.code-snippets` presente
- [ ] Test compilation funzionante
- [ ] Snippet personalizzati testati
- [ ] Syntax highlighting attivo
- [ ] Word count visibile nella status bar

---

## **📧 Supporto**

Per problemi specifici:
1. **GitHub Issues:** https://github.com/inkle/ink/issues
2. **VS Code Ink Extension:** https://github.com/bruno-dias/vscode-ink/issues
3. **Community Discord:** https://discord.gg/inkle

---

**🎮 Buona scrittura della tua avventura in Corridor 2193!**
