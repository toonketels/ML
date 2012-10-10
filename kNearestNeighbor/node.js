var Node = function(nodeData) {
  this.room = nodeData.room;
  this.area = nodeData.area;
  this.type = nodeData.type;
  this.n = {};
  this.delta;
}


Node.prototype.normalizeRoom = function(min, max) {
  this.n.room = (this.room - min) * 100 / (max - min);
}


Node.prototype.normalizeArea = function(min, max) {
  this.n.area = (this.area - min) * 100 / (max - min);
}


Node.prototype.findDifference = function(unknown) {
  var areaDiff = unknown.n.area - this.n.area 
    , roomDiff = unknown.n.room - this.n.room;

  this.delta = areaDiff * roomDiff;
}