//https://open.fda.gov/apis/advanced-syntax/

var eleContainer = document.getElementById('displayResults');
var fetchButton = document.getElementById('search');


function getApi() {
  //var requestUrl = 'https://api.github.com/repos/IBM/clai/issues?per_page=5';
  //alert("fetch");

  //construct url
eleContainer.innerHTML='';

var url_1 = 'https://api.fda.gov/food/enforcement.json?search=';


var paramState = document.getElementById('srchState').value.trim();
var paramCity = document.getElementById('srchCity').value.trim();
var paramFood = document.getElementById('srchFood').value.trim();
var paramProd  = document.getElementById('srchProd').value.trim();
var paramFrmDt = document.getElementById('srchFrmDt').value.trim();
var paramToDt = document.getElementById('srchToDt').value.trim();
var urlArray =[];

if(paramState != ''){
    paramState = paramState.split(' ').join('+');
    var url_2 = 'state:'+paramState;
    urlArray.push(url_2);
}

if(paramCity != ''){
    paramCity = paramCity.split(' ').join('+');
    var url_3 = '+city:'+paramCity;
    urlArray.push(url_3);
}

if(paramFood != ''){
    paramFood = paramFood.split(' ').join('+');
    var url_4 = '+reason_for_recall:'+paramFood;
    urlArray.push(url_4);
}

if(paramFrmDt != '' || paramToDt != ''){
    paramFrmDt = paramFrmDt.split('-').join('');
    paramToDt = paramToDt.split('-').join('');
   //alert(paramFrmDt);

   if(paramFrmDt != '' && paramToDt != ''){
    var url_5 = 'report_date:'+'['+paramFrmDt+'+TO+'+paramToDt+']';
    urlArray.push(url_5);
}/*else if(paramFrmDt != ''  && paramToDt ==''){
    var url_5 = 'report_date:'+'['+paramFrmDt+']';
}*/else{
   // var url_5 = 'report_date:'+'['+paramToDt+']';
}
   
}

if(paramProd != ''){
    paramProd = paramProd.split(' ').join('+');
    var url_6 = '+product_description:'+paramProd;
    urlArray.push(url_6);
}

for(var i=0;i < urlArray.length;i++){
   
    if(i ==0){
    url_1= url_1+urlArray[i];
    }else{
        url_1 = url_1+'+AND+'+urlArray[i];
    }
    //alert(url_1);
}

  var requestUrl =url_1+'&limit=5';//+'report_date:[20220101+TO+20221231]&limit=5'
  // 'https://api.fda.gov/food/enforcement.json';
  //https://api.fda.gov/food/enforcement.json?search=reason_for_recall:peanut;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var results = data.results;
      console.log(results.length);
      //console.log(results[0]['city']);
      var htmlCreate='';
if(results.length > 0){
      for (var i = 0; i < results.length; i++) {
       
       htmlCreate = ` <div class = "resultsCard">
       <h4>${results[i].product_type} - ${results[i].recalling_firm}</h3>
       <p>State:  ${results[i].state}</p>
       <p>City:${results[i].city}</p>
       <p>Description:${results[i].product_description}</p>
       <p>Reason for recall:${results[i].reason_for_recall}</p>
       <p>Report Date:${results[i].report_date}</p>` ;//+ htmlCreate;

       eleContainer.innerHTML=eleContainer.innerHTML+ htmlCreate;
      }

    }else{
        eleContainer.innerHTML="No Results Found";
    }
    });
    initMap();
}
fetchButton.addEventListener('click', getApi);


//var foodFirm = document.createElement('h3');
        //var cityName= document.createElement('p');
       // alert(results[i].product_type+"-"+results[i].recalling_firm);
       //alert(results[i].city);
       
        //foodFirm.textContent = results[i].product_type+"-"+results[i].recalling_firm;
        //cityName.textContent ="City:"+results[i].city;
      //  issueContainer.appendChild(foodFirm);
       // issueContainer.appendChild(cityName);


       /*function initMap() {
        const myLatlng = { lat: -25.363, lng: 131.044 };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: myLatlng,
        });
        const marker = new google.maps.Marker({
          position: myLatlng,
          map,
          title: "Click to zoom",
        });
      
        map.addListener("center_changed", () => {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(() => {
            map.panTo(marker.getPosition());
          }, 3000);
        });
        marker.addListener("click", () => {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });
      }*/

      function initMap(){
      var mapOptions = {
        center: [36.778259, -119.417931],
        zoom: 10
     }
     
     // Creating a map object
     var map = new L.map('map', mapOptions);
     
     // Creating a Layer object
     var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
     
     // Adding layer to the map
     map.addLayer(layer);
    }