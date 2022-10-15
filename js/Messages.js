function traerMensajes(){
    urlbase = "https://g391ce0240bc4d7-s3tk5yro4bhk3nc4.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message";

    $.ajax({
      url:urlbase,
      type:"GET",
      datatype:"json",
      success:function(respuesta){
        console.log(respuesta);
        listaMensajes(respuesta.items)
        },
      error: function (xhr, status) {
        alert("hay un error");
      },
      });
    }
    function listaMensajes(items){

    let mytable ="<table>";
    for(i=0;i<items.length;i++){
      mytable +="<tr>";
      mytable += "<td>" +items[i].id+ "</td>";
      mytable += "<td>" +items[i].messagetext+ "</td>";
      mytable += "<td> <button onclick='borrarMensaje("+ items[i].id+")'>BORRAR</button>";
      mytable += "</tr>"
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

    }

    function guardarMensaje(){
      let myData={
      id:$("#idMensaje").val(),
      messagetext:$("#messagetext").val(),
      };

      console.log(myData);
      let dataTosend=JSON.stringify(myData);
      $.ajax({
        url:urlbase,
        type:"POST",
        data:dataTosend,
        datatype:"JSON",
        contentType: 'application/json',
        success:function(respuesta){
          $("#resultado").empty();
          $("#idMensaje").val("");
          $("#Messagetext").val("");
          traerMensajes();
          alert("se ha guardado el dato ")
        }
      });
    }

    function editarMensaje(){
      let myData={
        id:$("#idMensaje").val(),
        messagetext:$("#messagetext").val(),
        };
        console.log(myData);
        let dataTosend=JSON.stringify(myData);
        $.ajax({
          url:urlbase,
          type:"PUT",
          data:dataTosend,
          datatype:"JSON",
          contentType: 'application/json',
          success:function(respuesta){
            $("#resultado").empty();
            $("#idMensaje").val("");
            $("#messagetext").val("");
            traerMensajes();
            alert("se ha actualizado   ")
          }
        });

    }

    function borrarMensaje(idMensaje){
    let myData={
    id:idMensaje
    };

    let dataTosend=JSON.stringify(myData);
    $.ajax({
      url:urlbase,
        type:"DELETE",
        data:dataTosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
          $("#resultado").empty();
          traerMensajes();
          alert("se ha eliminado.")
        }
    });
  }
