function kron(a,b) {
  var m = a.length, n = a[0].length, p = b.length, q = b[0].length;
  var rtn = m * p, ctn = n * q; var r = new Array(rtn);
  for (var i = 0; i < rtn; i++) {
    r[i] = new Array(ctn);
    for (var j = 0;j < ctn; j++)
      r[i][j] = 0;
  }
  for (var i = 0; i < m; i++) {
    for (var j = 0; j<n; j++) {
      for (var k = 0; k < p; k++) {
        for (var l=0; l < q; l++)
          r[p*i+k][q*j+l] = a[i][j] * b[k][l];
      }
    }
  }
  return(r);
}

function make2d(width) {
  var arr = [];
  for(var i = 0; i < width; i++)
    arr[i] = [];
  return arr;
}
