(()=>{"use strict";var e={975:(e,r,n)=>{const t=n(4143),o=n(3464);(new class{constructor(){this.upOpenLinkElement=document.querySelector("#upopenlink"),this.forceOverIframe=document.querySelector("#forceoveriframe")}run(){chrome.storage.sync.get("UpOpenLink",(e=>{console.log("this is what i get UpOpenLink",e.UpOpenLink),this.upOpenLinkElement.checked=e.UpOpenLink})),chrome.storage.sync.get("ForceOverIFrame",(e=>{console.log("this is what i get ForceOverIFrame",e.ForceOverIFrame),this.forceOverIframe.checked=e.ForceOverIFrame})),t.merge(t.fromEvent(this.upOpenLinkElement,"click"),t.fromEvent(this.forceOverIframe,"click")).pipe(o.tap((e=>{console.log(e)}))).subscribe((e=>{console.log("Combined checkbox event",{UpOpenLink:this.upOpenLinkElement.checked,ForceOverIFrame:this.forceOverIframe.checked}),chrome.storage.sync.set({UpOpenLink:this.upOpenLinkElement.checked,ForceOverIFrame:this.forceOverIframe.checked})}))}}).run()}},r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={exports:{}};return e[t](o,o.exports,n),o.exports}n.m=e,n.x=e=>{},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=42,(()=>{var e={42:0},r=[[975,736]],t=e=>{},o=(o,c)=>{for(var i,s,[p,l,a,h]=c,u=0,m=[];u<p.length;u++)s=p[u],n.o(e,s)&&e[s]&&m.push(e[s][0]),e[s]=0;for(i in l)n.o(l,i)&&(n.m[i]=l[i]);for(a&&a(n),o&&o(c);m.length;)m.shift()();return h&&r.push.apply(r,h),t()},c=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];function i(){for(var t,o=0;o<r.length;o++){for(var c=r[o],i=!0,s=1;s<c.length;s++){var p=c[s];0!==e[p]&&(i=!1)}i&&(r.splice(o--,1),t=n(n.s=c[0]))}return 0===r.length&&(n.x(),n.x=e=>{}),t}c.forEach(o.bind(null,0)),c.push=o.bind(null,c.push.bind(c));var s=n.x;n.x=()=>(n.x=s||(e=>{}),(t=i)())})(),n.x()})();