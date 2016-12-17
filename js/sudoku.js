var grid = makeGrid();
fillGrid(grid);
displayGrid(grid);

function makeGrid() {
  temp = new Array(9);
  for(var i = 0; i < 9; i++) {
    temp[i] = new Array(9);
  }
  return temp;
}

function fillGrid(arrayToFill) {
  var puzzle = [5,3,,,7,,,,,6,,,1,9,5,,,,,9,8,,,,,6,,8,,,,6,,,,3,4,,,8,,3,,,1,7,
  ,,,2,,,,6,,6,,,,,2,8,,,,,4,1,9,,,5,,,,,8,,,7,9];
  for(var i = 0; i < arrayToFill.length; i++) {
    for(var j = 0; j < arrayToFill[i].length; j++) {
      arrayToFill[i][j] = puzzle[9*i+j];
    }
  }
}

function displayGrid(arrayToDisplay) {
  var table = "<table><tbody><tr>";
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      var ident;
      if(i % 3 == 0 && j % 3 == 0) {
        ident = "tl";
      }
      else if(i == 8 && j % 3 == 0) {
        ident = "bl";
      }
      else if(i % 3 == 0 && j == 8) {
        ident = "tr";
      }
      else if(i == 8 && j == 8) {
        ident = "br";
      }
      else if(i % 3 == 0) {
        ident = "tt";
      }
      else if((i % 3 == 1 || i % 3 == 2) && j % 3 == 0) {
        ident = "ll";
      }
      else if(i == 8) {
        ident = "bb";
      }
      else if(j == 8) {
        ident = "rr";
      }
      else {
        ident = "ne"
      }
      if(typeof arrayToDisplay[i][j] != 'undefined') {
        table += "<td class = '" + ident + "'><input size='1', class = 'stone', id = 't" + i + j + "', value = '" + arrayToDisplay[i][j] + "', readonly></td>";
      }
      else {
        table += "<td class = '" + ident + "'><input maxlength = 1, size='1', id = 't" + i + j + "', onkeypress='return isNumberKey(event)'></td>";
      }
    }
    table += "</tr><tr>";
  }
  table += "</tr></tbody></table>";
  document.write(table);
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 49 || charCode > 57)
        return false;
    return true;
}

function sort(arr) {
  return arr.concat().sort();
}

function updateGrid(arrayToUpdate) {
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      tempid = "t" + i + j;
      arrayToUpdate[i][j] = document.getElementById(tempid).value;
    }
  }
  grid = arrayToUpdate;
  return;
}

function checkGrid(arrayToCheck) {
  if(checkRows(arrayToCheck) && checkCollumns(arrayToCheck) && checkSquares(arrayToCheck)) {
    alert("SOLVED!");
  }
  else {
    alert("LOSER!");
  }
}

function checkRows(arrayToCheck) {
  validity = true;
  for(var i = 0; i < 9; i++) {
    var temp = sort(arrayToCheck[i]);
    for(var j = 0; j < 8; j++) {
      if(temp[j] == temp[j+1] || temp[j] == "" || temp[8] == "") {
        validity = false;
      }
    }
  }
  return validity;
}

function checkCollumns(arrayToCheck) {
  validity = true;
  for(var j = 0; j < 9; j++) {
    var temp = new Array(9);
    for(var i = 0; i < 9; i++) {
      temp.push(arrayToCheck[i][j]);
    }
    var sorted = sort(temp);
    for(var k = 0; k < 8; k++) {
      if(sorted[k] == sorted[k+1] || sorted[k] == "" || sorted[8] == "") {
        validity = false;
      }
    }
  }
  return validity;
}

function checkSquares(arrayToCheck) {
  validity = true;
  for(var i = 0; i < 9; i = i + 3) {
    for(var j = 0; j < 9; j = j + 3) {
      var temp = new Array(9);
      for(var m = 0; m < 3; m++) {
        for(var n = 0; n < 3; n++) {
          temp.push(arrayToCheck[i+m][j+n])
        }
      }
      var sorted = sort(temp);
      for(var k = 0; k < 8; k++) {
        if(sorted[k] == sorted[k+1] || sorted[k] == "" || sorted[8] == "") {
          validity = false;
        }
      }
    }
  }
  return validity;
}
