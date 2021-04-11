var apiclient = (function(){
	getProductosTipos = function (tipo, callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/productos/"+tipo, function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontro productos de tipo  "+tipo)
		});	
	}
	getProductoById = function (id, callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/productosbyid/"+id, function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontro productos de tipo  "+tipo)
		});	
	}
	getCantidadProductos = function (callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/todoslosproductos/", function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontraron productos")
		});	
	}
	crearProducto=function(id,nombre,especificacion,precio,tipo,texto,imagenes){
		var json=JSON.stringify({
			"nombre" : nombre ,
			"especifacion" : especificacion ,
			"precio" : parseFloat(precio) ,
			"id" : id ,
			"tipo" : tipo ,
			"imagenes" : imagenes,
			"texto" : texto
		})
		var promise=$.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/productos/",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(){
			alert("Producto creado");
		},function(){
			console.info("ERROR");
		});
	}
	crearInventarioProducto=function(idProducto,nombreProducto,fechaUltimaModi,cantidad){
		var json=JSON.stringify({
			"id" : idProducto ,
			"nombreProducto" : nombreProducto ,
			"fechaUltimaModi" :fechaUltimaModi ,
			"cantidad" : cantidad ,
		})
		var promise=$.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/inventario/",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(){
			alert("Añadido al inventario el producto "+ nombreProducto);
		},function(){
			console.info("ERROR");
		});
	}
	getInventarios = function (callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/todoslosinventarios/", function() {
		  response=productos.responseText;
		  console.log(productos);
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontraron inventarios")
		});	
	}
	return{
		getProductosTipos:getProductosTipos,
		getProductoById:getProductoById,
		crearProducto:crearProducto,
		getCantidadProductos:getCantidadProductos,
		crearInventarioProducto:crearInventarioProducto,
		getInventarios:getInventarios,
	}
})();