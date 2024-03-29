
listaResultados = [];
nuevo = false;

function leer() {
  $("#resultado").empty();
  $.ajax({
    url: urlReservation + "/all",
    type: "GET",
    datatype: "json",
    success: function (respuesta) {
      listaResultados = respuesta;
      listar(listaResultados);
      mostrarLista(true);
    },
    error: function (xhr, status) {
      alert("hay un error");
    },
  });
}


function listar(items) {
  let mytable = "<table class='resultadoList'>";
  mytable +=
    "<tr><th>Id</th><th>Status</th><th>Cliente</th><th>Computador</th></tr>";
  for (i = 0; i < items.length; i++) {
    mytable += "<tr>";
    mytable += "<td>" + items[i].id + "</td>";
    mytable += "<td>" + items[i].status + "</td>";
    mytable += "<td>" + items[i].client.name + "</td>";
    mytable += "<td>" + items[i].computer.name + "</td>";

    mytable +=
      "<td> <button onclick='editar(" +
      items[i].id +
      ")'>Editar</button> ";
    mytable +=
      "     <button onclick='borrar(" +
      items[i].id +
      ")'>Borrar</button>   </td>";
    mytable += "</tr>";
  }
  mytable += "</table>";
  $("#resultado").append(mytable);
}

function guardar() {
  let newReservation = {
    id: $("#idCategory").val(),
    client: { id: $("#client_id option:selected").val() },
    computer: { id: $("#computer_id option:selected").val() },
    status: $("#status").val(),

  
  };

  console.log(newReservation);
  let dataTosend = JSON.stringify(newReservation);

  urlOperation = urlReservation;
  typeOperation = "";
  if (nuevo) {
    typeOperation = "POST";
    urlOperation += "/save";
  } else {
    typeOperation = "PUT";
    urlOperation+='/'+ newReservation.id
  }

  $.ajax({
    url: urlOperation,
    type: typeOperation,
    data: dataTosend,
    datatype: "JSON",
    contentType: "application/json",
    success: function (respuesta) {
      
      limpiarFormulario();
      leer();
      if (nuevo) {
        alert("se ha guardado una nueva reservar");
      } else {
        alert("se ha actualizado los datos de la reserva ");
      }
    },
  });
}

function editar(id) {
  mostrarLista(false);
  nuevo = false;
  $("#titulo").text("Editar Reserva");
  var itemEncontrado = null;
  for (const item of listaResultados) {
    if (item.id === id) {
      itemEncontrado = item;
      break;
    }
  }

  if (itemEncontrado !== null) {
    $("#idReservation").val(itemEncontrado.id);
    $("#status").val(itemEncontrado.status);
    $("#client_id").val(itemEncontrado.client.id);
    $("#computer_id").val(itemEncontrado.computer.id);
    
  }
}

function borrar(idreservation) {
  $.ajax({
    url: urlReservation + "/" + idreservation,
    type: "DELETE",
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      leer();
      alert("se ha eliminado.");
    },
  });
}

function limpiarFormulario(){
  $("#id_Reservation").val("0");
  $("#status").val("");
  $("#client_id").val("");
  $("#computer_id").val("");

}
function agregar() {
  mostrarLista(false);
  nuevo = true;
  $("#titulo").text("Nueva Reserva");
  limpiarFormulario();
 
}
function mostrarLista(mostrar) {
  if (mostrar) {
    $("#resultado").show();
    $("#btnNuevo").show();
    $("#formulario").hide();
  } else {
    $("#resultado").hide();
    $("#formulario").show();
    $("#btnNuevo").hide();
  }
}
