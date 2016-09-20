var prerender = require('prerender');

var server = prerender({
  workers: process.env.PRERENDER_NUM_WORKERS || 4,
  iterations: process.env.PRERENDER_NUM_ITERATIONS || 25,
  softIterations: process.env.PRERENDER_NUM_SOFT_ITERATIONS || 10
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();

function shutdown() {
  console.log('Shutdown initiated');
  server.exit();
  // At this point prerender has started killing its phantom workers already.
  // We give it 5 seconds to quickly do so, and then halt the process. This
  // will ensure relatively rapid redeploys (prerender no longer accepts new
  // requests at this point
  setTimeout(function () {
    console.log('Prerender has shut down');
    process.exit();
  }, 5000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
