
"use strict";



var YTPlayerWrapper = require ("../index.js");


var App = function () {


  this.loadDC();



};


App.prototype.loadDC = function () {

  if (!Enabler.isInitialized()) {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, this.enablerInitialized.bind (this));
  } else {
    this.enablerInitialized();
  }


};



App.prototype.enablerInitialized = function () {

  console.log("DC Ready");


  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady= this._ytloaded.bind (this);




};


App.prototype._ytloaded = function () {


  console.log ("YT api loaded");

  var el = document.querySelector('#ad-root');
    var params = {
      height: '250',
      width: '970',
      videoId: "zRa3X1IqcgI",
      playerVars: {

        end: 25,
        start: 0,
        rel: 0,
        showinfo: 0,
        enablejsapi: 1,
        disablekb: 1,
        iv_load_policy: 3,
        cc_load_policy: 0,
        adformat: '1_8',
        controls: 1,
        html5: 1,
        origin: document.domain,
        fs: 0
      }
    };

  this.player = new YTPlayerWrapper.Player ();

  this.player.playerReadySignal.addOnce (this._playerReadyHandler,this);

  this.player.load (el,params);


};


App.prototype._playerReadyHandler = function () {

this.player.ytPlayer.playVideo();

};




module.exports = App;
