product = (function (){
    var product = "";
    var data=[];
    var nombre="";
    let productos=[];
    var idSelect;
    var productoSelect;
    var division;
    var inventarioSelect;
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
                    <button class="add-to-cart-btn" onclick="product.obtenerInventarioDelProducto(${info.id}),product.buscarporid(${info.id})"><i class="fa fa-shopping-cart"></i> Añadir al Carrito </button></a>
                    </div>
                </div>
            </div>`
            $("#producto").append(div);         
        })    
    }
    function checkout(){
        var hola=obtener_localstorage();
        if (hola!==null){
            var total=0;
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
    function buscarporid(id){
        apiclient.getProductoById(id,agregarCarrito);
    }
    function buscarporidParaView(id){
        apiclient.getProductoById(id,productView);
    }
    const agregarCarrito=(producto)=>{
        obtenerInventarioDelProducto(producto.id);
        var viejo =JSON.parse(localStorage.getItem("carrito"))
        var puedo=verifique(inventarioSelect);
        apiclient.actualizarInventarioCarrito(inventarioSelect.id,inventarioSelect.cantidad-1);
        if(puedo===true){
            alert("Producto añadido al carrito");
            if (productos.length===0 && viejo===null){
                productos.push(producto);
                localStorage.setItem("carrito",JSON.stringify(productos));
            }else{
                viejo.push(producto);
                localStorage.setItem("carrito",JSON.stringify(viejo));
            }
        }else{
            alert("El producto "+ producto.nombre+" no esta disponible");
        }
       
    }
    function obtener_localstorage(){
        carrito=JSON.parse(localStorage.getItem("carrito"));
        return carrito;
    }
    function obtenerInventarioDelProducto(id){
        apiclient.getInventarioDelProducto(id,setInventario)
    }
    function setInventario(inventario){
        inventarioSelect=inventario
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
							<p onclick="product.obtenerInventarioDelProducto(${producto.id}),product.buscarporid(${producto.id})" class="primary-btn order-submit">Añadir al Carrito</a></p>
				</div>
            </div>
                
            </div>

            
        </div>
        <!-- /row -->`
            $("#detallesProducto").append(div);
        }

        function vaciarCarrito (){
            console.log("hola")
            localStorage.clear()
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
        obtenerInventarioDelProducto:obtenerInventarioDelProducto,
        setInventario:setInventario,
        verifique:verifique,
        vaciarCarrito:vaciarCarrito
        
    }

})();