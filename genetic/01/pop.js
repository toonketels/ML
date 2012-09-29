var Pop = function(popStart) {
  this.pop = getPop();
  this.currentBest = '';
  this.generationNumber = 0;
  this.currentBestCost = 9999;
  this.allowedToMate = 10;

  this.findOptimalSolution = function() {

    this.regenerate()
    console.log(this.currentBest);
    
    // Terminator
    if (this.currentBestCost == 0) return;

    //if (this.generationNumber == 10) return;

    var scope = this;
    setTimeout(function() {
      scope.findOptimalSolution();
    }, 20);
  }

  /**
   * Lazily instanciate pop.
   */
  function getPop() {
    var pop = new Array();
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

  	for (var i = 0, length = this.pop.length; i < length; i++) {
  	  this.pop[i].setFitness();
  	  //console.log(this.pop[i].code + ' ' + this.pop[i].cost);
  	}
  }

  /**
   * Create a new generation...
   *
   * Flow
   * - Order by fitness score
   * - Kill 50 %
   * - Mate twice
   * - Mutate random part of all
   */
  this.regenerate = function() {

    // Update fitness scores
    this.getCurrentGenerationFitness();



    // Sort population on fitness
    this.sortOnFitness();

    this.currentBest = this.pop[0].code + ' ' + this.pop[0].cost + ' - ' + this.generationNumber;
    this.currentBestCost = this.pop[0].cost;

    // Kill Lowerend population
    this.killPartOfPop();

    // Orgy time
    this.createOffspring();

    // Mutate
    this.mutateGeneration();

    this.generationNumber ++;
  }

  // Private function to mutate a selection
  // of the population
  this.mutateGeneration = function() {

    var upperBound = 2
      , getRandomNumber
      , i
      , length = this.pop.length;

    getRandomNumber = function() {
      return Math.round(Math.random() * upperBound);
    };

    i = getRandomNumber();
    //i = 0;

    while(i < length) {
      this.pop[i].mutate();

     i = i + getRandomNumber();
     //i++;
    }
  }

  // Private function to let chromosomes mate
  this.createOffspring = function() {

    // Mate and add offspring to population...
    for (var i = 0; i < this.allowedToMate; i = i+2) {
      this.pop.push(this.pop[0].mate(this.pop[i]));
      this.pop.push(this.pop[i].mate(this.pop[0]));
    }
  }

  // Private function to kill part of population
  this.killPartOfPop = function() { 

    this.pop = this.pop.slice(0, this.pop.length - this.allowedToMate);
  }

  // Private function to sort fitness
  this.sortOnFitness = function() {

    this.pop.sort(function compare(a, b) {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      return 0;
    });

    this.currentBest = this.pop[0];
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