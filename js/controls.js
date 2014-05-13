function Controls() {
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  this.onKeyUp = this.onKeyUp.bind(this);
  
  this.actions = {
    forward: 0,
    left: 0,
    back: 0,
    right: 0
  };

  this.keyCodes = {};

  this.mouseX = 0;
  this.mouseY = 0;

  this.bindAction('forward', [38, 87]); // up, w
  this.bindAction('back', [40, 83]);    // down, s
  this.bindAction('left', [37, 65]);    // left, a
  this.bindAction('right', [39, 68]);   // right, d

  this.listen();
}

Controls.prototype.listen = function() {
  document.addEventListener( 'contextmenu', function (e) {
    e.preventDefault();
  }, false );
  document.addEventListener( 'mousemove', this.onMouseMove, false );
  document.addEventListener( 'mousedown', this.onMouseDOwn, false );
  document.addEventListener( 'mouseup', this.onMouseUp, false );
  document.addEventListener( 'keydown', this.onKeyDown, false );
  document.addEventListener( 'keyup', this.onKeyUp, false );
};

Controls.prototype.onMouseMove = function(e) {
  this.mouseX = e.pageX / window.innerWidth - 0.5;
  this.mouseY = e.pageY / window.innerHeight - 0.5;
};

Controls.prototype.onMouseDown = function(e) {
  e.preventDefault();
  e.stopPropagation();
};

Controls.prototype.onMouseUp = function(e) {
  e.preventDefault();
  e.stopPropagation();
};

Controls.prototype.bindAction = function(state, codes) {
  codes.forEach(function(code) {
    this.keyCodes[code] = state
  }.bind(this));
};

Controls.prototype.onKeyDown = function(e) {
  var action = this.keyCodes[e.keyCode];
  if (action) {
    this.actions[action] = true;
    e.preventDefault();
    e.stopPropagation();
  }
};

Controls.prototype.onKeyUp = function(e) {
  var action = this.keyCodes[e.keyCode];
  if (action) {
    this.actions[action] = false;
    e.preventDefault();
    e.stopPropagation();
  }
};
