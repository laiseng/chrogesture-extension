!function(e){var r={};function t(s){if(r[s])return r[s].exports;var n=r[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,s){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(s,n,function(r){return e[r]}.bind(null,n));return s},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=71)}({67:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(r.GestureTypes||(r.GestureTypes={}))},68:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e){e[e.Gesture=0]="Gesture",e[e.Url=1]="Url"}(r.MessageTypes||(r.MessageTypes={}))},71:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const s=t(67),n=t(68),o=t(72);class a{constructor(){this.enableUpOpenLink=!0,this.openLinkCount=0,chrome.storage.sync.get(e=>{console.log("[From Background]",e),this.enableUpOpenLink=e.UpOpenLink}),chrome.tabs.onActivated.addListener(e=>{this.openLinkCount=0}),chrome.storage.onChanged.addListener((e,r)=>{for(var t in e){var s=e[t];console.log('Storage key "%s" in namespace "%s" changed. Old value was "%s", new value is "%s".',t,r,s.oldValue,s.newValue),console.log("[From Background OnChange]",e.UpOpenLink),this.enableUpOpenLink=e.UpOpenLink.newValue}})}run(){chrome.runtime.onMessage.addListener((e,r,t)=>{let s=this.detectGestureCommand(e);this.exeGesture(s,e,r,t)})}exeGesture(e,r,t,s){switch(e){case o.GestureCommandTypes.CloseTab:chrome.tabs.remove(t.tab.id);break;case o.GestureCommandTypes.HistoryBack:chrome.tabs.executeScript(null,{code:"window.history.back()"});break;case o.GestureCommandTypes.HistoryForward:chrome.tabs.executeScript(null,{code:"window.history.forward()"});break;case o.GestureCommandTypes.NewEmptyTab:chrome.tabs.create({url:"chrome://newtab"});break;case o.GestureCommandTypes.OpenLinkInBackground:chrome.tabs.query({active:!0},e=>{chrome.tabs.create({url:r.url,active:!1,index:e[0].index+this.openLinkCount+++1})});break;case o.GestureCommandTypes.UndoCloseTab:chrome.sessions.restore()}}detectGestureCommand(e){return this.arraysEqual(e.gestures,[s.GestureTypes.Down])?o.GestureCommandTypes.CloseTab:this.arraysEqual(e.gestures,[s.GestureTypes.Up])&&e.type==n.MessageTypes.Gesture?o.GestureCommandTypes.NewEmptyTab:this.arraysEqual(e.gestures,[s.GestureTypes.Up])&&e.type==n.MessageTypes.Url?this.enableUpOpenLink?o.GestureCommandTypes.OpenLinkInBackground:o.GestureCommandTypes.NewEmptyTab:this.arraysEqual(e.gestures,[s.GestureTypes.Left])?o.GestureCommandTypes.HistoryBack:this.arraysEqual(e.gestures,[s.GestureTypes.Right])?o.GestureCommandTypes.HistoryForward:this.arraysEqual(e.gestures,[s.GestureTypes.Up,s.GestureTypes.Down])?o.GestureCommandTypes.UndoCloseTab:void 0}arraysEqual(e,r){if(e===r)return!0;if(null==e||null==r)return!1;if(e.length!=r.length)return!1;for(var t=0;t<e.length;++t)if(e[t]!==r[t])return!1;return!0}}r.CgBackground=a,(new a).run()},72:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e){e[e.NewEmptyTab=0]="NewEmptyTab",e[e.CloseTab=1]="CloseTab",e[e.HistoryBack=2]="HistoryBack",e[e.HistoryForward=3]="HistoryForward",e[e.OpenLinkInBackground=4]="OpenLinkInBackground",e[e.UndoCloseTab=5]="UndoCloseTab"}(r.GestureCommandTypes||(r.GestureCommandTypes={}))}});