product = (function (){
    var product = "";
    var data=[];
    var nombre="";
    let productos=[];
    var idSelect;
    var productoSelect;
    var division;
    var carritoSelect;
    var usuario;
    var total=0;

    const getAndShowProductName = () => {
        const values = window.location.search;
        const urlParams = new URLSearchParams(values);
        product = urlParams.get('name');
        $("#productName").html(product);
        getProductosTipo();
    }
    function viewProducto(){
        const values = window.location.search;
        const urlParams = new URLSearchParams(values);
        idSelect=urlParams.get('id');
        buscarporidParaView(idSelect);
    }
    function getProductosTipo(){
        apiclient.getProductosTipos(product,productosByTipo);
    }
    function productosByTipo(productos){
        if(productos===null){
            return new Error("No se encontro ningun producto");
        }
        data=productos.map((info)=>{
            var div=`<div class="row">
            <!-- product -->
            <div class="col-sm-4 col-xs-15">
                <div class="product">
                    <div class="product-img">
                        <img src="./public/img/${info.imagenes}.png">
                    </div>
                    <div class="product-body">
                    <h3><a href="productView.html?id=${info.id}"><i class="product-name" id="product-name">${info.nombre}</a></h3>
                        <h4 class="product-price" id="product-price">${info.precio}</h4>
                    </div>
                    <div class="add-to-cart">
                    <button class="add-to-cart-btn" onclick="product.obtenerCarritoDelUsuario('21324'),product.buscarporid(${info.id})"><i class="fa fa-shopping-cart"></i> Añadir al Carrito </button></a>
                    </div>
                </div>
            </div>`
            $("#producto").append(div);         
        })    
    }
    
    function buscarporid(id){
        apiclient.getProductoById(id,agregarCarrito);
    }
    function buscarporidParaView(id){
        apiclient.getProductoById(id,productView);
    }
    const agregarCarrito=(producto)=>{
        var productosViejos =carritoSelect.productos;
        productosViejos.push(producto);
        carritoSelect.productos=productosViejos;
        apiclient.actualizarCarrito('21324',carritoSelect.productos);
        alert("Añadido al carrito")
    }
    function obtener_localstorage(){
        carrito=JSON.parse(localStorage.getItem("carrito"));
        return carrito;
        
    }
    function obtenerCarritoDelUsuario(id){
        apiclient.getCarritoUsuario(id,setCarrito);

    }
    function setCarrito(carrito){
        carritoSelect=carrito; 
    }
    
    function verifique(inventario){
        if(inventario.cantidad>0){
            return true;
        }else{
            return false;
        }
    }

    function productView (producto){
        productoSelect=producto.nombre; 
        $("#product").html(productoSelect);               
        console.log(producto)
        var div=`<!-- row -->
        <div class="row">
            <!-- Product main img -->
            <div class="col-md-5 col-md-push-2">
                <div id="product-main-img">
                    <div class="product-preview">
                        <img src="./public/img/${producto.imagenes}.png" alt="">
                    </div>
                </div>
            </div>
            <!-- /Product main img -->

            <!-- Product thumb imgs -->
            <div class="col-md-2  col-md-pull-5">
                
            </div>
            <!-- /Product thumb imgs -->

            <!-- Product details -->
            <div class="col-md-5">
                <h2 class="product-name">${producto.nombre}</h2>
                <div>
                    <h3 class="product-price">${producto.precio}</h3>
                </div>
                <p>${producto.texto}</p>
    
                <div class="product-options">
                    <label>
                        <div class="order-summary">
                            <div class="order-products">
                                <div class="order-col">
                                    <div>Especificacion :</div>
                                    <div>${producto.especificacion}</div>
                                </div>
                                <div class="order-col">
                                <div>Tipo :</div>
                                    <div>${producto.tipo}</div>   
                                </div>
                            </div>
                        </div>
                    </label>
                <div class="add-to-cart">
							<p onclick="product.obtenerCarritoDelUsuario('21324'),product.buscarporid(${producto.id})" class="primary-btn order-submit">Añadir al Carrito</a></p>
				</div>
            </div>
            </div>
        </div>
        <!-- /row -->`
            $("#detallesProducto").append(div);
        }

        function vaciarCarrito (){
            console.log(carritoSelect);
            apiclient.actualizarCarrito('hola',[]);
        }

        function obtenerCarritoDelUsuarioCheckout(id){
            apiclient.getCarritoUsuario(id,checkout);
        }
        function checkout(carrito){
            var hola=carrito.productos;
            localStorage.setItem("carrito",carrito.productos);
            if (hola.lenght!==0){
                iterar=hola.map((info)=>{
                total=total+info.precio;
                division=`<div class="order-products">
                <div class="order-col">
                    <div>${info.nombre}</div>
                    <div>${info.precio}</div>
                </div>
                </div>` 
                $("#lista").append(division); 
            })
            divisiontotal=`<div><strong class="order-total">${total}</strong></div>`
                $("#total").append(divisiontotal); 
            }
            else{
                division=`<div class="order-products">
                <div class="order-col">
                    <div>Carro Vacio</div>
                </div>
                </div>` 
                $("#lista").append(division); 
            divisiontotal=`<div><strong class="order-total">0</strong></div>`
                $("#total").append(divisiontotal); 
            }
        }
    function getDatosUsuario(id){
        console.log(id);
        apiclient.getDatosUsuario('6074ac2378961c030fdadd10',setUsuario);

    } 
    function setUsuario(usuario){
        console.log(usuario);
        usuario=usuario;
    }

    const llenarFormularioOrdenDeCompra=() =>{
        console.log(total);
        console.log(carritoSelect);
        descripcion=$("#descripcion").val();
        direccion=$("#direccion").val();
        ciudad=$("#ciudad").val();

        if(descripcion===""||direccion===""||ciudad===""){
            alert("Completar campos requeridos");
        }else{
            apiclient.crearOrdendeCompra(total,carritoSelect.productos,descripcion,direccion,ciudad);
        }
    }

    return{
        getAndShowProductName: getAndShowProductName,
        getProductosTipo:getProductosTipo,
        productosByTipo:productosByTipo,
        buscarporid:buscarporid,
        agregarCarrito:agregarCarrito,
        obtener_localstorage:obtener_localstorage,
        buscarporidParaView:buscarporidParaView,
        productView:productView,
        viewProducto:viewProducto,
        checkout:checkout,
        obtenerCarritoDelUsuario:obtenerCarritoDelUsuario,
        setCarrito:setCarrito,
        verifique:verifique,
        vaciarCarrito:vaciarCarrito,
        obtenerCarritoDelUsuarioCheckout:obtenerCarritoDelUsuarioCheckout,
        getDatosUsuario:getDatosUsuario,
        setUsuario:setUsuario,
        llenarFormularioOrdenDeCompra:llenarFormularioOrdenDeCompra,
        
    }

})();