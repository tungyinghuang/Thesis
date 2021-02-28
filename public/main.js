//submit
var lat, long, timestamp;
document.getElementById('submit').addEventListener('click', async event => {
  const name = document.getElementById("name").value
  const confess = document.getElementById("confession").value
  const data = {lat, long, name, confess};
  const options ={
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json)
})
//get geolocation
document.getElementById('geolocate').addEventListener('click', async event => {
  if ("geolocation" in navigator) {
    console.log("geolocation availabel");
    navigator.geolocation.getCurrentPosition(async position =>{
      lat = position.coords.latitude;
      long = position.coords.longitude;
      document.getElementById("latitude").textContent=lat;
      document.getElementById("longitude").textContent=long;
    });
  }else{
      console.log("geolocation not availabel")
    }
})
