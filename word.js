// Dependencies
var Letter = require("./letter.js");
var colors = require("colors");

// Constructor function to creat the word objects
function Word(text) {
	this.text = text;
	this.numGuesses = 11;
	this.letters = [];
	this.guessed = [];
	this.display = "";

	// Parses the current word and pushes letters into an array
	this.parseWord = function() {
		for (var i = 0; i < this.text.length; i++) {
			var textLetter = new Letter(this.text[i]);
			textLetter.updateLetterDisplay();
			this.letters.push(textLetter);
		}
	};

	// Updates the display
	this.updateWordDisplay = function() {
		this.display = "";
		for (var i = 0; i < this.letters.length; i++) {
			this.display += this.letters[i].display + " ";
		}
	};

  	// Searches for underscores in this.display to determine if the word has been solved or not
	this.checkSolved = function() {
		return this.display.indexOf("_") < 0;
	};
}

Word.prototype.wordSetUp = function() {
	this.parseWord();
	this.updateWordDisplay();
};

// Checks the guessed letter against the letters array
Word.prototype.checkLetter = function(guess) {
	var isCorrect = false;

	for (var i = 0; i < this.letters.length; i++) {
		if (guess === this.letters[i].letter) {
			this.letters[i].isGuessed = true;
			this.letters[i].updateLetterDisplay();
			isCorrect = true;
		} else {
			this.letters[i].isGuessed = false;
		}
	}

	if (isCorrect) {
		this.updateWordDisplay();
		console.log("\nCORRECT!\n\n".green + this.display + "\n");
	} else {
		this.updateWordDisplay();
		this.numGuesses--;
		this.guessed.push(guess);

		var guessedDisplay = this.guessed.join(" ");
		console.log("\nINCORRECT!\n\n".red + this.display + "\n\nYou have " + this.numGuesses + " guesses remaining.\nLetters already guessed: " + guessedDisplay + "\n");
	}
};

module.exports = Word;

