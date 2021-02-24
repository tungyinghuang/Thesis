if ("geolocation" in navigator) {
  console.log("geolocation availabel");
  navigator.geolocation.getCurrentPosition(position =>{
    console.log(position)
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    document.getElementById("latitude").textContent=lat;
    document.getElementById("longitude").textContent=lat;



  });
}
else{
  console.log("geolocation not availabel")
}
