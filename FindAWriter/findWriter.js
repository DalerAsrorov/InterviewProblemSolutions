// get the buffer reader library from npm
var fs  = require("fs");

// Given the line and and index,
// it puplates the array with data
// in the line to store it as a
// series of characters
Array.prototype.populateArray = function(line, index) {
  var combineStr = "";
  for(var i = index + 2; i < line.length; i++) {
    if(line[i] !== ' ') {
      combineStr += line[i];
    }
    else {
      this.push(parseInt(combineStr));
      combineStr = "";
    }
  }

  return this;
}

// Gets the last number from
// the given line and stores it
// to the back of the array
Array.prototype.getLastNumber = function(line) {
  var lastSpace = line.lastIndexOf(' ');
  var subSpace = line.substring(lastSpace + 1);
  this.push(parseInt(subSpace));

  return this;
}

// Given the array of numbers and characters
// it forms a string that contains the final
// results of the parsed data
String.prototype.formString = function(numbers, array) {
  strCollector = "";
  for(var i = 0; i < numbers.length; i++) {
    strCollector += array[numbers[i] - 1];
  }

  return this.concat("", strCollector);
}

// reads the file and invokes the
// required methods to get the
// final results
fs.readFileSync("./sample.txt").toString().split('\n').forEach(function (line) {
    var charCollection = new Array();
    var numbers = new Array();
    var index = 0;
    var finalString = new String("");

    if (line != "") {
       for(var i = 0; i < line.length; i++) {
         charCollection.push(line[i]);
         if(line[i] === '|') {
           index = i;
           charCollection.pop(); // take out the '|' from the array of the collected characters
           break;
         }
    }

   numbers.populateArray(line, index);
   numbers.getLastNumber(line);
   finalString = finalString.formString(numbers, charCollection);

   // prints out in this format
   console.log(finalString);

  }
});
