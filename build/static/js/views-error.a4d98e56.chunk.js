(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[16],{190:function(e,a,t){"use strict";var s=t(10),c=t(12),r=t(6),o=t.n(r),n=t(54),i=t.n(n),l=t(80),d=t.n(l),u=t(79),m=["className","cssModule","widths","tag"],b=i.a.oneOfType([i.a.number,i.a.string]),j=i.a.oneOfType([i.a.bool,i.a.number,i.a.string,i.a.shape({size:i.a.oneOfType([i.a.bool,i.a.number,i.a.string]),order:b,offset:b})]),f={tag:u.q,xs:j,sm:j,md:j,lg:j,xl:j,className:i.a.string,cssModule:i.a.object,widths:i.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},O=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},x=function(e){var a=e.className,t=e.cssModule,r=e.widths,n=e.tag,i=Object(c.a)(e,m),l=[];r.forEach((function(a,s){var c=e[a];if(delete i[a],c||""===c){var r=!s;if(Object(u.k)(c)){var o,n=r?"-":"-"+a+"-",m=O(r,a,c.size);l.push(Object(u.m)(d()(((o={})[m]=c.size||""===c.size,o["order"+n+c.order]=c.order||0===c.order,o["offset"+n+c.offset]=c.offset||0===c.offset,o)),t))}else{var b=O(r,a,c);l.push(b)}}})),l.length||l.push("col");var b=Object(u.m)(d()(a,l),t);return o.a.createElement(n,Object(s.a)({},i,{className:b}))};x.propTypes=f,x.defaultProps=g,a.a=x},191:function(e,a,t){"use strict";var s=t(10),c=t(12),r=t(6),o=t.n(r),n=t(54),i=t.n(n),l=t(80),d=t.n(l),u=t(79),m=["className","cssModule","color","body","inverse","outline","tag","innerRef"],b={tag:u.q,inverse:i.a.bool,color:i.a.string,body:i.a.bool,outline:i.a.bool,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},j=function(e){var a=e.className,t=e.cssModule,r=e.color,n=e.body,i=e.inverse,l=e.outline,b=e.tag,j=e.innerRef,f=Object(c.a)(e,m),g=Object(u.m)(d()(a,"card",!!i&&"text-white",!!n&&"card-body",!!r&&(l?"border":"bg")+"-"+r),t);return o.a.createElement(b,Object(s.a)({},f,{className:g,ref:j}))};j.propTypes=b,j.defaultProps={tag:"div"},a.a=j},192:function(e,a,t){"use strict";var s=t(10),c=t(12),r=t(6),o=t.n(r),n=t(54),i=t.n(n),l=t(80),d=t.n(l),u=t(79),m=["className","cssModule","tag"],b={tag:u.q,className:i.a.string,cssModule:i.a.object},j=function(e){var a=e.className,t=e.cssModule,r=e.tag,n=Object(c.a)(e,m),i=Object(u.m)(d()(a,"card-title"),t);return o.a.createElement(r,Object(s.a)({},n,{className:i}))};j.propTypes=b,j.defaultProps={tag:"div"},a.a=j},194:function(e,a,t){"use strict";var s=t(10),c=t(12),r=t(6),o=t.n(r),n=t(54),i=t.n(n),l=t(80),d=t.n(l),u=t(79),m=["className","cssModule","noGutters","tag","form","widths"],b=i.a.oneOfType([i.a.number,i.a.string]),j={tag:u.q,noGutters:i.a.bool,className:i.a.string,cssModule:i.a.object,form:i.a.bool,xs:b,sm:b,md:b,lg:b,xl:b},f={tag:"div",widths:["xs","sm","md","lg","xl"]},g=function(e){var a=e.className,t=e.cssModule,r=e.noGutters,n=e.tag,i=e.form,l=e.widths,b=Object(c.a)(e,m),j=[];l.forEach((function(a,t){var s=e[a];if(delete b[a],s){var c=!t;j.push(c?"row-cols-"+s:"row-cols-"+a+"-"+s)}}));var f=Object(u.m)(d()(a,r?"no-gutters":null,i?"form-row":"row",j),t);return o.a.createElement(n,Object(s.a)({},b,{className:f}))};g.propTypes=j,g.defaultProps=f,a.a=g},227:function(e,a,t){"use strict";var s=t(89),c=t(6),r=t(120),o=t(102);function n(e){var a=function(){var e=c.useContext(r.a);return Object(o.c)(e),e}(),t=a.formatMessage,s=a.textComponent,n=void 0===s?c.Fragment:s,i=e.id,l=e.description,d=e.defaultMessage,u=e.values,m=e.children,b=e.tagName,j=void 0===b?n:b,f=t({id:i,description:l,defaultMessage:d},u,{ignoreTag:e.ignoreTag});return Array.isArray(f)||(f=[f]),"function"===typeof m?m(f):j?c.createElement(j,null,c.Children.toArray(f)):c.createElement(c.Fragment,null,f)}n.displayName="FormattedMessage";var i=c.memo(n,(function(e,a){var t=e.values,c=Object(s.c)(e,["values"]),r=a.values,n=Object(s.c)(a,["values"]);return Object(o.d)(r,t)&&Object(o.d)(c,n)}));i.displayName="MemoizedFormattedMessage";a.a=i},432:function(e,a,t){"use strict";t.r(a);var s=t(6),c=t(194),r=t(191),o=t(192),n=t(83),i=t(87),l=t(85),d=t(8),u=t(15);a.default=function(){return Object(s.useEffect)((function(){return document.body.classList.add("background"),document.body.classList.add("no-footer"),function(){document.body.classList.remove("background"),document.body.classList.remove("no-footer")}}),[]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"fixed-background"}),Object(u.jsx)("main",{children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)(c.a,{className:"h-100",children:Object(u.jsx)(i.a,{xxs:"12",md:"10",className:"mx-auto my-auto",children:Object(u.jsxs)(r.a,{className:"auth-card",children:[Object(u.jsx)("div",{className:"position-relative image-side ",children:Object(u.jsx)("div",{className:"logo-single-page"})}),Object(u.jsxs)("div",{className:"form-side",children:[Object(u.jsx)(o.a,{className:"mb-4",children:Object(u.jsx)(l.a,{id:"advisor.error-title"})}),Object(u.jsx)("p",{className:"mb-0 text-muted text-small mb-0",children:Object(u.jsx)(l.a,{id:"advisor.error-code"})}),Object(u.jsx)("p",{className:"display-1 font-weight-bold mb-5",children:"404"}),Object(u.jsx)(n.c,{to:d.b,className:"btn btn-primary btn-shadow btn-lg",children:Object(u.jsx)(l.a,{id:"advisor.go-back-home"})})]})]})})})})})]})}},433:function(e,a,t){"use strict";t.r(a);var s=t(6),c=t(194),r=t(191),o=t(192),n=t(83),i=t(87),l=t(85),d=t(8),u=t(15);a.default=function(){return Object(s.useEffect)((function(){return document.body.classList.add("background"),document.body.classList.add("no-footer"),function(){document.body.classList.remove("background"),document.body.classList.remove("no-footer")}}),[]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"fixed-background"}),Object(u.jsx)("main",{children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)(c.a,{className:"h-100",children:Object(u.jsx)(i.a,{xxs:"12",md:"10",className:"mx-auto my-auto",children:Object(u.jsxs)(r.a,{className:"auth-card",children:[Object(u.jsx)("div",{className:"position-relative image-side ",children:Object(u.jsx)("div",{className:"logo-single-page"})}),Object(u.jsxs)("div",{className:"form-side",children:[Object(u.jsx)(o.a,{className:"mb-4",children:Object(u.jsx)(l.a,{id:"unauthorized.title"})}),Object(u.jsx)("p",{className:"mb-0 text-muted text-small mb-0",children:Object(u.jsx)(l.a,{id:"unauthorized.detail"})}),Object(u.jsx)("p",{className:"display-1 font-weight-bold mb-5",children:"503"}),Object(u.jsx)(n.c,{to:d.b,className:"btn btn-primary btn-shadow btn-lg",children:Object(u.jsx)(l.a,{id:"advisor.go-back-home"})})]})]})})})})})]})}},85:function(e,a,t){"use strict";var s=t(0),c=(t(6),t(227)),r=t(120),o=t(15);a.a=Object(r.c)((function(e){return Object(o.jsx)(c.a,Object(s.a)({},e))}),{withRef:!1})},87:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"b",(function(){return n}));var s=t(0),c=(t(6),t(190)),r=t(15),o=function(e){return Object(r.jsx)(c.a,Object(s.a)(Object(s.a)({},e),{},{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},n=function(e){var a=e.className;return Object(r.jsx)("div",{className:"separator ".concat(a)})}}}]);
//# sourceMappingURL=views-error.a4d98e56.chunk.js.map