//Referenced by Jason Robert

let lat, long, timestamp, getdistance, gettime;
let n=0;

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) =>{
    lat = position.coords.latitude;
    long = position.coords.longitude;
    timestamp = Date.now()
    getData();

  //  console.log(lat,long)
  });
} else {
  console.log("geolocation not availabel")
}


async function getData(){
  const response = await fetch('/api');
  const data = await response.json();
  const number = document.createElement('H2');
  document.getElementById('number').append(number);

  for(item of data){
    getdistance = getDistanceFromLatLonInKm(lat, long,`${item.lat}`,`${item.long}`).toFixed(2);
    gettime = timeDifference(timestamp, `${item.timestamp}`)
    const root = document.createElement("div")
    const name = document.createElement('div')
    const distance = document.createElement('div')
    const date = document.createElement('div')
    const dateString = new Date(item.timestamp).toLocaleString()
    const confession = document.createElement('div')

    const x=document.createTextNode(getdistance);

    if ( getdistance<=1 && gettime<24){
      n=n+1
      number.textContent =n+" Beans around you"
      name.textContent = ` ${item.name}`
      distance.textContent = "distance:" + getdistance +"Km"
      date.textContent = dateString
      confession.textContent = `${item.confess}`
      root.append(name,distance, date,confession)
      root.setAttribute("id", "post"+n)
      root.setAttribute("class", "post")
      name.setAttribute("class",'name')
      distance.setAttribute('id','distance')
      confession.setAttribute('class','confession')
      date.setAttribute('class','date')


      document.getElementById('wrapper').append(root);

      root.onclick = function() {
        var p = document.createElement("div");
        //var x = document.createTextNode("hi");
        p.appendChild(confession);
        this.appendChild(p);
        this.onclick = function() {}
      }
    }
  }

};


//calculate distance

   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
//calculate timeout

function timeDifference(timestamp1, timestamp2) {
  var difference = timestamp1 - timestamp2;
  var hoursDifference = Math.floor(difference/1000/60/60);
  return hoursDifference;
}

var canvas;
let yoff = 0.0;

function windowResized(){

  resizeCanvas(windowWidth, windowHeight);
  setup()

}
//canvas
function setup() {
  canvas= createCanvas(windowWidth/2, windowHeight);

  canvas.position(windowWidth/2,0);
  canvas.style('z-index','-1');

}

function draw() {

  fill(15);
   stroke(255)
   // We are going to draw a polygon out of the wave points
   beginShape();

   let xoff = 0; // Option #1: 2D Noise
   // let xoff = yoff; // Option #2: 1D Noise

   // Iterate over horizontal pixels
   for (let x = 0; x <= width; x += 10) {
     // Calculate a y value according to noise, map to

     // Option #1: 2D Noise
     let y = map(noise(xoff, yoff), 0, 1,width*0.5, height*0.75);

     // Option #2: 1D Noise
     // let y = map(noise(xoff), 0, 1, 200,300);

     // Set the vertex
     vertex(x, y);
     // Increment x dimension for noise
     xoff += 0.05;
   }
   // increment y dimension for noise
   yoff += 0.01;
   vertex(width, height);
   vertex(0, height);
   endShape(CLOSE);
}
