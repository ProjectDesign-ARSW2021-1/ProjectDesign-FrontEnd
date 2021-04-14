administrador=(function(){
    var id=0;
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
    var idSelect;
    function setProximoId(productos){
        console.log(productos.length);
        id=productos.length+1;
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
            alert("Completar campos requeridos");
        }else{
            apiclient.crearProducto(id,nombre,especificacion,precio,tipo,texto,imagenes);
            apiclient.crearInventarioProducto(id,nombre,fechaUltimaModi,cantidad);
            
        }
    }
    const actualizarInventario=() =>{
        var cantidadInventario=$("#cantidadInventario").val();
        apiclient.actualizarInventario(idSelect,cantidadInventario);
    }
    const init=()=>{
        apiclient.getCantidadProductos(setProximoId);    
    }
    function pintarTabla(inventarios){
        listaInventario=inventarios.map((info)=>{
            console.log(info);
            var div=`<tr id="espacio" <a href=""></a>>
            <td>${info.nombreProducto}</td>
            <td>${info.id}</td>
            <td>${info.fechaUltimaModi}</td>
            <td>${info.cantidad}</td>
            <td><div class="add-to-cart">
            <a href="EditarproductView.html?id=${info.id}" class="primary-btn order-submit">Modificar</a>
            </div>
            </td>
            
          </tr>`
            $("#espacio").append(div);         
        })  
    }
    function editarInventario(){
        const values = window.location.search;
        const urlParams = new URLSearchParams(values);
        idSelect = urlParams.get('id');
        apiclient.getInventario(idSelect,getInventario);
    }
    function cargarInventario(){
        apiclient.getInventarios(pintarTabla);
    }
    function getInventario(inventario){
        var div=`<div class="row">
					

					<!-- Product thumb imgs -->
					<div class="col-md-2  col-md-pull-5">
						
					</div>
					<!-- /Product thumb imgs -->
		
					<!-- Product details -->
					<div class="col-md-5">
						<h2 class="product-name">${inventario.nombreProducto}</h2>
						<div>
							<h3 class="product-price">${inventario.id}</h3>
						</div>
						
			
						<div class="product-options">
							<label>
								<div class="order-summary">
									<div class="order-products">
										<div class="order-col">
										<div>Fecha de modificación :</div>
											<div>${inventario.fechaEntrada}</div>	
										</div>
										<div>Cantidad:</div>
											<div><input type="number" id=cantidadInventario></div>	
										</div>	
									</div>
									
								</div>
								<div class="add-to-cart">
									<a onclick="administrador.actualizarInventario()" class="primary-btn order-submit">Actualizar</a>
								</div>
							</label>	
						</div>
			
					</div>
						
					</div>
		
					
				</div>`
                $("#editarInventario").append(div);
       
    }
   
    return{
        llenarFormulario:llenarFormulario,
        init:init,
        setProximoId:setProximoId,
        cargarInventario:cargarInventario,
        editarInventario:editarInventario,
        getInventario:getInventario,
        actualizarInventario:actualizarInventario,

    }
})();