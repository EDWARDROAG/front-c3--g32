
listaResultados = [];
nuevo=false;


function leerClientes() {
  $.ajax({
    url: urlClient + "/all",
    type: "GET",
    datatype: "json",
    success: function (respuesta) {
      listaResultados = respuesta;
      listaClientes(listaResultados);
      mostrarLista(true);
    },
    error: function (xhr, status) {
      alert("hay un error");
    },
  });
}
function listaClientes(items) {
  let mytable = "<table class='resultadoList'>";
  mytable +=
    "<tr><th>Id</th><th>Nombre</th><th>Email</th><th>Edad</th><th></th></tr>";
  for (i = 0; i < items.length; i++) {
    mytable += "<tr>";
    mytable += "<td>" + items[i].id + "</td>";
    mytable += "<td>" + items[i].name + "</td>";
    mytable += "<td>" + items[i].email + "</td>";
    mytable += "<td>" + items[i].age + "</td>";
    mytable +=
      "<td> <button onclick='editarClientes(" +
      items[i].id +
      ")'>Editar</button> ";
    mytable +=
      "     <button onclick='borrarCliente(" +
      items[i].id +
      ")'>Borrar</button>   </td>";
    mytable += "</tr>";
  }
  mytable += "</table>";
  $("#resultado").append(mytable);
}

function guardarClientes() {
  let myData = {
    id: $("#idCliente").val(),
    name: $("#nombreCliente").val(),
    email: $("#mailCliente").val(),
    age: $("#edadCliente").val(),
    password: $("#password").val()
    
  };

  console.log(myData);
  let dataTosend = JSON.stringify(myData);

  urlOperation = urlClient;
  typeOperation = "";
  if (nuevo) {
    typeOperation='POST';
    urlOperation+='/save'
  }else{
    typeOperation='PUT';
    urlOperation+='/'+ myData.id   
  }

  $.ajax({
    url: urlOperation,
    type: typeOperation,
    data: dataTosend,
    datatype: "JSON",
    contentType: "application/json",
    success: function (respuesta) {
      $("#resultado").empty();
      $("#idCliente").val("");
      $("#nombreCliente").val("");
      $("#mailCliente").val("");
      $("#edadCliente").val("");
      $("#password").val("");
      leerClientes();
      if(nuevo){
        alert("se ha guardado el nuevo cliente");
      }else{
        alert("se ha actualizado los datos del cliente ");
      }
    },
  });
}

function editarClientes(id) {
  nuevo=false;
  mostrarLista(false);
  $("#titulo").text("Editar Cliente");
  var itemEncontrado = null;
  for (const item of listaResultados) {
    if (item.id === id) {
      itemEncontrado = item;
      break;
    }
  }

  if (itemEncontrado !== null) {
    $("#idCliente").val(itemEncontrado.id);
    $("#nombreCliente").val(itemEncontrado.name);
    $("#mailCliente").val(itemEncontrado.email);
    $("#edadCliente").val(itemEncontrado.age);
    $("#password").val("");
  }

 
}

function borrarCliente(idCliente) {
  $.ajax({
    url: urlClient + "/" + idCliente,
    type: "DELETE",
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      leerClientes();
      alert("se ha eliminado.");
    },
  });
}

function nuevoCliente() {
  mostrarLista(false);
  nuevo=true;
  $("#titulo").text("Nuevo Cliente");
  $("#idCliente").val("0");
  $("#nombreCliente").val("");
  $("#mailCliente").val("");
  $("#edadCliente").val("");
  $("#password").val("");
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
