(function(mogman1, undefined) {
  var EncodingView = function(canvasDiv, canvasWidth) {
    var wavePadding = 20;
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = wavePadding;

    this._div = canvasDiv;
    this._div.style.position = 'relative';
    this._div.appendChild(canvas);
    this._speed = 1;
    this._canvas = canvas;
    this._startX = 0;
    this._bitWidth = 40;
    this._bitHeight = 40;
    this._encodings = [];
    this._wavePadding = 20;
    this._currentSequence = [];
    
    this._draw();
  };

  EncodingView.prototype.addEncoding = function(encoding, startPosition) {
    var obj = null;
    switch(encoding) {
      case 'NRZ':
        obj = new mogman1.encodings.models.NRZ();
        break;
      case 'NRZI':
        obj = new mogman1.encodings.models.NRZI(startPosition);
        break;
      case 'Manchester':
        obj = new mogman1.encodings.models.Manchester();
        break;
      default:
        throw 'No such encoding [' + encoding + '] exists';
    }

    var waveHeight = this._wavePadding + this._bitHeight
    var startY = (this._wavePadding + this._bitHeight / 2) + (waveHeight) * (this._encodings.length)
    this._canvas.height += waveHeight;

    obj.setStartY(startY);
    obj.setBitWidth(this._bitWidth);
    obj.setBitHeight(this._bitHeight);
    obj.buildSequence(this._currentSequence);
    this._createLabel(obj, startY, this._encodings.length);
    this._encodings.push(obj);

    return this._encodings.length - 1;
  };

  EncodingView.prototype.setSequence = function(sequence) {
    sequence = sequence.split('');
    for (var i = 0; i < sequence.length; i++) {
      if (sequence[i] != '0' && sequence[i] != '1') return false;
    }

    this._startX = 0;
    this._currentSequence = sequence;
    for (var i = 0; i < this._encodings.length; i++) {
      this._encodings[i].buildSequence(sequence);
    }
  };

  EncodingView.prototype.setSpeed = function(speed) {
    this._speed = speed;
  };

  EncodingView.prototype._createLabel = function(encoding, startY, encodingId) {
    var lbl = document.createElement('div');
    lbl.style.position = 'absolute';
    lbl.style.top = startY - 10;
    lbl.style.left = this._canvas.width + 20;
    lbl.id = 'label_' + encodingId;
    lbl.innerHTML = encoding.getName();
    this._div.appendChild(lbl);
  }

  EncodingView.prototype._draw = function() {
    var c = this._canvas.getContext('2d');
    c.clearRect(0, 0, this._canvas.width, this._canvas.height);

    var done = true;
    for (var i = 0; i < this._encodings.length; i++) {
      this._encodings[i].draw(this._canvas, this._startX);
      done = done && this._encodings[i].isFinished();
    }

    this._startX -= this._speed;
    if (done) {
      this._startX = 0;
    }

    var obj = this;
    setTimeout(function() { obj._draw(); }, 30);
  };

  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  mogman1.encodings.models.EncodingView = EncodingView;
}(window.mogman1 = window.mogman1 || {}));