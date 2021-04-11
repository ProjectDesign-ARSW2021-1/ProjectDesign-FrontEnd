administrador=(function(){
    var id="Pro_";
    var nombre=null;
    var especificacion;
    var precio;
    var tipo;
    var texto;
    var imagenes;
    var listaproductos;
    var listaInventario=[];
    var fechaUltimaModi;
    var cantidad;
    function setProximoId(productos){
        id=id+(productos.length+1);
        listaproductos=productos;
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
    function pintarTabla(inventarios){
        console.log(inventarios);
        listaInventario=inventarios.map((info)=>{
            console.log(info);
            var div=`<tr id="espacio">
            <td>${info.nombreProducto}</td>
            <td>${info.id}</td>
            <td>${info.fechaUltimaModi}</td>
            <td>${info.cantidad}</td>
          </tr>`
            $("#espacio").append(div);         
        })  
        
    }
    function cargarInventario(){
        apiclient.getInventarios(pintarTabla);
    }
   
    return{
        llenarFormulario:llenarFormulario,
        init:init,
        setProximoId:setProximoId,
        cargarInventario:cargarInventario,

    }
})();