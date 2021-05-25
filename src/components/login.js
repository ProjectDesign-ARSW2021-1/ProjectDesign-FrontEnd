login = (function (){
    var username;
    var password;
    var nombreUsuario;
    var telefono;
    var correo;
    var direccion;
    var contraseña;
    var cargo;
    var correoToken;
    var nombreToken;
    var telefonoToken;

    const llenarFormularioUsuario=()=>{
        cargo=$("#cargoUsuario").val();
        nombreUsuario=$("#nombreUsuario").val();
        telefono=$("#telefono").val();
        correo=$("#correoUsuario").val();
        direccion=$("#direccionUsuario").val();
        contraseña=$("#contraseña").val();
        if(cargo===""||nombreUsuario===""||telefono===""||correo===""||direccion===""||contraseña===""){
            alert("Completar campos requeridos");
        }else{
            apiclient.crearUsuario(cargo,nombreUsuario,telefono,correo,direccion,contraseña);
            apiclient.crearCarrito(null,nombreUsuario,[],0,0,correo)
        }
    }

    const hacerpost=()=>{
         username=$("#email").val();
         password=$("#password").val();
         console.log(username);
         console.log(password);
         if(username===""||password===""){
            alert("Completar campos requeridos");
        }else{
            apiclient.iniciarSesion(username,password);
            /*window.location.href="/carrito.html"*/
            console.log(username);
        }  

    }

    
    return{
        hacerpost:hacerpost,
        llenarFormularioUsuario:llenarFormularioUsuario,
    }
})();