var map = new AMap.Map('container',{
   zoom: 10,
   center: [116.39,39.9],
    resizeEnable: true
});

$(document).ready(function(){
  // 获取经纬度
  var lng = 0;
  var lat = 0;
  var clickEventListener = map.on('click', function(e) {
      var e = e || window.event;
      lng = e.lnglat.getLng();
      lat = e.lnglat.getLat();
      document.getElementById("LLData").innerHTML = '经度：' + lng + ',' + '纬度：' + lat;
      $.ajax({
        url:"https://api.waqi.info/feed/geo:"+lat+";"+lng+"/?",
        method:"get",
        data:{
            "token":"38cbfd646989bb1276ea8690f23182642ffdecf7"
        },
        dataTyle:"json",
        success:function(data){
          console.log(data);
          $("#LLData").html( '<p>经度：' + lng + ';纬度：' + lat+'</p>'+
            '<p>PM2.5：' + data.data.iaqi.pm25.v + '</p>'+
            '<p>PM10: '+data.data.iaqi.pm10.v+'</P>'+
            '<p>Ozone: '+data.data.iaqi.o3.v+'</P>'+
            '<p>NO: '+data.data.iaqi.no2.v+'</P>'+
            '<p>SO: '+data.data.iaqi.so2.v+'</P>'+
            '<p>CO: '+data.data.iaqi.co.v+'</P>');
        },
        error: function(data){
          console.log("error");
        }
      })
  });

  // 获取当前所在的行政区
  map.on('click', getCity);
  function getCity() {
      map.getCity(function(data) {
          if (data['province'] && typeof data['province'] === 'string') {
              document.getElementById('cityData').innerHTML = '城市：' + (data['city'] || data['province']);
          }
      });
  }

})

//var app = angular.module("myApp", []); 
//app.controller('getData',['$scope','$http',function($scope,$http){
//  // 获取经纬度
//  $scope.lng = 0;
//  $scope.lat = 0;
//  var clickEventListener = map.on('click', function(e) {
//      $scope.lng = e.lnglat.getLng();
//      $scope.lat = e.lnglat.getLat();
//      $http({
//        url:'https://api.waqi.info/feed/geo:10.3;20.7/?',
//        method:'get',
//        params:{
//            "lat":lat,
//            "lng":lng,
//            "token":"38cbfd646989bb1276ea8690f23182642ffdecf7"
//        }
//      }).success(function(data){
//        console.log(data);
//      }).error(function(data,headers,status,config){
//        console.log("获取失败");
//      })
//  });
//  // 获取当前所在的行政区
//  map.on('click', getCity);
//  function getCity() {
//      map.getCity(function(data) {
//          if (data['province'] && typeof data['province'] === 'string') {
//              document.getElementById('cityData').innerHTML = '城市：' + (data['city'] || data['province']);
//          }
//      });
//  }
//}])
