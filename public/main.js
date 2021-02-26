//submit
let lat, long;
document.getElementById('submit').addEventListener('click', async event => {
  const name = document.getElementById("name").value
  const data = {lat, long, name};
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





//submit
// document.getElementById('submit').addEventListener('click', event => {
//
//   if ("geolocation" in navigator) {
//     console.log("geolocation availabel");
//     navigator.geolocation.getCurrentPosition(async position =>{
//
//       const lat = position.coords.latitude;
//       const long = position.coords.longitude;
//       const name = document.getElementById("name").value
//       document.getElementById("latitude").textContent=lat;
//       document.getElementById("longitude").textContent=long;
//
//
//       const data = {lat, long, name};
//       const options ={
//         method: "POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body: JSON.stringify(data)
//       };
//       const response = await fetch('/api', options);
//       const json = await response.json();
//       console.log(json)
//     });
//   }
//   else{
//     console.log("geolocation not availabel")
//   }
// })
