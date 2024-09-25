<?php 
    
    header("Access-Control-Allow-Origin: *");
    
    header("Content-Type: application/json");

    include_once "../../../helpers/connect.php";

    include_once "../../../services/tarefaPlus/tarefaServices.php";

    include_once "../../../models/tarefaPlus/tarefa.php";

    $projecto=array();
    $tarefa=new tarefa;
    $tarefa->setStatus(0);
    $tarefa->setMsg("Houve um erro interno");

    if(isset($_GET["id"]) && $_GET["id"]!=""){

        $tarefa->setId($_GET["id"]);
        
        $projecto=get_ID_Tarefa($tarefa,getConnect());

    }
    else if(isset($_GET["tarefa"]) && $_GET["tarefa"]!=""){
        $tarefa->setTarefa($_GET["tarefa"]);

        $projecto=get_tar_Tarefa($tarefa,getConnect());
    }
    else{
        $projecto=get_All_Tarefa($tarefa,getConnect());
    }

    if(count($projecto)==0){
        $projecto[]=$tarefa;
    }

    echo json_encode($projecto);

?>