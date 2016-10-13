
//declare variables
var i, indices;
//create game object
var game = {
	wins: 0,
	solutionLibrary: [
		{word: "football", sound: 'assets/sounds/football.wav', pic: 'assets/images/football.jpg'},
		{word: "baseball", sound: 'assets/sounds/baseball.wav', pic: 'assets/images/baseball.jpg'},
		{word: "soccer", sound: 'assets/sounds/soccer.wav', pic: 'assets/images/soccer.jpg'},
		{word: "tennis", sound: 'assets/sounds/tennis.wav', pic: 'assets/images/tennis.jpg'}
	],
	letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	guessesRemaining: 10,
	solutionWord: "",
	lettersToGuess: [],
	hiddenSolution: [],
	wrongGuesses: [],
	correctGuesses: [],
	startNewGame: function() {
		//reset all the necessary values
		game.guessesRemaining = 10;
		// game.solutionWord = "";
		game.lettersToGuess = [];
		game.hiddenSolution = [];
		game.wrongGuesses = [];
		game.correctGuesses = [];
		//choose a word from the library
		game.solution = game.solutionLibrary[Math.floor(Math.random()*game.solutionLibrary.length)];
		game.solutionWord = game.solution.word;
		//create two arrays, one of the solution letters and one of underscores
		for (i = 0; i < game.solutionWord.length; i++){
			game.lettersToGuess.push(game.solutionWord[i]);
			game.hiddenSolution.push("_");
		}
		//display the wins
		document.getElementById("wins-counter").textContent = ("Wins: " + game.wins);
		//display the current word (as underscores)
		document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
		//display the number of Guesses Remaining
		document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
		//display the letters already guessed
		document.getElementById("guessed-letters").textContent = "none";
	},
	processGuess: function(guess){
		var userInput = String.fromCharCode(guess).toLowerCase();
		//check to see if the guess is in the array of remaining letters
		if (game.lettersToGuess.indexOf(userInput) >= 0) {  
			//remove the guess from the array that holds the letters to guess
			game.removeFromRemainingLetters(userInput, game.lettersToGuess);
			//update the hidden solution
			game.hiddenSolution = game.updateCurrentWord(userInput, game.solutionWord, game.hiddenSolution);
			//display the hidden solution
			document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
			//add the guessed letter to the correct-guess array
			game.correctGuesses.push(userInput);
			//check to see if the game is over
			if (game.lettersToGuess.length === 0) {
				//change picture
				document.getElementById("picture").src = game.solution.pic;
				//play sound
				var audio = new Audio(game.solution.sound);
				audio.play();
				//display the answer 
				document.getElementById("answer").textContent = game.solution.word;
				//update the wins tally
				game.wins += 1;
				//restart the game
				game.startNewGame();
			};
		//if guess is not in the array
		} else {  
			//if the guess was already guessed
			if ((game.wrongGuesses.indexOf(userInput) >= 0) || (game.correctGuesses.indexOf(userInput) >= 0)) { 
				document.getElementById("directions").textContent = "you already guessed " + userInput;
			} else { 	
				document.getElementById("directions").textContent = "guess again";
				//reduce the remaining guesses
				game.guessesRemaining -= 1;
				//update display of amount of guesses remaining
				document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
				//update the letters guessed array
				game.wrongGuesses.push(userInput);
				//display guessed letters
				document.getElementById("guessed-letters").textContent = game.wrongGuesses.join(" ");
			};
			//if no guesses remain then game over
			if (game.guessesRemaining === 0) {
				alert("Game over, man! Game over!");
				//reset the wins counter
				game.wins = 0;
				//restart game
				game.startNewGame();
			};
		};
	},
	// isLetter: function(guess){
	// 	var result = false;
	// 	for (i = 0; i < game.letters.length; i++) {
	// 		if (guess === game.letters[i]) result = true;
	// 	};
	// 	return result;
	// },
	removeFromRemainingLetters: function(guess, remainingLetterArray){
		//find ALL indexs of the guessed letter in the remaining-letters array
		indices = [];
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
	updateCurrentWord: function(guess, answer, currentWord) {
		//find the position(s) of the guessed letter in the solution word
		indices = [];
		for (i = 0; i < answer.length; i++){
			if (answer[i] === guess) indices.push(i);
		};
		console.log("the position(s) of " + guess + " in the solution is " + indices);
		//update the hidden word
		for (i = 0; i < indices.length; i++){
			currentWord[indices[i]] = guess; 
		};
		return currentWord;
	}

};


game.startNewGame();
//listen for input
document.onkeyup = function(event) {
	//get user input and create lowercase 
	game.processGuess(event.keyCode);
};