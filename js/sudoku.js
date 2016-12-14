main();

function main() {
  var grid = makeGrid();
  fillGrid(grid);
  console.log(grid);
  displayGrid(grid);
}

function makeGrid() {
  temp = new Array(9);
  for(var i = 0; i < 9; i++) {
    temp[i] = new Array(9);
  }
  return temp;
}

function fillGrid(arrayToFill) {
  var puzzle = [5,3,,,,7,,,,6,,,1,9,5,,,,,9,8,,,,,6,,8,,,,6,,,,3,4,,,8,,3,,,1,7,
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
      if(typeof arrayToDisplay[i][j] != 'undefined') {
        table += "<td>" + arrayToDisplay[i][j] + "</td>";
      }
      else {
        table += "<td>" + "</td>";
      }
    }
    table += "</tr><tr>";
  }
  table += "</tr></tbody></table>";
  document.write(table);
}
