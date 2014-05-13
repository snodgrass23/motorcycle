function World(width, height, container) {
  this.frame = this.frame.bind(this);
  this.scene = new THREE.Scene();
  this.renderer = new THREE.WebGLRenderer();
  this.clock = new THREE.Clock();
  this.running = false;
  this.callback = function() {};

  this.renderer.setSize(width, height);
  this.renderer.shadowMapEnabled = true;
  container.appendChild(this.renderer.domElement);
}

World.prototype.add = function(entity) {
  return this.scene.add(entity);
};

World.prototype.render = function(camera) {
  return this.renderer.render(this.scene, camera);
};

World.prototype.start = function(callback) {
  this.running = true;
  this.callback = callback;
  requestAnimationFrame(this.frame);
};

World.prototype.frame = function() {
  if (!this.running) return;

  requestAnimationFrame(this.frame);
  this.callback(this.clock.getDelta());
};
