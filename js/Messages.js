listaResultados = [];
nuevo = false;

function leer() {
  $.ajax({
    url: urlMessage + "/all",
    type: "GET",
    datatype: "json",
    success: function (respuesta) {
      listaResultados = respuesta;
      $("#resultado").empty();
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
    "<tr><th>Id</th><th>Cliente</th><th>Computador</th><th>Mensaje</th></tr>";
  for (i = 0; i < items.length; i++) {
    mytable += "<tr>";
    mytable += "<td>" + items[i].id + "</td>";
    mytable += "<td>" + items[i].client.name + "</td>";
    mytable += "<td>" + items[i].computer.name + "</td>";
    mytable += "<td>" + items[i].message_text + "</td>";

    mytable +=
      "<td> <button onclick='editar(" + items[i].id + ")'>Editar</button> ";
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
  let myData = {
    id: $("#id").val(),
    client: { id: $("#client_id option:selected").val() },
    computer: { id: $("#computer_id option:selected").val() },
    message_text: $("#message").val(),
  };

  console.log(myData);
  let dataTosend = JSON.stringify(myData);

  urlOperation = urlMessage;
  typeOperation = "";
  if (nuevo) {
    typeOperation = "POST";
    urlOperation += "/save";
  } else {
    typeOperation = "PUT";
    urlOperation += "/" + myData.id;
  }

  $.ajax({
    url: urlOperation,
    type: typeOperation,
    data: dataTosend,
    datatype: "JSON",
    contentType: "application/json",
    success: function (respuesta) {
      if (nuevo) {
        alert("se ha guardado el nuevo Mensaje");
      } else {
        alert("se ha actualizado los datos del Mensaje ");
      }
      limpiarFormulario();
      leer();
    },
  });
}

function editar(id) {
  mostrarLista(false);
  nuevo = false;
  $("#titulo").text("Editar Mensaje");
  var itemEncontrado = null;
  for (const item of listaResultados) {
    if (item.id === id) {
      itemEncontrado = item;
      break;
    }
  }

  if (itemEncontrado !== null) {
    $("#id").val(itemEncontrado.id);
    $("#client_id").val(itemEncontrado.client.id);
    $("#computer_id").val(itemEncontrado.computer.id);
    $("#message").val(itemEncontrado.message_text);
  }
}

function borrar(id) {
  $.ajax({
    url: urlMessage + "/" + id,
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

function limpiarFormulario() {
  $("#id").val("0");
  $("#client_id").val("");
  $("#computer_id").val("");
  $("#message").val("");
}

function crear() {
  mostrarLista(false);
  nuevo = true;
  $("#titulo").text("Nuevo Mensaje");
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
