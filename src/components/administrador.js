administrador=(function(){
    var id="Pro_";
    var nombre=null;
    var especificacion;
    var precio;
    var tipo;
    var texto;
    var imagenes;
    var producto;
    var fechaUltimaModi;
    var cantidad;
    function setProximoId(productos){
        id=id+(productos.length+1);
        producto=productos;
    }
    const llenarFormulario=() =>{
        nombre=$("#nombreProducto").val();
        especificacion=$("#especificacionProducto").val();
        precio=$("#precioProducto").val();
        texto=$("#textoProducto").val();
        tipo=document.getElementById("tipoProducto").value;
        fechaUltimaModi=$("#fechaProducto").val();
        cantidad=$("#cantidadProducto").val();
        imagenes=nombre.replace(/ /g,"");
        if(nombre===""||especificacion===""||precio===""||texto===""||tipo==="Selecciona un tipo"){
            alert("Completar campos resqueridos");
        }else{
            apiclient.crearProducto(id,nombre,especificacion,precio,tipo,texto,imagenes);
            apiclient.crearInventarioProducto(id,nombre,fechaUltimaModi,cantidad);
        }
        
    }
    const init=()=>{
        apiclient.getCantidadProductos(setProximoId);    
    }
    return{
        llenarFormulario:llenarFormulario,
        init:init,
        setProximoId:setProximoId

    }
})();