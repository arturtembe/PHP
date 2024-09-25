
const addForm=document.getElementById('form');

const removeTasks=async(e)=>{
    e.preventDefault();

    const endpoint="./db/p4_remove.php";
    
    const id=e.target.getAttribute('data-id');
            //e.target.dataset.id

    const fr=new FormData();
    fr.set("delete",id);

    const response=await fetch(endpoint,{
        method:addForm.getAttribute('method'),
        //headers:{'Content-Type':'application/json'},
        body:fr
    });
    const task=await response.text();

    console.log(task)
    f_tarefa.value="";

    fetchTasks();
}

const updateTaskStatus=async(e)=>{
    e.preventDefault();

    const endpoint="./db/p6_update_status.php";
    
    const id=e.target.getAttribute('data-id');
            //e.target.dataset.id

    const dados=`${id},${e.target.value}`;

    const fr=new FormData();
    fr.set("update",dados);

    const response=await fetch(endpoint,{
        method:addForm.getAttribute('method'),
        //headers:{'Content-Type':'application/json'},
        body:fr
    });
    const task=await response.text();

    console.log(task)
    f_tarefa.value="";

    //fetchTasks();
    
    //console.log(dados)
}

const editTask=async(e)=>{
    e.preventDefault();    

    const id=e.target.getAttribute('data-id');
            //e.target.dataset.id

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
                fr.set("update",dados);

                const response=await fetch(el.getAttribute('action'),{
                    method:el.getAttribute('method'),
                    //headers:{'Content-Type':'application/json'},
                    body:fr
                });
                const res=await response.text();

                if(res=="1"){

                    task.children[0].classList.remove('hidden');
                    task.children[0].innerHTML='';
                    task.children[0].innerHTML=`${el.firstElementChild.value}`;
                    
                    task.children[1].innerHTML='';

                    console.log("Actualizado com sucesso");
                }
                else{
                    console.log("Falha ao actualizar");
                }
            }

        }
    }

}

const inputeditTask=async(e)=>{
    //e.stopPropagation();
    e.preventDefault(); 
    
    const id=e.target.getAttribute('data-id');
            //e.target.dataset.id
    
    const dados=`${id},${e.target.firstElementChild.value}`;

    const fr=new FormData();
    fr.set("update",dados);

    const response=await fetch(e.target.getAttribute('action'),{
        method:e.target.getAttribute('method'),
        //headers:{'Content-Type':'application/json'},
        body:fr
    });
    const task=await response.text();

    if(task=="1"){
        e.target.parentElement.children[0].innerHTML=`${e.target.parentElement.children[1].firstElementChild.value}`;
            
        e.target.parentElement.children[1].innerHTML='';

        console.log("Actualizado com sucesso");
    }
    else{
        console.log("Falha ao actualizar");
    }
    
    //f_tarefa.value="";
    
    //fetchTasks();
}

const fetchTasks= async () => {
    const endpoint="db/p2_select_all.php";

    const response=await fetch(endpoint);
    const task=await response.text();

    //console.log(task);
    document.getElementById('tby').innerHTML= task;

    //Remove
    [...document.getElementsByClassName('remove')].forEach((el)=>{
        el.addEventListener("click",removeTasks);
    });

    //edit Status
    [...document.getElementsByClassName('select-form')].forEach((el)=>{
        el.addEventListener("change",updateTaskStatus);
    });

    //edit task
    [...document.getElementsByClassName('edit')].forEach((el)=>{
        el.addEventListener("click",editTask);
    });
    [...document.getElementsByClassName('input-edit')].forEach((el)=>{
        el.addEventListener("submit",inputeditTask);
    });
}

fetchTasks();

//addForm.addEventListener("submit",async(e)=>{
document.getElementById('btn_submit').addEventListener("click",async(e)=>{
    e.preventDefault();

    const endpoint="db/p3_insert.php";

    const option={dateStyle:'long',timeStyle:'short'};

    const dt=new Date().toLocaleDateString(option);
    const ht=new Date().toLocaleTimeString(option);
    
    const dados=`${f_tarefa.value},${dt} ${ht}`;

    const fr=new FormData();
    fr.set("f_tarefa",dados);

    const response=await fetch(addForm.getAttribute('action'),{
        method:addForm.getAttribute('method'),
        //headers:{'Content-Type':'application/json'},
        body:fr
    });
    const task=await response.text();

    console.log(task)
    f_tarefa.value="";

    fetchTasks();
    
});