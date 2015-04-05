(function(mogman1, undefined) {
  var AbstractEncoding = function() {
    /**
     * Array of points relative to previous points.  So a point [0, 10] would be a point 0 in the x-direction and 10 in
     * the positive y-direction away from the previous point.
     */
    this._waveCoords = [];

    /**
     * Indicates if the waveform has had the opportunity to fully pass across the canvas window
     */
    this._isFinished = false;

    this._bitBorders = [];
  };

  /**
   * Clears _waveCoords and builds an array of points that represent the waveform indicated by the array of 1's and 0's
   * in bitSequence.
   * @param {string[]} bitSequence - Array of 1's and 0's that represent a waveform
   */
  AbstractEncoding.prototype.buildSequence = function(bitSequence) {
    throw "buildSequence has not been overridden by child object";
  };

  /**
   * Draws the waveform created by call to buildSequence on the provided canvas, with the provided starting x coord.
   * @param  {HTMLCanvasElement} canvas HTML cavnas element
   * @param  {int} startX - Integer representing starting x position
   */
  AbstractEncoding.prototype.draw = function(canvas, startX) {
    this._drawWave(canvas, startX);
    this._drawBitBorders(canvas, startX);
  };

  AbstractEncoding.prototype._drawBitBorders = function(canvas, startX) {
    var bleedOver = 3;
    var startY = this._startY - this._bitHeight / 2 - bleedOver;
    var endY   = this._startY + this._bitHeight / 2 + bleedOver;
    var c = canvas.getContext('2d');
    c.beginPath();

    var dashLength = 3;
    for (var i = 0; var < this._bitBorders.length; i++) {
      var x = this._bitBorders[i];
      var y = startY;
      c.moveTo(x, y);
      if (x >= 0 && x <= canvas.width) {
        var switch = 0;
        while (y < endY) {
          c
        }
      }
    }
  }

  AbstractEncoding.prototype._drawWave = function(canvas, startX) {
    var c = canvas.getContext('2d');
    c.beginPath();

    //move cursor to start of waveform
    var x = startX;
    var y = this._startY;
    c.moveTo(x, y);

    //draw line of neutral power level across canvas view, plus a little padding
    x += canvas.width + 2 * this._bitWidth;
    c.lineTo(x, y);

    //draw encoding waveform
    for (var i = 0; i < this._waveCoords.length; i++) {
      x += this._waveCoords[i][0];
      y += this._waveCoords[i][1];
      c.lineTo(x, y);
      if (x > canvas.width) break; //beyond canvas window, no point in continuing to draw what can't be seen
    }

    //move line to neutral power level
    y = this._startY
    c.lineTo(x, y);
    c.stroke();
    this._isFinished = (x < 0);

    //draw neutral power level line beyond canvas edge if we still have distance to go
    if (x <= canvas.width) {
      x = 1.5 * canvas.width;
      c.lineTo(x, y);
      c.stroke();
    }
  }

  AbstractEncoding.prototype.getName = function() {
    throw "getName has not been overridden by child object";
  }

  AbstractEncoding.prototype.isFinished = function() {
    return this._isFinished;
  }

  /**
   * Sets how tall, in pixels, to draw each individual bit.  This is the full height from negative voltage up to
   * positive voltage, not just from zero voltage to positive/negative voltage.
   * @param {int} bitHeight
   */
  AbstractEncoding.prototype.setBitHeight = function (bitHeight) {
    this._bitHeight = bitHeight;
  }

  /**
   * Sets how wide, in pixels, to draw each individual bit
   * @param {int} bitWidth
   */
  AbstractEncoding.prototype.setBitWidth = function (bitWidth) {
    this._bitWidth = bitWidth;
  }

  /**
   * Sets the y position, in pixels, representing 0 voltage
   * @param {int} startY
   */
  AbstractEncoding.prototype.setStartY = function (startY) {
    this._startY = startY;
  }

  mogman1.encodings = mogman1.encodings || {};
  mogman1.encodings.models = mogman1.encodings.models || {};
  mogman1.encodings.models.AbstractEncoding = AbstractEncoding;
}(window.mogman1 = window.mogman1 || {}));