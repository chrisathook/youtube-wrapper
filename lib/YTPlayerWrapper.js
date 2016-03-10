'use strict';
var Signal = require ("signals");

var YTPlayerWrapper = function () {



    this.readySignal = new Signal();
    this.stateChangeSignal = new Signal ();



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
    this._isMuted = false;
    this._isEnded = false;

    this.ytPlayer = null;

    this._playerLoadedHandler= this._playerLoadedHandler.bind(this);
    this._stateChangeHandler =  this._stateChangeHandler.bind(this);
};


YTPlayerWrapper.prototype.load = function (element, params) {


  if (isNaN( params.playerVars.end)=== false ) {

    this._duration = params.playerVars.end;

  }

  this.ytPlayer = new YT.Player (element, params);

  this.ytPlayer.addEventListener('onReady',this._playerLoadedHandler);
  this.ytPlayer.addEventListener('onStateChange',this._stateChangeHandler);

};


YTPlayerWrapper.prototype.destroy = function () {




  window.cancelAnimationFrame(this._timer);



  this.ytPlayer.removeEventListener('onReady',this._playerLoadedHandler);
  this.ytPlayer.removeEventListener('onStateChange',this._stateChangeHandler);

  this.readySignal.dispose();
  this.stateChangeSignal.dispose();


  this.ytPlayer.destroy();

  this.ytPlayer = null;
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

  this._isMuted = this.ytPlayer.isMuted();

  this.readySignal.dispatch({target:this});

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

      console.log('AutoVideo ended');

    }

   if (e.data === YT.PlayerState.PLAYING) {
     if (this._quartileOne && !this._isEnded) {
       console.log('YTVideoWrapper playing');

     }

     if (this._isEnded) {

       this._isEnded = false;
       console.log('YTVideoWrapper replay');

     }


      this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

   }

  if (e.data === YT.PlayerState.PAUSED) {
        console.log('YTVideoWrapper paused');

  }


  this.stateChangeSignal.dispatch({target:this,orgEvent: e});


};

YTPlayerWrapper.prototype._frameTick = function () {

  this._time = this.ytPlayer.getCurrentTime();
  this._timer = window.requestAnimationFrame(this._frameTick.bind(this));

  // DC Counters
  if (this._time >= this._videoStart && this._quartileOne && this.ytPlayer.getPlayerState()===1 ) {
    console.log('YTVideoWrapper Percent 0');
    this._quartileOne = false;
  }
  if (this._time >= this._videoTwentyFive && this._quartileTwo && this.ytPlayer.getPlayerState()===1) {
    console.log('YTVideoWrapper Percent 25');
    this._quartileTwo = false;
  }
  if (this._time >= this._videoFifty && this._quartileThree && this.ytPlayer.getPlayerState()===1) {
    console.log('YTVideoWrapper Percent 50');
    this._quartileThree = false;
  }
  if (this._time >= this._videoSeventyFive && this._quartileFour && this.ytPlayer.getPlayerState()===1) {
    console.log('YTVideoWrapper Percent 75');
    this._quartileFour = false;
  }
   if (this._time >= this._videoOneHundred && this._quartileEnd && this.ytPlayer.getPlayerState()===1) {
     console.log('YTVideoWrapper Percent 100');
     this._quartileEnd = false;

  }

  if (this._isMuted !== this.ytPlayer.isMuted()) {

      this._isMuted = this.ytPlayer.isMuted();

      if (this._isMuted) {

        console.log ("Video Muted");
      }else {
        console.log ("Video Unmuted");
      }

  }


};




module.exports = YTPlayerWrapper;
