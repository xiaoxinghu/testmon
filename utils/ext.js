var timesFunc = function(callback) {
  if (typeof callback !== "function" ) {
    throw new TypeError("Callback is not a function");
  } else if( isNaN(parseInt(Number(this.valueOf()))) ) {
    throw new TypeError("Object is not a valid number");
  }
  for (var i = 0; i < Number(this.valueOf()); i++) {
    callback(i);
  }
};

String.prototype.times = timesFunc;
Number.prototype.times = timesFunc;
