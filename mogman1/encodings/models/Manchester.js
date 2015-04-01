(function(mogman1, undefined) {
  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  if (!mogman1.encodings.models.hasOwnProperty('AbstractEncoding')) {
    throw 'AbstractEncoding has not yet been included';
  }

  var Manchester = function() {
    mogman1.encodings.models.AbstractEncoding.call(this);
    this._widthDivisor = 1;
  };

  Manchester.prototype = Object.create(mogman1.encodings.models.AbstractEncoding.prototype); // See note below
  Manchester.prototype.constructor = Manchester;

  /**
   * Clears _waveCoords and builds an array of points that represent the waveform indicated by the array of 1's and 0's
   * in bitSequence.
   * @param {string[]} bitSequence - Array of 1's and 0's that represent a waveform
   */
  Manchester.prototype.buildSequence = function(bitSequence) {
    this._waveCoords = [];
    var pos = null;
    //move signal to proper state to record first bit
    if (bitSequence.length) {
      if (bitSequence[0] == '1') {
        this._waveCoords.push([0, -1 * this._bitHeight / 2]);
        pos = 'high';
      } else {
        this._waveCoords.push([0, 1 * this._bitHeight / 2]);
        pos = 'low';
      }
    }

    for (var i = 0; i < bitSequence.length; i++) {
      var cur = bitSequence[i];
      if (cur == '1' && pos == 'low') {
        this._waveCoords.push([0, -1 * this._bitHeight]);
        pos = 'high';
      } else if (cur == '0' && pos == 'high') {
        this._waveCoords.push([0, 1 * this._bitHeight]);
        pos = 'low';
      }

      this._waveCoords.push([this._bitWidth / this._widthDivisor, 0]);
      if (cur == '1') {
        this._waveCoords.push([0, 1 * this._bitHeight]);
        pos = 'low';
      } else {
        this._waveCoords.push([0, -1 * this._bitHeight]);
        pos = 'high';
      }

      this._waveCoords.push([this._bitWidth / this._widthDivisor, 0]);
    }
  };

  Manchester.prototype.getName = function() {
    return "Manchester";
  }

  mogman1.encodings.models.Manchester = Manchester;
}(window.mogman1 = window.mogman1 || {}));