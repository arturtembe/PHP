
import endpoint from "./endpoint.js";

const formRegister = document.getElementById('formRegister');

formRegister.addEventListener("submit",async(e)=>{
    e.preventDefault();

    if(username.value.length<=2){
        alert("Username nao deve ter menos que 3 caracteres!");
    }
    else if(password.value.length<=5){
        alert("Senha nao deve ter menos que 6 caracteres!");
    }
    else if(password.value!=re_password.value){
        alert("Senhas diferentes!");
        //console.log(password.value);
        //console.log(re_password.value);
    }
    else{

        const formData = new FormData();
        formData.append("username",username.value);
        formData.append("email",email.value);
        formData.append("password",password.value);

        let dataObj = new URLSearchParams(formData);
        
        //console.log(dataObj);
        
        await fetch(endpoint.register,{
            method: "post",
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*"  
            },
            body: dataObj
        })
        .then(res=>res.json())
        .then(res=>{
            //console.log(res);
            
            if(res.status==200){
                sessionStorage.setItem("otpEmailGTask", res.email);
                location.href = '/verify.html';
            }
            else{
                alert(res.message);
                //console.log(res);
            }
        }).catch(error=>{
            console.log(`Houve um erro interno: ${error}`);
            //alert(`Houve um erro interno: ${error}`)
        });
    
    }

});