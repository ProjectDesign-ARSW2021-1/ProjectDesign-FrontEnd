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
	getDatosUsuario = function(id,callback){
		var datosUsuario = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/usuariobyid/"+id, function(){
			response=datosUsuario.responseText;	
		}).done(function(){
			callback(JSON.parse(datosUsuario.responseText))})
		.fail(()=>{
			alert("No se encontro la orden de compra")
		});	
		
	}
	getUsuarioToken = function (user,callback) {
		console.log(user);
		var userToken=$.getJSON("http://localhost:8080/perfil/token/"+ user , function(){
			response=userToken.responseText;
				
		}).done(function(){
			callback(JSON.parse(userToken.responseText))})
		.fail(()=>{
			alert("No se encontro usuario con este token")
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
	crearUsuario=function(cargo,nombreUsuario,telefono,correo,direccion,contraseña){
		var json=JSON.stringify({

			"cargo" : cargo,
			"nombre" : nombreUsuario ,
			"telefono" : parseInt(telefono) ,
			"correo" : correo ,
			"direccion" : direccion ,
			"contrasena" : contraseña
		})
		var promise=$.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/usuario/",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(){
			alert("Usuario creado");
		},function(){
			console.info("ERROR");
		});
	}

	iniciarSesion=function(username,password){
		var json=JSON.stringify({
			"correo" : username ,
			"contrasena" : password ,
			 
		})
		var promise=$.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/auth/login",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(data){
			alert("Inicio de sesion correcto");
			localStorage.setItem("usuario",data)
			localStorage.setItem("correo",username)
		},function(){
			console.info("ERROR");
			console.log(username);
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
	/**
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
	*/
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
	crearCarrito=function(id,nombre,listaProductos,cantidad,subtotal,correo)
	{
		var json=JSON.stringify({
			"id" : id ,
			"nombreProducto" : nombre ,
			"productos" :listaProductos ,
			"correo": correo,
			"cantidad" : cantidad ,
			"subTotal" : subtotal ,
		})
		var promise=$.ajax({
			url: "http://localhost:8080/carritodecompras/",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(){
			console.info("ok");
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
	crearOrdendeCompra=function(total,productos,descripcion,direccion,ciudad){
		var json=JSON.stringify({
			"id" : 123 ,
			"descripcion" : descripcion ,
			"total" : total ,
			"direccion" : direccion ,
			"ciudad" : ciudad,
			"productos" : productos,
			"nombreUsuario" : "Santiago el amor de mi vida",
			"telefonoUsuario" : 21435343
		})
		var promise=$.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/ordenDeCompra/",
			method: "POST",
			data: json,
			contentType:"application/json"
		});
		promise.then(function(){
			alert("Orden de compra creada");
		},function(){
			console.info("ERROR");
		});
	}

	/**
	 
	   
	getInventarioDelProducto = function (id,callback){
		var productos = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/inventario/"+id, function() {
		  response=productos.responseText;
		}).done(function(){
			callback(JSON.parse(productos.responseText))})
		.fail(()=>{
			alert("No se encontro el inventario del producto con id : "+id)
		});	
	}*/
	getCarritoUsuario=function(id,callback){
		var carrito = $.getJSON("https://proyectoarsw2021backend.herokuapp.com/carrito/"+id, function() {
		  response=carrito.responseText;
		}).done(function(){
			callback(JSON.parse(carrito.responseText))})
		.fail(()=>{
			alert("Carrito : "+id)
		});	
	},
	actualizarCarrito=function (id,carrito) {
		var promise = $.ajax({
			url: "https://proyectoarsw2021backend.herokuapp.com/actualizarcarrito/"+'21324',
			type: 'PUT',
			data: JSON.stringify(carrito),
			contentType: "application/json"
		});
		promise.then(function () {
			console.info("OK");
		}, function () {
			console.info("ERROR");
		});
	}
	return{
		getUsuarioToken:getUsuarioToken,
		crearCarrito:crearCarrito,
		getProductosTipos:getProductosTipos,
		getProductoById:getProductoById,
		crearProducto:crearProducto,
		getCantidadProductos:getCantidadProductos,
		crearInventarioProducto:crearInventarioProducto,
		getInventarios:getInventarios,
		getInventario:getInventario,
		actualizarInventario:actualizarInventario,
		crearUsuario:crearUsuario,
		iniciarSesion:iniciarSesion,
		//getInventarioDelProducto:getInventarioDelProducto,
		//actualizarInventarioCarrito:actualizarInventarioCarrito,
		getCarritoUsuario:getCarritoUsuario,
		actualizarCarrito:actualizarCarrito,
		getDatosUsuario:getDatosUsuario,
		crearOrdendeCompra:crearOrdendeCompra,
	}
})();