
var i;
var game = {
	wins: 0,
	wordsLibrary: ["bojackson", "gretzky"],
	guessesRemaining: 10,
	solution: "",
	lettersToGuess: [],
	hiddenSolution: [],
	guessedLetters: [],
	startNewGame: function() {
		//reset all the necessary values
		game.guessesRemaining = 10;
		game.solution = "";
		game.lettersToGuess = [];
		game.hiddenSolution = [];
		game.guessedLetters = [];
		//choose a word from the library
		game.solution = game.wordsLibrary[Math.floor(Math.random()*game.wordsLibrary.length)];
		//create two arrays, one of the solution letters and one of underscores
		for (i = 0; i < game.solution.length; i++){
			game.lettersToGuess.push(game.solution[i]);
			game.hiddenSolution.push("_");
		}
		//display the wins
		document.getElementById("wins-counter").textContent = ("Wins: " + game.wins);
		//display the current word (as underscores)
		document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
		//display the number of Guesses Remaining
		document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
		//display the letters already guessed
		document.getElementById("guessed-letters").textContent = game.guessedLetters.join(" ");
	}
};


game.startNewGame();
//listen for input
document.onkeyup = function(event) {
	//get user input and create lowercase 
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	//check to see if the guess is in the solution array
	if (game.lettersToGuess.indexOf(userInput) >= 0) {  //if guess is correct
		//find the index of the guessed letter in the remaining letters array
		var n = game.lettersToGuess.indexOf(userInput);
		console.log("the position of " + userInput + " in the remaining-letters array is " + n);
		//remove the guessed letter from the remaining letters array
		game.lettersToGuess.splice(n, 1);
		console.log("the remaining-letters array is: " + game.lettersToGuess);
		//find the position of the guessed letter in the solution word
		n = game.solution.search(userInput);
		console.log("the position of " + userInput + " in the solution is " + n);
		//update the hidden word
		game.hiddenSolution[n] = userInput;
		//display the hidden word
		document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
		//check to see if the game is won
		if (game.lettersToGuess.length < 1) {
			//tell the user they won
			alert("yay! you won!");
			//update the wins tally
			game.wins += 1;
			//restart the game
			game.startNewGame();
		}
	} else {  //if guess is not in the word
		if (game.guessedLetters.indexOf(userInput) >= 0) {  //if the incorrect guess was already guessed
			alert("you already guessed " + userInput);
		} else { //if the incorrect guess was not already guessed
			console.log("guess again")
			//reduce the remaining guesses
			game.guessesRemaining -= 1;
			//update display of amount of guesses remaining
			document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
			//update the letters guessed array
			game.guessedLetters.push(userInput);
			//display guessed letters
			document.getElementById("guessed-letters").textContent = game.guessedLetters.join(" ");
		};
	};
};