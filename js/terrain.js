function Terrain(detail) {
  this.size = Math.pow(2, detail) + 1;
  this.max = this.size - 1;
  this.geometry = new THREE.PlaneGeometry(this.size, this.size, this.max, this.max);
  this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX( -Math.PI / 2 ));
  this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.size / 2, 0, this.size / 2));
  this.material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wrapAround: true,
    shading: THREE.FlatShading,
    vertexColors: THREE.FaceColors
  });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  //this.mesh.castShadow = true;
  //this.mesh.receiveShadow = true;
}

Terrain.prototype.get = function(x, z) {
  if (x < 0 || x > this.max || z < 0 || z > this.max) return false;
  return this.geometry.vertices[x + this.size * z].y;
};

Terrain.prototype.set = function(x, z, val) {
  this.geometry.vertices[x + this.size * z].y = val;
};

Terrain.prototype.getNearest = function(x, z) {
  return this.get(~~x, ~~z);
};

Terrain.prototype.update = function() {
  this.geometry.computeFaceNormals();
  this.geometry.computeVertexNormals();
}

Terrain.prototype.generate = function(roughness) {
  var self = this;

  this.set(0, 0, 0);
  this.set(this.max, 0, 0);
  this.set(this.max, this.max, 0);
  this.set(0, this.max, 0);

  divide(this.max);
  this.update();

  function divide(size) {
    var x, y, half = size / 2;
    var scale = roughness * size;
    if (half < 1) return;

    for (y = half; y < self.max; y += size) {
      for (x = half; x < self.max; x += size) {
        square(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    for (y = 0; y <= self.max; y += half) {
      for (x = (y + half) % size; x <= self.max; x += size) {
        diamond(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    divide(size / 2);
  }

  function average(values) {
    var valid = values.filter(function(val) { return val !== false; });
    var total = valid.reduce(function(sum, val) { return sum + val; }, 0);
    return total / valid.length;
  }

  function square(x, y, size, offset) {
    var ave = average([
      self.get(x - size, y - size),   // upper left
      self.get(x + size, y - size),   // upper right
      self.get(x + size, y + size),   // lower right
      self.get(x - size, y + size)    // lower left
    ]);
    self.set(x, y, ave + offset);
  }

  function diamond(x, y, size, offset) {
    var ave = average([
      self.get(x, y - size),      // top
      self.get(x + size, y),      // right
      self.get(x, y + size),      // bottom
      self.get(x - size, y)       // left
    ]);
    self.set(x, y, ave + offset);
  }
};
