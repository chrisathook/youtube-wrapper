'use strict';


var TrackingManifest = function (play,pause,end,replay,muted,unmuted,quart_0,quart_25,quart_50,quart_75,quart_100) {


  this.play = play;
  this.pause = pause;
  this.end = end;
  this.replay = replay;
  this.muted = muted;
  this.unmuted = unmuted;
  this.quart_0 = quart_0;
  this.quart_25 = quart_25;
  this.quart_50 = quart_50;
  this.quart_75 = quart_75;
  this.quart_100 = quart_100;


};


TrackingManifest.DEFAULT = new TrackingManifest(

  function  (){console.log('DEFAULT VIDEO playing'); },
  function  (){console.log('DEFAULT VIDEO paused'); },
  function  (){console.log('DEFAULT VIDEO ended'); },
  function  (){console.log('DEFAULT VIDEO replay'); },
  function  (){console.log('DEFAULT VIDEO Muted'); },
  function  (){console.log('DEFAULT VIDEO Unmuted'); },
  function  (){console.log('DEFAULT VIDEO Percent 0'); },
  function  (){console.log('DEFAULT VIDEO Percent 25'); },
  function  (){console.log('DEFAULT VIDEO Percent 50'); },
  function  (){console.log('DEFAULT VIDEO Percent 75'); },
  function  (){console.log('DEFAULT VIDEO Percent 100'); }



);

TrackingManifest.SILENT = new TrackingManifest(

  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ },
  function  (){ }



);


//TrackingManifest.prototype

/**************************************************************************************************************************

 API

 ***************************************************************************************************************************/

/**************************************************************************************************************************

 Private Functions

 ***************************************************************************************************************************/


/**************************************************************************************************************************

 Event Handlers

 ***************************************************************************************************************************/


module.exports = TrackingManifest;
