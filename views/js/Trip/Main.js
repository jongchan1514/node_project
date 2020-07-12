var lat, lon;
//현재접속한 위치좌표를 만들어 낸다.
navigator.geolocation.getCurrentPosition(function(pos) {
	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
});
function initMap() {
	var geocoder = new google.maps.Geocoder;
	var pointer = new google.maps.LatLng(lat,lon);
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: pointer,
	});
	var marker = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: pointer,
		title : 'center'
	});
	//맵에 클릭 이벤트 등록
	map.addListener('click',function(e){
		var latlng = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng()
		};
		console.log( latlng );
	})
	marker.addListener('click', function(e) {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	});
}