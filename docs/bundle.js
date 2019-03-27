!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){"use strict";const t=/([:*])(\w+)/g,e=/\*/g,s="([^/]+)",i="(?:.*)",r="(?:/$|$)",n="",o=!("undefined"==typeof window||!window.history||!window.history.pushState);function a(t,e){"string"!=typeof e?Object.keys(e).forEach(s=>{t.style.setProperty(s,e[s])}):t.style.cssText=e}function c(t,e){Object.keys(e).forEach(s=>{e[s]||""===e[s]?t.setAttribute(s,e[s]):t.removeAttribute(s)})}function l(t,e){Object.keys(e).forEach(s=>{t[s]=e[s]})}function u(t,e){t&&e&&Object.keys(e).forEach(s=>{Array.isArray(e[s])?e[s].forEach(e=>{t.addEventListener(s,e)}):t.addEventListener(s,e[s])})}function h(t,e){t&&e&&Object.keys(e).forEach(s=>{Array.isArray(e[s])?e[s].forEach(e=>{t.removeEventListener(s,e)}):t.removeEventListener(s,e[s])})}function d(t){if(t)for(;t.firstChild;)t.removeChild(t.firstChild)}function p(t,e,s,...i){if(t){if(s)return t.children&&t.children.forEach(t=>{p(t,e,s,...i)}),void(t.instance&&t.instance[e](...i));t.instance&&t.instance[e](...i),t.children&&t.children.forEach(t=>{p(t,e,s,...i)})}}function v(t){return t instanceof RegExp?t:t.replace(/\/+$/,"").replace(/^\/+/,"^/")}function m(o,a=[]){return a.map(a=>{const{regexp:c,paramNames:l}=function(o){const a=[];let c;c=o instanceof RegExp?o:new RegExp(o.replace(t,function(t,e,i){return a.push(i),s}).replace(e,i)+r,n);return{regexp:c,paramNames:a}}(v(a.path)),u=o.match(c),h=function(t,e){return 0===e.length?null:t?t.slice(1,t.length).reduce((t,s,i)=>(null===t&&(t={}),t[e[i]]=decodeURIComponent(s),t),null):null}(u,l);return!!u&&{match:u,route:a,params:h}}).filter(t=>t)}function g(t,e=[]){return m(function(t,e=!1,s="#"){let i,r=t;var n=t=>t.split(/\?(.*)?$/)[0];return void 0===s&&(s="#"),r=o&&!e?n(t).split(s)[0]:(i=t.split(s)).length>1?n(i[1]):n(i[0])}(t),e)[0]||!1}class f{constructor(t,e=!1){this._value=t,this.forces=e,this.subscribers=[],this.isDestroy=!1,this.firstState=t}get value(){return this._value}destroy(t=!1){this.isDestroy||(t&&(this.subscribers=[]),this.isDestroy=!0)}reInit(){this.isDestroy=!1,this.value=this.firstState}addSubscriber(t){this.isDestroy||this.subscribers.push(t)}removeSubscriber(t){const e=this.subscribers.indexOf(t);e>-1&&this.subscribers.splice(e,1)}set value(t){this.isDestroy||(this._value!==t||this.forces)&&(this._value=t,this.subscribers.length&&this.subscribers.forEach(e=>{e(t)}))}}class b{constructor(t={}){this.obsArr=[],this.values={},this.obs=new f(this.values,!0),this.isDestroyed=!1,Object.keys(t).forEach(e=>{const s=t[e];"object"==typeof s?(this.obsArr.push(s),this.values[e]=s.value,s.addSubscriber(t=>{this.values[e]=t,this.obs.value=this.values})):this.values[e]=s})}get value(){return this.obs}reInit(){this.isDestroyed=!1,this.obs.reInit(),this.obsArr.forEach(t=>{t.reInit()})}destroy(t=!1){this.isDestroyed||(this.obs.destroy(t),this.obsArr.forEach(e=>{e.destroy(t)}),this.isDestroyed=!0)}}const y=Symbol("instance");function C(t){if(!1===t.show)return null;const e="textNode"!==t.tag?document.createElement(t.tag):document.createTextNode("");if(t.domNode=e,null!==t.textValue||void 0!==t.textValue)if("object"==typeof t.textValue){const s=t.textValue;s.addSubscriber(t=>{e.textContent=t}),e.textContent=s.value}else e.textContent=t.textValue;let s,i,r,n;if("textNode"!==t.tag){if(t.classList)if(Array.isArray(t.classList))t.classList.forEach(t=>{e.classList.add(t)});else{s=t.classList;const i=t.classList.value;Object.keys(i.value).forEach(t=>{return i.value[t]?e.classList.add(t):e.classList.remove(t)}),i.addSubscriber(t=>{Object.keys(t).forEach(s=>{return t[s]?e.classList.add(s):e.classList.remove(s)})})}if(t.props)if(t.props instanceof b){r=t.props;const s=t.props.value;l(e,s.value),s.addSubscriber(t=>{l(e,t)})}else l(e,t.props);if(t.styles)if(t.styles instanceof b){const s=(n=t.styles).value;a(e,s.value),s.addSubscriber(t=>{a(e,t)})}else t.styles instanceof f?(n=t.styles,a(e,n.value),n.addSubscriber(t=>{a(e,t)})):a(e,t.styles);if(t.attrs)if(t.attrs instanceof b){i=t.attrs;const s=t.attrs.value;c(e,s.value),s.addSubscriber(t=>{c(e,t)})}else c(e,t.attrs);t.children&&t.children.forEach(t=>{if(!t)return;if(Array.isArray(t))return t.forEach(t=>{if(!t.tag)return void e.appendChild(t);const s=C(Object.assign(t,{parent:e}));s&&e.appendChild(s)}),void(t._parent=e);if(!t.tag)return void e.appendChild(t);const s=C(Object.assign(t,{parent:e}));s&&e.appendChild(s)}),t.listeners&&u(e,t.listeners)}if(t.instance&&(e[y]=t.instance,t.instance.onInit()),"object"==typeof t.show){const o=document.createComment("");return t.show.addSubscriber(a=>{const c=t.parent?t.parent:null;a?c&&(o.parentNode===c&&c.replaceChild(e,o),p(t,"reInit",!1),n&&s.reInit(),s&&s.reInit(),r&&r.reInit(),i&&i.reInit(),"textNode"!==t.tag&&u(e,t.listeners)):c&&("textNode"!==t.tag&&h(e,t.listeners),i&&i.destroy(),r&&r.destroy(),s&&s.destroy(),n&&s.destroy(),p(t,"destroy",!0),e.parentNode===c&&c.replaceChild(o,e))}),t.show.value?e:o}return e}function x(t,e={}){const s=new t(e);return s.template.instance=s,s.template}class k{constructor(){this.reactive={},this.fdObjects={},this.fdStyles={}}onDestroy(){}onInit(){}reInit(){Object.keys(this.fdStyles).forEach(t=>{this.fdStyles[t].reInit()}),Object.keys(this.fdObjects).forEach(t=>{this.fdObjects[t].reInit()}),Object.keys(this.reactive).forEach(t=>{this.reactive[t].reInit()}),this.onInit()}destroy(...t){!0===t[0]&&function t(e){e.listeners&&h(e.domNode,e.listeners),e.children&&e.children.forEach(e=>{!e.instance&&e.tag&&t(e)})}(this.template),Object.keys(this.fdObjects).forEach(e=>{this.fdObjects[e].destroy(...t)}),Object.keys(this.reactive).forEach(e=>{this.reactive[e].destroy(...t)}),Object.keys(this.fdStyles).forEach(e=>{this.fdStyles[e].destroy(...t)}),this.onDestroy()}}function w(t){return S(t)}function S(t){return new f(t)}const E=(t,e,s={},i)=>{if("function"==typeof e){const r={};return Object.keys(s).forEach(e=>{const i=s[e];r[e]="function"==typeof i?i(t):i}),e(Object.assign({},r,{index:i}))}return Object.assign({},e,{textValue:e.textValue(t),index:i})};function V(t,e,s={}){if(Array.isArray(t))return t.map((t,i)=>E(t,e,s,i));let i=t.value.map((t,i)=>E(t,e,s,i));return t.addSubscriber(t=>{let r=i._parent;i.length&&(i.forEach(t=>{p(t,"destroy",!0,!0)}),d(r)),t.length&&((i=t.map((t,i)=>E(t,e,s,i))).forEach(t=>{r.appendChild(C(t))}),i._parent=r)}),i}function I(t){return t.replace(/\/$/,"").split("/").length}function j(t,e){return I(e.path)-I(t.path)}const O=new class extends k{constructor(t){super(),this.baseHref=t,this._arrPaths=[],this._cUrl=S(null),this._cState=S(null),this._currentComp=null,this.template={tag:"div",classList:["router-view"]},this.onPopState=(t=>{this.applyUrl((t.isTrusted?t.state:this.baseHref+t.state).replace(/[\\\\\/]+/g,"/"))}),this.applyUrl=(t=>{const e=g(t,this._arrPaths);if(!e)return;const s=e.route;this._currentComp&&p(this._currentComp,"destroy",!0,!0),d(this.template.domNode),s.resolver?s.resolver(e.params).then(e=>{this.createComponent(t,s,e)}):this.createComponent(t,s)})}setPaths(t={}){Object.keys(t).forEach(e=>{this._arrPaths.push({component:t[e].component,title:t[e].title,path:v((this.baseHref+e).replace(/[\\\\\/]+/g,"/")),resolver:t[e].resolver})}),this._arrPaths.sort(j)}createComponent(t,e,s){e.title&&(document.title=e.title),this._cUrl.value=t,this._cState.value=e.path;const i=e.component(s);this.template.domNode.appendChild(C(i)),this._currentComp=i,window.history.pushState(this._cUrl.value,document.title,this._cUrl.value)}onInit(){window.addEventListener("popstate",this.onPopState),this.goToUrl("/")}onDestroy(){window.removeEventListener("popstate",this.onPopState)}goToUrl(t){this._cUrl.value!==(this.baseHref+t).replace(/[\\\\\/]+/g,"/")&&dispatchEvent(new PopStateEvent("popstate",{state:t}))}isCurrentRoute(t){const e=g((this.baseHref+t).replace(/[\\\\\/]+/g,"/"),[{path:this._cState.value}]);return!!e&&""!==e.match[0]}getCurrentRoute(){return this._cUrl}getCurrentState(){return this._cState}}(window.location.pathname);function _(){return x(L)}class L extends k{constructor(){super(...arguments),this.width=100,this.reactive={counter:S(0)},this.onClick=(()=>{this.counter.value+=1}),this.template={tag:"button",textValue:this.counter,listeners:{click:this.onClick}}}get counter(){return this.reactive.counter}}function T(t){return x(A,t)}class A extends k{constructor(t){super(),this.input=t,this.onClick=(()=>{this.counter.value+=1}),this.template={tag:"button",textValue:this.counter,listeners:{click:this.onClick}}}get counter(){return this.input.counter}onInit(){console.log("init CountersShared")}onDestroy(){console.log("destroy CountersShared")}}class N extends k{constructor(){super(...arguments),this.reactive={src:S("https://www.w3schools.com/html/pic_trulli.jpg"),disabled:w(!1)},this.fdObjects={imgAttrs:new b({src:this.src}),btnAttrs:new b({disabled:this.disabled})},this.onClick=(()=>{this.src.value="https://www.w3schools.com/html/img_girl.jpg"}),this.changeBtnClick=(()=>{this.disabled.value=!this.disabled.value}),this.btnClick=(()=>{alert("hey")}),this.template={tag:"div",children:[{tag:"div",children:[{tag:"span",textValue:"Current state:"},{tag:"span",textValue:this.disabled},{tag:"button",attrs:this.fdObjects.btnAttrs,textValue:"I am button",listeners:{click:this.btnClick}},{tag:"button",textValue:"Click me to change",listeners:{click:this.changeBtnClick}}]},{tag:"button",textValue:"Click me",listeners:{click:this.onClick}},{tag:"span",textValue:this.src},{tag:"div",children:[{tag:"img",attrs:this.fdObjects.imgAttrs}]}]}}get src(){return this.reactive.src}get disabled(){return this.reactive.disabled}}class D extends k{constructor(){super(...arguments),this.reactive={counter:S(0),classOdd:w(!0)},this.fdObjects={classList:new b({odd:this.currentClass})},this.template={tag:"div",classList:this.fdObjects.classList,textValue:this.counter}}get counter(){return this.reactive.counter}get currentClass(){return this.reactive.classOdd}onInit(){const t=()=>{this.timer=window.setTimeout(()=>{this.counter.value+=1,this.currentClass.value=this.counter.value%2==0,t()},1e3)};t()}onDestroy(){clearTimeout(this.timer)}}function U(){return x(D)}function B(){return x(P)}class P extends k{constructor(){super(...arguments),this.reactive={show:w(!0),text:S("Here timer")},this.onClick=(()=>{this.show.value=!this.show.value,this.text.value=this.show.value?"Here timer":"Sorry not timer"}),this.template={tag:"div",children:[{tag:"p",children:[{tag:"span",textValue:"Current value:"},{tag:"span",textValue:this.show}]},{tag:"button",listeners:{click:this.onClick},textValue:"Change state"},{tag:"div",textValue:"You will see me always"},{tag:"div",show:this.show,textValue:"You will sometimes"},{tag:"div",children:[{tag:"strong",textValue:this.text},Object.assign({},U(),{show:this.show})]}]}}get show(){return this.reactive.show}get text(){return this.reactive.text}}function H(){return x(R)}class R extends k{constructor(){super(...arguments),this.reactive={bgFirstColor:S("#"+((1<<24)*Math.random()|0).toString(16)),bgSecondColor:S("background-color: #"+((1<<24)*Math.random()|0).toString(16)+";user-select: none;")},this.fdStyles={divFirstStyle:new b({"background-color":this.reactive.bgFirstColor,"user-select":"none"}),divSecondStyle:this.reactive.bgSecondColor},this.onClick=(()=>{this.reactive.bgFirstColor.value="#"+((1<<24)*Math.random()|0).toString(16)}),this.onClickSecond=(()=>{this.reactive.bgSecondColor.value="background-color: #"+((1<<24)*Math.random()|0).toString(16)+";user-select: none;"}),this.template={tag:"div",children:[{tag:"div",styles:this.fdStyles.divFirstStyle,textValue:"Click me(change styles  object)",listeners:{click:this.onClick}},{tag:"div",styles:this.fdStyles.divSecondStyle,textValue:"Click me(change css string)",listeners:{click:this.onClickSecond}}]}}}function $(t){return x(F,t)}class F extends k{constructor(t){super(),this.input=t,this.onClick=(()=>{this.todoList.value=this.todoList.value.filter((t,e)=>e!==this.index)}),this.template={tag:"div",children:[{tag:"span",textValue:this.textValue},{tag:"button",textValue:"remove",listeners:{click:this.onClick}}]}}get todoList(){return this.input.todoList}get index(){return this.input.index}get textValue(){return this.input.value}}function M(){return x(Y)}class Y extends k{constructor(){super(...arguments),this.reactive={inputValue:S(""),todoList:S([])},this.fdObjects={inputValueProp:new b({value:this.inputValue})},this.onInput=(t=>{this.inputValue.value=t.target.value}),this.onClick=(()=>{this.inputValue.value&&(this.todoList.value=[...this.todoList.value,this.inputValue.value],this.inputValue.value="")}),this.inputBlock={tag:"input",attrs:{placeholder:"Write here"},props:this.fdObjects.inputValueProp,listeners:{input:this.onInput}},this.template={tag:"div",children:[{tag:"div",children:[this.inputBlock,{tag:"button",textValue:"add Todo",listeners:{click:this.onClick}}]},{tag:"div",children:[V(this.todoList,$,{todoList:this.todoList,index:(t,e)=>e,value:t=>t})]}]}}get inputValue(){return this.reactive.inputValue}get todoList(){return this.reactive.todoList}}function W(t={}){return x(q,t)}class q extends k{constructor(t){super(),this.inputs=t,this.template={tag:"textNode",textValue:this.inputs.id}}}class z extends k{constructor(){var t;super(...arguments),this.list=[{name:"Home",path:"/",click:()=>{O.goToUrl("/")}},{name:"Timer",path:"/timer",click:()=>{O.goToUrl("/timer")}},{name:"Todo",path:"/todo",click:()=>{O.goToUrl("/todo")}},{name:"If",path:"/if",click:()=>{O.goToUrl("/if")}},{name:"TextNode",path:"/textNode/*",click:()=>{O.goToUrl(`/textNode/${500*Math.random()|0}`)}},{name:"Styles",path:"/styles",click:()=>{O.goToUrl("/styles")}}],this.template={tag:"div",children:[V(this.list,t=>{const e=w(!1);return O.getCurrentRoute().addSubscriber(()=>{e.value=O.isCurrentRoute(t.item.path)}),{tag:"button",textValue:t.item.name,classList:new b({current:e}),listeners:{click:()=>t.item.click()}}},{item:t=>t}),(t={"/":{component:_,title:"Home"},"/textNode/:id":{component:W,title:"TextNode with router param",resolver:t=>Promise.resolve(t)},"/timer":{component:U,title:"Timer"},"/todo":{component:M,title:"Todo"},"/if":{component:B,title:"If"},"/styles":{component:H,title:"Styles"}},O.setPaths(t),O.template)]}}}function G(t={}){return x(J,t)}class J extends k{constructor(t){super(),this.inputs=t,this.template={tag:"div",children:[{tag:"span",textValue:this.counter},T({counter:this.counter})]}}get counter(){return this.inputs.value}onInit(){console.log(`Init ${this.counter.value}`)}onDestroy(){console.log(`Destroy ${this.counter.value}`)}}const K=S([]);setTimeout(()=>{K.value=[1,2,3,4,5],setTimeout(()=>{K.value=[1]},3e3)},3e3);class Q extends k{constructor(){super(...arguments),this.reactive={counter:S(-10)},this.onClick=(()=>{this.counter.value+=1}),this.template={tag:"div",children:[{tag:"button",textValue:"Click me",listeners:{click:this.onClick}},{tag:"textNode",textValue:this.counter}]}}get counter(){return this.reactive.counter}}document.getElementById("styles").appendChild(C(H())),document.getElementById("todo").appendChild(C(M())),document.getElementById("timer").appendChild(C(U()));const X=document.getElementById("counter");X.appendChild(C(_())),X.appendChild(C(_()));const Z=document.getElementById("counter_input"),tt=S(0);Z.appendChild(C(T({counter:tt}))),Z.appendChild(C(T({counter:tt}))),Z.appendChild(C(T({counter:tt}))),document.getElementById("simple_if").appendChild(C(B())),document.getElementById("simple_for").appendChild(C({tag:"div",children:[V([1,2,3,4,5,6,7],{tag:"div",textValue:t=>t})]})),document.getElementById("simple_for_component").appendChild(C({tag:"div",children:[V([1,2,3,4,5,6,7],_)]})),document.getElementById("simple_for_obs").appendChild(C({tag:"div",children:[V(K,G,{value:t=>S(t)})]})),document.getElementById("attrs").appendChild(C(x(N))),document.getElementById("text_node").appendChild(C(x(Q))),document.getElementById("router").appendChild(C(x(z))),O.onInit()});
//# sourceMappingURL=bundle.js.map
