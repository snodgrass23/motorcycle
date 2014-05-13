function Player() {
  this.height = 2;  // meters
  this.facingY = 0;  // radians
  this.speed = 3;   // meters / second
  this.facingX = 0; // radians

  this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  this.position = this.camera.position;

  this.controls = new Controls();
}

Player.prototype.update = function(seconds, terrain) {
  if (this.controls.actions.forward) {
    this.camera.translateZ(-this.speed * seconds);
  }
  if (this.controls.actions.back) {
    this.camera.translateZ(this.speed * seconds * 0.5);
  }
  if (this.controls.actions.left) {
    this.camera.translateX(-this.speed * seconds * 0.5);
  }
  if (this.controls.actions.right) {
    this.camera.translateX(this.speed * seconds * 0.5);
  }

  var groundY = terrain.getNearest(this.camera.position.x, this.camera.position.z);
  var y = groundY + this.height;
  this.camera.position.y = groundY + this.height;

  this.facingY -= seconds * this.controls.mouseX * 3;
  this.facingX += seconds * this.controls.mouseY * 2;

  if (this.facingX < Math.PI * -0.15) this.facingX = Math.PI * -0.15;
  else if (this.facingX > Math.PI * 0.15) this.facingX = Math.PI * 0.15;

  var direction = new THREE.Vector3(0, 0, 1);
  direction.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.facingX);
  direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.facingY);
  direction.add(this.camera.position);
  this.camera.lookAt(direction);
};