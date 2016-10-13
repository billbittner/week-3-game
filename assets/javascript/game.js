
var i;

var indices;

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
		game.guessesRemaining = 10;
		game.lettersToGuess = [];
		game.hiddenSolution = [];
		game.wrongGuesses = [];
		game.correctGuesses = [];
		game.solution = game.solutionLibrary[Math.floor(Math.random()*game.solutionLibrary.length)];
		game.solutionWord = game.solution.word;
		for (i = 0; i < game.solutionWord.length; i++){
			game.lettersToGuess.push(game.solutionWord[i]);
			game.hiddenSolution.push("_");
		}
		document.getElementById("wins-counter").textContent = ("Wins: " + game.wins);
		document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
		document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
		document.getElementById("guessed-letters").textContent = "none";
	},
	processGuess: function(guess){
		var userInput = String.fromCharCode(guess).toLowerCase();
		if (game.lettersToGuess.indexOf(userInput) >= 0) {  
			game.removeFromRemainingLetters(userInput, game.lettersToGuess);
			game.hiddenSolution = game.updateCurrentWord(userInput, game.solutionWord, game.hiddenSolution);
			document.getElementById("current-word").textContent = game.hiddenSolution.join(" ");
			game.correctGuesses.push(userInput);
			if (game.lettersToGuess.length === 0) {
				document.getElementById("picture").src = game.solution.pic;
				var audio = new Audio(game.solution.sound);
				audio.play();
				document.getElementById("answer").textContent = game.solution.word;
				document.getElementById("directions").textContent = "You won!  Play Again!";
				game.wins += 1;
				game.startNewGame();
			};
		} else {  
			if ((game.wrongGuesses.indexOf(userInput) >= 0) || (game.correctGuesses.indexOf(userInput) >= 0)) { 
				document.getElementById("directions").textContent = "you already guessed " + userInput;
			} else { 	
				document.getElementById("directions").textContent = "guess again";
				game.guessesRemaining -= 1;
				document.getElementById("guesses-remaining").textContent = game.guessesRemaining;
				game.wrongGuesses.push(userInput);
				document.getElementById("guessed-letters").textContent = game.wrongGuesses.join(" ").toUpperCase();
			};
			if (game.guessesRemaining === 0) {
				alert("Game over, man! Game over!");
				game.wins = 0;
				game.startNewGame();
			};
		};
	},
	removeFromRemainingLetters: function(guess, remainingLetterArray){
		indices = [];
		for (i = 0; i < remainingLetterArray.length; i++) {
			if (remainingLetterArray[i] === guess) indices.push(i);
		};
		console.log("the position(s) of " + guess + " in the remaining-letters array is/are " + indices);
		for (i = (indices.length-1); i >= 0; i--) {
			remainingLetterArray.splice(indices[i], 1);	
		};
		console.log("the remaining-letters array is: " + remainingLetterArray);
	},
	updateCurrentWord: function(guess, answer, currentWord) {
		indices = [];
		for (i = 0; i < answer.length; i++){
			if (answer[i] === guess) indices.push(i);
		};
		console.log("the position(s) of " + guess + " in the solution is " + indices);
		for (i = 0; i < indices.length; i++){
			currentWord[indices[i]] = guess; 
		};
		return currentWord;
	}
};

game.startNewGame();

document.onkeyup = function(event) {
	game.processGuess(event.keyCode);
};