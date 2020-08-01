function make2d(width) {
  var arr = [];
  for (var i = 0; i < width; i++) arr[i] = [];
  return arr;
}

jQuery.fn.visible = function() {
  return this.css("visibility", "visible");
};

jQuery.fn.hidden = function() {
  return this.css("visibility", "hidden");
};

function checkGrid(arrayToCheck) {
  if (
    checkRows(arrayToCheck) &&
    checkCollumns(arrayToCheck) &&
    checkSquares(arrayToCheck)
  ) {
    alert("SOLVED!");
  } else {
    alert("LOSER!");
  }
}

function checkRows(arrayToCheck) {
  for (var i = 0; i < 9; i++) {
    var temp = sort(arrayToCheck[i]);
    for (var j = 0; j < 8; j++) {
      if (temp[j] == temp[j + 1] || temp[j] == "" || temp[8] == "") {
        validity = false;
      }
    }
  }
  return validity;
}

function checkCollumns(arrayToCheck) {
  validity = true;
  for (var j = 0; j < 9; j++) {
    var temp = new Array(9);
    for (var i = 0; i < 9; i++) {
      temp.push(arrayToCheck[i][j]);
    }
    var sorted = sort(temp);
    for (var k = 0; k < 8; k++) {
      if (sorted[k] == sorted[k + 1] || sorted[k] == "" || sorted[8] == "") {
        validity = false;
      }
    }
  }
  return validity;
}

function checkSquares(arrayToCheck) {
  validity = true;
  for (var i = 0; i < 9; i = i + 3) {
    for (var j = 0; j < 9; j = j + 3) {
      var temp = new Array(9);
      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
          temp.push(arrayToCheck[i + m][j + n]);
        }
      }
      var sorted = sort(temp);
      for (var k = 0; k < 8; k++) {
        if (sorted[k] == sorted[k + 1] || sorted[k] == "" || sorted[8] == "") {
          validity = false;
        }
      }
    }
  }
  return validity;
}
