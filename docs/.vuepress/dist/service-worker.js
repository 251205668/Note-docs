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
    "revision": "37c0a3cd3685c0dea2f3cc2e65cdae1c"
  },
  {
    "url": "assets/css/0.styles.6a4803ab.css",
    "revision": "d0818e0a77cc7c21ca5df2f3a77b391a"
  },
  {
    "url": "assets/img/2019-11-11-20-41-17.cd5ad9a4.png",
    "revision": "cd5ad9a4140a0dd7fe0687c420f1745f"
  },
  {
    "url": "assets/img/2019-11-11-20-51-06.16a9ea53.png",
    "revision": "16a9ea53c16294eab6c3dff15d2354b5"
  },
  {
    "url": "assets/img/2019-11-11-20-56-47.ed99b53d.png",
    "revision": "ed99b53dc1218333055ab81e2d9d9e5a"
  },
  {
    "url": "assets/img/2019-11-13-00-03-47.c9339caf.png",
    "revision": "c9339caf14caff5cb55aae6eb01a2de9"
  },
  {
    "url": "assets/img/2019-11-17-12-41-51.487c479f.png",
    "revision": "487c479ff63bcbafb307d125addde7e0"
  },
  {
    "url": "assets/img/2019-11-19-17-23-45.7dff38ef.png",
    "revision": "7dff38ef38468f795e99e29910697e71"
  },
  {
    "url": "assets/img/2019-11-19-18-08-15.c37c1a96.png",
    "revision": "c37c1a961e150ffd2d118b161895e9b3"
  },
  {
    "url": "assets/img/2019-11-19-19-57-52.9d68aa65.png",
    "revision": "9d68aa65245b50548bf94966ff3dcd33"
  },
  {
    "url": "assets/img/2019-11-25-23-50-55.80c39311.png",
    "revision": "80c39311f87c181c2dea1b37e49cae3e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.42124fbe.js",
    "revision": "0b1a137fdcef0f87b28e880d57df972c"
  },
  {
    "url": "assets/js/11.bdef2e64.js",
    "revision": "5df5ca8db56996333fff51a5fd9410fc"
  },
  {
    "url": "assets/js/12.9c5e83ed.js",
    "revision": "c321dfc7032506febae3aedcfaf2e4d0"
  },
  {
    "url": "assets/js/13.3db43aaf.js",
    "revision": "44890f0e0cadd19ee7238f68e1dbd465"
  },
  {
    "url": "assets/js/14.8f2ec86d.js",
    "revision": "07bd195733108ddbd5dcc6277e128df9"
  },
  {
    "url": "assets/js/15.c6286125.js",
    "revision": "aae51e3c6c780ba2c75c9cdc8ad1955f"
  },
  {
    "url": "assets/js/16.5da2b31d.js",
    "revision": "4a9d04f6ec50305cb2395998cbe0d407"
  },
  {
    "url": "assets/js/17.c9deef07.js",
    "revision": "b3a4d45de99e58386ee8e64a8f81e562"
  },
  {
    "url": "assets/js/18.13ed30af.js",
    "revision": "78210be9c788ef94d676646ef18b9b16"
  },
  {
    "url": "assets/js/19.f1a01180.js",
    "revision": "7d4a20ab21da1fe56b675d6aa852a08e"
  },
  {
    "url": "assets/js/2.d1b1e148.js",
    "revision": "07b90baa8a42fb2fcb19a381b2af7bdd"
  },
  {
    "url": "assets/js/20.30f7288c.js",
    "revision": "460d330fa0ffa1c81592796627eafce3"
  },
  {
    "url": "assets/js/21.477730e4.js",
    "revision": "c89cf89b6a546a5016022d8ba5979b76"
  },
  {
    "url": "assets/js/22.ab119ff1.js",
    "revision": "4fbac69f0e39edcd690839a542694d39"
  },
  {
    "url": "assets/js/23.9bbc22fc.js",
    "revision": "11fde3f234e283dcb803de29fcb3ca82"
  },
  {
    "url": "assets/js/24.cb1899b8.js",
    "revision": "405f95ca5b9f0a490ad9081e725d8c51"
  },
  {
    "url": "assets/js/25.64669f1d.js",
    "revision": "9ffafd204b510e51cea394a1b0f8354a"
  },
  {
    "url": "assets/js/26.f3040183.js",
    "revision": "a02cba37b36015ebafea363524bbda30"
  },
  {
    "url": "assets/js/27.2938dd4c.js",
    "revision": "5478e79fa18934da97659a014c97ed2b"
  },
  {
    "url": "assets/js/28.cd87026d.js",
    "revision": "12b7f99b9b74f0f3799d00f8fb7510b8"
  },
  {
    "url": "assets/js/29.b92287f4.js",
    "revision": "9d4ce7b50ed7c76e14b9a630a624ef7e"
  },
  {
    "url": "assets/js/3.103e70cb.js",
    "revision": "b22a5a7f701ba7e4aa914a7d43f6e555"
  },
  {
    "url": "assets/js/30.af43d48f.js",
    "revision": "c71fd045e7ea0cf259cced187433e39f"
  },
  {
    "url": "assets/js/31.8c7148f5.js",
    "revision": "e204b5c425921df58ba0866644fcb3da"
  },
  {
    "url": "assets/js/32.d42beb3f.js",
    "revision": "eb4268a9ca561579c03f47afaaa94140"
  },
  {
    "url": "assets/js/33.223bba8e.js",
    "revision": "90c0e903b2a76c98af063e4e4cd09007"
  },
  {
    "url": "assets/js/34.04b12083.js",
    "revision": "c7d56f9e2442ce8049a26aafb1f7e202"
  },
  {
    "url": "assets/js/35.19c65fa0.js",
    "revision": "5fd6f65656b0f449fee658a1c1e114e5"
  },
  {
    "url": "assets/js/36.a1a664b9.js",
    "revision": "6cdf900cee5b960b5535cc25e467c3de"
  },
  {
    "url": "assets/js/37.d2e7a2dd.js",
    "revision": "514194148fe5aebe276cad283a34fe85"
  },
  {
    "url": "assets/js/38.4f737159.js",
    "revision": "94663ed20b36435e4d9e20b4d7bb1438"
  },
  {
    "url": "assets/js/39.fcdeadea.js",
    "revision": "09f993c75caee92c8019227700f211f2"
  },
  {
    "url": "assets/js/4.a3faee54.js",
    "revision": "48045761cb0f922a26f79e648676abf6"
  },
  {
    "url": "assets/js/40.40a9daf9.js",
    "revision": "95bdce356c750a85e4dff410d7f0d39f"
  },
  {
    "url": "assets/js/5.2f32d917.js",
    "revision": "91d2e8c166b2bda2c60b50ca8af9e3d7"
  },
  {
    "url": "assets/js/6.d92ecc16.js",
    "revision": "143bedb8b1e1729f2fc83e5174888abe"
  },
  {
    "url": "assets/js/7.a09f8ef2.js",
    "revision": "f75e12cb95f4660297426fd42270c389"
  },
  {
    "url": "assets/js/8.5b00daa2.js",
    "revision": "510a44e4292a457e5ff589444354f1ce"
  },
  {
    "url": "assets/js/9.9d06f44a.js",
    "revision": "1642ecad3ba2ef682821382e69f19b53"
  },
  {
    "url": "assets/js/app.81dd3622.js",
    "revision": "f09dbda1a24cb05c73c6fd94df2ef6ba"
  },
  {
    "url": "guide/css/alwaysCode.html",
    "revision": "6fe492fda10114553f185238227002b9"
  },
  {
    "url": "guide/css/code.html",
    "revision": "2d19770f76e377a1b422532a78bf259a"
  },
  {
    "url": "guide/css/css-skill.html",
    "revision": "7798e7fd29bed4ae825ed911a834471d"
  },
  {
    "url": "guide/css/iconfont.html",
    "revision": "c8cfa83402280aab09d3d7dce7c3491e"
  },
  {
    "url": "guide/css/layout.html",
    "revision": "9acbca1d26007a5c1e1064896b5df971"
  },
  {
    "url": "guide/css/test.html",
    "revision": "881624927732540e5740d5c2f3feadd9"
  },
  {
    "url": "guide/index.html",
    "revision": "726ab697554d20d8fec357de6b9515ff"
  },
  {
    "url": "guide/interview/always.html",
    "revision": "7497fcfdd6c3fcd7dbcea0a47f34ae2f"
  },
  {
    "url": "guide/interview/broswer.html",
    "revision": "40fd34611e9ecc6a4db9459b5f01d400"
  },
  {
    "url": "guide/interview/git.html",
    "revision": "c4d1b68432a91592dbc7016232d835e6"
  },
  {
    "url": "guide/interview/http.html",
    "revision": "f2bfb1cd48c651247a68dfac2d5b2e69"
  },
  {
    "url": "guide/interview/miniprogrammer.html",
    "revision": "268ef70ec8257f3cba214a8e1549f847"
  },
  {
    "url": "guide/interview/project.html",
    "revision": "bc6c8b95049c4ead073b9c376e66a565"
  },
  {
    "url": "guide/interview/test.html",
    "revision": "7d5553e34f3d2cd6206257099fd5d5e4"
  },
  {
    "url": "guide/interview/Vue.html",
    "revision": "709ff363f0e47cf0ae3e6f3f37cf5300"
  },
  {
    "url": "guide/interview/web-api.html",
    "revision": "30d4215a0a57e7f7e78bb087f93ec482"
  },
  {
    "url": "guide/js/base.html",
    "revision": "76e52c3af6d34990270e7a09e142eca7"
  },
  {
    "url": "guide/js/higher.html",
    "revision": "3a85d3cd5f784c8d979c1088d43893ba"
  },
  {
    "url": "guide/js/skill.html",
    "revision": "e81faac03a224ab0463b878368927382"
  },
  {
    "url": "guide/node/koa.html",
    "revision": "6275059b7f3ffa80e3e5e129bdc4f84d"
  },
  {
    "url": "guide/node/springboot.html",
    "revision": "8bef14af0c23e97ce811f08faba5725d"
  },
  {
    "url": "guide/react/base.html",
    "revision": "c40db80e151831fd1d05ee6db061e75e"
  },
  {
    "url": "guide/react/hooks.html",
    "revision": "0fe8ec6a9ac7d87874396f4b4487e417"
  },
  {
    "url": "guide/vue/vue.html",
    "revision": "b48e4df92f167ed1611b513b33961e7b"
  },
  {
    "url": "guide/webpack/test.html",
    "revision": "4648fe63f591a54d1ad6586be94fa710"
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
    "revision": "a0f13fc2b8605110522195defe5d2487"
  },
  {
    "url": "project/music/index.html",
    "revision": "51e9839a4316f807e6031d7114ddedf0"
  },
  {
    "url": "project/shop/index.html",
    "revision": "b626d3251f683c9645d63c178d1a2606"
  },
  {
    "url": "project/shop/md/cart.html",
    "revision": "80e07ee59468ee520fe5c8a830effc0a"
  },
  {
    "url": "project/shop/md/coupon.html",
    "revision": "c13bed11a3ee5ab6a2d94cc4749bc8f8"
  },
  {
    "url": "project/shop/md/order.html",
    "revision": "08b9dfe96d0e4a06939e36da13165ebb"
  },
  {
    "url": "project/shop/md/request.html",
    "revision": "b3dbaa87a5cedaeff792aa01bb193098"
  },
  {
    "url": "project/shop/md/skill.html",
    "revision": "7e2304c0e3d96173362c7ee9ba107acb"
  },
  {
    "url": "project/shop/md/sku.html",
    "revision": "0293cf4215f66e24989274911a96998b"
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
