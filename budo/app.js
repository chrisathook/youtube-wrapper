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

  YTConfig.generateDefaultAutoplay(250,970,"zRa3X1IqcgI");

  var params = YTConfig.generateDefaultClickplay(250,970,"zRa3X1IqcgI");

  this.player = new YTPlayerWrapper(TrackingManifest.DEFAULT);

  this.player.readySignal.addOnce (this._playerReadyHandler, this);

  this.player.load (el, params);

};

App.prototype._playerReadyHandler = function (signal) {

  this.player.ytPlayer.playVideo();

};

module.exports = App;
