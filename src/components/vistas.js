
if (window.localStorage.usuario==undefined){
    alert("Debe iniciar Sesion");
	window.location.href="miCuenta.html";
    
}else if(window.localStorage.getItem("correo")!=="oadavilaf18@gmail.com")
{
    {
        alert("Solo vista para admin");
        window.location.href="index.html";
        
    }
}