
const datos =[];


//Tabla Cotizaciones
fetch("https://api.bluelytics.com.ar/v2/latest")
    .then(response => response.json())
    .then(cotizacion =>{

        let padre = document.getElementById("cuadro_cotizacion");
        let cuadro = document.createElement ("div");
        cuadro.innerHTML = `<h2 class = "Detalles">Cotizacion</h2>
        <table id="tabla2">
          <thead>
            <tr>
              <td> Venta Dolar </td>             
              <td> Compra Dolar </td>
              <td> Venta Euro </td>
              <td> Compra Euro </td>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td> ${cotizacion.oficial.value_sell}</td>
                <td> ${cotizacion.oficial.value_buy}</td>
                <td> ${cotizacion.oficial_euro.value_sell}</td>
                <td> ${cotizacion.oficial_euro.value_buy}</td>
            </tr>
          </tbody>
        </table>`
        
        padre.append(cuadro);

        console.log(cotizacion)

    })

//convertidor
function convertir (){
    fetch("https://api.bluelytics.com.ar/v2/latest")
    .then(response => response.json())
    .then(cotizacion =>{

let monto = document.getElementById("Monto");
let moneda_i = document.getElementById("Moneda_i");
let moneda_f = document.getElementById("Moneda_f");



class Converciones{
    constructor(moneda_i,monto,moneda_f,resultado){
        this.moneda_i=moneda_i;
        this.moneda_f=moneda_f;
        this.monto=monto;
        this.resultado=resultado;
    }
}

//convetidor de monedas
if(moneda_i.value == "dolar"){
 
        if(moneda_f.value == "peso"){
            resultado = monto.value * cotizacion.oficial.value_buy 
           
            
        }
        else if (moneda_f.value == "euro"){
            resultado = monto.value * (cotizacion.oficial.value_buy/cotizacion.oficial_euro.value_buy)
          
                  
        }else if (moneda_f.value == "dolar"){
            resultado = monto.value
        
        }

    }
if (moneda_i.value == "peso"){
        if(moneda_f.value == "dolar"){
            resultado = monto.value / cotizacion.oficial.value_sell 
           

        }
        else if (moneda_f.value == "euro"){
            resultado = monto.value / cotizacion.oficial_euro.value_sell
       

        }else{
            resultado = monto.value
        }
        
    }
if(moneda_i.value == "euro"){
        if(moneda_f.value == "peso"){
            resultado = monto.value * cotizacion.oficial_euro.value_buy
           
         
        }
        else if (moneda_f.value == "dolar"){
            resultado = monto.value *  (cotizacion.oficial_euro.value_sell/cotizacion.oficial.value_sell)
           
        }else{
            resultado = monto.value
        }
        
    }
    

    let nuevos_datos = new Converciones(moneda_i.value,monto.value,moneda_f.value,resultado);
    datos.push (nuevos_datos);
    
    //display resultado afuera de la tabla
    let resul = document.getElementById("resultado")
    let display = document.createElement("li");
        if(resultado){
            display.innerText = resultado;
        }else{
            display.innerText = 0;
        }    
    resul.replaceChildren(display);

    //display monto inicial en la tabla
    let mon_i = document.getElementById("Valor_i")
    let nuevo_mon = document.createElement("tr");
        if(monto.value){
        nuevo_mon.innerText = monto.value;
        }else{
            nuevo_mon.innerText = 0;
        }
    mon_i.append(nuevo_mon);
    
    //display valor en la tabla
    let new_valor = document.getElementById("Valor")
    let nuevo_valor = document.createElement("tr");
        nuevo_valor.innerText = resultado;
        if(resultado){
            nuevo_valor.innerText = resultado;
        }else{
            nuevo_valor.innerText = 0;
        }  
    new_valor.append(nuevo_valor);
    
    //display moneda inicial en tabla
    let mi = document.getElementById("mi")
    let nueva_mi = document.createElement("tr");
        nueva_mi.innerText = moneda_i.value;

    mi.append(nueva_mi);

    //display moneda final en tabla
    let mf = document.getElementById("mf")
    let nuevo_mf = document.createElement("tr");
        nuevo_mf.innerText = moneda_f.value;

    mf.append(nuevo_mf);

    //display favorable/desfavorable
    let conveniente = document.getElementById("conveniente")
    if(monto.value > resultado){
        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "desfaborable";
        conveniente.append (nueva_C);
    }else if (monto.value < resultado){
        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "favorable";
        conveniente.append (nueva_C);
    }else{
        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "inconcluso";
        conveniente.append (nueva_C); 
    }
   
    //pasa datos a JSON y guarda en local storage.
    let datos_JSON=JSON.stringify(datos);
    console.log(datos_JSON);
    localStorage.setItem("data",datos_JSON)
    })
}

//recupera los datos.
function recuperar (){
    // los vuelve a objetos.
    let clave = localStorage.getItem("data")
        clave = JSON.parse(clave);

    for(i=0 ; i<clave.length ; i++ ){   

 //display valor en la tabla
        let new_valor = document.getElementById("Valor")
        let nuevo_valor = document.createElement("tr");
            nuevo_valor.innerText = clave[i].resultado;
    
        new_valor.append(nuevo_valor);

 //display monto inicial en la tabla
        let mon_i = document.getElementById("Valor_i")
        let nuevo_mon = document.createElement("tr");
            nuevo_mon.innerText = clave[i].monto;

        mon_i.append(nuevo_mon);


//display moneda inicial en tabla
        let mi = document.getElementById("mi")
        let nueva_mi = document.createElement("tr");
            nueva_mi.innerText = clave[i].moneda_i;

        mi.append(nueva_mi);  

 //display moneda final en tabla
        let mf = document.getElementById("mf")
        let nuevo_mf = document.createElement("tr");
            nuevo_mf.innerText = clave[i].moneda_f;

        mf.append(nuevo_mf);

//display favorable/desfavorable
    let conveniente = document.getElementById("conveniente")
    if(clave[i].monto > clave[i].resultado){

        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "desfaborable";
        conveniente.append (nueva_C);

    }else if (clave[i].monto < clave[i].resultado){

        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "favorable";
        conveniente.append (nueva_C);

    }else{

        let nueva_C = document.createElement("tr");
        nueva_C.innerText = "inconcluso";
        conveniente.append (nueva_C); 
     }

 }

 Toastify({

    text:"Datos Recuperados",
    duration:1500,
    destination:"https://apvarun.github.io/toastify-js/#",
    gravity:"bottom",
    position:"left",
    style:{
        fontSize:"30px",
        fontFamily:"Verdana",
        color:"silver",
        background:"linear-gradient(rgb(000, 00, 00),rgb(128, 128, 128))"
    }


}).showToast();


}
