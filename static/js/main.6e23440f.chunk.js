(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{127:function(e,t,a){e.exports=a(284)},136:function(e,t,a){},138:function(e,t,a){},153:function(e,t,a){},276:function(e,t,a){},278:function(e,t,a){},284:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(44),c=a.n(s),o=a(20),l=a(21),i=a(23),m=a(22),p=a(24),u=(a(132),a(134),a(136),a(60)),d=a.n(u),h=(a(138),a(6)),f=a(8),g=a(112),E=(a(153),a(37)),b=a(116),v=a(117),O=a.n(v),j=a(11),N=a(17),k=a.n(N),w=a(34),y="https://api.github.com";function T(e,t,a,n,r){return R.apply(this,arguments)}function R(){return(R=Object(w.a)(k.a.mark(function e(t,a,n,r,s){var c,o,l,i,m=arguments;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return c=m.length>5&&void 0!==m[5]?m[5]:"",o=a?" language:".concat(a):"",e.next=4,fetch("".concat(y,"/search/repositories?sort=").concat(t,"&q=created:").concat(r.format("YYYY-MM-DD"),"..").concat(s?s.format("YYYY-MM-DD"):"*").concat(o,"&per_page=").concat(n,"&access_token=").concat(c));case 4:if((l=e.sent).ok){e.next=10;break}return e.next=8,l.json();case 8:throw i=e.sent,Error(i.message);case 10:return e.abrupt("return",l.json());case 11:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function S(e){return x.apply(this,arguments)}function x(){return(x=Object(w.a)(k.a.mark(function e(t){var a;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"?access_token=").concat(t));case 2:if((a=e.sent).ok){e.next=5;break}throw Error(a.messageText);case 5:return e.abrupt("return",a.json());case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var A=a(287),_=Object(A.a)("THROW_ERROR","TRY_AGAIN","SET_REPOS","SET_TO_DATE","REQUEST_REPOS","RECEIVE_REPOS"),Y=_.throwError,L=_.tryAgain,D=_.setRepos,C=_.setToDate,M=_.requestRepos,I=_.receiveRepos;var P=Object(A.a)("SET_THEME","SET_PERIOD","SET_LANGUAGE","SET_REPOS_POOL_SIZE","SET_PERSONAL_ACCESS_TOKEN"),H=P.setTheme,z=P.setPeriod,W=P.setLanguage,F=P.setReposPoolSize,G=P.setPersonalAccessToken,U="DARK",K="LIGHT",V={DAILY:"DAILY",WEEKLY:"WEEKLY",MONTHLY:"MONTHLY",YEARLY:"YEARLY"};var q=a(285),B=a(288),J=a(286);function X(){return(X=Object(w.a)(k.a.mark(function e(t,a){return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.accessToken){e.next=2;break}throw new q.a({accessToken:"form-control-empty",_error:"empty"});case 2:return e.prev=2,e.next=5,S(t.accessToken);case 5:e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(2),new q.a({accessToken:"form-control-invalid",_error:"invalid"});case 10:return e.abrupt("return",a.onSubmit(t));case 11:case"end":return e.stop()}},e,this,[[2,7]])}))).apply(this,arguments)}var Q,Z,$=function(e){var t=e.meta.error;return!e.meta.error&&e.submitSucceeded&&(t="form-control-valid"),r.a.createElement("input",Object.assign({},e.input,{className:"form-control form-control-sm ".concat(t),type:e.type,name:"accessToken",placeholder:e.label}))},ee=Object(J.a)({form:"tokenForm"})(function(e){var t=function(t){switch(e.error){case"empty":return"btn-warning";case"invalid":return"btn-danger";default:return e.submitSucceeded?"btn-success":"btn-light"}}();return r.a.createElement("form",{className:"input-group personal-access-token-input",onSubmit:e.handleSubmit(function(t){return function(e,t){return X.apply(this,arguments)}(t,e)})},r.a.createElement(B.a,{type:"password",name:"accessToken",component:$,label:"token",submitSucceeded:e.submitSucceeded}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{type:"submit",className:"btn btn-sm ".concat(t)},r.a.createElement(h.a,{icon:f.l}),"\xa0Verify")))}),te=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).GITHUNT_REPO="https://git.io/fN2H2",a.CHROME_WEB_STORE="https://chrome.google.com/webstore/detail/githunt/fkdnnmnoacofoklehaokcabccnbahfhm",a.FIREFOX_ADDON="https://addons.mozilla.org/en-US/firefox/addon/githunt",a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"reset",value:function(){localStorage.clear(),window.location.reload()}},{key:"render",value:function(){var e=this,t={modal:{backgroundColor:this.props.settings.theme===U?"#343a40":"#fff",color:this.props.settings.theme===U?"#A5A5A5":"#212529"}};return r.a.createElement(g.a,{open:this.props.settingsOpened,styles:t,contentLabel:"Info",onClose:this.props.closeSettings,closeTimeoutMS:100},r.a.createElement("h2",{className:"aboutHeader"},"About Githunt"),r.a.createElement("h3",{className:"aboutHeader"},"v",E.version),r.a.createElement("div",null,r.a.createElement("div",{className:"list-element"},r.a.createElement("img",{src:d.a,alt:"logo",id:"logo"})),r.a.createElement("div",{className:"list-element"},"Please report any issue:",r.a.createElement("a",{className:"float-right",target:"_blank",rel:"noopener noreferrer",href:this.GITHUNT_REPO},r.a.createElement("button",{className:"btn btn-sm"},r.a.createElement(h.a,{icon:b.a})))),r.a.createElement("div",{className:"list-element"},"Chrome web store:",r.a.createElement("a",{className:"float-right",href:this.CHROME_WEB_STORE,target:"_blank",rel:"noopener noreferrer"},"Chrome \xa0",r.a.createElement(h.a,{icon:f.f}))),r.a.createElement("div",{className:"list-element"},"Firefox addon:",r.a.createElement("a",{className:"float-right",href:this.FIREFOX_ADDON,target:"_blank",rel:"noopener noreferrer"},"Firefox \xa0",r.a.createElement(h.a,{icon:f.f}))),r.a.createElement("div",{className:"list-element"},"Switch light/dark mode",r.a.createElement("div",{className:"float-right",style:{display:"flex"}},r.a.createElement("div",{className:"theme-selector theme-selector-light ".concat(this.props.settings.theme===K&&"theme-selected"),onClick:function(){return e.props.setTheme(K)}}),r.a.createElement("div",{className:"theme-selector theme-selector-dark ".concat(this.props.settings.theme===U&&"theme-selected"),onClick:function(){return e.props.setTheme(U)}}))),r.a.createElement("div",{className:"list-element"},"Invalid caches:",r.a.createElement("button",{onClick:this.reset,className:"btn btn-danger btn-sm float-right"},r.a.createElement(h.a,{icon:f.b}))),r.a.createElement("div",{className:"list-element"},"Repos pool size:",r.a.createElement("select",{value:this.props.settings.repoAmount,onChange:function(t){return e.props.setRepoPoolSizeAndRefresh(t.target.value)},className:"form-control form-control-sm select-amount"},r.a.createElement("option",null,"3"),r.a.createElement("option",null,"12"),r.a.createElement("option",null,"30"),r.a.createElement("option",null,"60"))),r.a.createElement("div",{className:"list-element"},r.a.createElement(h.a,{"data-tip":!0,"data-for":"tooltip-access-token",icon:f.i}),"\xa0Personal access token:",r.a.createElement(O.a,{id:"tooltip-access-token",place:"right",type:this.props.settings.theme.toLowerCase(),effect:"solid"},r.a.createElement("span",null,r.a.createElement("strong",null,"No scopes needed at all"))),r.a.createElement(ee,{onSubmit:function(t){return e.props.setPersonalAccessToken(t.accessToken)},initialValues:{accessToken:this.props.settings.accessToken}}))))}}]),t}(n.Component),ae=te=Object(j.b)(function(e){return e},{setTheme:H,setRepoPoolSizeAndRefresh:function(e){return function(t){t(F(e)),t(D([]))}},setPersonalAccessToken:G})(te),ne=Object(J.a)({form:"language"})(function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit,className:"input-group"},r.a.createElement(B.a,{component:"input",name:"language",type:"text",placeholder:"All languages",className:"form-control form-control-sm"}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{type:"submit",title:"Valid",className:"btn btn-sm btn-light",style:{zIndex:"unset"}},r.a.createElement(h.a,{icon:f.c}))))}),re=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).openSettings=function(){a.setState({settingsOpened:!0})},a.closeSettings=function(){a.setState({settingsOpened:!1})},a.state={settingsOpened:!1},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.repos.repos.length>0?r.a.createElement(h.a,{onClick:function(){return e.props.setRepos([])},icon:f.k,size:"lg",className:"icon"}):r.a.createElement(h.a,{icon:f.k,size:"lg",className:"icon",spin:!0});return r.a.createElement("div",null,r.a.createElement(ae,{settingsOpened:this.state.settingsOpened,closeSettings:this.closeSettings}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 my-1 col-lg-4 mx-lg-0"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:d.a,className:"logo-main",alt:"logo"}),r.a.createElement("h1",null,E.name)),r.a.createElement("p",{className:"text-center"},"Hunting the best GitHub projects")),r.a.createElement("div",{className:"col-lg-2"}),r.a.createElement("div",{className:"col-12 col-lg-6 text-center row ml-1"},r.a.createElement("div",{className:"col-12 p-1 col-lg-4 p-lg-3 mt-lg-3"},r.a.createElement("select",{value:this.props.settings.period,onChange:function(t){return e.props.setPeriodAndRefresh(t.target.value)},className:"form-control form-control-sm"},r.a.createElement("option",{value:V.DAILY},"Daily"),r.a.createElement("option",{value:V.WEEKLY},"Weekly"),r.a.createElement("option",{value:V.MONTHLY},"Monthly"),r.a.createElement("option",{value:V.YEARLY},"Yearly"))),r.a.createElement("div",{className:"col-12 p-1 col-lg-5 p-lg-3 mt-lg-3"},r.a.createElement(ne,{onSubmit:function(t){return e.props.setLanguageAndRefresh(t.language)},initialValues:{language:this.props.settings.language}})),r.a.createElement("div",{className:"col-12 p-1 col-lg-3 p-lg-3 mt-lg-3"},t,r.a.createElement(h.a,{onClick:this.openSettings,icon:f.h,size:"lg",className:"icon ml-4"})))))}}]),t}(n.Component),se=re=Object(j.b)(function(e){return e},{setRepos:D,setLanguageAndRefresh:function(e){return function(t){t(W(e)),t(D([]))}},setPeriodAndRefresh:function(e){return function(t){t(z(e)),t(D([]))}}})(re),ce=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={hasError:!1},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?r.a.createElement("span",null,"Something went wrong. ",this.props.errorMessage):this.props.children}}]),t}(n.Component),oe=a(12),le=a.n(oe),ie=a(119),me=a.n(ie),pe=a(120),ue=a.n(pe),de=(a(276),function(e){return r.a.createElement("div",{className:"date"},le()(e.since).fromNow()," - ",le()(e.since).format("MMM DD, YYYY")," \u2013"," ",le()(e.to).format("MMM DD, YYYY"))}),he=(a(278),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.license?r.a.createElement("div",{className:"badge badge-".concat(this.props.settings.theme.toLowerCase()),title:"license"},r.a.createElement(h.a,{icon:f.g}),"\xa0",r.a.createElement("span",{className:"metadataText"},this.props.license)):null;return r.a.createElement("div",{className:"col-md-4"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement("a",{href:this.props.htmlURL},this.props.fullName)),r.a.createElement("p",{className:"card-text"},this.props.description?this.props.description:r.a.createElement("i",null,"No description provided"))),r.a.createElement("div",{className:"card-footer text-muted"},r.a.createElement("div",{className:"row align-self-center"},r.a.createElement("div",{className:"badge badge-".concat(this.props.settings.theme.toLowerCase()),title:"forks"},r.a.createElement(h.a,{icon:f.d}),"\xa0",r.a.createElement("span",{className:"metadataText"},this.props.forks)),r.a.createElement("div",{className:"badge badge-".concat(this.props.settings.theme.toLowerCase()),title:"stars"},r.a.createElement(h.a,{icon:f.j}),"\xa0",r.a.createElement("span",{className:"metadataText"},this.props.stars)),r.a.createElement("div",{className:"badge badge-".concat(this.props.settings.theme.toLowerCase()),title:"issues"},r.a.createElement(h.a,{icon:f.e}),"\xa0",r.a.createElement("span",{className:"metadataText"},this.props.openIssues)),e))))}}]),t}(n.Component)),fe=he=Object(j.b)(function(e){return e})(he),ge=a(121),Ee=a.n(ge),be=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).fetchRepos=function(){var e=a.props.repos.repos[a.props.repos.repos.length-1],t=e?le()(e.since):le()(),n=function(e){switch(a.props.settings.period){case V.DAILY:return t.clone().subtract(1,"days");case V.WEEKLY:return t.clone().subtract(1,"weeks");case V.MONTHLY:return t.clone().subtract(1,"months");case V.YEARLY:return t.clone().subtract(1,"years");default:return le()()}}();a.props.fetchRepos("stars",a.props.settings.language,a.props.settings.repoAmount,n,t,a.props.settings.accessToken)},le()(e.repos.cacheDate).diff(le()(),"hours")<-12&&(e.setRepos([]),e.setToDate(le()())),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.repos.repos.map(function(e,t){return r.a.createElement("div",{className:"animated fadeIn",key:t},r.a.createElement("div",{className:"text-center w-100"},r.a.createElement(de,{since:e.since,to:e.to})),r.a.createElement("div",{className:"row"},e.items.map(function(e){return r.a.createElement(fe,{key:e.id,fullName:e.full_name,description:e.description,forks:e.forks_count,stars:e.stargazers_count,openIssues:e.open_issues,htmlURL:e.html_url,createdAt:e.created_at,watchers:e.watchers_count,license:e.license?e.license.key:null})})))}),a=r.a.createElement("div",{className:"loader-small",key:0},r.a.createElement(h.a,{icon:f.k,spin:!0}),"\xa0",r.a.createElement("strong",null,"Wait, hunting them down..."),r.a.createElement("br",null),r.a.createElement("span",null,this.props.repos.error),r.a.createElement("span",null,this.props.repos.error&&r.a.createElement("button",{onClick:function(){return e.props.tryAgain()}},"try again")));return r.a.createElement("div",{className:this.props.settings.theme.toLowerCase(),id:"theme-container"},r.a.createElement("div",{className:"App container"},r.a.createElement(me.a,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),r.a.createElement("meta",{name:"theme-color",content:"#000000"}),r.a.createElement("link",{rel:"manifest",href:"manifest.json"}),r.a.createElement("link",{rel:"shortcut icon",href:"favicon.ico"}),r.a.createElement("title",null,E.name)),r.a.createElement(ce,{errorMessage:this.props.repos.error},r.a.createElement(Ee.a,{showUnder:160,style:{position:"fixed",bottom:50,right:30,cursor:"pointer",transitionDuration:"0.2s",transitionTimingFunction:"linear",transitionDelay:"0s",zIndex:1}},r.a.createElement(h.a,{icon:f.a,size:"3x"})),r.a.createElement(se,null),r.a.createElement("div",{className:"animated fadeIn"},r.a.createElement(ue.a,{pageStart:0,loadMore:function(){return e.props.repos.error||e.props.repos.fetching||e.fetchRepos()},hasMore:!0,loader:a},t)))))}}]),t}(n.Component),ve=be=Object(j.b)(function(e){return e},{tryAgain:L,fetchRepos:function(e,t,a,n,r){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return function(){var c=Object(w.a)(k.a.mark(function c(o){var l;return k.a.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return o(M()),c.prev=1,c.next=4,T(e,t,a,n,r,s);case 4:return l=c.sent,c.abrupt("return",o(I({items:l.items,since:n.clone(),to:r.clone()})));case 8:return c.prev=8,c.t0=c.catch(1),c.abrupt("return",o(Y(c.t0.message)));case 11:case"end":return c.stop()}},c,this,[[1,8]])}));return function(e){return c.apply(this,arguments)}}()},setRepos:D,setToDate:C})(be),Oe=a(5),je=a(10),Ne=a(13),ke=a(289),we={theme:K,period:V.DAILY,language:"",repoAmount:30,accessToken:""},ye=Object(ke.a)((Q={},Object(je.a)(Q,H,function(e,t){return Object(Ne.a)({},e,{theme:t.payload})}),Object(je.a)(Q,z,function(e,t){return Object(Ne.a)({},e,{period:t.payload})}),Object(je.a)(Q,W,function(e,t){return Object(Ne.a)({},e,{language:t.payload})}),Object(je.a)(Q,F,function(e,t){return Object(Ne.a)({},e,{repoAmount:t.payload})}),Object(je.a)(Q,G,function(e,t){return console.log(t.payload),Object(Ne.a)({},e,{accessToken:t.payload})}),Q),we),Te=a(126),Re={fetching:!1,error:null,repos:[],cacheDate:le()()},Se=Object(ke.a)((Z={},Object(je.a)(Z,Y,function(e,t){return Object(Ne.a)({},e,{error:t.payload})}),Object(je.a)(Z,L,function(e){return Object(Ne.a)({},e,{fetching:!1,error:null})}),Object(je.a)(Z,D,function(e,t){return Object(Ne.a)({},e,{repos:t.payload})}),Object(je.a)(Z,C,function(e,t){return Object(Ne.a)({},e,{cacheDate:t.payload})}),Object(je.a)(Z,M,function(e){return Object(Ne.a)({},e,{fetching:!0})}),Object(je.a)(Z,I,function(e,t){return Object(Ne.a)({},e,{repos:[].concat(Object(Te.a)(e.repos),[t.payload]),fetching:!1})}),Z),Re),xe=a(86),Ae=a.n(xe),_e=a(48),Ye=a(290),Le={key:"repos",storage:Ae.a,blacklist:["error"]},De={key:"settings",storage:Ae.a},Ce=Object(Oe.combineReducers)({settings:Object(_e.a)(De,ye),repos:Object(_e.a)(Le,Se),form:Ye.a}),Me=a(122),Ie=a(123),Pe=a(124),He=a(125),ze=Object(He.composeWithDevTools)({trace:!0}),We=Object(Oe.createStore)(Ce,ze(Object(Oe.applyMiddleware)(Me.a,Object(Ie.createLogger)())));c.a.render(r.a.createElement(j.a,{store:We},r.a.createElement(Pe.a,{loading:"loading from cache",persistor:Object(_e.b)(We)},r.a.createElement(r.a.StrictMode,null,r.a.createElement(ve,null)))),document.getElementById("root"))},37:function(e){e.exports={name:"githunt",version:"1.3.0",private:!0,homepage:".",dependencies:{"@fortawesome/fontawesome-free":"^5.7.1","@fortawesome/fontawesome-svg-core":"^1.2.14","@fortawesome/free-brands-svg-icons":"^5.7.1","@fortawesome/free-solid-svg-icons":"^5.7.1","@fortawesome/react-fontawesome":"^0.1.4","animate.css":"^3.7.0",bootstrap:"^4.1.2","gh-pages":"^1.2.0",husky:"^0.14.3","lint-staged":"^7.2.0",moment:"^2.24.0","node-sass-chokidar":"^1.3.3","npm-run-all":"^4.1.3",prettier:"^1.16.4",react:"^16.4.1","react-dom":"^16.4.1","react-helmet":"^5.2.0","react-infinite-scroller":"^1.2.1","react-redux":"^6.0.0","react-responsive-modal":"^3.6.0","react-scripts":"^2.1.3","react-scroll-up":"^1.3.3","react-tooltip":"^3.8.4",redux:"^4.0.1","redux-actions":"^2.6.4","redux-devtools-extension":"^2.13.8","redux-form":"^8.1.0","redux-logger":"^3.0.6","redux-persist":"^5.10.0","redux-thunk":"^2.3.0"},"lint-staged":{"src/**/*.{js,jsx,json,scss}":["prettier --print-width 120 --single-quote --write"]},scripts:{flow:"flow",lint:"prettier --print-width 120 --single-quote --write src/**/*.{js,jsx,json,scss}",precommit:"lint-staged",start:"npm-run-all -p watch-css start-js",build:"npm-run-all build-css build-js","start-js":"react-scripts start","build-js":"react-scripts build && cp src/assets/img/icon* build/static/media",test:"react-scripts test --env=jsdom",eject:"react-scripts eject",predeploy:"npm run build",deploy:"gh-pages -d build","build-css":"node-sass-chokidar src/ -o src/","watch-css":"npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"},browserslist:[">0.2%","not dead","not ie <= 11","not op_mini all"],devDependencies:{"flow-bin":"^0.92.1"}}},60:function(e,t,a){e.exports=a.p+"static/media/logo.797028d8.png"}},[[127,2,1]]]);