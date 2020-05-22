
$(() => {

    let MayorPromedio = 0;
    let MenorPromedio = 5.0;
    function ValidarForm() {
        
        //vector que obtiene la informacion del estudiante
        let informacionEstudiante = []

        //variables utilizadas para calidar cada uno de sus respectivos inputs 
        let NombreCorrecto = true;
        let CedulaCorrecta = true;
        let EdadCorrecta = true;

        //se valida si la cedula ingresada es correcta 
        const cedula = $("form")[0].cedula.value;

        if (cedula.length >= 10 && cedula.length <= 12) {
            informacionEstudiante.push(cedula);
        } else {
            CedulaCorrecta = false;
        }

        //Validando nombre
        const nombre = $("form")[0].nombre.value;
        if (isNaN(nombre)) {
            informacionEstudiante.push(nombre);
        } else {
            NombreCorrecto = false;
        }

        //encontrando edad del usuario
        const values = $("form")[0].Fnacimiento.value.split("-");
        let dia = values[2];
        let mes = values[1];
        let ano = parseInt(values[0]);

        let ano_actual = 2020;
        let mes_actual = 05;

        let edadFinal = ano_actual - ano;

        if (mes > mes_actual) {
            edadFinal -= 1;
        }
        informacionEstudiante.push(edadFinal);

        //validacion de la edad
        if (edadFinal < 18) {
            EdadCorrecta = false;
        }

        //Validando notas y sacar promedio
        let promedio = 0;
        for (let i = 0; i < 3; i++) {
            informacionEstudiante.push(parseFloat($("form")[0].nota[i].value));
            promedio += parseFloat($("form")[0].nota[i].value);
        }
        promedio /= 3;
        informacionEstudiante.push(parseFloat(promedio.toFixed(2)));

        //-----------------------------------------
        // mayor promedio
        if (promedio > MayorPromedio) {
            MayorPromedio = promedio;
        }

        //menor promedio -----------
        if(promedio < MenorPromedio){
            MenorPromedio = promedio;
        }

        let InfoMenorPromedio = [];
        if (informacionEstudiante[6] <= MayorPromedio) {
            InfoMenorPromedio.push(informacionEstudiante[0]);
            InfoMenorPromedio.push(informacionEstudiante[1]);
            InfoMenorPromedio.push(informacionEstudiante[2]);
            InfoMenorPromedio.push(MenorPromedio);
        }

        //--------------------------

        let promedioFinal = parseFloat(MayorPromedio.toFixed(2))

        let InfoMejorPromedio = [];
        if (informacionEstudiante[6] >= MayorPromedio) {
            InfoMejorPromedio.push(informacionEstudiante[0]);
            InfoMejorPromedio.push(informacionEstudiante[1]);
            InfoMejorPromedio.push(informacionEstudiante[2]);
            InfoMejorPromedio.push(MayorPromedio);
        }
        //----------------------------------------------------   

        //se manda un alert cuando el nombre ingresado o la cedula no esta correcta 
        if (!NombreCorrecto) {
            alert("Su nombre no es valido!! ");
        }
        if (!CedulaCorrecta) {
            alert("La cedula no es valida!! .")
        }
        if (!EdadCorrecta) {
            alert("usted es menor de edad, no puede registrarse");
        }

        //se valida que los dos campos a validar esten bien para proseguir a agregar la fila 
        if (NombreCorrecto == true && CedulaCorrecta == true && EdadCorrecta == true) {
            parrafo.show(2000);
            $("#tbody").append(`
        <tr>
          <td>${informacionEstudiante[0]}</td>
          <td>${informacionEstudiante[1]}</td>
          <td>${informacionEstudiante[2]}</td>
          <td>${informacionEstudiante[3]}</td>
          <td>${informacionEstudiante[4]}</td>
          <td>${informacionEstudiante[5]}</td>
          <td>${informacionEstudiante[6].toFixed(2)}</td>
        </tr>`

            );

            if (informacionEstudiante[informacionEstudiante.length - 1] >= 3.5) {
                $("#tbody tr:last-child").addClass("color-verde");
            } else {
                $("#tbody tr:last-child").addClass("color-rojo");
            }

        }

        //creando otra tabla para el mejor promedio
        if(NombreCorrecto == true && CedulaCorrecta == true && EdadCorrecta == true && InfoMejorPromedio[3] == MayorPromedio){
        $("#tbody2 tr:last").remove();
                
         $("#tbody2").append(` <tr><td>${InfoMejorPromedio[0]}</td><td>${InfoMejorPromedio[1]}</td><td>${InfoMejorPromedio[2]}</td><td>${InfoMejorPromedio[3].toFixed(1)}</td>
        </tr>`);
        }

        if(NombreCorrecto == true && CedulaCorrecta == true && EdadCorrecta == true && InfoMenorPromedio[3] == MenorPromedio){
            $("#tbody3 tr:last").remove();
                    
             $("#tbody3").append(` <tr><td>${InfoMenorPromedio[0]}</td><td>${InfoMenorPromedio[1]}</td><td>${InfoMenorPromedio[2]}</td><td>${InfoMenorPromedio[3].toFixed(1)}</td>
            </tr>`);
            }
    }
   
    let parrafo = $("#patu");
   
        parrafo.hide();

    
    $("form").submit((e) => { e.preventDefault(); ValidarForm(); })
    

})