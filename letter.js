// Constructor function 
function Letter(letter) {
	this.letter = letter;
	this.isGuessed = false;
	this.display = "";

	// Displays the correctly guessed letter or an underscore when a guess is made
	this.updateLetterDisplay = function() {
		if (this.letter === " ") { 
			this.display = " "; 
			this.isGuessed = true;
		} else if (this.isGuessed) {
			this.display = this.letter;
		} else {
			this.display = "_";
		}
	};
}

module.exports = Letter;