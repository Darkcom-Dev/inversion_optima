function openTab(tabName) {
    // Ocultar todos los contenidos de las pestañas
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
    
    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabName).style.display = "block";
  }