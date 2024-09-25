import endpoint from "./endpoint.js";
import { verifyToken } from "./main.js";

const formAdd = document.getElementById("formAdd");

formAdd.addEventListener("submit", async(e)=>{
    e.preventDefault();

    if(conteudo.value=="" || conteudo.value==null || conteudo.value==undefined){
        alert('O campo conteudo nao deve estar vazia!')
        return;
    }
    if(data.value=="" || data.value==null || data.value==undefined){
        alert('O campo Data nao deve estar vazia!')
        return;
    }

    const notificar = notificar_sim.checked? true:false;

    let formData = new FormData();
    formData.append("conteudo", conteudo.value);
    formData.append("notificar", notificar);
    formData.append("estado", estado.value);
    formData.append("dataTarefa", data.value);

    let dataObj = new URLSearchParams(formData);

    console.log(dataObj);
    
    await fetch(endpoint.tarefaAdd,{
        method: "post",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*",
            "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}` 
        },
        body: dataObj
    })
    .then(res=>res.json())
    .then(res=>{
        
        //console.log(res);
        
        if(res.status==200){
            location.href = "/list.html";
        }
        else{
            alert(res.message);
        }
        
        
    }).catch(error=>{
        alert(`Houve um erro interno: ${error}`)
    });

});

/* ========== LOAD =========== */

window.addEventListener("load",async()=>{
    verifyToken();
});