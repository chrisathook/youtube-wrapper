'use strict';
var Signal = require("signals");

var YTPlayerWrapper = function (tracking) {

  this.readySignal = new Signal();
  this.stateChangeSignal = new Signal();

  this._duration = null;
  this._videoStart = null;
  this._videoTwentyFive = null;
  this._videoFifty = null;
  this._videoSeventyFive = null;
  this._videoOneHundred = null;
  this._quartileOne = true;
  this._quartileTwo = true;
  this._quartileThree = true;
  this._quartileFour = true;
  this._quartileEnd = true;
  this._time = null;
  this._timer = null;
  this._isMuted = false;
  this._isEnded = false;

  this._tracking = tracking;
  this.ytPlayer = null;

  this._playerLoadedHandler = this._playerLoadedHandler.bind(this);
  this._stateChangeHandler = this._stateChangeHandler.bind(this);
};

/**************************************************************************************************************************

 API

 ***************************************************************************************************************************/


YTPlayerWrapper.prototype.load = function (element, params) {

  if (isNaN(params.playerVars.end) === false) {

    this._duration = params.playerVars.end;

  }

  this.ytPlayer = new YT.Player(element, params);

  this.ytPlayer.addEventListener('onReady', this._playerLoadedHandler);
  this.ytPlayer.addEventListener('onStateChange', this._stateChangeHandler);

};

YTPlayerWrapper.prototype.destroy = function () {

  window.cancelAnimationFrame(this._timer);

  this.ytPlayer.removeEventListener('onReady', this._playerLoadedHandler);
  this.ytPlayer.removeEventListener('onStateChange', this._stateChangeHandler);

  this.readySignal.dispose();
  this.stateChangeSignal.dispose();

  this._tracking = null;

  this.ytPlayer.destroy();

  this.ytPlayer = null;
};

/**************************************************************************************************************************

 Private Functions

 ***************************************************************************************************************************/

/**************************************************************************************************************************

 Event Handlers

 ***************************************************************************************************************************/

YTPlayerWrapper.prototype._playerLoadedHandler = function (e) {

  if (this._duration === null) {
    this._duration = e.target.getDuration();

  }

  this._videoStart = 0;
  this._videoTwentyFive = this._duration * 0.25;
  this._videoFifty = this._duration * 0.5;
  this._videoSeventyFive = this._duration * 0.75;
  this._videoOneHundred = this._duration - .5;

  this._isMuted = this.ytPlayer.isMuted();

  this.readySignal.dispatch({target: this});

};

YTPlayerWrapper.prototype._stateChangeHandler = function (e) {



  // if video has ended event
  if (e.data === YT.PlayerState.ENDED) {

    this._isEnded = true;

    this._quartileOne = true;
    this._quartileTwo = true;
    this._quartileThree = true;
    this._quartileFour = true;
    this._quartileEnd = true;

    this._tracking.end.call ();

  }

  if (e.data === YT.PlayerState.PLAYING) {
    if (this._quartileOne && !this._isEnded) {

      this._tracking.play.call ();

    }

    if (this._isEnded) {

      this._isEnded = false;

      this._tracking.replay.call ();

    }

    this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

  }

  if (e.data === YT.PlayerState.PAUSED) {
    this._tracking.pause.call ();

  }

  this.stateChangeSignal.dispatch({target: this, orgEvent: e});

};

YTPlayerWrapper.prototype._frameTick = function () {


  if (this.ytPlayer === null) {

    return
  }

  this._time = this.ytPlayer.getCurrentTime();


  // DC Counters
  if (this._time >= this._videoStart && this._quartileOne && this.ytPlayer.getPlayerState() === 1) {
    this._tracking.quart_0.call ();
    this._quartileOne = false;
  }
  if (this._time >= this._videoTwentyFive && this._quartileTwo && this.ytPlayer.getPlayerState() === 1) {
    this._tracking.quart_25.call ();
    this._quartileTwo = false;
  }
  if (this._time >= this._videoFifty && this._quartileThree && this.ytPlayer.getPlayerState() === 1) {
    this._tracking.quart_50.call ();
    this._quartileThree = false;
  }
  if (this._time >= this._videoSeventyFive && this._quartileFour && this.ytPlayer.getPlayerState() === 1) {
    this._tracking.quart_75.call ();
    this._quartileFour = false;
  }
  if (this._time >= this._videoOneHundred && this._quartileEnd && this.ytPlayer.getPlayerState() === 1) {
    this._tracking.quart_100.call ();
    this._quartileEnd = false;

  }

  if (this._isMuted !== this.ytPlayer.isMuted()) {

    this._isMuted = this.ytPlayer.isMuted();

    if (this._isMuted) {

      this._tracking.muted.call ();
    } else {
      this._tracking.unmuted.call ();
    }

  }

  this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

};

module.exports = YTPlayerWrapper;
