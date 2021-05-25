scock= (function(){
    
    function connectToStom(callback){
        console.info('Connecting to WS...');
        var socket = new SockJS('https://proyectoarsw2021backend.herokuapp.com/stompendpoint');
        stompClient = Stomp.over(socket);
    
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('https://proyectoarsw2021backend.herokuapp.com/topic/getInventarios.', function (message) {
               var theObject=JSON.parse(message.body);
               callback(theObject);
    
            });
        });
        

    }
    function startStom(){
        connectToStom(pintarInventario);
    }
    function pintarInventario(info){
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
    }
    function enviarInventario(inventario){
        stompClient.send("https://proyectoarsw2021backend.herokuapp.com/topic/getInventarios.", {}, JSON.stringify(inventario)); 
    }
    return{
        enviarInventario:enviarInventario,
        startStom:startStom,
    }
})();