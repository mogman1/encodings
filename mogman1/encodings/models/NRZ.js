(function(mogman1, undefined) {
  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  if (!mogman1.encodings.models.hasOwnProperty('AbstractEncoding')) {
    throw 'AbstractEncoding has not yet been included';
  }

  var NRZ = function() {
    mogman1.encodings.models.AbstractEncoding.call(this);
  };

  NRZ.prototype = Object.create(mogman1.encodings.models.AbstractEncoding.prototype); // See note below
  NRZ.prototype.constructor = NRZ;

  /**
   * Clears _waveCoords and builds an array of points that represent the waveform indicated by the array of 1's and 0's
   * in bitSequence.
   * @param {string[]} bitSequence - Array of 1's and 0's that represent a waveform
   */
  NRZ.prototype.buildSequence = function(bitSequence) {
    this._waveCoords = [];
    var prev = null;
    for (var i = 0; i < bitSequence.length; i++) {
      var cur = bitSequence[i];
      if (prev == null) {
        if (cur == '0') {
          this._waveCoords.push([0, 1 * (this._bitHeight / 2)]);
        } else {
          this._waveCoords.push([0, -1 * (this._bitHeight / 2)]);
        }
      } else if (prev != cur) {
        if (prev == '0') {
          this._waveCoords.push([0, -1 * this._bitHeight]);
        } else {
          this._waveCoords.push([0, 1 * this._bitHeight]);
        }
      }

      this._waveCoords.push([this._bitWidth, 0]);
      prev = cur;
    }

    if (prev == '0') {
      this._waveCoords.push([0, -1 * (this._bitHeight / 2)]);
    } else {
      this._waveCoords.push([0, 1 * (this._bitHeight / 2)]);
    }
  };

  mogman1.encodings.models.NRZ = NRZ;
}(window.mogman1 = window.mogman1 || {}));