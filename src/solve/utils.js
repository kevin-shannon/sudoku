export function make2DFull(value) {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push([]);
    for (let j = 0; j < 9; j++) {
      arr[i].push(value);
    }
  }
  return arr;
}

export function make2DEmpty(width) {
  let arr = [];
  for (let i = 0; i < width; i++) arr[i] = [];
  return arr;
}

function sort(arr) {
  return arr.concat().sort();
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b);
}

export function checkConflicts(grid) {
  let conflicts = checkRows(grid).concat(
    checkCollumns(grid).concat(checkSquares(grid))
  );
  return Array.from(new Set(conflicts.map(JSON.stringify)), JSON.parse);
}

function checkRows(grid) {
  let conflicts = [];
  for (let i = 0; i < 9; i++) {
    let map = {};
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] in map) {
        map[grid[i][j]].push([i, j]);
      } else if (grid[i][j]) {
        map[grid[i][j]] = [[i, j]];
      }
    }
    let temp = sort(grid[i]);
    for (let j = 0; j < 8; j++) {
      if (temp[j] === temp[j + 1] && temp[j]) {
        conflicts = conflicts.concat(map[temp[j]]);
      }
    }
  }
  return removeDuplicates(conflicts);
}

function checkCollumns(grid) {
  let conflicts = [];
  for (let j = 0; j < 9; j++) {
    let map = {};
    let temp = new Array(9);
    for (let i = 0; i < 9; i++) {
      temp.push(grid[i][j]);
      if (grid[i][j] in map) {
        map[grid[i][j]].push([i, j]);
      } else if (grid[i][j]) {
        map[grid[i][j]] = [[i, j]];
      }
    }
    temp = sort(temp);
    for (let i = 0; i < 8; i++) {
      if (temp[i] === temp[i + 1] && temp[i]) {
        conflicts = conflicts.concat(map[temp[i]]);
      }
    }
  }
  return removeDuplicates(conflicts);
}

function checkSquares(grid) {
  let conflicts = [];
  for (let i = 0; i < 9; i = i + 3) {
    for (let j = 0; j < 9; j = j + 3) {
      let map = {};
      let temp = new Array(9);
      for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
          temp.push(grid[i + m][j + n]);
          if (grid[i + m][j + n] in map) {
            map[grid[i + m][j + n]].push([i + m, j + n]);
          } else if (grid[i + m][j + n]) {
            map[grid[i + m][j + n]] = [[i + m, j + n]];
          }
        }
      }
      temp = sort(temp);
      for (let i = 0; i < 8; i++) {
        if (temp[i] === temp[i + 1] && temp[i]) {
          conflicts = conflicts.concat(map[temp[i]]);
        }
      }
    }
  }
  return removeDuplicates(conflicts);
}
