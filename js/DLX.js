class Node {}

var header = new Node();
var rows = 729;
var cols = 324;
var solution = [];
var found = false;

var getRight = i => (i + 1) % cols;
var getLeft = i => (i - 1 < 0 ? cols - 1 : i - 1);
var getUp = i => (i - 1 < 0 ? rows : i - 1);
var getDown = i => (i + 1) % (rows + 1);

function initNodeMatrix() {
  var nodeMatrix = make2d(rows + 1);
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j < cols; j++) {
      nodeMatrix[i][j] = new Node();
    }
  }
  return nodeMatrix;
}

// Builds circular doubly linked list
function makeDonut(bitMatrix, nodeMatrix) {
  var a, b;
  // Extra row for headers
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (!i) nodeMatrix[0][j].nodeCnt = 0;

      // 1 corresponds with node
      if (bitMatrix[i][j] || !i) {
        // Increment nodeCnt if not a header node
        if (i) nodeMatrix[0][j].nodeCnt++;

        nodeMatrix[i][j].column = nodeMatrix[0][j];
        nodeMatrix[i][j].rowID = i;
        nodeMatrix[i][j].colID = j;

        // Link nodes

        a = i;
        b = j;
        do {
          b = getLeft(b);
        } while (!bitMatrix[a][b] && i && b != j);
        nodeMatrix[i][j].left = nodeMatrix[i][b];

        a = i;
        b = j;
        do {
          b = getRight(b);
        } while (!bitMatrix[a][b] && i && b != j);
        nodeMatrix[i][j].right = nodeMatrix[i][b];

        a = i;
        b = j;
        do {
          a = getUp(a);
        } while (!bitMatrix[a][b] && a && a != i);
        nodeMatrix[i][j].up = nodeMatrix[a][j];

        a = i;
        b = j;
        do {
          a = getDown(a);
        } while (!bitMatrix[a][b] && a && a != i);
        nodeMatrix[i][j].down = nodeMatrix[a][j];
      } else {
        nodeMatrix[i][j] = null;
      }
    }
  }
  // Link header
  header.right = nodeMatrix[0][0];
  header.left = nodeMatrix[0][cols - 1];

  nodeMatrix[0][0].left = header;
  nodeMatrix[0][cols - 1].right = header;
}

function cover(target) {
  var colNode = target.column;

  // Unlink target
  colNode.left.right = colNode.right;
  colNode.right.left = colNode.left;

  // Move down and remove nodes traversing to the right
  for (
    var rowNode = colNode.down;
    rowNode.rowID != colNode.rowID;
    rowNode = rowNode.down
  ) {
    for (
      var rightNode = rowNode.right;
      rightNode.colID != rowNode.colID;
      rightNode = rightNode.right
    ) {
      rightNode.up.down = rightNode.down;
      rightNode.down.up = rightNode.up;
      nodeMatrix[0][rightNode.colID].nodeCnt--;
    }
  }
}

function uncover(target) {
  var colNode = target.column;

  // Move down and remove nodes traversing to the right
  for (
    var rowNode = colNode.up;
    rowNode.rowID != colNode.rowID;
    rowNode = rowNode.up
  ) {
    for (
      var leftNode = rowNode.left;
      leftNode.colID != rowNode.colID;
      leftNode = leftNode.left
    ) {
      leftNode.up.down = leftNode;
      leftNode.down.up = leftNode;
      nodeMatrix[0][leftNode.colID].nodeCnt++;
    }
  }

  // Relink target
  colNode.left.right = colNode;
  colNode.right.left = colNode;
}

function getMinColumn() {
  var h = header;
  var minCol = h.right;
  h = h.right.right;
  do {
    if (h.nodeCnt < minCol.nodeCnt) minCol = h;
    h = h.right;
  } while (h != header);
  return minCol;
}

// Returns Node in row, if any
function getNodeFromRow(row) {
  for (var i = 0; i < cols; i++) {
    if (
      nodeMatrix[row][i] &&
      nodeMatrix[row][i].column.left.right == nodeMatrix[row][i].column
    )
      return nodeMatrix[row][i];
  }
}

// Covers all columns that have associated node in row
function choose(row) {
  var rowNode = getNodeFromRow(row);
  cover(rowNode);
  for (
    var rightNode = rowNode.right;
    rightNode.colID != rowNode.colID;
    rightNode = rightNode.right
  )
    cover(rightNode);
}

// Chose all rows in grid
function chooseGiven(grid) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (grid[i][j]) {
        choose(81 * i + 9 * j + parseInt(grid[i][j]));
        solution.push(81 * i + 9 * j + parseInt(grid[i][j]));
      }
    }
  }
}

// Convert rowNodes to a grid
function convertSolution(solution) {
  var grid = make2d(9);
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      grid[i][j] = solution[9 * i + j] - 81 * i - 9 * j;
    }
  }
  return grid;
}

function outputSolution(solution) {
  solution.sort((a, b) => a - b);
  var finalSolution = convertSolution(solution);
  updateTable(finalSolution);
  updateGrid(finalSolution);
  var header = new Node();
  solution = [];
}

var uniqueSolutions = 0;

// Find the solution
function search() {
  if (uniqueSolutions > 0) return;
  // No columns left mean we have a solution
  if (header.right == header) {
    uniqueSolutions++;
    console.log("unique sol", solution);
    outputSolution(solution.slice());
    return;
  }

  // Chose most constrained column
  var column = getMinColumn();

  // Cover collisions
  cover(column);

  for (
    var rowNode = column.down;
    rowNode.rowID != column.rowID;
    rowNode = rowNode.down
  ) {
    solution.push(rowNode.rowID);
    for (
      var rightNode = rowNode.right;
      rightNode.colID != rowNode.colID;
      rightNode = rightNode.right
    )
      cover(rightNode);
    search();
    solution.pop();

    column = rowNode.column;
    for (
      var leftNode = rowNode.left;
      leftNode != rowNode;
      leftNode = leftNode.left
    )
      uncover(leftNode);
  }
  uncover(column);
}
