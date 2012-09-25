/**
 * Object constructor.
 *
 * @param goal (string) the sentence we want
 *   our program to output
 * @param size (int) population size
 */
var Population = function(goal, size) {
    this.members = []
  , this.goal = goal
  , this.generationNumber = 0;

  while (size--) {
  	var gene = new Gene();
  	gene.random(this.goal.length);
  	this.members.push(gene);
  }
}

// @todo if cost function is ok
Population.prototype.sort = function() {
  this.members.sort(function(a, b) {
  	return a.cost - b.cost;
  });
}


Population.prototype.generation = function() {
  
  this.members.forEach(function(gene) {
  	gene.calcCost(this.goal);
  }, this);

  this.sort();
  this.display();

  var children = this.members[0].mate(this.members[1]);
  this.members.splice(this.members.length - 2, 2, children[0], children[1]);

  for (var i = 0, length = this.members.length; i < length; i++) {
  	this.members[i].mutate(0.3, 30);
  	this.members[i].calcCost(this.goal);
  	if (this.members[i].code == this.goal) {
  	  this.sort();
  	  this.display();
  	  return true;
  	}
  }

/*
  this.members.forEach(function(gene) {
    gene.mutate(0.4, 30);
    gene.calcCost(this.goal);
    if (gene.code == this.goal) {
      this.sort();
      this.display();
      return true;
    }
  }, this);
*/

  this.generationNumber++;
  var scope = this;
  setTimeout(function() {
    scope.generation();
  }, 20);
}


Population.prototype.display = function() {
  var gene = this.members[0];
  	console.log(
        this.generationNumber
      + ' - '
      + gene.code
      + ' : '
      + gene.cost
  	);

 /* 
  this.members.forEach(function(gene) {
  	console.log(
        this.generationNumber
      + ' - '
      + gene.code
      + ' : '
      + gene.cost
  	);
  }, this);
*/
}