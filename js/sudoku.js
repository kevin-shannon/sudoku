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
        table += "<td class = " + ident + ">" + arrayToDisplay[i][j] + "</td>";
      }
      else {
        table += "<td class = " + ident + ">" + "</td>";
      }
    }
    table += "</tr><tr>";
  }
  table += "</tr></tbody></table>";
  document.write(table);
}
