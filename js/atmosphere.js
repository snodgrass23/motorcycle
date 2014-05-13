function Atmosphere() {
  this.light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  this.light.color.setHSL( 0.6, 1, 0.6 );
  this.light.groundColor.setHSL( 0.095, 1, 0.75 );
  this.light.position.set( 0, 500, 0 );
}