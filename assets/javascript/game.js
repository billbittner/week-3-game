
var i;
var game = {
	wins: 0,
	wordsLibrary: ["bojackson", "gretzky", "sissors"],
	guessesRemaining: 10,
	solution: "",
	lettersToGuess: [],
	hiddenSolution: [],
	wrongGuesses: [],
	correctGuesses: [],
	startNewGame: function() {
		//reset all the necessary values
		game.guessesRemaining = 10;
		game.solution = "";
		game.lettersToGuess = [];
		game.hiddenSolution = [];
		game.wrongGuesses = [];
		game.correctGuesses = [];
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
		document.getElementById("guessed-letters").textContent = game.wrongGuesses.join(" ");
	},
	removeFromRemainingLetters: function(guess, remainingLetterArray){
		//find ALL indexs of the guessed letter in the remaining-letters array
		var indices = [];
		for (i = 0; i < remainingLetterArray.length; i++) {
			if (remainingLetterArray[i] === guess) indices.push(i);
		};
		console.log("the position(s) of " + guess + " in the remaining-letters array is/are " + indices);
		//remove the guessed letter from the remaining-letters array
		for (i = (indices.length-1); i >= 0; i--) {  //must start from end so index of next target remains accurate after each splice is made
			remainingLetterArray.splice(indices[i], 1);	
		};
		console.log("the remaining-letters array is: " + remainingLetterArray);
	},
	updateCurrentWord: function(guess, solution, currentWord) {
		//find the position(s) of the guessed letter in the solution word
		indices = [];
		for (i = 0; i < solution.length; i++){
			if (solution[i] === guess) indices.push(i);
		};
		console.log("the position(s) of " + guess + " in the solution is " + indices);
		//update the hidden word
		for (i = 0; i < indices.length; i++){
			currentWord[indices[i]] = guess; 
		};
		//display the hidden word
		document.getElementById("current-word").textContent = currentWord.join(" ");
	},
	isGameOver: function(){
		if (game.lettersToGuess.length < 1) {
			//tell the user they won
			alert("yay! you won!");
			//update the wins tally
			game.wins += 1;
			//restart the game
			game.startNewGame();
		};
	}

};


game.startNewGame();
//listen for input
document.onkeyup = function(event) {
	//get user input and create lowercase 
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	//check to see if the guess is in the solution array
	if (game.lettersToGuess.indexOf(userInput) >= 0) {  //if guess has at least one hit
		//remove the guess from the array that holds the un-guessed letters
		game.removeFromRemainingLetters(userInput, game.lettersToGuess);
		//update the 'current word' display to show the guessed letter
		game.updateCurrentWord(userInput, game.solution, game.hiddenSolution);
		//add the guessed letter to the correct-guess array
		game.correctGuesses.push(userInput);
		//check to see if the game is over
		game.isGameOver();
	} else {  //if guess is not in the word
		//if the incorrect guess was already guessed
		if (game.wrongGuesses.indexOf(userInput) >= 0) {  
			alert("you already guessed " + userInput);
		//if the correct letter was already guessed.
		} else if (game.correctGuesses.indexOf(userInput) >= 0) {   
			alert("you already correctly guessed " + userInput);
		//if the incorrect guess was not already guessed
		} else { 	
			console.log("guess again")
			//reduce the remaining guesses
			game.guessesRemaining -= 1;
			//update display of amount of guesses remaining
			document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
			//update the letters guessed array
			game.wrongGuesses.push(userInput);
			//display guessed letters
			document.getElementById("guessed-letters").textContent = game.wrongGuesses.join(" ");
		};
	};
};