
const addForm=document.getElementById('form');

const htttp_point=`http://localhost:3000/`;

const mes=["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Octubro","Novembro","Dezembro"];

const removeTasks=async(e)=>{
    e.preventDefault();

    let id=e.target.getAttribute('data-id');

    let dataForm=new FormData();
    dataForm.append("id",id);
    
    const endpoint=htttp_point+`db/controllers/tarefaPlus/tarefaController/deleteTarefaAPI.php`;
    
    const response=await fetch(endpoint,{
        method:"post",
        //headers:{'Content-Type':'application/json'},
        body:dataForm
    }).then(res=>res.json()).then(res=>{
        return res;
    }).catch(error=>{console.log("ERROR: "+error);});

    if(await response[0].status==1){
        document.getElementById(`tr${id}`).remove();
        console.log(await response[0].msg);
    }
    
    //fetchTasks();
    
}

const updateTaskStatus=async(e)=>{
    e.preventDefault();
    
    let id=e.target.getAttribute("data-id");

    //console.log("Id: ",id);
    //console.log("Value: ",);
    
    let dataForm=new FormData();
    dataForm.append("tarefa",document.getElementById(`td_tarefa_${id}`).innerHTML);
    dataForm.append("estado",e.target.value);
    dataForm.append("id",id);
        
    const endpoint=htttp_point+`db/controllers/tarefaPlus/tarefaController/editTarefaAPI.php`;
        
    //console.log(tarefa.value);
        
    const response=await fetch(endpoint,{
        method:"post",
        body:dataForm
    }).then(res=>res.json()).then(res=>{
        return res;
    }).catch(error=>{console.log("ERROR: "+error);});

    if(await response[0].status==1){
        //console.log(await response[0].msg);
    }
    
}

const editTask=async(e)=>{
    e.preventDefault();    
    
    const endpoint=htttp_point+`db/controllers/tarefaPlus/tarefaController/editTarefaAPI.php`;

    const id=e.target.getAttribute('data-id');
    //e.target.dataset.id

    let estado=document.getElementById(`cat${id}`)

    const task=document.getElementById('c'+id);
    const el=task.children[1];

    let txt=task.firstElementChild.innerHTML;

    if(el.tagName.toLocaleUpperCase()=="FORM"){

        if(!el.firstElementChild){
            el.innerHTML=`<input type="text" value="${txt}" data-id="${id}" 
            name="task${id}" id="task${id}"/>`;

            task.children[0].classList.add('hidden');

            }else{

            if(el.children[0].value.length==txt.length){
                
                task.children[0].classList.remove('hidden');

                task.children[1].innerHTML='';
            }
            else{
                const dados=`${id},${el.firstElementChild.value}`;

                const fr=new FormData();
                fr.append("id",id);
                fr.append("tarefa",el.firstElementChild.value);
                fr.append("estado",estado.value);

                const response=await fetch(endpoint,{
                    method:"post",
                    body:fr
                }).then(res=>res.json())
                .then(res=>{
                    return res;
                }).catch(error=>{console.log("ERROR: "+error);});
                
                if(await response[0].status=="1"){

                    task.children[0].classList.remove('hidden');
                    task.children[0].innerHTML='';
                    task.children[0].innerHTML=`${el.firstElementChild.value}`;
                    
                    task.children[1].innerHTML='';

                    //console.log(await response[0].msg);
                }
                else{
                    //console.log(await response[0].msg);
                }
            }

        }
    }


}

