//Fecha y Hora
var date = new Date();
result = date.toLocaleDateString()+" "+date.getHours()+":"+date.getMinutes();
document.getElementById('fecha').textContent=result;


//Clima Api OpenWeather
let lat="-24.188654561006086";// lat y lon .Ubicacion Geografica de la ciudad
let lon="-65.300252137829";
let key="7513df4264b0938c60668a73cdbe8812";
let lang="es"; //seleccion de idioma para la descripcion
let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`;

async function getClima(){
    try{
        let response = await fetch(api);
        let ipResponse = await response.json();

        let name=ipResponse.name;
        let country=ipResponse.sys.country;
        console.log(name);
        document.getElementById('ciudad').textContent=name+" - "+country;

        let temp=ipResponse.main.temp - 273.15; //cinvertir kelvin a celsius
        document.getElementById('temperatura').textContent=temp.toFixed(0)+"°C";

        let icon=ipResponse.weather[0].icon;
        var img=`http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById('imgClima').src=img;

        let main=ipResponse.weather[0].main;
        document.getElementById('clima').textContent=main;

        let description=ipResponse.weather[0].description;
        document.getElementById('descripcion').textContent=description;

        let humidity=ipResponse.main.humidity;
        document.getElementById('humedad').textContent="Humedad: "+humidity+"%";

        let visibility=ipResponse.visibility * 0.001; //convertir metros a kilometros
        document.getElementById('vicibilidad').textContent="Visibilidad: "+visibility+"Km";
    
        let wind=ipResponse.wind.speed;
        document.getElementById('viento').textContent="Velocidad del viento "+wind+"km/h";
    
    }catch{
        console.log("Algo paso, no se pudo resolver....");
    }
}
getClima();