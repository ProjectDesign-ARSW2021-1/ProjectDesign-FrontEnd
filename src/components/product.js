product = (function (){
    var product = "";
    var data=[];
    var nombre="";
    let productos=[];
    var iterar;
    var division;
    const getAndShowProductName = () => {
        const values = window.location.search;
        const urlParams = new URLSearchParams(values);
        product = urlParams.get('name');
        $("#productName").html(product);
        getProductosTipo();
        checkout();
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
                        <img src="./public/img/${info.nombre}.png">
                    </div>
                    <div class="product-body">
                        <h3><a href="productView.html" class="product-name" id="product-name">${info.nombre}</h3></a>
                        <h4 class="product-price" id="product-price">${info.precio}</h4>
                    </div>
                    <div class="add-to-cart">
                    <button class="add-to-cart-btn" onclick="product.buscarporid(${info.id})"><i class="fa fa-shopping-cart"></i> Añadir al Carrito </button>
                    </div>
                </div>
            </div>`
            $("#producto").append(div);         
        })    
    }
    function checkout(){
        var hola=obtener_localstorage();
        iterar=hola.map((info)=>{
            division=`<div class="order-products" id="lista">
            <div class="order-col">
                <div>hola</div>
                <div>hola</div>
            </div>
        </div>` 
        })
    }

    function dirigirView(hola){
        
    }
    function buscarporid(id){
        apiclient.getProductoById(id,agregarCarrito);
    }
    function buscarporidParaView(id){
        console.log(id);
        apiclient.getProductoById(id,productView);
        console.log(apiclient.getProductoById(id));
    }
    const agregarCarrito=(producto)=>{
        var viejo =JSON.parse(localStorage.getItem("carrito"))
        if (productos.length===0 && viejo===null){
            productos.push(producto);
            localStorage.setItem("carrito",JSON.stringify(productos));
        }else{
            viejo.push(producto);
            localStorage.setItem("carrito",JSON.stringify(viejo));
        }
    }
    
    function obtener_localstorage(){
        carrito=JSON.parse(localStorage.getItem("carrito"));
        return carrito;
    }
    function productView (producto){
        console.log("hola");
        var div=`<div class="product-details">
            <h2 class="product-name">${producto.nombre}</h2>
            <div>
                <h3 class="product-price">${producto.precio}</h3>
            </div>
            <p>TEXTO</p>

            <div class="product-options">
                <label>
                    <div class="order-summary">
                        <div class="order-products">
                            <div class="order-col">
                                <div>Especificación</div>
                                <div>----</div>
                            </div>
                            <div class="order-col">
                                <div>Tipo</div>
                                <div>----</div>
                            </div>
                        </div>
                        
                    </div>
                </label>
                
            </div>

            <div class="add-to-cart">
                
                <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
            </div>

            

        </div>`

            $("#detallesProducto").append(div);
        }

    return{
        getAndShowProductName: getAndShowProductName,
        getProductosTipo:getProductosTipo,
        productosByTipo:productosByTipo,
        buscarporid:buscarporid,
        agregarCarrito:agregarCarrito,
        obtener_localstorage:obtener_localstorage,
        buscarporidParaView:buscarporidParaView,
        dirigirView:dirigirView,
        checkout:checkout
        
    }

})();