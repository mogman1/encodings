(function(mogman1, undefined) {
  mogman1.encodings = function(canvas) {
    //Private Property 
    var ecd = {};
    var _canvas = canvas;
    var _defaultBitWidth = 40;
    var _defaultBitHeight= 40;
    var _bitWidth = 40;
    var _bitHeight= 40;
    var _startX = 0;
    var _startY = [60];
    var _sequence = ['0', '1', '1', '0', '1', '0', '0'];
    var _squareWaves = [];
    var _startOverValue = 0;
    var _restart = false;
    var _started = false;
    var _speed = 1;

    ecd.draw = function() {
      if (_started) {
        _restart = true;
      }

      _start();
    };

    ecd.setSequence = function(sequence) {
      var s = sequence.split('');
      for (var i = 0; i < s.length; i++) {
        if (s[i] != '0' && s[i] != '1') return false;
      }

      _sequence = s;
      _squareWaves = [];
      _squareWaves.push(_buildNRZ());
      _startOverValue = _canvas.width + (_sequence.length + 3) * _bitWidth;
      this.draw();
    }

    ecd.setSpeed = function(speed) {
      _speed = speed;
    }

    function _buildNRZ() {
      var nrzCoords = [[_canvas.width, 0]];
      var prev = null;
      for (var i = 0; i < _sequence.length; i++) {
        var cur = _sequence[i];
        if (prev == null) {
          if (cur == '0') {
            nrzCoords.push([0, 1 * (_bitHeight / 2)]);
          } else {
            nrzCoords.push([0, -1 * (_bitHeight / 2)]);
          }
        } else if (prev != cur) {
          if (prev == '0') {
            nrzCoords.push([0, -1 * _bitHeight]);
          } else {
            nrzCoords.push([0, 1 * _bitHeight]);
          }
        }

        nrzCoords.push([_bitWidth, 0]);
        prev = cur;
      }

      if (prev == '0') {
        nrzCoords.push([0, -1 * (_bitHeight / 2)]);
      } else {
        nrzCoords.push([0, 1 * (_bitHeight / 2)]);
      }

      return nrzCoords
    }

    function _draw() {
      if (_restart) {
        _startX = 0;
        _restart = false;
        return;
      }

      var c = _canvas.getContext('2d');
      c.clearRect(0, 0, _canvas.width, _canvas.height);
      c.beginPath();
      for (var j = 0; j < _startY.length; j++) {
        var x = _startX;
        var y = _startY[j];
        c.moveTo(x, y);
        for (var i = 0; i < _squareWaves[j].length; i++) {
          x += _squareWaves[j][i][0];
          y += _squareWaves[j][i][1];
          c.lineTo(x, y);
        }

        x += 2 * _canvas.width;
        c.lineTo(x, y);
        c.stroke();
      }

      _startX -= _speed;
      if (_startX < -1 * _startOverValue) {
        _startX = 0;
      }

      setTimeout(function() { _draw(); }, 30);
    }

    function _start() {
      if (_restart) {
        setTimeout(function() { _start(); }, 10);
      } else {
        _started = true;
        _draw();
      }
    }

    return ecd;
  }
}(window.mogman1 = window.mogman1 || {}));