import endpoint from "./endpoint.js";
import { verifyToken } from "./main.js";

const formEdit = document.getElementById("formEdit");

let href;

formEdit.addEventListener("submit", async(e)=>{
    e.preventDefault();

    if(conteudo.value=="" || conteudo.value==null || conteudo.value==undefined){
        alert('O campo conteudo nao deve estar vazia!')
        return;
    }
    if(data.value=="" || data.value==null || data.value==undefined){
        alert('O campo Data nao deve estar vazia!')
        return;
    }

    let id = href.split('=')[1];

    const notificar = notificar_sim.checked? true:false;

    let formData = new FormData();
    formData.append("conteudo", conteudo.value);
    formData.append("notificar", notificar);
    formData.append("estado", estado.value);
    formData.append("dataTarefa", data.value);

    let dataObj = new URLSearchParams(formData);

    //console.log(dataObj);
    
    await fetch(`${endpoint.tarefaEdit}/${id}`,{
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

/* ========== GET DATA =========== */
const getViewEdit = async()=>{
    let id = href.split('=')[1];

    await fetch(`${endpoint.tarefaView}/${id}`,{
        method: "get",
        headers: { 
            "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}` 
        }
    })
    .then(res=>res.json())
    .then(res=>{
        
        if(res.status==200){
            //console.log(res);
            document.getElementById("conteudo").value = res.tarefa.conteudo;
            document.getElementById("estado").value = res.tarefa.estado;
            if(res.tarefa.notificar){
                document.getElementById("notificar_sim").checked = true;
            }
            else{
                document.getElementById("notificar_nao").checked = true;
            }
            document.getElementById("data").value = res.tarefa.dataTarefa;
        }
        else{
            alert(res.message);
            location.href = "/list.html";
        }
        
    }).catch(error=>{
        //console.log(`Houve um erro interno: ${error}`);
        alert(`Houve um erro interno`)
        location.href = "/list.html";
    });
    
}
/* ========== LOAD =========== */

window.addEventListener("load",async()=>{
    verifyToken();
    //await head();
    // Header
    //await header();
    // GET DATA
    
    href = location.href;
    
    await getViewEdit();

    // Footer
    //await footer();
});