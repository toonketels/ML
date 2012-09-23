var Pop = function(popStart) {
  var pop = new Array();

  /**
   * Lazily instanciate pop.
   */
  this.getPop = function() {
  	if (pop.length) return pop;
    
    for (var i = 0; i < popStart; i++) {
      pop[i] = new Chrom(generateRandomCode());
    }
    return pop;
  }

  /**
   * Get the code string and cost score
   * for the current generation.
   */
  this.getCurrentGenerationFitness = function () {
  	for (var i = 0, length = this.getPop().length; i < length; i++) {
  	  pop[i].setFitness();
  	  console.log(pop[i].code + ' ' + pop[i].cost);
  	}
  }

  /**
   * Create a new generation...
   *
   * @todo
   */
  this.regenerate = function() {
  	for (var i = 0, length = this.getPop().length; i < length; i++) {
  	  pop[i].mutate();
  	}
  }

  // Privare function to generate random
  // code strings.
  function generateRandomCode() {
  	var strLength = 10
  	  , lowerBound = 'a'.charCodeAt()
  	  , upperBound = 'z'.charCodeAt()
  	  , code = '';

  	for (var i = 0; i < strLength; i++) {
      code += String.fromCharCode(Math.floor((Math.random() * (upperBound - lowerBound)) + lowerBound));
  	}

  	return code;
  }
}