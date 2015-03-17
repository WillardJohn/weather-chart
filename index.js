var d3 = require('d3'),
	c3 = require('c3'),
	$ = require('jquery');

var url = 'https://api.forecast.io/forecast/',
	apiKey = 'f9efd1cedf498cd66f645a9e0899edb2',
	lat,
	lon,
	temps = [];

function getCurrentPositionDeferred(options){
	var deferred = $.Deferred();
	navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
	return deferred.promise();
}

getCurrentPositionDeferred({enableHighAccuracy: true})

.then(function(pos){
	lat = pos.coords.latitude;
	lon = pos.coords.longitude;

	return $.ajax(url + apiKey + '/' + lon + ',' + lat, {
		dataType: 'jsonp'
	});
}, function(err){
	console.log(err)
})

.then(function(res) {
	for(var i = 0; i < 10; i++){
		temps.push(res.hourly.data[i].temperature);
	}

	var chart = c3.generate({
		data: {
			columns: [temps]
		}
	});
});