
export const verifyToken = ()=>{
    if(sessionStorage.getItem('tokenGTask') =="" || 
    sessionStorage.getItem('tokenGTask') == null || 
    typeof sessionStorage.getItem('tokenGTask') == undefined){
        location.href = '/login.html';
        //alert("Algo de errado nao ta certo!")
        return;
    }
}

/* ========== LOAD =========== */

window.addEventListener("load",async()=>{
    //console.log(sessionStorage.getItem('tokenGTask'));
    verifyToken();
});