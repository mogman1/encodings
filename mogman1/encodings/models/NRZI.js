(function(mogman1, undefined) {
  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  if (!mogman1.encodings.models.hasOwnProperty('AbstractEncoding')) {
    throw 'AbstractEncoding has not yet been included';
  }

  var NRZI = function(startPosition) {
    if (startPosition != 'high' && startPosition != 'low') throw 'Invalid startPosition specified';
    mogman1.encodings.models.AbstractEncoding.call(this);
    this._startPosition = startPosition;
  };

  NRZI.prototype = Object.create(mogman1.encodings.models.AbstractEncoding.prototype); // See note below
  NRZI.prototype.constructor = NRZI;

  /**
   * Clears _waveCoords and builds an array of points that represent the waveform indicated by the array of 1's and 0's
   * in bitSequence.
   * @param {string[]} bitSequence - Array of 1's and 0's that represent a waveform
   */
  NRZI.prototype._buildSequence = function(bitSequence) {
    this._waveCoords = [];
    this._bitBorders = [0];
    var pos = null;
    if (this._startPosition == 'high') {
      this._waveCoords.push([0, -1 * this._bitHeight / 2]);
      pos = 'high';
    } else {
      this._waveCoords.push([0, 1 * this._bitHeight / 2]);
      pos = 'low';
    }

    for (var i = 0; i < bitSequence.length; i++) {
      var cur = bitSequence[i];
      this._bitBorders.push(this._bitWidth);
      if (cur == '0') {
        this._waveCoords.push([this._bitWidth, 0]);
      } else {
        this._waveCoords.push([this._bitWidth / 2, 0]);
        if (pos == 'high') {
          this._waveCoords.push([0, 1 * this._bitHeight]);
          pos = 'low';
        } else {
          this._waveCoords.push([0, -1 * this._bitHeight]);
          pos = 'high';
        }
        this._waveCoords.push([this._bitWidth / 2, 0]);
      }
    }

    if (pos == 'high') {
      this._waveCoords.push([0, 1 * (this._bitHeight / 2)]);
    } else {
      this._waveCoords.push([0, -1 * (this._bitHeight / 2)]);
    }
  };

  NRZI.prototype.getName = function() {
    return "NRZI (" + this._startPosition + ")";
  };

  mogman1.encodings.models.NRZI = NRZI;
}(window.mogman1 = window.mogman1 || {}));
