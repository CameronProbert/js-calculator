// Global Variables:
var entries = [];
var temp = "";
var negative = false;
var toClear = true;
var hasDecimal = false;

//Button listener
function input(input){
  //recieve a number -> add to temp
  if (input.match(/[0-9.]/)) {
    if (temp !== "" && temp.split("").includes(".") && input === "."){
      return;
    }
    if (toClear){
      entries = [];
      if (input === "."){
        temp = "0.";
      } else {
        temp = input;
      }
    } else {
      temp+=input;
    }
    displayTemp(temp);
    toClear = false;
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
    toClear = false;
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
  }

  //clear last entry

  //if equals sign then evaluate and display answer
  {
    //interpret negative symbol to change number to negative
  }
  console.log(entries);
  displayHist();
}

// Interprets and evaluates the entries array
function evaluate(){
  while (entries.length > 2){
    var val1 = parseFloat(entries[0]);
    var val2 = parseFloat(entries[2]);
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
  displayTemp(entries[0]);
  entries = [entries[0]];
}

function negate(){
  negative = !negative;
  displayTemp(temp);
}

// Resets the calculator
function clear(){
  temp = "";
  entries = [];
  displayTemp("");
  displayHist();
}


// vvvvvvvvvvvvvvvvvvvvvvvvvv Helper Functions vvvvvvvvvvvvvvvvvvvvvvvvvv

// Displays the given text in the output box
function displayTemp(text){
  if (negative) {
    document.getElementById("output").value = '-' + text;
  } else {
   document.getElementById("output").value = text;
  }
  console.log("setting text to: ", text);
}

// Displays the given text in the output box
function displayHist(){
  var text = "";
  for (var i = 0; i < entries.length; i++){
    text+=entries[i] + " ";
  }
  document.getElementById("history").innerHTML = text;
}
