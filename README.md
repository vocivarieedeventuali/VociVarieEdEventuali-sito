# Sito web — Associazione Teatrale [NOME]

Sito statico (HTML/CSS/JS puro, nessun framework, nessuna build necessaria)
pronto per essere pubblicato gratis su **GitHub Pages**.

## Struttura del progetto

```
teatro-sito/
├── index.html          ← tutta la pagina (sezioni: home, chi siamo, spettacoli, galleria, contatti)
├── css/style.css        ← stile del sito, con variabili di tema in alto al file
├── js/main.js            ← menu mobile, evidenziazione voce menu, lightbox galleria, anno footer
├── assets/
│   ├── favicon.svg       ← icona del sito (maschera teatrale), placeholder
│   └── gallery/          ← immagini placeholder della galleria (foto-1..6.svg, video-1..2.svg)
└── README.md             ← questo file
```

Non c'è build, npm, o compilazione: è tutto pronto all'uso, apri `index.html`
nel browser e funziona già.

## 1. Personalizzare i contenuti

Cerca nel progetto le occorrenze dei seguenti segnaposto e sostituiscile con
i dati reali (con "Trova e sostituisci" del tuo editor, es. VS Code
`Ctrl/Cmd+Shift+H`):

| Segnaposto                     | Dove si trova                          | Sostituisci con |
|---------------------------------|-----------------------------------------|------------------|
| `[NOME]` / `[NOME ASSOCIAZIONE]` | `index.html` (title, header, hero, footer) | Il nome reale della compagnia |
| `info@nomeassociazione.it`      | `index.html` (link `mailto:`)          | La vostra email di contatto reale |
| `[ANNO DI FONDAZIONE]`, `[ANNO]` | Sezione "Chi siamo"                    | Anno di fondazione |
| `[N]`                           | Sezione "Chi siamo" (statistiche)      | Numeri reali (anni attività, spettacoli, soci) |
| `Via Esempio 1`, `[Città]`, `[Provincia]`, `[+39 000 000 0000]` | Sezione "Contatti" e footer | Indirizzo e telefono reali |
| `href="#"` nei link social      | Sezione "Contatti"                     | URL reali di Facebook/Instagram (o rimuovi la riga se non li usate) |

Il testo di presentazione (hero e "Chi siamo") è generico: riscrivilo con la
vera storia/missione dell'associazione — sono marcati con un commento
`<!-- PERSONALIZZA: ... -->` nell'HTML per trovarli rapidamente.

## 2. Aggiungere/modificare gli spettacoli

Ogni spettacolo è un blocco `<article class="evento-card">...</article>`
dentro la sezione `id="spettacoli"` in `index.html`. Per aggiungerne uno:

1. Copia un intero blocco `<article class="evento-card">...</article>` esistente.
2. Incollalo prima o dopo gli altri (l'ordine in cui compaiono nell'HTML è
   l'ordine in cui appaiono sul sito — mettili in ordine cronologico).
3. Aggiorna giorno/mese, titolo, luogo/orario, descrizione e l'oggetto della
   email nel link `mailto:` di "Prenota".

Per rimuovere uno spettacolo passato, elimina semplicemente il suo blocco
`<article>`.

## 3. Sostituire le immagini della galleria

Le immagini in `assets/gallery/` (foto-1.svg … foto-6.svg, video-1.svg,
video-2.svg) sono **placeholder generati**, pensati solo per far vedere come
sarà il sito. Per usare foto vere:

- Più semplice: rinomina le tue foto esattamente come i placeholder
  (es. `foto-1.jpg` → rinominala `foto-1.svg`... in realtà più pulito è
  cambiare l'estensione nel file HTML, vedi sotto).
- Modo consigliato: metti le tue foto in `assets/gallery/` (es. `spettacolo-2026-01.jpg`)
  e aggiorna in `index.html` gli attributi `src="assets/gallery/foto-1.svg"`
  e `data-full="assets/gallery/foto-1.svg"` con il nuovo nome file, per ogni
  `<div class="galleria-item">`.
- Per i video: il modo più semplice è sostituire l'intero
  `<div class="galleria-item">` con un embed diretto, ad esempio:

```html
<div class="galleria-item">
  <iframe src="https://www.youtube.com/embed/ID_DEL_VIDEO"
          style="width:100%;height:100%;border:0" allowfullscreen></iframe>
</div>
```

Consiglio: comprimi le foto (es. con [squoosh.app](https://squoosh.app) o
`imagemagick`) prima di caricarle, per mantenere il sito veloce — immagini
sotto 300-400 KB l'una vanno benissimo per il web.

## 4. Cambiare colori e font

Tutto il tema è controllato dalle variabili CSS in cima a `css/style.css`
(sezione `:root { ... }`): cambia `--color-primary`, `--color-accent`,
`--font-heading` ecc. e si aggiorna automaticamente tutto il sito, senza
dover toccare il resto del CSS.

## 5. Pubblicare gratis su GitHub Pages

Hai già un account GitHub, quindi:

1. Crea un nuovo repository su GitHub (es. `associazione-teatrale-sito`),
   pubblico, senza inizializzarlo con un README (ne hai già uno).
2. Da questa cartella locale (`teatro-sito/`), esegui:

   ```bash
   git init
   git add .
   git commit -m "Primo commit: sito associazione teatrale"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/associazione-teatrale-sito.git
   git push -u origin main
   ```

3. Su GitHub, vai in **Settings → Pages** del repository.
4. In "Build and deployment" → "Source", seleziona **Deploy from a branch**,
   scegli il branch `main` e la cartella `/ (root)`, poi salva.
5. Dopo un minuto o due il sito sarà online all'indirizzo:

   ```
   https://TUO-USERNAME.github.io/associazione-teatrale-sito/
   ```

   (GitHub mostra l'URL esatto in cima alla stessa pagina Settings → Pages
   una volta attivato il deploy).

### Dominio personalizzato (opzionale, se in futuro ne comprate uno)

Se l'associazione acquista un dominio (es. `associazioneteatrale.it`):

1. Nel pannello DNS del tuo provider, crea un record `CNAME` che punti
   `www` (o il sottodominio scelto) a `TUO-USERNAME.github.io`.
2. Nella stessa pagina **Settings → Pages**, inserisci il dominio nel campo
   "Custom domain" e salva: GitHub creerà un file `CNAME` nel repository.
3. Attendi la propagazione DNS (di solito da pochi minuti a qualche ora) —
   GitHub Pages fornisce anche un certificato HTTPS gratuito automatico una
   volta verificato il dominio.

L'hosting su GitHub Pages resta gratuito in ogni caso, con o senza dominio
personalizzato.

## 6. Aggiornamenti futuri

Ogni volta che modifichi i file localmente, per pubblicare le modifiche
basta:

```bash
git add .
git commit -m "Descrizione della modifica"
git push
```

GitHub Pages rigenera il sito pubblicato in automatico dopo ogni push sul
branch `main` (di solito entro un minuto).
