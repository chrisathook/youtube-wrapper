
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







};





module.exports = App;
