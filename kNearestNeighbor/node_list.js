var NodeList = function(data, k) {
  this.nodeList = createNodeList(data);
  this.k = k;
  this.unknown = {};
  this.max = {};
  this.min = {};

  /**
   * Helper function to instanciate nodes.
   */
  function createNodeList(data) {
  	var nodeList = new Array();
  	for (var i = 0, length = data.length; i < length; i++) {
      nodeList[i] = new Node(data[i]);
  	}

  	return nodeList;
  }
}


NodeList.prototype.findType = function(room, area) {
  
  this.unknown = new Node({
      room: room
    , area: area
    , type: 'question'
  });

  // Copy the nodeList
  var newList = this.nodeList;

  // Get min / max
  this.getLimits(this.unknown);

  // Normalise data
  this.normalise();

  // Diff on axes
  this.findDifference();

  // Sort on delta
  this.sort();

  // Find average type
  this.averageType();

  return this.result;
}


NodeList.prototype.normalise = function() {

  // Normalize data set
  for (var i = 0, length = this.nodeList.length; i < length; i++) {
    this.nodeList[i].normalizeRoom(this.min.room, this.max.room);
    this.nodeList[i].normalizeArea(this.min.area, this.max.area);
  }

  // Normalize unknown
  this.unknown.normalizeRoom(this.min.room, this.max.room);
  this.unknown.normalizeArea(this.min.area, this.max.area);
}


NodeList.prototype.getLimits = function(start) {

  // Set unknown object as min/max
  var roomMin = roomMax = start.room
    , areaMin = areaMax = start.area;

  // Iterate over list...
  for (var i = 0, length = this.nodeList.length; i < length; i++) {
    if (this.nodeList[i].room > roomMax) roomMax = this.nodeList[i].room;    
    if (this.nodeList[i].room < roomMin) roomMin = this.nodeList[i].room;
    if (this.nodeList[i].area > areaMax) areaMax = this.nodeList[i].area;
    if (this.nodeList[i].area < areaMin) areaMin = this.nodeList[i].area;
  }

  this.max.room = roomMax;
  this.max.area = areaMax;
  this.min.room = roomMin;
  this.min.area = areaMin;
}


NodeList.prototype.findDifference = function() {
  for (var i = 0, length = this.nodeList.length; i < length; i++) {
    this.nodeList[i].findDifference(this.unknown);
  }
}

NodeList.prototype.sort = function() {
  this.nodeList.sort(function(a, b) {
    return Math.abs(a.delta) - Math.abs(b.delta);
  });
}


NodeList.prototype.averageType = function() {
  var results = {};

  for (var i = 0; i < this.k; i++) {
    var type = this.nodeList[i].type;
    if (typeof(results[type]) == 'undefined') {
      results[type] = {type: type, frequency: 1};
    } else {
      results[type]['frequency'] = results[type]['frequency'] + 1;
    }
  }

  this.results = results;

  var max;

  // Sort results
  for (var type in results) {
    if (typeof(max) == 'undefined') max = results[type];
    if (max.frequency < results[type].frequency) max = results[type];
  }

  this.result = max['type'];
}