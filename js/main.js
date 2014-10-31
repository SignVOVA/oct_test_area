$.ajax({
	url: "report.php",
	cache: false,
	type: 'json'
}).success(function(data) {
	console.log(data);
}).error(function() {
	alert('Error retriving information');
});