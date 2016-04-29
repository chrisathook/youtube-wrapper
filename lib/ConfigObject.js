'use strict';

var ConfigObject = function () {
};

/**
 * Parameters for a video without controls that should be autoplayed, video will not show up in user history video will not actually auto play, you need to play it from the api.
 *
 * @param height
 * @param width
 * @param id
 * @param length
 * @returns {{height: *, width: *, videoId: *, playerVars: {end: *, rel: number, showinfo: number, enablejsapi: number, disablekb: number, iv_load_policy: number, cc_load_policy: number, adformat: string, controls: number, html5: number, origin: string, fs: number}}}
 */

ConfigObject.generateDefaultNoHistory = function (height, width, id, length) {

  var playerVars = {
    rel: 0,
    showinfo: 0,
    enablejsapi: 1,
    disablekb: 1,
    iv_load_policy: 3,
    cc_load_policy: 0,
    adformat: '1_8', // prevents video from showing up in user YT history so auto play videos don't get flagged as spam
    controls: 0,
    html5: 1,
    origin: document.domain,
    fs: 0
  };

  if (!isNaN(length)) {

    playerVars.end = length;
  }

  var params = {
    height: height,
    width: width,
    videoId: id,
    playerVars: playerVars
  };

  return params;

};

/**
 * Parameters for a video with controls that the user should click on to play or that should auto play but show up in the users history
 * @param height
 * @param width
 * @param id
 * @returns {{height: *, width: *, videoId: *, playerVars: {rel: number, showinfo: number, enablejsapi: number, disablekb: number, iv_load_policy: number, cc_load_policy: number, controls: number, html5: number, origin: string, fs: number}}}
 */

ConfigObject.generateDefaultWithHistory = function (height, width, id, length) {

  var playerVars = {
    rel: 0,
    showinfo: 0,
    enablejsapi: 1,
    disablekb: 1,
    iv_load_policy: 3,
    cc_load_policy: 0,

    controls: 1,
    html5: 1,
    origin: document.domain,
    fs: 0
  };

  if (!isNaN(length)) {

    playerVars.end = length;
  }

  var params = {
    height: height,
    width: width,
    videoId: id,
    playerVars: playerVars
  };

  return params;

};

module.exports = ConfigObject;
