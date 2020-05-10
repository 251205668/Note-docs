/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "c487c7dd4ffc304653eb0fbf8ec80712"
  },
  {
    "url": "assets/css/0.styles.491192c0.css",
    "revision": "18485a7a32f09b919d33d6cc198f5764"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.413dc01d.js",
    "revision": "7292115d2febf0ad5589518cdcefa38a"
  },
  {
    "url": "assets/js/11.a8bd0d51.js",
    "revision": "82cbe9000bc0d7bb19982724bf8c214d"
  },
  {
    "url": "assets/js/12.26b78153.js",
    "revision": "6f59e2ebabf5ff5218548e27a4ee3f55"
  },
  {
    "url": "assets/js/13.6203f1ba.js",
    "revision": "94aedfbedf596294b04f1e05eab269c1"
  },
  {
    "url": "assets/js/14.3a6da465.js",
    "revision": "b17dcc7d0f45b85b7c4406d29c8a1415"
  },
  {
    "url": "assets/js/2.7738af11.js",
    "revision": "d78f6f14ccc10ff6528a2b1722084b63"
  },
  {
    "url": "assets/js/3.4f2730ac.js",
    "revision": "01a247427da1fb838c819eef6a7edb28"
  },
  {
    "url": "assets/js/4.71e7aeb6.js",
    "revision": "9e3a92ab4d56efff0d520c0ecbbbcf52"
  },
  {
    "url": "assets/js/5.fa3ef514.js",
    "revision": "a86931145939b06be04c3d358d1ccb3d"
  },
  {
    "url": "assets/js/6.573f43c1.js",
    "revision": "8b0574533173d11073bc2089c36ae1c4"
  },
  {
    "url": "assets/js/7.e2a42aed.js",
    "revision": "c96fb1003e87e1ad5144e9c1ee99bc0e"
  },
  {
    "url": "assets/js/8.3e37c635.js",
    "revision": "2dc9ef1297b18199624fd4110fbfe123"
  },
  {
    "url": "assets/js/9.22d2990e.js",
    "revision": "be97743f41763a646723fc119e722093"
  },
  {
    "url": "assets/js/app.c115000c.js",
    "revision": "73329a17240d4ae481a83dec1231fe33"
  },
  {
    "url": "guide/css/test.html",
    "revision": "b5a030d6b9eb5d3b9963f65065257ab7"
  },
  {
    "url": "guide/index.html",
    "revision": "fc89b5e63f51448268c1c13e9093b326"
  },
  {
    "url": "guide/interview/test.html",
    "revision": "c2abf269e23ba46f3c4f60ececef2b52"
  },
  {
    "url": "guide/js/test.html",
    "revision": "ca267347a21e28c24eb4326fdc690533"
  },
  {
    "url": "guide/node/test.html",
    "revision": "8b9308126e6a5f7265bb6450e2557640"
  },
  {
    "url": "guide/vue/test.html",
    "revision": "8ecaf8ed8d1546ce1a3c98800dd80487"
  },
  {
    "url": "guide/webpack/test.html",
    "revision": "5f099709f83c125ffcb9a9635d161bc6"
  },
  {
    "url": "head.png",
    "revision": "b1e3c5e5fbe2d44e8c313bf01f135317"
  },
  {
    "url": "head1.png",
    "revision": "a4fae843d72c395c44933e4dcb73e842"
  },
  {
    "url": "header.png",
    "revision": "69d3bf2a26307d399aecdac54c582f3b"
  },
  {
    "url": "index.html",
    "revision": "b55a3d87ddd630a22fbef67f07e3031c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
