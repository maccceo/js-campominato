// Il computer deve generare 16 numeri casuali da 1 a 100.
// In seguito deve chiedere all’utente di inserire un numero da 1 a 100 alla volta, se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali.
// Con difficoltà 0=> da 1 a 100, con difficoltà 1 => da 1 a 80 con difficoltà 2=> da 1 a 50

var mine, result, difficulty, mineQuantity, maxCorrectNumers;

// chiedo la difficoltà
difficulty = prompt('Inserisci la difficoltà, F (facile), M (medio) o D (difficile)');
difficulty = difficulty.toLowerCase();
if (difficulty == 'f')			difficulty = 100;
else if (difficulty == 'm')		difficulty = 80;
else if (difficulty == 'd')		difficulty = 50;
else							alert('Uff, non gioco più con te :(');
console.log('Difficoltà: ' + difficulty);

// genero 16 mine
mineQuantity = 16;
mine = mineGenerator(mineQuantity, difficulty);

// faccio inserire il numero dall'utente, guardo se è una mina, ritorno il punteggio
result = gameChecker(mineQuantity, difficulty);

// stampo il punteggio
if (result === "won") {
	console.log('CLAMOROSO! Hai vinto!');
	alert('CLAMOROSO! Hai vinto!');
} else {
	console.log('Partita finita! Punteggio: ' + result);
	alert('Partita finita! Punteggio: ' + result);
}





// # # FUNZIONI # #
function mineGenerator(mineQuantity, maxValue) {
	var numGenerated, array = [];

	for (var i = 1; i < mineQuantity; i++) {
		//genero un numero
		numGenerated = Math.floor(Math.random() * maxValue + 1);
		//controllo che non sia già stato generato in precedenza
		for (var i = 0; i < array.length; i++) {
				if (array[i] === numGenerated) {
					numGenerated = Math.floor(Math.random() * maxValue + 1);
					// ricontrollo da capo per evitare che il numero nuovo sia uguale a uno precedente
					i = -1;
					console.log(numGenerated + ' doppione, genero nuovo numero e riparto a controllare da capo');
				}
			}
		//pusho il numero generato (sicuramente non doppio) nell'array
		array.push(numGenerated)
	}
	//ordino per comodità
	array = array.sort();
	console.log('mine generate: ' + array);
	return array;
}



function gameChecker(mineQuantity, difficulty) {
	var counter = 0, input, inputArray = [], correctInput = false, duplicate = false;
	var maxCorrectNumers = difficulty - mineQuantity;

	// faccio inserire solo se non ha già inserito tutti i numeri inseribili (sarà..)
	while (counter < maxCorrectNumers) {
		input = parseInt(prompt('Inserisci un numero:'));

		// controlli all'input iserito
		while (correctInput === false) {
			// accendo una flag se l'utente aveva già inserito quel numero
			for (var i = 0; i < inputArray.length; i++) {
				if (inputArray[i] === input)		duplicate = true;
			}
			// adesso gli faccio rifare
			if (duplicate === true) {
				duplicate = false;
				console.log(input + " l'avevi già messo");
				input = parseInt(prompt('Avevi già inserito quel numero, riprova:'));
			}
			// controllo che l'utente abbia inserito soltanto un numero
			else if (isNaN(input)) {
				input = parseInt(prompt('Inserisci un numero:'));
			}
			// blocco intervallo input da 1 a quanto consente la difficoltà scelta all'inizio
			else if (input > difficulty || input < 1) {
				input = parseInt(prompt('Inserisci un numero da 1 a ' + difficulty + ':'));
			}
			// tutto ok, usciamo dal while di controllo
			else {
				correctInput = true;
			}
		}
		correctInput = false;
		console.log('inserito ' + input);
		inputArray.push(input);

		// verifico se l'input è tra le mine
		for (var i = 0; i < mine.length; i++) {
			// se si partita finita
			if (mine[i] === input) 		return counter;
		}
		// se no aumenta punteggio
		counter++;
	}
	// return solo se hai inserito tutti i valori che potevi mettere
	return "won";
}