var grid = make2d(9);
displayGrid(grid);
$(window).on("load", function() {
  $(".tl").visible();
  $(".bl").visible();
  $(".tr").visible();
  $(".br").visible();
  $(".tt").visible();
  $(".ll").visible();
  $(".bb").visible();
  $(".rr").visible();
  $(".ne").visible();
  $("table").css("font-size", $("tr").height() / 1.8 + "px");
});
var bitMatrix, nodeMatrix;
preprocess();

function displayGrid(arrayToDisplay) {
  var table = "<table><tbody><tr>";
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var ident;
      if (i % 3 == 0 && j % 3 == 0) ident = "tl";
      else if (i == 8 && j % 3 == 0) ident = "bl";
      else if (i % 3 == 0 && j == 8) ident = "tr";
      else if (i == 8 && j == 8) ident = "br";
      else if (i % 3 == 0) ident = "tt";
      else if ((i % 3 == 1 || i % 3 == 2) && j % 3 == 0) ident = "ll";
      else if (i == 8) ident = "bb";
      else if (j == 8) ident = "rr";
      else ident = "ne";
      table +=
        "<td style='visibility:hidden' class = '" +
        ident +
        "'><input autocomplete='new-password', tabindex ='1', maxlength = 1, id = 't" +
        i +
        j +
        "', onkeypress='document.getElementById(\"t" +
        i +
        j +
        '").value = ""; return isNumberKey(event)\'></td>';
    }
    table += "</tr><tr>";
  }
  table += "</tr></tbody></table>";
  document.getElementById("table-container").innerHTML = table;
}

function clearTable() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) grid[i][j] = "";
  }
  updateTable(grid);
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode < 49 || charCode > 57) return false;
  return true;
}

function updateGrid(arrayToUpdate) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      tempid = "t" + i + j;
      arrayToUpdate[i][j] = document.getElementById(tempid).value;
    }
  }
}

function updateTable(updateArray) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      tempid = "t" + i + j;
      document.getElementById(tempid).value = updateArray[i][j];
    }
  }
}

function preprocess() {
  $.ajax({
    dataType: "json",
    url: "js/bitmatrix.json",
    success: function(json) {
      bitMatrix = json;
      nodeMatrix = initNodeMatrix();
      makeDonut(bitMatrix, nodeMatrix);
      bitMatrix = null;
    }
  });
}

function solve(arrayToSolve) {
  updateGrid(arrayToSolve);
  chooseGiven(arrayToSolve);
  var t0 = performance.now();
  showResult();
  var t1 = performance.now();
  console.log("Solve Time: " + (t1 - t0) + " milliseconds.");
  preprocess();
}

var currCell = $("td").first();

// User clicks on a cell
$("td").click(function() {
  currCell = $(this);
});

// User navigates table using keyboard
$("table").keydown(function(e) {
  var c = "";
  if (e.which == 39) {
    // Right Arrow
    c = currCell.next();
  } else if (e.which == 37) {
    // Left Arrow
    c = currCell.prev();
  } else if (e.which == 38) {
    // Up Arrow
    c = currCell
      .closest("tr")
      .prev()
      .find("td:eq(" + currCell.index() + ")");
  } else if (e.which == 40) {
    // Down Arrow
    c = currCell
      .closest("tr")
      .next()
      .find("td:eq(" + currCell.index() + ")");
  } else if (e.which == 13 || e.which == 32) {
    // Enter or Spacebar - edit cell
    e.preventDefault();
  } else if (e.which == 9 && !e.shiftKey) {
    // Tab
    e.preventDefault();
    c = currCell.next();
  } else if (e.which == 9 && e.shiftKey) {
    // Shift + Tab
    e.preventDefault();
    c = currCell.prev();
  }

  // If we didn't hit a boundary, update the current cell
  if (c.length > 0) {
    currCell = c;
    currCell.children(":first").focus();
  }
});
