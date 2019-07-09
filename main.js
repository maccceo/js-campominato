// Il computer deve generare 16 numeri casuali da 1 a 100.
// In seguito deve chiedere all’utente di inserire un numero da 1 a 100 alla volta, se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// COSE DA FARE:
// - verificare che l'utente non inserisca 2 volte lo stesso numero

var mine, result;


// genero 16 mine
var mineQuantity = 16;
mine = mineGenerator(mineQuantity);
// faccio inserire il numero dall'utente, guardo se è una mina, ritorno il punteggio
result = gameChecker();
// stampo il punteggio
if (result === "won")	alert('CLAMOROSO! Hai vinto!');
else					alert('Partita finita! Punteggio: ' + result);




// # # FUNZIONI # #
function mineGenerator(mineQuantity) {
	var numGenerated, array = [];

	for (var i = 1; i < mineQuantity; i++) {
		//genero un numero
		numGenerated = Math.floor(Math.random() * 100 + 1);
		//controllo che non sia già stato generato in precedenza
		for (var i = 0; i < array.length; i++) {
				if (array[i] === numGenerated) {
					numGenerated = Math.floor(Math.random() * 100 + 1);
					// ricontrollo da capo per evitare che il numero nuovo sia uguale a uno precedente
					i = -1;
					console.log(numGenerated + ' doppione, riparto a controllare da capo');
				}
			}
		//pusho il numero generato (sicuramente non doppio) nell'array
		array.push(numGenerated)
	}
	//ordino per comodità, non necessario
	array = array.sort();
	console.log('mine generate: ' + array);
	return array;
}


function gameChecker() {
	var gameOver = false, counter = 0, input;

	while (gameOver === false) {

		// controllo che non abbia già inserito tutti i numeri possibili
		if (counter === 84) {
			return "won";
		}

		input = parseInt(prompt('Inserisci un numero:'));
		console.log('inserito ' + input);

		// verifico se è tra le mine
		for (var i = 0; i < mine.length; i++) {
			// se si partita finita
			if (mine[i] === input) 		return counter;
		}
		// se no aumenta punteggio
		counter++;
	}
}