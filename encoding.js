(function(mogman1, undefined) {
  mogman1.encodings = function(canvas) {
    //Private Property 
    var ecd = {};
    var _canvas = canvas;
    var priv = 'is private';
    var _startX = _canvas.width;
    var _startY = 60;

    ecd.publ = 'public, yo!'
    var _coords = [
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
      [20, 0],
      [0, -20],
      [20, 0],
      [0, 20],
    ];
    ecd.draw = function() {
      console.log(_canvas.width);
      console.log(_canvas.height);
      var c = _canvas.getContext('2d');
      _draw();
      // var x = 0,
      //     y = 60;
      // c.moveTo(x, y);
      // for (var i = 0; i < _coords.length; i++) {
      //   x = x + _coords[i][0];
      //   y = y + _coords[i][1];
      //   c.lineTo(x, y);
      // }
      // c.stroke();
      // privFunc();
    };

    function _draw() {
      console.log('draw!');
      var c = _canvas.getContext('2d');
      // _canvas.width = _canvas.width;
      c.clearRect(0, 0, canvas.width, canvas.height);
      var x = _startX;
      var y = _startY;
      _startX -= 5;
      c.beginPath();
      c.moveTo(x, y);
      for (var i = 0; i < _coords.length; i++) {
        x += _coords[i][0];
        y += _coords[i][1];
        c.lineTo(x, y);
        c.stroke();
      }

      if (_startX < -2 * _canvas.width) {
        _startX = _canvas.width;
      }

      setTimeout(function() { _draw(); }, 30);
    }
    function privFunc() {
      console.log('privFunc');
    }

    return ecd;
  }
}(window.mogman1 = window.mogman1 || {}));