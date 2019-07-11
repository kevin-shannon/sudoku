var grid = make2d(9);
displayGrid(grid);
var bitMatrix = initBitMatrix();
var nodeMatrix = initNodeMatrix();
makeDonut(bitMatrix, nodeMatrix);
bitMatrix = null;

function displayGrid(arrayToDisplay) {
  var table = "<table><tbody><tr>";
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      var ident;
      if(i % 3 == 0 && j % 3 == 0)
        ident = "tl";
      else if(i == 8 && j % 3 == 0)
        ident = "bl";
      else if(i % 3 == 0 && j == 8)
        ident = "tr";
      else if(i == 8 && j == 8)
        ident = "br";
      else if(i % 3 == 0)
        ident = "tt";
      else if((i % 3 == 1 || i % 3 == 2) && j % 3 == 0)
        ident = "ll";
      else if(i == 8)
        ident = "bb";
      else if(j == 8)
        ident = "rr";
      else
        ident = "ne"
      if(typeof arrayToDisplay[i][j] != 'undefined')
        table += "<td class = '" + ident + "'><input size='1', class = 'stone', id = 't" + i + j + "', value = '" + arrayToDisplay[i][j] + "', readonly></td>";
      else
        table += "<td class = '" + ident + "'><input autocomplete='new-password', maxlength = 1, size='1', id = 't" + i + j + "', onkeypress='document.getElementById(\"t" + i + j + "\").value = \"\"; return isNumberKey(event)'></td>";
    }
    table += "</tr><tr>";
  }
  table += "</tr></tbody></table>";
  document.write(table);
}

function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode < 49 || charCode > 57)
    return false;
  return true;
}

function updateGrid(arrayToUpdate) {
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      tempid = "t" + i + j;
      arrayToUpdate[i][j] = document.getElementById(tempid).value;
    }
  }
}

function updateTable(updateArray) {
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      tempid = "t" + i + j;
      document.getElementById(tempid).value = updateArray[i][j];
    }
  }
}

function solve(arrayToSolve) {
  updateGrid(arrayToSolve);
  chooseGiven(arrayToSolve);
  search();
}
