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
	getInventario = function (id, callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/inventario/"+id, function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontro inventario para ese producto "+id)
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
			"especificacion" : especificacion ,
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
	actualizarInventario= function (id,cantidad) {
		console.log(id,cantidad);
		var promise = $.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/actualizarcantidad/"+id,
			type: 'PUT',
			data: cantidad,
			contentType: "application/json"
		});
		promise.then(function () {
			console.info("OK");
			alert("Cantidad Actualizada");
		}, function () {
			console.info("ERROR");


		});
	},
	actualizarInventarioCarrito= function (id,cantidad) {
		console.log(typeof(id),typeof(cantidad));
		var promise = $.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/actualizarcantidadcarrito/"+id,
			type: 'PUT',
			contentType: "application/json"
		});
		promise.then(function () {
			console.info("OK");
		}, function () {
			console.info("ERROR");


		});
	},
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
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontraron inventarios")
		});	
	}
	getInventarioDelProducto = function (id,callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/inventario/"+id, function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontro el inventario del producto con id : "+id)
		});	
	}
	return{
		getProductosTipos:getProductosTipos,
		getProductoById:getProductoById,
		crearProducto:crearProducto,
		getCantidadProductos:getCantidadProductos,
		crearInventarioProducto:crearInventarioProducto,
		getInventarios:getInventarios,
		getInventario:getInventario,
		actualizarInventario:actualizarInventario,
		getInventarioDelProducto:getInventarioDelProducto,
		actualizarInventarioCarrito:actualizarInventarioCarrito
	}
})();