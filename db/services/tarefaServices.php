<?php 

function addTarefa($tarefa,$conn){
    
    $num=0;

    try{
        $nome=$tarefa->getTarefa();
        $estado=$tarefa->getEstado();
        $data=$tarefa->getData();
        $hora=$tarefa->getHora();
        
        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="INSERT INTO $tb_db (`tarefa`,`estado`,`data`,`hora`) 
            VALUES ('$nome','$estado','$data','$hora')";
                    
            mysqli_query($conn,$sql);

            $num=$conn->insert_id;
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $num;
}

// EDIT
function editTarefa($tarefa,$conn){
    
    $num=0;

    try{
        $nome=$tarefa->getTarefa();
        $estado=$tarefa->getEstado();
        $id=$tarefa->getId();
        
        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="UPDATE $tb_db SET `tarefa`='$nome',
            `estado`='$estado' WHERE `id`='$id'";
                    
            mysqli_query($conn,$sql);

            $num=mysqli_affected_rows($conn);
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $num;
}

//DELETE
function deleteTarefa($tarefa,$conn){
    
    $num=0;

    try{
        $id=$tarefa->getId();
        
        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="DELETE FROM $tb_db WHERE `id`='$id'";
                    
            mysqli_query($conn,$sql);

            $num=mysqli_affected_rows($conn);
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $num;
}

//GET 
function get_All_Tarefa($tarefa,$conn){
    
    $projecto=array();

    try{

        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="SELECT * FROM $tb_db ORDER BY id DESC";
                    
            $res=mysqli_query($conn,$sql);

            while($reg=mysqli_fetch_row($res)){
                
                $tar=new stdClass;
                $tar->id=$reg[0];
                $tar->tarefa=$reg[1];
                $tar->estado=$reg[2];
                $tar->data=$reg[3];
                $tar->hora=$reg[4];
        
                $projecto[]=$tar;
            }
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $projecto;
}
function get_ID_Tarefa($tarefa,$conn){
    
    $projecto=array();

    try{
        $id=$tarefa->getId();

        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="SELECT * FROM $tb_db WHERE id='$id' ORDER BY id DESC";
                    
            $res=mysqli_query($conn,$sql);

            while($reg=mysqli_fetch_row($res)){
                
                $tar=new stdClass;
                $tar->id=$reg[0];
                $tar->tarefa=$reg[1];
                $tar->estado=$reg[2];
                $tar->data=$reg[3];
                $tar->hora=$reg[4];
        
                $projecto[]=$tar;
            }
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $projecto;
}
function get_tar_Tarefa($tarefa,$conn){
    
    $projecto=array();

    try{
        $tarefa=$tarefa->getTarefa();

        $tb_db="list_tarefa_plus";
                
        if($conn){

            $sql="SELECT * FROM $tb_db WHERE tarefa LIKE '%$tarefa%%' ORDER BY id DESC";
                    
            $res=mysqli_query($conn,$sql);

            while($reg=mysqli_fetch_row($res)){
                
                $tar=new stdClass;
                $tar->id=$reg[0];
                $tar->tarefa=$reg[1];
                $tar->estado=$reg[2];
                $tar->data=$reg[3];
                $tar->hora=$reg[4];
        
                $projecto[]=$tar;
            }
            
        }
    }
    catch(Exception $ex){
        $error=$ex->getMessage();
        $tarefa->setStatus(-2);
        $tarefa->setMsg("Error: "+$error);
    }

    return $projecto;
}

?>