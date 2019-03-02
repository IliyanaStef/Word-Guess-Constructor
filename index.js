// Dependencies
var Word = require("./word.js");
var inq = require("inquirer");

// Global variables
var movies = ["CINDERELLA", "PETER PAN", "SLEEPING BEAUTY", "BEAUTY AND THE BEAST", "TOY STORY", "LION KING", "THE LITTLE MERMAID", "TARZAN", "ALICE IN WONDERLAND", "FROZEN"];
var currentMovie;

// Selects the current movie
function selectMovie() {
	var randomMovie = movies[Math.floor(Math.random() * movies.length)];
	currentMovie = new Word(randomMovie);
	currentMovie.wordSetUp();
}

// Initializes values and starts the game
function startGame() {
	selectMovie();
	console.log("\n-----------------------\n  Welcome to Hangman! \n-----------------------\n\nGuess the name of the DISNEY movie!\nYou are allowed 11 incorrect guesses. Good luck!\n\n" + currentMovie.display + "\n");
	guessLetter();
}

// Prompts the user for a guess
function guessLetter() {
	inq.prompt(
		{
			name: "letter",
			type: "input",
			message: "Guess a letter!"
		}
	).then(function(answer) {
		var guess = answer.letter.toUpperCase();
		currentMovie.checkLetter(guess);
		var isWin = currentMovie.checkSolved();

		if (isWin) {
			console.log("\nYOU WIN! : : : YOU WIN! : : : YOU WIN!\n".rainbow);
			return playAgain();
		} else if (currentMovie.numGuesses > 0) {
			guessLetter();
		} else {
			console.log("\nSORRY, YOU LOST!\n\nThe correct answer was: ".red + currentMovie.text + "\n\n");
			return playAgain();
		}
	});
}

function playAgain() {
	inq.prompt(
		{
			name: "playAgain",
			type: "confirm",
			message: "Would you like to play again?"
		}
	).then(function(answer) {
		if (answer.playAgain) {
			startGame();
		} else {
			console.log("\n------------------------------\n Thanks for playing! \n------------------------------\n");
		}
	});
}

startGame();


