
"use strict";






var App = function () {


  this.loadDC();



};


App.prototype.loadDC = function () {

  if (!Enabler.isInitialized()) {
    Enabler.addEventListener(studio.events.StudioEvent.INIT,this.enablerInitialized.bind (this));
  } else {
    enablerInitialized();
  }


};



App.prototype.enablerInitialized = function () {

console.log ("DC Ready");


  var tag = document.createElement('script');
   tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady= this._ytloaded.bind (this);




};


App.prototype._ytloaded = function () {


  console.log ("YT api loaded");

};





module.exports = App;
