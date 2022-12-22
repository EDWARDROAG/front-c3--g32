
listaResultados = [];
nuevo = false;

function leer() {
  $("#resultado").empty();
  $.ajax({
    url: urlCategory + "/all",
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
    "<tr><th>Id</th><th>Descripcion</th><th>Nombre</th></tr>";
  for (i = 0; i < items.length; i++) {
    mytable += "<tr>";
    mytable += "<td>" + items[i].id + "</td>";
    mytable += "<td>" + items[i].description + "</td>";
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
  let newCategory = {
    id: $("#idCategory").val(),
    description: { id: $("#description_id option:selected").val() },
    name: { id: $("#name_id option:selected").val() },
    
  
  };

  console.log(newCategory);
  let dataTosend = JSON.stringify(newCategory);

  urlOperation = urlCategory;
  typeOperation = "";
  if (nuevo) {
    typeOperation = "POST";
    urlOperation += "/save";
  } else {
    typeOperation = "PUT";
    urlOperation+='/'+ newCategory.id
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
        alert("se ha guardado una nueva categoria");
      } else {
        alert("se ha actualizado los datos de la categoria ");
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
    $("#idCategory").val(itemEncontrado.id);
    $("#description").val(itemEncontrado.description);
    $("#name_id").val(itemEncontrado.name.id);
    
    
  }
}

function borrar(idCategory) {
  $.ajax({
    url: urlCategory + "/" + idCategory,
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
  $("#id_Category").val("0");
  $("#description").val("");
  $("#name_id").val("");
  

}
function agregar() {
  mostrarLista(false);
  nuevo = true;
  $("#titulo").text("Nueva categoria");
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
