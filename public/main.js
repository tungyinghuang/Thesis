
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

})
//get geolocation
document.getElementById('geolocate').addEventListener('click', async event => {
  if ("geolocation" in navigator) {
    console.log("geolocation availabel");
    navigator.geolocation.getCurrentPosition(async position =>{
      console.log(position.coords.latitude);
      lat = position.coords.latitude;
      long = position.coords.longitude;
    }, error);
  }else{
      console.log("geolocation not availabel")
    }
})

//scroll animation
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  $("form").on('submit', function (e) {
   //ajax call here
  alert("Fail to get your location")
   //stop form submission
   e.preventDefault();
});
}
