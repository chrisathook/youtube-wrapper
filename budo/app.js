"use strict";

var YTPlayerWrapper = require("../index.js").YTPlayerWrapper;
var TrackingManifest = require("../index.js").TrackingManifest;
var YTApiLoader = require("../index.js").YTApiLoader;
var YTConfig = require("../index.js").ConfigObject;

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

  var ytLoader = YTApiLoader.getInstance();
  ytLoader.apiReady.addOnce(this._ytloaded, this);
  ytLoader.load ();

};

App.prototype._ytloaded = function () {

  console.log ("YT api loaded");

  var el = document.querySelector('#ad-root');
  // you still tell the player to when you are ready for it to play.
  var params = YTConfig.generateDefaultNoHistory(250,970,"zRa3X1IqcgI", 15);
  this.player = new YTPlayerWrapper(TrackingManifest.DEFAULT);
  this.player.readySignal.addOnce (this._playerReadyHandler, this);
  this.player.load (el, params);

};

App.prototype._playerReadyHandler = function (signal) {

  this.player.ytPlayer.mute ();
  this.player.ytPlayer.playVideo();

};

module.exports = App;
