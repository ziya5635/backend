(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(14),r=n.n(c),u=n(2),s=n(3),l=n.n(s),i="api/people",m=function(){return l.a.get(i).then((function(e){return e.data}))},f=function(e){return l.a.post(i,e).then((function(e){return e.data}))},d=function(e){return l.a.delete("".concat(i,"/").concat(e)).then((function(e){return e}))},p=function(e,t){return l.a.put("".concat(i,"/").concat(e),t).then((function(e){return e.data}))},h=function(e){var t=e.id,n=e.setPeople,a=e.name,c=e.setSuccessMessage;return o.a.createElement("button",{onClick:function(e){e.preventDefault(),window.confirm("Delete ".concat(a,"?"))&&d(t).then((function(){m().then((function(e){return n(e)})).catch((function(e){return console.log(e.message)})),c("".concat(a," removed successfuly from server.")),setTimeout((function(){return c(null)}),5e3)})).catch((function(e){return console.log(e.message)}))}},"delete")},w=function(e){var t=e.people,n=e.keyword,a=e.setPeople,c=e.setSuccessMessage;return t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return o.a.createElement("div",{key:e.name},e.name," ",e.number," ",o.a.createElement(h,{id:e.id,setPeople:a,name:e.name,setSuccessMessage:c}))}))},b=function(e){var t=e.keyword,n=e.setKeyword;return o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}}))},g=n(4),v=function(e){return o.a.createElement("form",null,o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.newName,onChange:function(t){var n=t.target.value;e.setNewName(n)}})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:e.newPhone,onChange:function(t){e.setPhone(t.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit",onClick:function(t){if(e.people.some((function(t){return t.name===e.newName}))){t.preventDefault();var n=e.people.find((function(t){return t.name===e.newName}));window.confirm(e.newName+" is already added to phonebook, replace the old number with a new one?")&&p(n.id,Object(g.a)(Object(g.a)({},n),{},{number:e.newPhone})).then((function(t){e.setNewName(""),e.setPhone(""),e.setPeople(e.people.map((function(e){return e.id!==t.id?e:t}))),e.setSuccessMessage("".concat(n.name," info updated successfully.")),setTimeout((function(){return e.setSuccessMessage(null)}),5e3)})).catch((function(t){e.setErrorMessage("Information of ".concat(n.name," has already been removed from server.")),setTimeout((function(){return e.setErrorMessage(null)}),5e3)}))}else t.preventDefault(),f({name:e.newName,number:e.newPhone}).then((function(t){return e.setPeople(e.people.concat(t))})),e.setNewName(""),e.setPhone(""),e.setSuccessMessage("Added ".concat(e.newName," to phonebook.")),setTimeout((function(){return e.setSuccessMessage(null)}),5e3)}},"add")))},E=function(e){var t=e.message,n=e.status;return null===t?null:o.a.createElement("div",{className:n},t)},N=(n(37),function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(u.a)(r,2),l=s[0],i=s[1],f=Object(a.useState)(""),d=Object(u.a)(f,2),p=d[0],h=d[1],g=Object(a.useState)(""),N=Object(u.a)(g,2),P=N[0],j=N[1],O=Object(a.useState)(null),S=Object(u.a)(O,2),k=S[0],y=S[1],M=Object(a.useState)(null),C=Object(u.a)(M,2),D=C[0],T=C[1];return Object(a.useEffect)((function(){m().then((function(e){return c(e)})).catch((function(e){return console.log(e.message)}))}),[]),o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{message:k,status:"success"}),o.a.createElement(E,{message:D,status:"error"}),o.a.createElement(b,{keyword:P,setKeyword:j}),o.a.createElement("h2",null,"Add a new"),o.a.createElement(v,{newName:l,newPhone:p,people:n,setPeople:c,setNewName:i,setPhone:h,setSuccessMessage:y,setErrorMessage:T}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(w,{people:n,keyword:P,setPeople:c,setSuccessMessage:y}))});r.a.render(o.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.0272751f.chunk.js.map