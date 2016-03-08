
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

  var player = new YTPlayerWrapper.Player ();



};





module.exports = App;
