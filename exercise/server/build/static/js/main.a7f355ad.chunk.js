(this["webpackJsonppart2-d"]=this["webpackJsonppart2-d"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),i=t(2),l=t(3),m=t.n(l),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},s=function(e){return m.a.post(f,e).then((function(e){return e.data}))},b=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.filter,t=e.setFilter;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}}))},v=function(e){var n=e.person,t=e.handleClick;return r.a.createElement("p",{key:n.name},n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"))},E=function(e){var n=e.handleSubmit,t=e.newName,a=e.setNewName,u=e.newNumber,c=e.setNewNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{value:t,onChange:function(e){return a(e.target.value)},required:!0})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{value:u,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},N=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(i.a)(c,2),m=l[0],f=l[1],N=Object(a.useState)(""),g=Object(i.a)(N,2),j=g[0],O=g[1],k=Object(a.useState)(""),S=Object(i.a)(k,2),y=S[0],C=S[1],T=Object(a.useState)(null),x=Object(i.a)(T,2),D=x[0],F=x[1];Object(a.useEffect)((function(){d().then((function(e){u(e)}))}),[]);var I=function(e,n){s({name:e,number:n}).then((function(e){u(t.concat(e)),q(),F("Added ".concat(e.name)),setTimeout((function(){F(null)}),5e3)})).catch((function(e){console.log(e.response.data),F(e.response.data.error),setTimeout((function(){F(null)}),5e3)}))},J=function(e){var n=t.find((function(n){return n.id===e})),a=Object(o.a)({},n,{number:j});b(e,a).then((function(n){u(t.map((function(t){return t.id!==e?t:n}))),q()})).catch((function(a){F("Infomation '".concat(n.name,"' has already been removed from server")),setTimeout((function(){F(null)}),5e3),u(t.filter((function(n){return n.id!==e})))}))},q=function(){f(""),O("")},A=t.filter((function(e){return new RegExp(y,"i").test(e.name)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:D}),r.a.createElement(p,{filter:y,setFilter:C}),r.a.createElement("h2",null,"add a new"),r.a.createElement(E,{handleSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===m}));n?window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one ?"))&&J(n.id):I(m,j)},newName:m,setNewName:f,newNumber:j,setNewNumber:O}),r.a.createElement("h2",null,"Numbers"),A.map((function(e){return r.a.createElement(v,{key:e.id,person:e,handleClick:function(){return function(e){window.confirm("Delete ".concat(e.name," ?"))&&h(e.id).then((function(){d().then((function(e){u(e)}))}))}(e)}})})))};t(37);c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.a7f355ad.chunk.js.map