(self.webpackChunkshowcase=self.webpackChunkshowcase||[]).push([[112],{940:le=>{var H={exports:{}};function D(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];"object"==typeof n&&!Object.isFrozen(n)&&D(n)}),e}H.exports=D,H.exports.default=D;var K=H.exports;class W{constructor(t){void 0===t.data&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function ue(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function A(e,...t){const n=Object.create(null);for(const f in e)n[f]=e[f];return t.forEach(function(f){for(const b in f)n[b]=f[b]}),n}const fe=e=>!!e.kind;class Le{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=ue(t)}openNode(t){if(!fe(t))return;let n=t.kind;n=t.sublanguage?`language-${n}`:((e,{prefix:t})=>{if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((f,b)=>`${f}${"_".repeat(b+1)}`)].join(" ")}return`${t}${e}`})(n,{prefix:this.classPrefix}),this.span(n)}closeNode(t){!fe(t)||(this.buffer+="</span>")}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}class q{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n={kind:t,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return"string"==typeof n?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(f=>this._walk(t,f)),t.closeNode(n)),t}static _collapse(t){"string"!=typeof t&&(!t.children||(t.children.every(n=>"string"==typeof n)?t.children=[t.children.join("")]:t.children.forEach(n=>{q._collapse(n)})))}}class Ce extends q{constructor(t){super(),this.options=t}addKeyword(t,n){""!==t&&(this.openNode(n),this.addText(t),this.closeNode())}addText(t){""!==t&&this.add(t)}addSublanguage(t,n){const f=t.root;f.kind=n,f.sublanguage=!0,this.add(f)}toHTML(){return new Le(this,this.options).value()}finalize(){return!0}}function j(e){return e?"string"==typeof e?e:e.source:null}function ge(e){return v("(?=",e,")")}function He(e){return v("(?:",e,")*")}function Pe(e){return v("(?:",e,")?")}function v(...e){return e.map(n=>j(n)).join("")}function m(...e){const t=function je(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map(f=>j(f)).join("|")+")"}function he(e){return new RegExp(e.toString()+"|").exec("").length-1}const $e=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ee(e,{joinWith:t}){let n=0;return e.map(f=>{n+=1;const b=n;let _=j(f),c="";for(;_.length>0;){const r=$e.exec(_);if(!r){c+=_;break}c+=_.substring(0,r.index),_=_.substring(r.index+r[0].length),"\\"===r[0][0]&&r[1]?c+="\\"+String(Number(r[1])+b):(c+=r[0],"("===r[0]&&n++)}return c}).map(f=>`(${f})`).join(t)}const de="[a-zA-Z]\\w*",te="[a-zA-Z_]\\w*",pe="\\b\\d+(\\.\\d+)?",Ee="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",be="\\b(0b[01]+)",U={begin:"\\\\[\\s\\S]",relevance:0},Fe={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[U]},ze={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[U]},F=function(e,t,n={}){const f=A({scope:"comment",begin:e,end:t,contains:[]},n);f.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const b=m("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return f.contains.push({begin:v(/[ ]+/,"(",b,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),f},Ye=F("//","$"),Ze=F("/\\*","\\*/"),Je=F("#","$");var z=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:de,UNDERSCORE_IDENT_RE:te,NUMBER_RE:pe,C_NUMBER_RE:Ee,BINARY_NUMBER_RE:be,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=v(t,/.*\b/,e.binary,/\b.*/)),A({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,f)=>{0!==n.index&&f.ignoreMatch()}},e)},BACKSLASH_ESCAPE:U,APOS_STRING_MODE:Fe,QUOTE_STRING_MODE:ze,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:F,C_LINE_COMMENT_MODE:Ye,C_BLOCK_COMMENT_MODE:Ze,HASH_COMMENT_MODE:Je,NUMBER_MODE:{scope:"number",begin:pe,relevance:0},C_NUMBER_MODE:{scope:"number",begin:Ee,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:be,relevance:0},REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[U,{begin:/\[/,end:/\]/,relevance:0,contains:[U]}]}]},TITLE_MODE:{scope:"title",begin:de,relevance:0},UNDERSCORE_TITLE_MODE:{scope:"title",begin:te,relevance:0},METHOD_GUARD:{begin:"\\.\\s*"+te,relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})}});function it(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function st(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function rt(e,t){!t||!e.beginKeywords||(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=it,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function ct(e,t){!Array.isArray(e.illegal)||(e.illegal=m(...e.illegal))}function ot(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function at(e,t){void 0===e.relevance&&(e.relevance=1)}const lt=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(f=>{delete e[f]}),e.keywords=n.keywords,e.begin=v(n.beforeMatch,ge(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ut=["of","and","for","in","not","or","if","then","parent","list","value"];function _e(e,t,n="keyword"){const f=Object.create(null);return"string"==typeof e?b(n,e.split(" ")):Array.isArray(e)?b(n,e):Object.keys(e).forEach(function(_){Object.assign(f,_e(e[_],t,_))}),f;function b(_,c){t&&(c=c.map(r=>r.toLowerCase())),c.forEach(function(r){const l=r.split("|");f[l[0]]=[_,gt(l[0],l[1])]})}}function gt(e,t){return t?Number(t):function ht(e){return ut.includes(e.toLowerCase())}(e)?0:1}const we={},L=e=>{console.error(e)},Me=(e,...t)=>{console.log(`WARN: ${e}`,...t)},P=(e,t)=>{we[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),we[`${e}/${t}`]=!0)},X=new Error;function xe(e,t,{key:n}){let f=0;const b=e[n],_={},c={};for(let r=1;r<=t.length;r++)c[r+f]=b[r],_[r+f]=!0,f+=he(t[r-1]);e[n]=c,e[n]._emit=_,e[n]._multi=!0}function bt(e){(function Et(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function dt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw L("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),X;if("object"!=typeof e.beginScope||null===e.beginScope)throw L("beginScope must be object"),X;xe(e,e.begin,{key:"beginScope"}),e.begin=ee(e.begin,{joinWith:""})}}(e),function pt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw L("skip, excludeEnd, returnEnd not compatible with endScope: {}"),X;if("object"!=typeof e.endScope||null===e.endScope)throw L("endScope must be object"),X;xe(e,e.end,{key:"endScope"}),e.end=ee(e.end,{joinWith:""})}}(e)}function _t(e){function t(c,r){return new RegExp(j(c),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=he(r)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(ee(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const x=l.findIndex((G,ie)=>ie>0&&void 0!==G),w=this.matchIndexes[x];return l.splice(0,x),Object.assign(l,w)}}class f{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([x,w])=>l.addRule(x,w)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),"begin"===l.type&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let x=l.exec(r);if(this.resumingScanAtSamePosition()&&(!x||x.index!==this.lastIndex)){const w=this.getMatcher(0);w.lastIndex=this.lastIndex+1,x=w.exec(r)}return x&&(this.regexIndex+=x.position+1,this.regexIndex===this.count&&this.considerAll()),x}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=A(e.classNameAliases||{}),function _(c,r){const l=c;if(c.isCompiled)return l;[st,ot,bt,lt].forEach(w=>w(c,r)),e.compilerExtensions.forEach(w=>w(c,r)),c.__beforeBegin=null,[rt,ct,at].forEach(w=>w(c,r)),c.isCompiled=!0;let x=null;return"object"==typeof c.keywords&&c.keywords.$pattern&&(c.keywords=Object.assign({},c.keywords),x=c.keywords.$pattern,delete c.keywords.$pattern),x=x||/\w+/,c.keywords&&(c.keywords=_e(c.keywords,e.case_insensitive)),l.keywordPatternRe=t(x,!0),r&&(c.begin||(c.begin=/\B|\b/),l.beginRe=t(l.begin),!c.end&&!c.endsWithParent&&(c.end=/\B|\b/),c.end&&(l.endRe=t(l.end)),l.terminatorEnd=j(l.end)||"",c.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(c.end?"|":"")+r.terminatorEnd)),c.illegal&&(l.illegalRe=t(c.illegal)),c.contains||(c.contains=[]),c.contains=[].concat(...c.contains.map(function(w){return function wt(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return A(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Oe(e)?A(e,{starts:e.starts?A(e.starts):null}):Object.isFrozen(e)?A(e):e}("self"===w?c:w)})),c.contains.forEach(function(w){_(w,l)}),c.starts&&_(c.starts,r),l.matcher=function b(c){const r=new f;return c.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),c.terminatorEnd&&r.addRule(c.terminatorEnd,{type:"end"}),c.illegal&&r.addRule(c.illegal,{type:"illegal"}),r}(l),l}(e)}function Oe(e){return!!e&&(e.endsWithParent||Oe(e.starts))}class xt extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ne=ue,Re=A,ye=Symbol("nomatch");var $=function(e){const t=Object.create(null),n=Object.create(null),f=[];let b=!0;const _="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ce};function l(i){return r.noHighlightRe.test(i)}function w(i,a,h){let p="",M="";"object"==typeof a?(p=i,h=a.ignoreIllegals,M=a.language):(P("10.7.0","highlight(lang, code, ...args) has been deprecated."),P("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),M=i,p=a),void 0===h&&(h=!0);const S={code:p,language:M};Z("before:highlight",S);const T=S.result?S.result:G(S.language,S.code,h);return T.code=S.code,Z("after:highlight",T),T}function G(i,a,h,p){const M=Object.create(null);function S(s,o){return s.keywords[o]}function T(){if(!u.keywords)return void O.addText(E);let s=0;u.keywordPatternRe.lastIndex=0;let o=u.keywordPatternRe.exec(E),g="";for(;o;){g+=E.substring(s,o.index);const d=B.case_insensitive?o[0].toLowerCase():o[0],R=S(u,d);if(R){const[N,Ut]=R;O.addText(g),g="",M[d]=(M[d]||0)+1,M[d]<=7&&(Q+=Ut),N.startsWith("_")?g+=o[0]:O.addKeyword(o[0],B.classNameAliases[N]||N)}else g+=o[0];s=u.keywordPatternRe.lastIndex,o=u.keywordPatternRe.exec(E)}g+=E.substr(s),O.addText(g)}function y(){null!=u.subLanguage?function J(){if(""===E)return;let s=null;if("string"==typeof u.subLanguage){if(!t[u.subLanguage])return void O.addText(E);s=G(u.subLanguage,E,!0,Be[u.subLanguage]),Be[u.subLanguage]=s._top}else s=se(E,u.subLanguage.length?u.subLanguage:null);u.relevance>0&&(Q+=s.relevance),O.addSublanguage(s._emitter,s.language)}():T(),E=""}function I(s,o){let g=1;const d=o.length-1;for(;g<=d;){if(!s._emit[g]){g++;continue}const R=B.classNameAliases[s[g]]||s[g],N=o[g];R?O.addKeyword(N,R):(E=N,T(),E=""),g++}}function ke(s,o){return s.scope&&"string"==typeof s.scope&&O.openNode(B.classNameAliases[s.scope]||s.scope),s.beginScope&&(s.beginScope._wrap?(O.addKeyword(E,B.classNameAliases[s.beginScope._wrap]||s.beginScope._wrap),E=""):s.beginScope._multi&&(I(s.beginScope,o),E="")),u=Object.create(s,{parent:{value:u}}),u}function Te(s,o,g){let d=function Ue(e,t){const n=e&&e.exec(t);return n&&0===n.index}(s.endRe,g);if(d){if(s["on:end"]){const R=new W(s);s["on:end"](o,R),R.isMatchIgnored&&(d=!1)}if(d){for(;s.endsParent&&s.parent;)s=s.parent;return s}}if(s.endsWithParent)return Te(s.parent,o,g)}function Lt(s){return 0===u.matcher.regexIndex?(E+=s[0],1):(ae=!0,0)}function Ht(s){const o=s[0],g=a.substr(s.index),d=Te(u,s,g);if(!d)return ye;const R=u;u.endScope&&u.endScope._wrap?(y(),O.addKeyword(o,u.endScope._wrap)):u.endScope&&u.endScope._multi?(y(),I(u.endScope,s)):R.skip?E+=o:(R.returnEnd||R.excludeEnd||(E+=o),y(),R.excludeEnd&&(E=o));do{u.scope&&O.closeNode(),!u.skip&&!u.subLanguage&&(Q+=u.relevance),u=u.parent}while(u!==d.parent);return d.starts&&ke(d.starts,s),R.returnEnd?0:o.length}let V={};function Ie(s,o){const g=o&&o[0];if(E+=s,null==g)return y(),0;if("begin"===V.type&&"end"===o.type&&V.index===o.index&&""===g){if(E+=a.slice(o.index,o.index+1),!b){const d=new Error(`0 width match regex (${i})`);throw d.languageName=i,d.badRule=V.rule,d}return 1}if(V=o,"begin"===o.type)return function Ct(s){const o=s[0],g=s.rule,d=new W(g),R=[g.__beforeBegin,g["on:begin"]];for(const N of R)if(N&&(N(s,d),d.isMatchIgnored))return Lt(o);return g.skip?E+=o:(g.excludeBegin&&(E+=o),y(),!g.returnBegin&&!g.excludeBegin&&(E=o)),ke(g,s),g.returnBegin?0:o.length}(o);if("illegal"===o.type&&!h){const d=new Error('Illegal lexeme "'+g+'" for mode "'+(u.scope||"<unnamed>")+'"');throw d.mode=u,d}if("end"===o.type){const d=Ht(o);if(d!==ye)return d}if("illegal"===o.type&&""===g)return 1;if(oe>1e5&&oe>3*o.index)throw new Error("potential infinite loop, way more iterations than matches");return E+=g,g.length}const B=k(i);if(!B)throw L(_.replace("{}",i)),new Error('Unknown language: "'+i+'"');const jt=_t(B);let ce="",u=p||jt;const Be={},O=new r.__emitter(r);!function Pt(){const s=[];for(let o=u;o!==B;o=o.parent)o.scope&&s.unshift(o.scope);s.forEach(o=>O.openNode(o))}();let E="",Q=0,C=0,oe=0,ae=!1;try{for(u.matcher.considerAll();;){oe++,ae?ae=!1:u.matcher.considerAll(),u.matcher.lastIndex=C;const s=u.matcher.exec(a);if(!s)break;const g=Ie(a.substring(C,s.index),s);C=s.index+g}return Ie(a.substr(C)),O.closeAllNodes(),O.finalize(),ce=O.toHTML(),{language:i,value:ce,relevance:Q,illegal:!1,_emitter:O,_top:u}}catch(s){if(s.message&&s.message.includes("Illegal"))return{language:i,value:ne(a),illegal:!0,relevance:0,_illegalBy:{message:s.message,index:C,context:a.slice(C-100,C+100),mode:s.mode,resultSoFar:ce},_emitter:O};if(b)return{language:i,value:ne(a),illegal:!1,relevance:0,errorRaised:s,_emitter:O,_top:u};throw s}}function se(i,a){a=a||r.languages||Object.keys(t);const h=function ie(i){const a={value:ne(i),illegal:!1,relevance:0,_top:c,_emitter:new r.__emitter(r)};return a._emitter.addText(i),a}(i),p=a.filter(k).filter(Ae).map(y=>G(y,i,!1));p.unshift(h);const M=p.sort((y,I)=>{if(y.relevance!==I.relevance)return I.relevance-y.relevance;if(y.language&&I.language){if(k(y.language).supersetOf===I.language)return 1;if(k(I.language).supersetOf===y.language)return-1}return 0}),[S,T]=M,J=S;return J.secondBest=T,J}function re(i){let a=null;const h=function x(i){let a=i.className+" ";a+=i.parentNode?i.parentNode.className:"";const h=r.languageDetectRe.exec(a);if(h){const p=k(h[1]);return p||(Me(_.replace("{}",h[1])),Me("Falling back to no-highlight mode for this block.",i)),p?h[1]:"no-highlight"}return a.split(/\s+/).find(p=>l(p)||k(p))}(i);if(l(h))return;if(Z("before:highlightElement",{el:i,language:h}),i.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(i)),r.throwUnescapedHTML))throw new xt("One of your code blocks includes unescaped HTML.",i.innerHTML);a=i;const p=a.textContent,M=h?w(p,{language:h,ignoreIllegals:!0}):se(p);i.innerHTML=M.value,function Rt(i,a,h){const p=a&&n[a]||h;i.classList.add("hljs"),i.classList.add(`language-${p}`)}(i,h,M.language),i.result={language:M.language,re:M.relevance,relevance:M.relevance},M.secondBest&&(i.secondBest={language:M.secondBest.language,relevance:M.secondBest.relevance}),Z("after:highlightElement",{el:i,result:M,text:p})}let Se=!1;function Y(){"loading"!==document.readyState?document.querySelectorAll(r.cssSelector).forEach(re):Se=!0}function k(i){return i=(i||"").toLowerCase(),t[i]||t[n[i]]}function Ne(i,{languageName:a}){"string"==typeof i&&(i=[i]),i.forEach(h=>{n[h.toLowerCase()]=a})}function Ae(i){const a=k(i);return a&&!a.disableAutodetect}function Z(i,a){const h=i;f.forEach(function(p){p[h]&&p[h](a)})}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",function At(){Se&&Y()},!1),Object.assign(e,{highlight:w,highlightAuto:se,highlightAll:Y,highlightElement:re,highlightBlock:function vt(i){return P("10.7.0","highlightBlock will be removed entirely in v12.0"),P("10.7.0","Please use highlightElement now."),re(i)},configure:function yt(i){r=Re(r,i)},initHighlighting:()=>{Y(),P("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function Nt(){Y(),P("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function kt(i,a){let h=null;try{h=a(e)}catch(p){if(L("Language definition for '{}' could not be registered.".replace("{}",i)),!b)throw p;L(p),h=c}h.name||(h.name=i),t[i]=h,h.rawDefinition=a.bind(null,e),h.aliases&&Ne(h.aliases,{languageName:i})},unregisterLanguage:function Tt(i){delete t[i];for(const a of Object.keys(n))n[a]===i&&delete n[a]},listLanguages:function It(){return Object.keys(t)},getLanguage:k,registerAliases:Ne,autoDetection:Ae,inherit:Re,addPlugin:function Dt(i){(function Bt(i){i["before:highlightBlock"]&&!i["before:highlightElement"]&&(i["before:highlightElement"]=a=>{i["before:highlightBlock"](Object.assign({block:a.el},a))}),i["after:highlightBlock"]&&!i["after:highlightElement"]&&(i["after:highlightElement"]=a=>{i["after:highlightBlock"](Object.assign({block:a.el},a))})})(i),f.push(i)}}),e.debugMode=function(){b=!1},e.safeMode=function(){b=!0},e.versionString="11.5.0",e.regex={concat:v,lookahead:ge,either:m,optional:Pe,anyNumberOfTimes:He};for(const i in z)"object"==typeof z[i]&&K(z[i]);return Object.assign(e,z),e}({});le.exports=$,$.HighlightJS=$,$.default=$},112:(le,H,D)=>{"use strict";D.r(H),D.d(H,{HighlightJS:()=>K,default:()=>W});var K=D(940);const W=K}}]);