'use strict';
var Signal = require ("signals");

var YTPlayerWrapper = function (element, params) {



    this.playerReadySignal = new Signal();



    this._duration = null;
    this._videoStart = null;
    this._videoTwentyFive = null;
    this._videoFifty =null;
    this._videoSeventyFive = null;
    this._quartileOne = true;
    this._quartileTwo = true;
    this._quartileThree = true;
    this._quartileFour = true;
    this._time = null;
    this._timer = null;
    this.player = null;

    params.events = { };

    params.events.onReady = this._playerLoadedHandler= this._playerLoadedHandler.bind(this);
    params.events.onStateChange =  this._stateChangeHandler =  this._stateChangeHandler.bind(this);




};



YTPlayerWrapper.prototype._playerLoadedHandler = function (e) {

  this._duration = e.target.getDuration();
  this._videoStart = 0;
  this._videoTwentyFive = this._duration * 0.25;
  this._videoFifty = this._duration * 0.5;
  this._videoSeventyFive = this._duration * 0.75;

  this.playerReadySignal.dispatch();

};

YTPlayerWrapper.prototype._stateChangeHandler = function (e) {




};

YTPlayerWrapper.prototype._frameTick = function (e) {

  this._time = e.target.getCurrentTime();
  this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

  // DC Counters
  if (this.time === this._videoStart && this._quartileOne) {
    console.log('ClickVideo Percent 0');
    this._quartileOne = false;
  }
  if (this.time >= this._videoTwentyFive && this._quartileTwo) {
    console.log('ClickVideo Percent 25');
    this._quartileTwo = false;
  }
  if (this.time >= this._videoFifty && this._quartileThree) {
    console.log('ClickVideo Percent 50');
    this._quartileThree = false;
  }
  if (this.time >= this._videoSeventyFive && this._quartileFour) {
    console.log('ClickVideo Percent 75');
    this._quartileFour = false;
  }
};




module.exports = YTPlayerWrapper;
