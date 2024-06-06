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

    if(isset($_POST["id"])){

        $tarefa->setId($_POST["id"]);
        
        $num=deleteTarefa($tarefa,getConnect());

        if($num>0){
            $tarefa->setStatus(1);
            $tarefa->setMsg("Removido com sucesso");
        }
        
    }

    $projecto[]=$tarefa;

    echo json_encode($projecto);

?>