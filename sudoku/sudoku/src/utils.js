export function make2DFull(value) {
  var arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push([]);
    for (let j = 0; j < 9; j++) {
      arr[i].push(value);
    }
  }
  return arr;
}

export function make2DEmpty(width) {
  var arr = [];
  for (var i = 0; i < width; i++) arr[i] = [];
  return arr;
}
