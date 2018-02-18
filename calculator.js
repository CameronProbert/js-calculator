// Global Variables:

/*Saved numbers, ready to process*/
var entries = [];
/*The number the calculator displays*/
var temp = "";
/*Should a '-' be added when saving temp to entries*/
var negative = false;
/*Entering a number should clear the temp array
Used after pressing the equals button*/
var toClear = true;


//Buttons input here (except clear and positive/negative)
function input(input) {
	// Check for input and call appropriate method
	if (input.match(/[0-9.]/)) {
		addNumeral(input);
	} else if (input.match(/[+-/*]/)) {
		addOperation(input);
	} else if (input === "=") {
		evaluate();
	}

	//Redisplay calculator
	console.log(entries);
	displayHist();
	displayTemp();
}


// Saves the temp into the entries array
function saveValue() {
	if (negative) {
		entries.push('-' + temp);
	} else {
		entries.push(temp);
	}
	temp = "";
	negative = false;
}

// Interprets and evaluates the entries array
function evaluate() {
	//First, save the current temp value
	saveValue();

	// Loop through each operation
	while (entries.length > 2) {
		var val1 = parseFloat(entries[0]);
		var val2 = parseFloat(entries[2]);
		var operation = entries[1];

		var result = 0;
		if (operation === "+") {
			result = val1 + val2;
		}
		if (operation === "-") {
			result = val1 - val2;
		}
		if (operation === "/") {
			result = val1 / val2;
		}
		if (operation === "*") {
			result = val1 * val2;
		}

		entries.splice(0, 2);
		entries[0] = result;
		temp = result;
		toClear = true;
	}

	// Clear the entries array (The answer is in temp)
	entries = [];
}

// Sets the 'negative' flag
function negate() {
	negative = !negative;
	displayTemp(temp);
}

// Resets the calculator
function clear() {
	temp = "";
	entries = [];
	displayTemp("");
	displayHist();
}

// Adds a numeral or period to the temp display
function addNumeral(input) {
	// If there is already a period then don't add another
	if (temp !== "" && temp.split("").includes(".") && input === ".") {
		return;
	}

	if (toClear) {
		if (input === ".") {
			temp = "0.";
		} else {
			temp = input;
		}
	} else {
		temp += input;
	}
	//displayTemp(temp);
	toClear = false;
}


// Adds a mathematical operation to the entries array
function addOperation(input) {
	if (entries.length > 0 && entries[entries.length - 1].match(/[^0-9]/)) {
		return;
	}
	saveValue();
	entries.push(input);
	temp = "";
	negative = false;
	toClear = false;
}


// vvvvvvvvvvvvvvvvvvvvvvvvvv Helper Functions vvvvvvvvvvvvvvvvvvvvvvvvvv

// Sets the value of the temp output box
function displayTemp() {
	if (negative) {
		document.getElementById("output").value = '-' + temp;
	} else {
		document.getElementById("output").value = temp;
	}
	console.log("setting text to: ", temp);
}

// Displays the given text in the history box
function displayHist() {
	var text = "";
	for (var i = 0; i < entries.length; i++) {
		text += entries[i] + " ";
	}
	document.getElementById("history").innerHTML = text;
}
