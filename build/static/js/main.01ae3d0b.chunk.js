(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),l=n(33),o=n.n(l),i=(n(40),n(12)),c=n(13),d=n(17),r=n(16),m=n(15),u=n(2),p=(n(41),n(42),n(14)),h=n(20),g=n(35),b=n(10),j=n.n(b),v=n(0);var f=function(){var e=Object(a.useState)({username:"",password:""}),t=Object(g.a)(e,2),n=t[0],s=t[1];function l(e){var t=e.target,n=t.name,a=t.value;s((function(e){return Object(h.a)(Object(h.a)({},e),{},Object(p.a)({},n,a))}))}return Object(v.jsxs)("div",{className:"container",children:[Object(v.jsx)("br",{}),Object(v.jsx)("h1",{className:"text-info",children:"Login Details"}),Object(v.jsx)("br",{}),Object(v.jsxs)("form",{children:[Object(v.jsx)("div",{className:"form-group",children:Object(v.jsx)("input",{onChange:l,name:"username",value:n.username,autoComplete:"off",className:"form-control",placeholder:"username"})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{className:"form-group",children:Object(v.jsx)("input",{type:"password",onChange:l,name:"password",value:n.password,autoComplete:"off",className:"form-control",placeholder:"password"})}),Object(v.jsx)("br",{}),Object(v.jsxs)("div",{className:"form-inline",children:[Object(v.jsx)("div",{style:{padding:"10px"},children:Object(v.jsx)("button",{onClick:function(e){e.preventDefault();var t={username:n.username,password:n.password};j.a.post("/login",t).then((function(e){console.log(e.data.token),console.log(e.data.verify),localStorage.setItem("token","Bearer "+e.data.token),localStorage.setItem("verify",e.data.verify)})),console.log(n.username+" "+n.password),alert("Details Submitted")},className:"btn btn-lg btn-info",children:"Submit"})}),Object(v.jsx)("div",{style:{padding:"10px"},children:Object(v.jsx)("button",{onClick:function(e){if(e.preventDefault(),fetch("/resource",{method:"GET",headers:{Authorization:localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(e){console.log(e),localStorage.setItem("verify",e.auth)})).catch((function(e){console.log(e)})),1===parseInt(localStorage.getItem("verify"))){alert("User Authenticated");var t=window.location.href+"todo";window.location.replace(t)}else alert("Please check login details")},className:"btn btn-lg btn-secondary",children:"Authenticate"})})]})]})]})},x=n(9),y=[],O=function(e){Object(d.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={list1:[]},a.handleSubmit=a.handleSubmit.bind(Object(x.a)(a)),a.removeButton=a.removeButton.bind(Object(x.a)(a)),a.updateButton=a.updateButton.bind(Object(x.a)(a)),a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/task").then((function(e){return e.json()})).then((function(t){e.setState({list1:t})})).then((function(t){return console.log(e.state.list1)})).then((function(t){if(y=[],e.state.list1.msg||e.state.list1.err)y=[];else if(e.state.list1.length>0)for(var n=0;n<e.state.list1.length;n++)y.push(e.state.list1[n].id)})).then((function(t){if("Incorrect Login"===e.state.list1.msg){document.getElementById("myList").innerHTML="";var n=document.createElement("h2");n.style.cssText="color: red",n.innerHTML="Incorrect Login - Please try again",document.getElementById("myList").appendChild(n)}else if(document.getElementById("myList").innerHTML="",e.state.list1.length>0){var a=document.createElement("Table");a.id="Table",a.className="table table-hover";var s=document.createElement("thead");s.style.cssText="color: white",s.style.backgroundColor="midnightblue",s.id="tableHead";var l=document.createElement("tr");l.id="traceHead",document.getElementById("myList").appendChild(a),document.getElementById("Table").appendChild(s),document.getElementById("tableHead").appendChild(l);for(var o=["Id","Task","Assigned","Cash","email","Progress"],i=0;i<o.length;i++){var c=document.createElement("th");c.innerHTML=o[i],document.getElementById("traceHead").appendChild(c)}var d=document.createElement("tbody");d.id="tableBody",document.getElementById("Table").appendChild(d);for(var r=0;r<e.state.list1.length;r++){var m=document.createElement("tr"),u="id"+r;m.id=u,document.getElementById("tableBody").appendChild(m);var p=document.createElement("td");p.innerHTML=e.state.list1[r].id,document.getElementById(u).appendChild(p);var h=document.createElement("td");h.innerHTML=e.state.list1[r].task,document.getElementById(u).appendChild(h);var g=document.createElement("td");g.innerHTML=e.state.list1[r].assign,document.getElementById(u).appendChild(g);var b=document.createElement("td");b.innerHTML=e.state.list1[r].cash,document.getElementById(u).appendChild(b);var j=document.createElement("td");j.innerHTML=e.state.list1[r].email,document.getElementById(u).appendChild(j);var v=document.createElement("td");v.innerHTML=e.state.list1[r].progress,document.getElementById(u).appendChild(v)}}else alert("No tasks currently!")}))}},{key:"handleSubmit",value:function(e){if("Incorrect Login"===this.state.list1.msg)alert("you are not logged on!");else{var t=Date.now(),n=Array.from(String(t),Number).splice(4,4),a=Number(n.join("")),s=parseInt(a),l=document.getElementById("task").value,o=document.getElementById("assign").value,i=document.getElementById("cash").value,c=document.getElementById("email").value,d=document.getElementById("progress").value;e.preventDefault();var r={id:s,task:l,assign:o,cash:i,email:c,progress:d};j.a.post("http://localhost:8000/create",r),""===l||""===o||""===i||""===c||""===d?alert("Please Check Inputs"):alert("task added"),window.location.reload()}}},{key:"removeButton",value:function(){if("Incorrect Login"===this.state.list1.msg)alert("you are not logged on!");else{var e=prompt("Please select the id of the item you want removed"),t=parseInt(e);if(y.includes(t)){var n={remove:t};j.a.post("http://localhost:8000/delete1",n),alert("task deleted"),window.location.reload()}else alert("Please Check: Id not in list")}}},{key:"updateButton",value:function(){if("Incorrect Login"===this.state.list1.msg)alert("you are not logged on!");else{var e=prompt("Please select the id of the item you want updated"),t=parseInt(e);if(y.includes(t)){var n=this.state.list1.filter((function(e){return e.id==t})),a=t,s=(n[0].task,n[0].assign,n[0].cash,n[0].email,n[0].progress,{id:a,task:""===document.getElementById("task").value?n[0].task:document.getElementById("task").value,assign:""===document.getElementById("assign").value?n[0].assign:document.getElementById("assign").value,cash:""===document.getElementById("cash").value?n[0].cash:document.getElementById("cash").value,email:""===document.getElementById("email").value?n[0].email:document.getElementById("email").value,progress:""===document.getElementById("progress").value?n[0].email:document.getElementById("progress").value});console.log(s),j.a.post("http://localhost:8000/updatemany1",s)}else alert("Please Check: Id not in list")}}},{key:"render",value:function(){return Object(v.jsxs)("div",{children:[Object(v.jsx)("div",{style:{paddingLeft:"20px",paddingRight:"20px",paddingTop:"20px"},children:Object(v.jsx)("h1",{style:{color:"white",backgroundColor:"royalblue"},children:Object(v.jsx)("b",{children:"Task Manager"})})}),Object(v.jsxs)("form",{children:[Object(v.jsxs)("div",{style:{paddingLeft:"100px"},className:"form-inline",children:[Object(v.jsx)("div",{style:{padding:"10px"},className:"form-group",children:Object(v.jsx)("input",{type:"text",id:"task",name:"task",value:this.state.task,autoComplete:"off",className:"form-control",placeholder:"task"})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{style:{padding:"10px"},className:"form-group",children:Object(v.jsx)("input",{type:"text",id:"assign",name:"assign",value:this.state.assign,autoComplete:"off",className:"form-control",placeholder:"assign"})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{style:{padding:"10px"},className:"form-group",children:Object(v.jsx)("input",{type:"text",id:"cash",name:"cash",value:this.state.cash,autoComplete:"off",className:"form-control",placeholder:"cash"})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{style:{padding:"10px"},className:"form-group",children:Object(v.jsx)("input",{type:"text",id:"email",name:"email",value:this.state.email,autoComplete:"off",className:"form-control",placeholder:"email"})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{style:{padding:"10px"},className:"form-group",children:Object(v.jsx)("input",{type:"text",id:"progress",name:"progress",value:this.state.progress,autoComplete:"off",className:"form-control",placeholder:"progress"})})]}),Object(v.jsx)("br",{}),Object(v.jsxs)("div",{style:{paddingLeft:"400px"},className:"form-inline",children:[Object(v.jsx)("div",{style:{padding:"10px"},id:"create",children:Object(v.jsx)("button",{className:"btn btn-lg btn-info",onClick:this.handleSubmit,children:"Create"})}),Object(v.jsx)("div",{style:{padding:"10px"},id:"remove",children:Object(v.jsx)("button",{id:"removeButton",onClick:this.removeButton,className:"btn btn-lg btn-success",children:"Remove"})}),Object(v.jsx)("div",{style:{padding:"10px"},id:"update",children:Object(v.jsx)("button",{id:"updateButton",onClick:this.updateButton,className:"btn btn-lg btn-warning",children:"Update"})}),Object(v.jsx)("div",{style:{padding:"10px"},id:"login",children:Object(v.jsx)("button",{style:{color:"white"},id:"loginButton",className:"btn btn-lg btn-danger",children:Object(v.jsx)(m.b,{style:{color:"white"},className:"link",to:"/",children:"Login page"})})})]})]}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{style:{paddingLeft:"20px",paddingRight:"20px",paddingTop:"15px"},children:Object(v.jsx)("h2",{style:{color:"white",backgroundColor:"darkred"},children:Object(v.jsx)("b",{children:"Activities Outstanding"})})}),Object(v.jsx)("div",{style:{paddingLeft:"20px",paddingRight:"20px"},id:"myList"})]})}}]),n}(a.Component),I=(n(32),function(e){Object(d.a)(n,e);var t=Object(r.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsxs)(m.a,{children:[Object(v.jsx)(u.a,{path:"/",exact:!0,children:Object(v.jsx)(f,{})}),Object(v.jsx)(u.a,{path:"/todo",exact:!0,children:Object(v.jsx)(O,{})})]})})}}]),n}(a.Component)),B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,69)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,l=t.getLCP,o=t.getTTFB;n(e),a(e),s(e),l(e),o(e)}))};o.a.render(Object(v.jsx)(s.a.StrictMode,{children:Object(v.jsx)(I,{})}),document.getElementById("root")),B()}},[[67,1,2]]]);
//# sourceMappingURL=main.01ae3d0b.chunk.js.map