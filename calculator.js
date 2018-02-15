// Global Variables:
var entries = [];
var temp = "";
var negative = false;
var toClear = false;
var hasDecimal = false;

//Button listener
function input(input){
  //recieve a number -> add to temp
  if (input.match(/[0-9]/)) {
    if (toClear){
      temp = input;
      toClear = false;
    } else {
      temp+=input;
    }
    display(temp);
  }

  //recieve a non-equals symbol -> add temp number to entries[]
  //then add symbol to entries and clear temp
  else if (input.match(/[+-/*]/)){

    // if (entries.length > 0 && !entries[entries.length-1].match(/[0-9]/)){
    //   entries.splice(entries.length, 1);
    // }

    if (negative){
      entries.push('-' + temp);
    } else {
      entries.push(temp);
    }
    entries.push(input);
    temp = "";
    negative = false;
  }
  // If '=' then evaluate the answer
  else if (input === "=") {
    if (negative){
      entries.push('-' + temp);
    } else {
      entries.push(temp);
    }
    temp = "";
    negative = false;
    evaluate();
  } else {
    if (temp === ""){
      return;
    }
  }

  //clear last entry

  //if equals sign then evaluate and display answer
  {
    //interpret negative symbol to change number to negative
  }
  console.log(entries);
}

// Interprets and evaluates the entries array
function evaluate(){
  while (entries.length > 2){
    var val1 = parseInt(entries[0]);
    var val2 = parseInt(entries[2]);
    var operation = entries[1];

    var result = 0;
    if (operation === "+"){
      result = val1 + val2;
    }
    if (operation === "-"){
      result = val1 - val2;
    }
    if (operation === "/"){
      result = val1 / val2;
    }
    if (operation === "*"){
      result = val1 * val2;
    }

    entries.splice(0, 2);
    entries[0] = result;
    temp = result;
    toClear = true;
  }
  display(entries[0]);
  entries = [];
}

function negate(){
  negative = !negative;
  display(temp);
}

// Resets the calculator
function clear(){
  temp = "";
  entries = [];
  display("");
}


// vvvvvvvvvvvvvvvvvvvvvvvvvv Helper Functions vvvvvvvvvvvvvvvvvvvvvvvvvv

// Displays the given text in the output box
function display(text){
  if (negative) {
    document.getElementById("output").value = '-' + text;
  } else {
   document.getElementById("output").value = text;
  }
  console.log("setting text to: ", text);
}
