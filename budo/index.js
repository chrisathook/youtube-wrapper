var budo = require ('budo');


budo ('./budo/budo-index.js',{

  live:true,
  watchGlob:'**/*.{html,css,js}',
  open:true,
  port:8000,
  browserify:{ },
  dir:["./static"]

}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri);
  console.log('LiveReload running on port %s', ev.livePort);
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length);
});



