
import endpoint from "./endpoint.js";

const formLogin = document.getElementById('formLogin');

formLogin.addEventListener("submit",async(e)=>{
    e.preventDefault();

    //console.log(email.value);
    //console.log(password.value);
    //console.log(endpoint.login);

    
    const formData = new FormData();
    formData.append("email",email.value);
    formData.append("password",password.value);

    let dataObj = new URLSearchParams(formData);
    //console.log(Object.fromEntries(formData));
    
    await fetch(endpoint.login,{
        method: "post",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*" 
            //"Content-Type":"application/json" 
        },
        //body: JSON.stringify(Object.fromEntries(formData))
        //body: formData
        body: dataObj
    })
    .then(res=>res.json())
    .then(res=>{
        
        if(res.status==200){
            //console.log(res);
            sessionStorage.removeItem("otpEmailGTask");
            sessionStorage.setItem("tokenGTask",res.token);
            location.href = "/list.html";
        }
        else if(res.status==400){
            sessionStorage.setItem("otpEmailGTask",res.email);
            location.href = '/verify.html';
        }
        else{
            alert(res.message);
            //console.log(res);
        }
        
    }).catch(error=>{
        //console.log(`Houve um erro interno: ${error}`);
        alert(`Houve um erro interno: ${error}`)
    });

});