var Pop = function(popStart) {
  var pop = new Array();
  this.currentBest = '';
  this.generationNumber = 0;
  this.currentBestCost = 9999;

  this.findOptimalSolution = function() {
    this.getPop();

    while(this.currentBestCost != 0) {
      this.regenerate();
      console.log(this.currentBest);
    }
  }

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
  	  //console.log(pop[i].code + ' ' + pop[i].cost);
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
    sortOnFitness();

    this.currentBest = pop[0].code + ' ' + pop[0].cost + ' - ' + this.generationNumber;
    this.currentBestCost = pop[0].cost;

    // Kill Lowerend population
    killPartOfPop();

    // Orgy time
    createOffspring();

    // Mutate
    mutateGeneration();

    this.generationNumber ++;
  }

  // Private function to mutate a selection
  // of the population
  function mutateGeneration() {

    var lowerBound = 0
      , upperBound = 6
      , getRandomNumber
      , i
      , length = pop.length;

    getRandomNumber = function() {
      return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    };

    i = getRandomNumber();
    //i = 0;

    while(i < length) {
      pop[i].mutate();

     i = i + getRandomNumber();
     //i++;
    }
  }

  // Private function to let chromosomes mate
  function createOffspring() {
    var oldPop = pop
      , groupA = new Array()
      , groupB = new Array()
      , offspringA = new Array()
      , offspringB = new Array();

    // Divide in two groups and mate
    for (var i = 0, length = pop.length; i < length; i = i+2) {
      groupA.push(pop[i]);
      groupB.push(pop[i+1]);
      offspringA.push(pop[0].mate(pop[i]));
      offspringB.push(pop[i].mate(pop[0]));
    }

    // Set the new population
    pop = groupA.concat(groupB, offspringA, offspringB);
    //console.log(pop);
  }

  // Private function to kill part of population
  function  killPartOfPop() { 
    var itemsLeft = Math.floor(0.5 * popStart);
    pop = pop.slice(0, itemsLeft);
  }

  // Private function to sort fitness
  function sortOnFitness() {
    var oldPop = pop;

    pop.sort(function compare(a, b) {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      return 0;
    });

    /*
    for (var i = 0, length = pop.length; i < length; i++) {
      console.log('From '
        + oldPop[i].code
        + ':'
        + oldPop[i].cost
        + ' to '
        + pop[i].code
        + ':'
        + pop[i].cost);
    }
    */

    currentBest = pop[0];
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