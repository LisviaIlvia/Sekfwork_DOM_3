
// Bottoni
let play = document.querySelector('#play');
let pause = document.querySelector('#pause');
let reset = document.querySelector('#reset');

// Display
let display = document.querySelector('#countdown-display');
let container = document.querySelector('#countdown-container');

let count; // Variabile per l'ID dell'intervallo
let statoCorrente;  // Variabile per i secondi correnti
let tempoIniziale;
let isRunning = false; // Variabile per tracciare lo stato del countdown




play.addEventListener('click', function () {
    if (!isRunning) {
        if (display.innerHTML === '') {
            statoCorrente = document.querySelector('#input').value || display.innerHTML;  // Prende il valore corrente dall'input
            if (statoCorrente <= 0 || statoCorrente === ' ') {
                alert('Inserisci un numero maggiore di zero');
                document.querySelector('#input').value = '';
                return;
            }
        }
        tempoIniziale = statoCorrente;
        startCountdown();
    }

});

pause.addEventListener('click', () => {
    clearInterval(count); // Ferma l'intervallo
    isRunning = false; // Imposta lo stato a "non in esecuzione"
});

reset.addEventListener('click', () => {
    clearInterval(count); // Ferma l'intervallo
    isRunning = false; // Imposta lo stato a "non in esecuzione"
    document.querySelector('#input').value = ''; // Resetta il valore del countdown
    display.innerHTML = ''; // Aggiorna il display
    container.style.borderColor = "transparent"; // imposto il colore del display a trasparente
});

// La funzione setInterval(function, delay) è utilizzata per eseguire una determinata azione ripetutamente, a intervalli regolari di tempo. 
// Prende in input due parametri: 
// - function(){}: la funzione o il blocco di codice che vuoi eseguire ripetutamente
// - delay:  l'intervallo di tempo (in millisecondi) tra ogni esecuzione della funzione
// clearInterval(): per fermare l'esecuzione di setInterval(), si usa la funzione clearInterval() insieme a un identificatore (ID) che setInterval() restituisce. In questo caso l'identificatore è 'count'.

function startCountdown() {
    if (!isRunning) {
        count = setInterval(function () {
            if (statoCorrente > 0) {
                statoCorrente--;
                display.innerHTML = statoCorrente;
                // Chiamo la funzione che cambia il colore del bordo man mano che il tempo diminuisce
                cambiaColore(statoCorrente, tempoIniziale);
            } else {
                clearInterval(count);
                display.innerHTML = "Tempo scaduto!";
                container.style.borderColor = "gray"; // imposto il colore finale
                isRunning = false;
            }
        }, 1000);
        isRunning = true;
    }
}

function cambiaColore(tempoTrascorso, tempoIniziale) {

    let percentuale = tempoTrascorso / tempoIniziale;

    if (percentuale > 0.75) {
        container.style.borderColor = "green"; // Verde per più del 75%
    } else if (percentuale > 0.5 && percentuale <= 0.75) {
        container.style.borderColor = "yellow"; // Giallo tra 50% e 75%
    } else if (percentuale > 0.2 && percentuale <= 0.5) {
        container.style.borderColor = "orange"; // Arancione tra 20% e 50%
    } else if (percentuale <= 0.2) {
        container.style.borderColor = "red"; // Rosso per meno del 20%
    }
}







