/**
 * Gene object constructor.
 */
var Gene = function(code) {
  this.code = (code) ? code : '';
  this.cost = 9999;
}


/**
 * Helper function to generate a random
 * code of length <length>
 */
Gene.prototype.random = function(length) {
  while (length--) {
  	this.code += String.fromCharCode(Math.floor(Math.random() * 255));
  }
}


/**
 * Calculate the cost.
 *
 * @param compareTo (String) to compare code with
 */
Gene.prototype.calcCost = function(compareTo) {
  var total = 0;
  for (var i = 0, length = this.code.length; i < length; i++) {
  	total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
  }

  this.cost = total;
}


/**
 * Create 2 children with genes combo of 
 * this gene and its mate.
 *
 * @param gene (object)
 */
Gene.prototype.mate = function(gene) {
  var pivot = Math.round(this.code.length / 2) - 1

  var child1 = this.code.substr(0, pivot) + gene.code.substr(pivot)
    , child2 = gene.code.substr(0, pivot) + this.code.substr(pivot);

  return [child1, child2];
}


/**
 * Mutates the code of the current gene.
 *
 * @param chance (float) - possibilty for non change
 * @param amoumt (int) - optional max amoumt variation can be
 */
Gene.prototype.mutate = function(chance, amount) {

  if (Math.random() > chance) return;

  var maxAmount = (amount) ? amount : 20;

  var index = Math.round(Math.random() * this.code.length)
    , upOrDown = (Math.random() > 0.5) ? 1 : -1
    , amount = Math.round(Math.random() * maxAmount);

  var newCharCode = this.code.charCodeAt(index) + (upOrDown * amount);
  
  if (newCharCode > 255) newCharCode = 255;
  if (newCharCode < 0) newCharCode = 0;

  this.code = this.code.substr(0, index)
    + String.fromCharCode(newCharCode)
    + this.code.substr(index + 1);
}