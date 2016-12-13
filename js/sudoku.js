main();

function main() {
  var grid = makeGrid();
  console.log(grid);
}

function makeGrid() {
  temp = new Array(9);
  for (var i = 0; i < 9; i++) {
    temp[i] = new Array(9);
  }
  return temp;
}
