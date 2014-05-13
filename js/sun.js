function Sun(time) {
  this.light = new THREE.DirectionalLight(0xffffff, 0.6);
  this.setTime(time);
}

Sun.prototype.setTime = function(time) {
  this.time = time;
  var x = Math.cos(Math.PI * time);
  var y = Math.sin(Math.PI * time);
  this.light.position.set(x, y, 0);
};

Sun.prototype.moveTime = function(delta) {
  this.setTime(this.time + delta);
};