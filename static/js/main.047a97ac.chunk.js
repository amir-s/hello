(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,t,n){e.exports=n(19)},,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),o=n.n(c),i=n(2),l=n.n(i),s=n(3),u=n(1),m={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){var t=localStorage.getItem(e);if(t)return JSON.parse(t)}};function d(e,t){var n=m.get(e),r=Object(a.useState)(n||t),c=Object(u.a)(r,2),o=c[0],i=c[1];return n||m.set(e,t),[o,Object(a.useCallback)(function(t){return m.set(e,t),i(t)},[i,e])]}n(14);var f={title:"",url:"",link:"",description:{title:"",location:"",photographer:"",source:""}},p=Object(a.createContext)(f),h=Object(a.createContext)({loading:!0,changePhoto:function(){}});function g(e){var t=e.children,n=d("lastUpadte",0),c=Object(u.a)(n,2),o=c[0],i=c[1],m=d("currentPhoto",f),g=Object(u.a)(m,2),v=g[0],b=g[1],E=Object(a.useState)(!1),j=Object(u.a)(E,2),w=j[0],O=j[1],y={backgroundImage:v?"url(".concat(v.url,")"):""},k=function(){var e=Object(s.a)(l.a.mark(function e(){var t,n,a,r,c=arguments;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:"random",O(!0),e.next=4,fetch("https://hello-data.amirs.dev/v1/photo/".concat("random"===t?"random":""));case 4:return n=e.sent,e.next=7,n.json();case 7:a=e.sent,(r=new Image).src=a.url,r.onload=function(){b(a),setTimeout(function(){O(!1)},1e3)};case 11:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)(function(){o+864e5>(new Date).getTime()||function(){var e=Object(s.a)(l.a.mark(function e(){var t,n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://hello-data.amirs.dev/v1/photo");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,b(n),i((new Date).getTime());case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()()},[o,b,i]),r.a.createElement("div",{className:"Background",style:y},r.a.createElement(h.Provider,{value:{changePhoto:k,loading:w}},r.a.createElement(p.Provider,{value:v},t)))}function v(e){var t=e.date;return r.a.createElement("div",{className:"heading--1",id:"time-display"},t.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}).replace(/\s/,"").toLowerCase())}function b(e){var t=e.date;return r.a.createElement("div",{className:"heading--5",id:"date-display"},t.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}))}n(15);function E(){var e=Object(a.useState)(new Date),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)(function(){var e=setTimeout(function(){c(new Date)},1e3);return function(){clearTimeout(e)}},[n]),r.a.createElement("header",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("div",null,r.a.createElement(b,{date:n}),r.a.createElement(v,{date:n})))}n(16);var j=n(4),w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4,n=d("stock-".concat(e),{upatedAt:0,price:"0",change:"0",changePercentage:"0",sign:0,currency:"",symbol:"",state:"loading"}),r=Object(u.a)(n,2),c=r[0],o=r[1];return Object(a.useEffect)(function(){c.upatedAt+t>(new Date).getTime()||function(){var t=Object(s.a)(l.a.mark(function t(){var n,a,r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://hello-data.amirs.dev/v1/stock/".concat(e));case 3:return n=t.sent,t.next=6,n.json();case 6:a=t.sent,r=a.change<0?-1:a.change>0?1:0,o(Object(j.a)({},a,{upatedAt:(new Date).getTime(),sign:r,state:"loaded"})),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),o(Object(j.a)({},c,{upatedAt:(new Date).getTime(),state:"error"}));case 14:case"end":return t.stop()}},t,null,[[0,11]])}));return function(){return t.apply(this,arguments)}}()()},[c,o,t,e]),c};function O(e){var t=e.symbol,n=w(t),a=n.state,c=n.price,o=n.change,i=n.changePercentage,l=n.sign,s=n.currency,u=n.symbol,m="loaded"===a?r.a.createElement("small",null,s||"USD"," ",o," (",i,"%)"):null,d="error"===a?r.a.createElement("small",null,"---"):"loading"===a?r.a.createElement("small",null,r.a.createElement("i",{className:"fas fa-spinner fa-pulse"})):c;return r.a.createElement("h5",{className:"heading--5 stock"},r.a.createElement("i",{className:"fas fa-angle-".concat(l<0?"down":"up")}),"\xa0",(u||t).toUpperCase()," ",d,"\xa0",m)}function y(){var e=d("stock-list",["SHOP/nyse"]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),i=Object(u.a)(o,2),l=i[0],s=i[1],m=Object(a.useState)(""),f=Object(u.a)(m,2),g=f[0],v=f[1],b=Object(a.useRef)(),E=Object(a.useContext)(p),j=Object(a.useContext)(h),w=j.loading,y=j.changePhoto,k=function(){c(g.split(",").map(function(e){return e.trim().toUpperCase()}).filter(Boolean)),s(!1)},x=E.description.location?r.a.createElement("span",{id:"location"},"| ",r.a.createElement("i",{className:"fas fa-map-marker-alt"})," ",E.description.location):null,N=E.description.photographer?r.a.createElement("span",null,"Photo by ",r.a.createElement("a",{href:E.link},E.description.photographer)):null,S=E.description.source?r.a.createElement("span",null," via ",E.description.source):null,C=E.title===E.description.title?"":E.description.title,P=w?r.a.createElement("i",{className:"fas fa-spinner fa-pulse"}):r.a.createElement("i",{className:"fas fa-random"});return r.a.createElement("footer",null,r.a.createElement("div",{className:"d-flex justify-content-between align-items-end"},r.a.createElement("div",{id:"stock-list"},l&&r.a.createElement("i",{className:"fas fa-save save-stock",onClick:k}),l&&r.a.createElement("input",{ref:b,className:"input",type:"text",value:g,onChange:function(e){return v(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&k()},onBlur:k}),!l&&r.a.createElement("i",{className:"fas fa-edit remove-stock",onClick:function(){v(n.join(", ")),s(!0),setTimeout(function(){b&&b.current&&b.current.focus()},5)}}),!l&&n.map(function(e,t){return r.a.createElement(O,{key:e+t,symbol:e})})),r.a.createElement("div",{id:"credits"},r.a.createElement("h1",{className:"heading--5"},E.title),r.a.createElement("p",{className:"body-text",id:"photographer"},N,x),r.a.createElement("p",{className:"body-text",id:"location"}))),r.a.createElement("div",{className:"d-flex justify-content-between align-items-center sep"},r.a.createElement("div",{id:"refresh-btn",className:w?"disabled":"",onClick:function(){y(w?"daily":"random")}},P," Shuffle"),r.a.createElement("a",{id:"burst-link",href:E.link},C," ",S)))}n(17);var k=function(){return r.a.createElement(g,null,r.a.createElement(E,null),r.a.createElement(y,null))};n(18),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[7,1,2]]]);
//# sourceMappingURL=main.047a97ac.chunk.js.map