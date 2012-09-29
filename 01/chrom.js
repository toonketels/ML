var Chrom = function(code) {
    this.code = code;

    this.cost = 9999;

    /**
     * Create offspring with half 
     * the code of their own and 
     * half of the other.
     */
    this.mate = function(chrom) {
      var o1 = this.code.slice(0, 6)
        , o2 = this.code.slice(6)
        , t1 = chrom.code.slice(0, 6)
        , t2 = chrom.code.slice(6);

      return new Chrom(o1 + t2);
      //this.code = ;
      //chrom.code = t1 + o2;
    }

    /**
     * Create diversity by changing chars
     * from case and by moving chars.
     */
    this.mutate = function() {
      var index;

      // Convert one char to uppercase
      index = getRandomIndexChar();
      this.code = replaceCharAtIndex(this.code, convertCase(this.code[index]), index);
      

      // Move one char
      index = getRandomIndexChar();
      this.code = replaceCharAtIndex(this.code, moveChar(this.code[index]), index);

      // Move one other char
      index = getRandomIndexChar();
      this.code = replaceCharAtIndex(this.code, moveChar(this.code[index]), index);
    }

    /**
     * Calculate the fitness and
     * set the cost score.
     */
    this.setFitness = function() {
      var ideal = 'HelloWorld'
        , cost = 0;

      for (var i = 0, length = ideal.length; i < length; i++) {
      	var idealCharCode = ideal[i].charCodeAt()
      	  , codeCharCode = this.code[i].charCodeAt()
      	  , diff;

      	diff = idealCharCode - codeCharCode;
      	cost += (diff * diff) * 2;
      }

      this.cost = cost;
    }

    // Private function to get an index.
    function getRandomIndexChar() {
      return Math.floor(Math.random() * 10);
    }

    // Private function to covert character case.
    function convertCase(char) {
      var char = char
        , charTransformed = char.toUpperCase();

      if (charTransformed == char) {
      	charTransformed = char.toLowerCase()
      }

      return charTransformed;  	
    }

    // Replaces a char in string at given index.
    function replaceCharAtIndex(str, char, index) {
      return str.substr(0, index) + char + str.substr(index + 1);
    }

    // Private function to move chars
    function moveChar(char) {
      var lowLowerBound = 'A'.charCodeAt()		// 65
        , lowUpperBound = 'Z'.charCodeAt()		// 90
        , upLowerBound = 'a'.charCodeAt()		// 97
        , upUpperBound = 'z'.charCodeAt()		// 122
        , charCode = char.charCodeAt()
        , move = (Math.random() > 0.5) ? -1 : 1
        , charTransformedCode;

      // Increment char coding
      charTransformedCode = charCode + move;

      if (charTransformedCode == (lowLowerBound - 1)) charTransformedCode = lowLowerBound;
      if (charTransformedCode == (lowUpperBound + 1)) charTransformedCode = upLowerBound;
      if (charTransformedCode == (upLowerBound - 1)) charTransformedCode = lowUpperBound;
      if (charTransformedCode == (upUpperBound + 1)) charTransformedCode = upUpperBound;

      return String.fromCharCode(charTransformedCode);
    }
}