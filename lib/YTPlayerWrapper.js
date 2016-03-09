'use strict';
var Signal = require ("signals");

var YTPlayerWrapper = function () {



    this.playerReadySignal = new Signal();



    this._duration = null;
    this._videoStart = null;
    this._videoTwentyFive = null;
    this._videoFifty =null;
    this._videoSeventyFive = null;
    this._videoOneHundred = null;
    this._quartileOne = true;
    this._quartileTwo = true;
    this._quartileThree = true;
    this._quartileFour = true;
    this._quartileEnd = true;
    this._time = null;
    this._timer = null;
    this.player = null;



};


YTPlayerWrapper.prototype.load = function (element, params) {

  params.events = { };

  params.events.onReady = this._playerLoadedHandler= this._playerLoadedHandler.bind(this);
  params.events.onStateChange =  this._stateChangeHandler =  this._stateChangeHandler.bind(this);


  if (isNaN( params.playerVars.end)=== false ) {

    this._duration = params.playerVars.end;

  }

  this.player = new YT.Player (element, params)

};


YTPlayerWrapper.prototype._playerLoadedHandler = function (e) {

  if (this._duration === null) {
   this._duration = e.target.getDuration();

  }


  this._videoStart = 0;
  this._videoTwentyFive = this._duration * 0.25;
  this._videoFifty = this._duration * 0.5;
  this._videoSeventyFive = this._duration * 0.75;
  this._videoOneHundred = this._duration-.5;

  this.playerReadySignal.dispatch();

};

YTPlayerWrapper.prototype._stateChangeHandler = function (e) {

  // if video has ended event
    if (e.data === YT.PlayerState.ENDED) {

      window.cancelAnimationFrame(this._timer);


      console.log('AutoVideo ended');

    }

   if (e.data === YT.PlayerState.PLAYING) {

     this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

     console.log('AutoVideo playing');

   }


};

YTPlayerWrapper.prototype._frameTick = function () {

  this._time = this.player.getCurrentTime();
  this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

  // DC Counters
  if (this._time === this._videoStart && this._quartileOne) {
    console.log('ClickVideo Percent 0');
    this._quartileOne = false;
  }
  if (this._time >= this._videoTwentyFive && this._quartileTwo) {
    console.log('ClickVideo Percent 25');
    this._quartileTwo = false;
  }
  if (this._time >= this._videoFifty && this._quartileThree) {
    console.log('ClickVideo Percent 50');
    this._quartileThree = false;
  }
  if (this._time >= this._videoSeventyFive && this._quartileFour) {
    console.log('ClickVideo Percent 75');
    this._quartileFour = false;
  }
   if (this._time >= this._videoOneHundred && this._quartileEnd) {
     console.log('AutoVideo Percent 100');
     this._quartileEnd = false;

  }


};




module.exports = YTPlayerWrapper;
