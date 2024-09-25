
<?php 

class tarefa{
    var $id;
    var $tarefa;
    var $data;
    var $estado;
    var $hora;
    var $status;
    var $msg;
    
    function tarefa(){}

    //GET
    function getId(){
        return $this->id;
    }
    function getTarefa(){
        return $this->tarefa;
    }
    function getEstado(){
        return $this->estado;
    }
    function getData(){
        return date('d').'-'.date('m').'-'.date('Y');
    }
    function getHora(){
        return date('H').':'.date('i').':'.date('s');
    }
    function getStatus(){
        return $this->status;
    }
    function getMsg(){
        return $this->msg;
    }
    
    //SET
    function setId($id){
        $this->id=$id;
    }
    function setTarefa($tarefa){
        $this->tarefa=$tarefa;
    }
    function setEstado($estado){
        $this->estado=$estado;
    }
    function setStatus($status){
        $this->status=$status;
    }
    function setMsg($msg){
        $this->msg=$msg;
    }
    function setData($data){
        $this->data=$data;
    }
    function setHora($hora){
        $this->hora=$hora;
    }
}

?>