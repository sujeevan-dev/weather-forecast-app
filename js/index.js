function weather() {
  var location = $("#location");
  var key = "52fb36032ca1c37e51ec197cb55369a8";
  var url = "https://api.darksky.net/forecast/";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    $("#location").html(
      "Latitude is " + latitude + "° Longitude is " + longitude + "°"
    );

    $.getJSON(
      url + key + "/" + latitude + "," + longitude + "?callback=?",
      function(data) {
        $("#zone").html(data.timezone);
        $("#temp").html(Math.round(data.currently.temperature) + " °" + "F");
        $("#summary").html(data.currently.summary);
        $("#icon").html(data.currently.icon);

        //Button functions
        var f = $("#temp").html();
        f = parseFloat(f);

        function converter(f) {
          return (5 / 9) * (f - 32);
        }

        $("#cel").click(function() {
          $("#temp").html(Math.round(converter(f)) + " °" + "C");
        });

        $("#fah").click(function() {
          $("#temp").html(Math.round(data.currently.temperature) + " °" + "F");
        });

        //Skycons
        var iconRequest = $("#icon").html();
        var skycons = new Skycons({ color: "#ff3f80" });
        var i;

        var list = [
          "clear-day",
          "clear-night",
          "partly-cloudy-day",
          "partly-cloudy-night",
          "cloudy",
          "rain",
          "sleet",
          "snow",
          "wind",
          "humid",
          "fog"
        ];

        for (i = 0; i < list.length; i++) {
          if (iconRequest == list[i]) {
            skycons.set("icon", list[i]);
          }
        }

        skycons.play();
      }
    ); //End of API request
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }

  location.innerHTML = "Locating...";
}

weather();
