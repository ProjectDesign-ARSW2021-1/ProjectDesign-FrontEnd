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

	return{
		getProductosTipos:getProductosTipos,
		getProductoById:getProductoById

	}
})();