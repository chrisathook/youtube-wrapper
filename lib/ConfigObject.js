'use strict';

var ConfigObject = function () {
};

ConfigObject.generateDefaultAutoplay = function (height, width, id) {

  var params = {
    height: height,
    width: width,
    videoId: id,
    playerVars: {
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      disablekb: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
      controls: 0,
      html5: 1,
      origin: document.domain,
      fs: 0
    }
  };

  return params;

};

ConfigObject.generateDefaultClickplay = function (height, width, id) {

  var params = {
    height: height,
    width: width,
    videoId: id,
    playerVars: {
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

  return params;

};


module.exports = ConfigObject;
