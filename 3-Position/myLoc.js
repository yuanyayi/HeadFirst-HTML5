window.onload=getMyLocation;

var ourCoords={
  latitude: 47.624851,
  longitude: -122.52099
}

function getMyLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(displayLocation,displayError);
  }else {
    alert("你的浏览器暂不支持地理定位功能。");
  }
}

function displayLocation(position){
  // console.log(position);
  var latitude=position.coords.latitude;
  var longitude=position.coords.longitude;

  $("#location").html("你的位置在：维度"+latitude+"；经度"+longitude);
  $("#location").html($("#location").html()+"(精度 "+position.coords.accuracy+" 米)");

  // 测距函数：
  var km = computedDistance(position.coords, ourCoords);
  $("#distance").html("距wiki总部的直线距离："+km+"km");

  showMap(position.coords);
}

function displayError(error){
  var errorType={
    0: "Unknown error",
    1: "Permission denied by user",
    2: "Position is not available",
    3: "Request timed out"
  };
  var errorMessage="Error: "+errorType[error.code];
  if(error.code==0 || error.code==2){
    errorMessage += (" "+error.errorMessage);
  }
  $("#location").html(errorMessage);
}

// 利用经纬度计算两点直线距离：暂时还不理解
function computedDistance(startCoords, destCoords){
  function degreesToRadians(degrees){
    var radians=(degrees * Math.PI)/180;
    return radians;
  }
  var startLatRads = degreesToRadians(startCoords.latitude);
  var startLongRads = degreesToRadians(startCoords.longitude);
  var destLatRads = degreesToRadians(destCoords.latitude);
  var destLongRads = degreesToRadians(destCoords.longitude);

  var Radius = 6371;//radius of the Earth in km
  var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;

  return distance;
}

var map;

function showMap(coords){
  var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
  var mapOption = {
    zoom: 10,
    center: googleLatAndLong,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapDiv = document.getElementById("map");
  map= new google.maps.Map(mapDiv, mapOption);

  addMarker(map, googleLatAndLong,"Your Location","You are here:"+coords.latitude+","+coords.longitude);
}

function addMarker(map,latlong,title,content){
  var markerOptions = {
    position: latlong,
    map: map,
    title: title,
    clickable: true,
  };
  var marker = new google.maps.Marker(markerOptions);
  var infoWindowOptions = {
    content: content,
    position: latlong,
  };
  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  google.maps.event.addListener(marker, "click", function(){
    infoWindow.open(map);
  });
}
