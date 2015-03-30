(function(mogman1, undefined) {
  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  if (!mogman1.encodings.models.hasOwnProperty('AbstractEncoding')) {
    throw 'AbstractEncoding has not yet been included';
  }

  var NRZI = function(startPosition) {
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
  NRZI.prototype.buildSequence = function(bitSequence) {
    this._waveCoords = [];
    var pos = null;
    if (this._startPosition == 'high') {
      this._waveCoords.push([0, -1 * this._bitHeight / 2]);
      pos = 'high';
    } else {
      this._waveCoords.push([0, 1 * this._bitHeight / 2]);
      pos = 'low';
    }

    var prev = null;
    for (var i = 0; i < bitSequence.length; i++) {
      var cur = bitSequence[i];
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

  mogman1.encodings.models.NRZI = NRZI;
}(window.mogman1 = window.mogman1 || {}));