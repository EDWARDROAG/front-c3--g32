urlBase = "http://localhost:8080/api/";
//urlBase = "http://140.238.152.178:8080/api/";
urlMessage = urlBase + "Message";
urlComputer = urlBase + "Computer";
urlClient = urlBase + "Client";
urlReservation = urlBase + "Reservation";
urlCategory = urlBase + "Category";



function llenarSelect(nombreControl,urlRecurso,campos) {
    $.ajax({
      url: urlRecurso,
      type: "GET",
      datatype: "json",
      success: function (respuesta) {
        var controlSelect = $("#"+nombreControl);
  
        for (const item of respuesta) {
            controlSelect.append(
            $("<option />").val(item[campos[0]]).text(item[campos[1]])
          );
        }
      },
      error: function (xhr, status) {
        alert("hay un error");
      },
    });
  }

  