(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),a=n(5),r=n.n(a),i=n(3),l=n(2),j=n.n(l);var o=n(6),d=function(e){var t=e.task,n=(e.startDate,e.onDelete);return Object(c.jsxs)("div",{className:"task",children:[Object(c.jsxs)("h3",{children:[t.text," ",Object(c.jsx)(o.a,{style:{color:"red",justifyItems:"right"},onClick:function(){return n(t.id)}})]}),Object(c.jsx)("p",{children:t.sDate})]})},h=(n(13),function(e){var t=e.tasks,n=e.startDate,s=e.onDelete;return Object(c.jsxs)("div",{className:"taskContainer",children:[Object(c.jsxs)("h2",{children:[" Date: ",n.sDate]}),t.map((function(e){return Object(c.jsx)(d,{task:e,startDate:n,onDelete:s},e.id)}))]})}),b=(n(14),function(e){var t=e.value,n=e.onChange,a=Object(s.useState)([{id:1,text:"Doctors Appointment",priority:5,exp:10,sDate:"test"},{id:2,text:"Homework",priority:4,exp:8,sDate:"test"},{id:3,text:"Cook",priority:3,exp:6,sDate:"test"}]),r=Object(i.a)(a,2),l=r[0],o=r[1],d=Object(s.useState)({sDate:""}),b=Object(i.a)(d,2),u=b[0],O=b[1],m=Object(s.useState)([]),f=Object(i.a)(m,2),x=f[0],v=f[1];Object(s.useEffect)((function(){v(function(e){for(var t=e.clone().startOf("month").startOf("week"),n=e.clone().endOf("month").endOf("week"),c=t.clone().subtract(1,"day"),s=[];c.isBefore(n,"day");)s.push(Array(7).fill(0).map((function(){return c.add(1,"day").clone()})));return s}(t))}),[t]);var p=[],D=t.clone().startOf("year").month(),N=t.clone().endOf("year").month();return Object(c.jsxs)("div",{className:"wrapper",children:[Object(c.jsxs)("div",{className:"conta",children:[Object(c.jsx)("div",{className:"Cal",children:Object(c.jsx)("div",{className:"monthSelect",children:function(){for(var e=D;e<=N;++e)p.push(e);return p}().map((function(e){return Object(c.jsx)("div",{className:t.isSame(t.clone().month(e),"month")?"selectedMonth":"",onClick:function(){return n((c=e,t.clone().month(c)));var c},children:j()().month(e).format("MMM")},e.toString())}))})}),Object(c.jsxs)("div",{className:"Cal2",children:[Object(c.jsxs)("div",{className:"Months",children:[Object(c.jsx)("i",{className:"fas fa-angle-left prev",onClick:function(){return n(t.clone().subtract(1,"months"))}}),Object(c.jsxs)("h1",{children:[t.format("MMM")," ",t.format("YYYY")," "]}),Object(c.jsx)("i",{className:"fas fa-angle-right next",onClick:function(){return n(t.clone().add(1,"months"))}})]}),Object(c.jsxs)("div",{className:"Weeks",children:[Object(c.jsx)("div",{children:"SUN"}),Object(c.jsx)("div",{children:"MON"}),Object(c.jsx)("div",{children:"TUE"}),Object(c.jsx)("div",{children:"WED"}),Object(c.jsx)("div",{children:"THU"}),Object(c.jsx)("div",{children:"FRI"}),Object(c.jsx)("div",{children:"SAT"})]}),Object(c.jsx)("div",{className:"DaysContainer",children:x.map((function(e){return Object(c.jsx)("div",{className:"Days",children:e.map((function(e){return Object(c.jsx)("div",{className:t.isSame(e,"day")&&t.isSame(j()().getMonth,"month")?"selected":"dy",onClick:function(){return function(e,t,n){var c=[u],s=j()([e,t,n]).month(t).format("YYYY-MM-DD");c.sDate=s.toString(),O(c)}(e.year(),e.month(),e.date())},children:Object(c.jsxs)("div",{className:e.month()!==t.month()?"prevDays":"",children:[" ",e.format("D").toString()," "]})},e.toString())}))},e.toString())}))})]})]}),Object(c.jsx)(h,{tasks:l,startDate:u,onDelete:function(e){o(l.filter((function(t){return t.id!==e})))}})]})}),u=(n(15),function(){var e=Object(s.useRef)();var t=Object(s.useState)(j()()),n=Object(i.a)(t,2),a=n[0],r=n[1];return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"}),Object(c.jsxs)("nav",{children:[Object(c.jsx)("div",{className:"logo",children:Object(c.jsx)("h4",{children:"HARRY"})}),Object(c.jsxs)("ul",{className:"nav-links",ref:e,children:[Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"/Calendar.html",children:"Home"})}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"/Calendar.html",children:"Calendar"})}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"/Calendar.html",children:"Projects"})}),Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:"/Calendar.html",children:"About"})})]}),Object(c.jsxs)("div",{className:"burger",onClick:function(){e.current.classList.toggle("nav-active")},children:[Object(c.jsx)("div",{className:"line1"}),Object(c.jsx)("div",{className:"line2"}),Object(c.jsx)("div",{className:"line3"})]})]}),Object(c.jsx)(b,{value:a,onChange:r})]})}),O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(c.jsx)(u,{}),document.getElementById("root")),O()}},[[16,1,2]]]);
//# sourceMappingURL=main.e2f28421.chunk.js.map