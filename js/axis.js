function Axis(length){
    this.x = createAxis( v(-length, 0, 0), v(length, 0, 0), 0xff0000);
    this.y = createAxis( v(0, -length, 0), v(0, length, 0), 0x00ff00);
    this.z = createAxis( v(0, 0, -length), v(0, 0, length), 0x0000ff);

    function createAxis(p1, p2, color){
      var lineGeometry = new THREE.Geometry();
      var lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
      lineGeometry.vertices.push(p1, p2);
      return new THREE.Line(lineGeometry, lineMat);

    }

    function v(x,y,z){ 
      return new THREE.Vector3(x,y,z); 
    }
};