const fetchTasks= async () => {

    document.getElementById('tby').innerHTML=``;

    const endpoint=htttp_point+`db/controllers/tarefaPlus/tarefaController/getTarefaAPI.php`;

    const response=await fetch(endpoint).then(res=>res.json())
    .then(res=>{
        return res;
    }).catch(error=>{
        console.log("ERROR: "+error);
    });

    await response.forEach(el => {
            let tr=document.createElement("tr");
            tr.setAttribute("id",`tr${el.id}`)
                let td1=document.createElement('td');
                td1.setAttribute("id",`c${el.id}`);
                    
                    let p1=document.createElement("p");
                    p1.setAttribute("id",`td_tarefa_${el.id}`);
                    p1.innerHTML=el.tarefa;

                    let form1=document.createElement("form");
                    form1.setAttribute("action","");
                    form1.setAttribute("method","post");
                    form1.setAttribute("class","input-edit");
                    form1.setAttribute("data-id",`${el.id}`);
                    form1.setAttribute("id",`form${el.id}`);

                td1.appendChild(p1);
                td1.appendChild(form1);

                let td2=document.createElement('td');
                td2.innerHTML=`${el.data.split('-')[0]} de 
                ${mes[el.data.split('-')[1]-1]} de ${el.data.split('-')[2]} ${el.hora}`;

                let td3=document.createElement('td');
                    let select=document.createElement("select");
                    select.setAttribute("name","estado");
                    select.setAttribute("data-id",`${el.id}`);
                    select.setAttribute("id",`cat${el.id}`);

                        let option1=document.createElement("option");
                        option1.setAttribute("value","0");
                        option1.innerHTML="Pendente";
                        el.estado==0&&(option1.setAttribute("selected",""));

                        let option2=document.createElement("option");
                        option2.setAttribute("value","1");
                        option2.innerHTML="Em andamento";
                        el.estado==1&&(option2.setAttribute("selected",""));
                        
                        let option3=document.createElement("option");
                        option3.setAttribute("value","2");
                        option3.innerHTML="Concluida";
                        el.estado==2&&(option3.setAttribute("selected",""));

                    select.appendChild(option1);
                    select.appendChild(option2);
                    select.appendChild(option3);

                    select.addEventListener("change",updateTaskStatus);

                td3.appendChild(select);

                let td4=document.createElement('td');
                    let btn1=document.createElement('button');
                    btn1.setAttribute("class","btn-action")
                        let i1=document.createElement("i");
                        i1.setAttribute("class","fa fa-pencil");
                        i1.setAttribute("aria-hidden","true");
                        i1.setAttribute("data-id",`${el.id}`);

                    btn1.appendChild(i1);
                    btn1.addEventListener("click",editTask);

                    let btn2=document.createElement('button');
                    btn2.setAttribute("class","btn-action")
                    let i2=document.createElement("i");
                        i2.setAttribute("class","fa fa-trash");
                        i2.setAttribute("aria-hidden","true");
                        i2.setAttribute("data-id",`${el.id}`);
                    
                    btn2.appendChild(i2);
                    btn2.addEventListener("click",removeTasks);

                td4.appendChild(btn1);
                td4.appendChild(btn2);

            tr.appendChild(td1);    
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            
        document.getElementById('tby').appendChild(tr);
    });
    
}

//GET
fetchTasks();

//addForm.addEventListener("submit",async(e)=>{
document.getElementById('btn_submit').addEventListener("click",async(e)=>{
    e.preventDefault();

    if(tarefa.value!=""){
            
        let dataForm=new FormData();
        dataForm.append("tarefa",tarefa.value);
        //dataForm.append("estado",0);
        
        const endpoint=htttp_point+`db/controllers/tarefaPlus/tarefaController/addTarefaAPI.php`;
        
        //console.log(tarefa.value);
        
        const response=await fetch(endpoint,{
            method:"post",
            body:dataForm
        }).then(res=>res.json()).then(res=>{
            return res;
        }).catch(error=>{console.log("ERROR: "+error);});

        if(await response[0].status==1){
            //console.log(await response[0].msg); 
            tarefa.value="";

            fetchTasks();
        }

    }

    /*
    const option={dateStyle:'long',timeStyle:'short'};

    const dt=new Date().toLocaleDateString(option);
    const ht=new Date().toLocaleTimeString(option);
    
    const dados=`${f_tarefa.value},${dt} ${ht}`;

    const fr=new FormData();
    fr.set("f_tarefa",dados);

    const task=await response.text();

    console.log(task)
    f_tarefa.value="";

    fetchTasks();
    */
});