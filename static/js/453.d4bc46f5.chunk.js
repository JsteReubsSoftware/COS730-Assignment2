"use strict";(self.webpackChunkautomated_apis_app=self.webpackChunkautomated_apis_app||[]).push([[453],{453:(e,t,n)=>{n.r(t),n.d(t,{getCLS:()=>y,getFCP:()=>g,getFID:()=>C,getLCP:()=>P,getTTFB:()=>D});var i,a,r,o,u=function(e,t){return{name:e,value:void 0===t?-1:t,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},c=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},s=function(e,t){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(e(i),t&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},f=function(e){addEventListener("pageshow",(function(t){t.persisted&&e(t)}),!0)},m=function(e,t,n){var i;return function(a){t.value>=0&&(a||n)&&(t.delta=t.value-(i||0),(t.delta||void 0===i)&&(i=t.value,e(t)))}},p=-1,v=function(){return"hidden"===document.visibilityState?0:1/0},d=function(){s((function(e){var t=e.timeStamp;p=t}),!0)},l=function(){return p<0&&(p=v(),d(),f((function(){setTimeout((function(){p=v(),d()}),0)}))),{get firstHiddenTime(){return p}}},g=function(e,t){var n,i=l(),a=u("FCP"),r=function(e){"first-contentful-paint"===e.name&&(s&&s.disconnect(),e.startTime<i.firstHiddenTime&&(a.value=e.startTime,a.entries.push(e),n(!0)))},o=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],s=o?null:c("paint",r);(o||s)&&(n=m(e,a,t),o&&r(o),f((function(i){a=u("FCP"),n=m(e,a,t),requestAnimationFrame((function(){requestAnimationFrame((function(){a.value=performance.now()-i.timeStamp,n(!0)}))}))})))},h=!1,T=-1,y=function(e,t){h||(g((function(e){T=e.value})),h=!0);var n,i=function(t){T>-1&&e(t)},a=u("CLS",0),r=0,o=[],p=function(e){if(!e.hadRecentInput){var t=o[0],i=o[o.length-1];r&&e.startTime-i.startTime<1e3&&e.startTime-t.startTime<5e3?(r+=e.value,o.push(e)):(r=e.value,o=[e]),r>a.value&&(a.value=r,a.entries=o,n())}},v=c("layout-shift",p);v&&(n=m(i,a,t),s((function(){v.takeRecords().map(p),n(!0)})),f((function(){r=0,T=-1,a=u("CLS",0),n=m(i,a,t)})))},E={passive:!0,capture:!0},w=new Date,L=function(e,t){i||(i=t,a=e,r=new Date,F(removeEventListener),S())},S=function(){if(a>=0&&a<r-w){var e={entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+a};o.forEach((function(t){t(e)})),o=[]}},b=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,t){var n=function(){L(e,t),a()},i=function(){a()},a=function(){removeEventListener("pointerup",n,E),removeEventListener("pointercancel",i,E)};addEventListener("pointerup",n,E),addEventListener("pointercancel",i,E)}(t,e):L(t,e)}},F=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(t){return e(t,b,E)}))},C=function(e,t){var n,r=l(),p=u("FID"),v=function(e){e.startTime<r.firstHiddenTime&&(p.value=e.processingStart-e.startTime,p.entries.push(e),n(!0))},d=c("first-input",v);n=m(e,p,t),d&&s((function(){d.takeRecords().map(v),d.disconnect()}),!0),d&&f((function(){var r;p=u("FID"),n=m(e,p,t),o=[],a=-1,i=null,F(addEventListener),r=v,o.push(r),S()}))},k={},P=function(e,t){var n,i=l(),a=u("LCP"),r=function(e){var t=e.startTime;t<i.firstHiddenTime&&(a.value=t,a.entries.push(e),n())},o=c("largest-contentful-paint",r);if(o){n=m(e,a,t);var p=function(){k[a.id]||(o.takeRecords().map(r),o.disconnect(),k[a.id]=!0,n(!0))};["keydown","click"].forEach((function(e){addEventListener(e,p,{once:!0,capture:!0})})),s(p,!0),f((function(i){a=u("LCP"),n=m(e,a,t),requestAnimationFrame((function(){requestAnimationFrame((function(){a.value=performance.now()-i.timeStamp,k[a.id]=!0,n(!0)}))}))}))}},D=function(e){var t,n=u("TTFB");t=function(){try{var t=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,t={entryType:"navigation",startTime:0};for(var n in e)"navigationStart"!==n&&"toJSON"!==n&&(t[n]=Math.max(e[n]-e.navigationStart,0));return t}();if(n.value=n.delta=t.responseStart,n.value<0||n.value>performance.now())return;n.entries=[t],e(n)}catch(e){}},"complete"===document.readyState?setTimeout(t,0):addEventListener("load",(function(){return setTimeout(t,0)}))}}}]);
//# sourceMappingURL=453.d4bc46f5.chunk.js.map