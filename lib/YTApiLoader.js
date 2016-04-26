'use strict';

var Signal = require('signals');

var YTApiLoader = function () {

  this.apiReady = new Signal();
  this.apiReady.memorize = true;

  this.isLoaded = false;
  
};

YTApiLoader.prototype.load = function () {

  if (!this.isLoaded) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = this.ytloaded.bind (this);

  }else {

    this.apiReady.dispatch();
  }

};

YTApiLoader.prototype.ytloaded = function () {

  this.isLoaded = true;

  this.apiReady.dispatch();

};

//*************************************************************************
//Singleton
//*************************************************************************

YTApiLoader._instance = null;
YTApiLoader.getInstance = function () {
  if (YTApiLoader._instance == null) {
    YTApiLoader._instance = new YTApiLoader();
  }
  return YTApiLoader._instance;
};

module.exports = YTApiLoader;