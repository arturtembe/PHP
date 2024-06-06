
import endpoint from "./endpoint.js";
import { verifyToken } from "./main.js";

/* ========== GET FIREBASE =========== */


const row_tabela = (data,id)=>{
    return `
    <div class="row" id="${id}">
        <div class="cell" data-title="Conteudo">
            ${data.conteudo}
        </div>
        <div class="cell" data-title="Estado">
            ${data.estado}
        </div>
        <div class="cell" data-title="Notificar">
            ${(data.notificar? "Sim":"Nao")}
        </div>
        <div class="cell" data-title="Data">
            ${data.dataTarefa}
        </div>
        <div class="cell" data-title="action">
            <a href="edit.html?d=${id}">
                <button type="button" id="updbtn" class="btn-edit margin-left-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
            </a>
            <button type="button" id="delbtn" class="btn-delete margin-left-btn delbtn"
            data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" data-id="${id}" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        </div>
    </div>
    `;
}

async function GetDocument(){

    await fetch(endpoint.tarefaView,{
        method: "get",
        headers: { 
            "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}` 
        },
    })
    .then(res=>res.json())
    .then(res=>{
        //console.log(res);
        
        if(res.status==200){
            
            res.tarefas.forEach(el=>{
                //console.log(el.id);
                document.querySelector('#table-wppr').innerHTML += row_tabela(el,el.id);
            });

        }
        else if(res.status==500){
            sessionStorage.removeItem("otpEmailGTask");
            //location.href = '/login.html';
            console.log(res);
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

/* ========== DELETE FIREBASE =========== */

async function DeleteDocument(id){

    await fetch(`${endpoint.tarefaDelete}/${id}`,{
        method: "get",
        headers: { 
            "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}` 
        },
    })
    .then(res=>res.json())
    .then(res=>{
        
        if(res.status==200){
            document.getElementById(id).remove();
        }
        else{
            alert(res.message);
        }
        
    }).catch(error=>{
        alert(`Houve um erro interno`)
    });

}

/* ========== HOME =========== */

const home = async()=>{
/*
    let data= await fetch("./views/home.html")
                .then(res=>res.text())
                .then(res=>{return res; })
                .catch(error=>{
                    console.log(`ERROR: ${error}`);
                });
                */

    //document.querySelector('#main').innerHTML = await data;

    await GetDocument();

}

/* ========== LOAD =========== */

window.addEventListener("load",async()=>{

    verifyToken();

    //await head();
    // Header
    //await header();
    // Main
    await home();

    document.querySelectorAll(".delbtn").forEach(el=>{
        el.addEventListener("click",async(e)=>{
            await DeleteDocument(e.target.getAttribute("data-id"));
        });
    });
    

    // Footer
    //await footer();
});