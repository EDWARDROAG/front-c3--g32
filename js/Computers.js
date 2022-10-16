
listaResultados = [];
nuevo = false;

function leer() {
  $("#resultado").empty();
  $.ajax({
    url: urlComputer + "/all",
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
    "<tr><th>Id</th><th>Marca</th><th>Modelo</th><th>Categoria</th><th>Nombre</th></tr>";
  for (i = 0; i < items.length; i++) {
    mytable += "<tr>";
    mytable += "<td>" + items[i].id + "</td>";
    mytable += "<td>" + items[i].brand + "</td>";
    mytable += "<td>" + items[i].model + "</td>";
    mytable += "<td>" + items[i].category.name + "</td>";
    mytable += "<td>" + items[i].name + "</td>";

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
  let newComputer = {
    id: $("#idComputer").val(),
    brand: $("#brand").val(),
    model: $("#model").val(),
    category: { id: $("#category_id option:selected").val() },
    name: $("#name").val(),
  };

  console.log(newComputer);
  let dataTosend = JSON.stringify(newComputer);

  urlOperation = urlComputer;
  typeOperation = "";
  if (nuevo) {
    typeOperation = "POST";
    urlOperation += "/save";
  } else {
    typeOperation = "PUT";
    urlOperation+='/'+ newComputer.id
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
        alert("se ha guardado el nuevo computador");
      } else {
        alert("se ha actualizado los datos del computador ");
      }
    },
  });
}

function editar(id) {
  mostrarLista(false);
  nuevo = false;
  $("#titulo").text("Editar Computador");
  var itemEncontrado = null;
  for (const item of listaResultados) {
    if (item.id === id) {
      itemEncontrado = item;
      break;
    }
  }

  if (itemEncontrado !== null) {
    $("#idComputer").val(itemEncontrado.id);
    $("#brand").val(itemEncontrado.brand);
    $("#model").val(itemEncontrado.model);
    $("#category_id").val(itemEncontrado.category.id);
    $("#name").val(itemEncontrado.name);
  }
}

function borrar(idComputer) {
  $.ajax({
    url: urlComputer + "/" + idComputer,
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
  $("#idComputer").val("0");
  $("#brand").val("");
  $("#model").val("");
  $("#category_id").val("");
  $("#name").val("");
}
function agregar() {
  mostrarLista(false);
  nuevo = true;
  $("#titulo").text("Nuevo Computador");
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
