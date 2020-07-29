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
