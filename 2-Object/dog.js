var fido={
  name:"Fido",
  weight:40,
  breed:"Mixed",
  loves:["Walks","fetching balls"],
  bark:function(){
    console.log("Woof!");
  }
}

// console.log(fido);

//枚举：
// for (var i in fido){
//   console.log(i+":"+fido[i]);
// }

// 调用对象内的方法：
fido.bark();