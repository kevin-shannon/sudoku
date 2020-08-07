import bitMatrix from "./bitmatrix.json";
import { make2DEmpty } from "./utils.js";

class Node {}

class AlgorithmX {
  rows = 729;
  cols = 324;

  constructor() {
    this.header = new Node();
    this.nodeMatrix = make2DEmpty(this.rows + 1);
    for (let i = 0; i <= this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.nodeMatrix[i][j] = new Node();
      }
    }
    this.makeDonut();
    this.solution = [];
    this.uniqueSolutions = [];
  }

  getRight = (i) => (i + 1) % this.cols;
  getLeft = (i) => (i - 1 < 0 ? this.cols - 1 : i - 1);
  getUp = (i) => (i - 1 < 0 ? this.rows : i - 1);
  getDown = (i) => (i + 1) % (this.rows + 1);

  // Builds circular doubly linked list
  makeDonut() {
    let a, b;
    // Extra row for headers
    for (let i = 0; i <= this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (!i) this.nodeMatrix[0][j].nodeCnt = 0;

        // 1 corresponds with node
        if (bitMatrix[i][j] || !i) {
          // Increment nodeCnt if not a header node
          if (i) this.nodeMatrix[0][j].nodeCnt++;

          this.nodeMatrix[i][j].column = this.nodeMatrix[0][j];
          this.nodeMatrix[i][j].rowID = i;
          this.nodeMatrix[i][j].colID = j;

          // Link nodes
          a = i;
          b = j;
          do {
            b = this.getLeft(b);
          } while (!bitMatrix[a][b] && i && b !== j);
          this.nodeMatrix[i][j].left = this.nodeMatrix[i][b];

          b = j;
          do {
            b = this.getRight(b);
          } while (!bitMatrix[a][b] && i && b !== j);
          this.nodeMatrix[i][j].right = this.nodeMatrix[i][b];

          b = j;
          do {
            a = this.getUp(a);
          } while (!bitMatrix[a][b] && a && a !== i);
          this.nodeMatrix[i][j].up = this.nodeMatrix[a][j];

          a = i;
          do {
            a = this.getDown(a);
          } while (!bitMatrix[a][b] && a && a !== i);
          this.nodeMatrix[i][j].down = this.nodeMatrix[a][j];
        } else {
          this.nodeMatrix[i][j] = null;
        }
      }
    }
    // Link header
    this.header.right = this.nodeMatrix[0][0];
    this.header.left = this.nodeMatrix[0][this.cols - 1];

    this.nodeMatrix[0][0].left = this.header;
    this.nodeMatrix[0][this.cols - 1].right = this.header;
  }

  cover(target) {
    let colNode = target.column;

    // Unlink target
    colNode.left.right = colNode.right;
    colNode.right.left = colNode.left;

    // Move down and remove nodes traversing to the right
    for (
      let rowNode = colNode.down;
      rowNode.rowID !== colNode.rowID;
      rowNode = rowNode.down
    ) {
      for (
        let rightNode = rowNode.right;
        rightNode.colID !== rowNode.colID;
        rightNode = rightNode.right
      ) {
        rightNode.up.down = rightNode.down;
        rightNode.down.up = rightNode.up;
        this.nodeMatrix[0][rightNode.colID].nodeCnt--;
      }
    }
  }

  uncover(target) {
    let colNode = target.column;
    // Move up and add nodes traversing to the left
    for (
      let rowNode = colNode.up;
      rowNode.rowID !== colNode.rowID;
      rowNode = rowNode.up
    ) {
      for (
        let leftNode = rowNode.left;
        leftNode.colID !== rowNode.colID;
        leftNode = leftNode.left
      ) {
        leftNode.up.down = leftNode;
        leftNode.down.up = leftNode;
        this.nodeMatrix[0][leftNode.colID].nodeCnt++;
      }
    }

    // Relink target
    colNode.left.right = colNode;
    colNode.right.left = colNode;
  }

  getMinColumn() {
    let h = this.header;
    let minCol = h.right;
    h = h.right.right;
    do {
      if (h.nodeCnt < minCol.nodeCnt) minCol = h;
      h = h.right;
    } while (h !== this.header);
    return minCol;
  }

  // Returns Node in row, if any
  getNodeFromRow(row) {
    for (let i = 0; i < this.cols; i++) {
      if (
        this.nodeMatrix[row][i] &&
        this.nodeMatrix[row][i].column.left.right ===
          this.nodeMatrix[row][i].column
      )
        return this.nodeMatrix[row][i];
    }
  }

  // Covers all columns that have associated node in row
  choose(row) {
    let rowNode = this.getNodeFromRow(row);
    this.cover(rowNode);
    for (
      let rightNode = rowNode.right;
      rightNode.colID !== rowNode.colID;
      rightNode = rightNode.right
    )
      this.cover(rightNode);
  }

  // Chose all rows in grid
  chooseGiven(grid) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j]) {
          this.choose(81 * i + 9 * j + parseInt(grid[i][j]));
          this.solution.push(81 * i + 9 * j + parseInt(grid[i][j]));
        }
      }
    }
  }

  // Find the solution
  search() {
    if (this.uniqueSolutions.length > 1) return;
    // No columns left mean we have a solution
    if (this.header.right === this.header) {
      this.uniqueSolutions.push(this.solution.slice());
      return;
    }

    // Chose most constrained column
    let column = this.getMinColumn();

    // Cover collisions
    this.cover(column);

    for (
      let rowNode = column.down;
      rowNode.rowID !== column.rowID;
      rowNode = rowNode.down
    ) {
      this.solution.push(rowNode.rowID);
      for (
        let rightNode = rowNode.right;
        rightNode.colID !== rowNode.colID;
        rightNode = rightNode.right
      )
        this.cover(rightNode);
      this.search();
      this.solution.pop();

      column = rowNode.column;
      for (
        let leftNode = rowNode.left;
        leftNode !== rowNode;
        leftNode = leftNode.left
      )
        this.uncover(leftNode);
    }
    this.uncover(column);
  }
}

let algoX = new AlgorithmX();

export function solve(arrayToSolve) {
  let success = false,
    grid,
    error;
  if (!isClean(arrayToSolve)) {
    return {
      success,
      grid,
      error: "Invalid puzzle. Unrecognized characters in table.",
    };
  }
  algoX.chooseGiven(arrayToSolve);
  algoX.search();
  if (algoX.uniqueSolutions.length > 1) {
    error = "Invalid puzzle. Several unique solutions.";
  } else if (algoX.uniqueSolutions.length === 0) {
    error = "Invalid puzzle. No solution exists.";
  } else {
    grid = getSolutionGrid(algoX.uniqueSolutions[0]);
    success = true;
  }
  algoX = new AlgorithmX();
  return { success, grid, error };
}

// Convert rowNodes to a grid
function getSolutionGrid(solution) {
  solution.sort((a, b) => a - b);
  let grid = make2DEmpty(9);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid[i][j] = (solution[9 * i + j] - 81 * i - 9 * j).toString();
    }
  }
  return grid;
}

function isClean(arrayToCheck) {
  const validChars = "123456789";
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        !validChars.includes(arrayToCheck[i][j]) ||
        arrayToCheck[i][j].length > 1
      ) {
        return false;
      }
    }
  }
  return true;
}
