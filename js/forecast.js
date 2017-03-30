		window.onload = function () {
			/*geolocation api*/
			var jsonUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+(ymaps.geolocation.latitude.toFixed(2)-0.01)+"&lon="+ymaps.geolocation.longitude.toFixed(2)+"&APPID=7f038fdecadfcd4da0735148163b0957"
			/*Kiev lat=50.44 lon=30.52; -0.01 - это поправка по широте что бы выйти конкретно на Киев, без нее определялось место положение Пуща-Водица:)*/
			
			$.getJSON( jsonUrl, function( json ) {
				
				/*bootstap tabs*/

				$('#forecast').append('<h4>5 days weather forecast in: '+json.city.name+'</h4>')
				.append("<ul class='nav nav-tabs'><li class='active'><a data-toggle='tab' href='#day1'>&nbsp"+new Date(json.list[0].dt_txt).toString().substring(0,10)+"&nbsp&nbsp</a></li><li><a data-toggle='tab' href='#day2'>&nbsp&nbsp"+new Date(json.list[8].dt_txt).toString().substring(0,10)+"&nbsp&nbsp</a></li><li><a data-toggle='tab' href='#day3'>&nbsp&nbsp"+new Date(json.list[16].dt_txt).toString().substring(0,10)+"&nbsp&nbsp</a></li><li><a data-toggle='tab' href='#day4'>&nbsp&nbsp"+new Date(json.list[24].dt_txt).toString().substring(0,10)+"&nbsp&nbsp</a></li><li><a data-toggle='tab' href='#day5'>&nbsp&nbsp"+new Date(json.list[32].dt_txt).toString().substring(0,10)+"&nbsp&nbsp</a></li></ul>");

				/*bootstap tabs-content*/

				$('#forecast').append("<div class='tab-content'><div id='day1' class='tab-pane fade in active'><table class='table-hover table-responsive'><thead><tr><th>Time</th></tr></thead><tbody><tr><td>Temperature, &degС</td></tr><tr><td>Humidity, %</td></tr><tr><td>Pressure, hPa</td></tr><tr><td>Wind, m/s</td></tr><tr><td>Description</td></tr></tbody></table></div><div id='day2' class='tab-pane fade'><table class='table-hover table-responsive'><thead><tr><th>Time</th></tr></thead><tbody><tr><td>Temperature, &degС</td></tr><tr><td>Humidity, %</td></tr><tr><td>Pressure, hPa</td></tr><tr><td>Wind, m/s</td></tr><tr><td>Description</td></tr></tbody></table></div><div id='day3' class='tab-pane fade'><table class='table-hover table-responsive'><thead><tr><th>Time</th></tr></thead><tbody><tr><td>Temperature, &degС</td></tr><tr><td>Humidity, %</td></tr><tr><td>Pressure, hPa</td></tr><tr><td>Wind, m/s</td></tr><tr><td>Description</td></tr></tbody></table></div><div id='day4' class='tab-pane fade'><table class='table-hover table-responsive'><thead><tr><th>Time</th></tr></thead><tbody><tr><td>Temperature, &degС</td></tr><tr><td>Humidity, %</td></tr><tr><td>Pressure, hPa</td></tr><tr><td>Wind, m/s</td></tr><tr><td>Description</td></tr></tbody></table></div><div id='day5' class='tab-pane fade'><table class='table-hover table-responsive'><thead><tr><th>Time</th></tr></thead><tbody><tr><td>Temperature, &degС</td></tr><tr><td>Humidity, %</td></tr><tr><td>Pressure, hPa</td></tr><tr><td>Wind, m/s</td></tr><tr><td>Description</td></tr></tbody></table></div></div>");	
				
				/*checking for no data value*/

				for (var i = 0; i<7-(21-new Date(json.list[0].dt_txt).toString().substring(16,18))/3;i++){
					$('#day1 thead tr').append("<th>passed</th>");
					$('#day1 tbody tr:eq(0)').append("<td>passed</td>");
					$('#day1 tbody tr:eq(1)').append("<td>passed</td>");
					$('#day1 tbody tr:eq(2)').append("<td>passed</td>");
					$('#day1 tbody tr:eq(3)').append("<td>passed</td>");
					$('#day1 tbody tr:eq(4)').append("<td>passed</td>");
				}

				/*filling tables with data from api*/

				for (var i = 0; i<(21-new Date(json.list[0].dt_txt).toString().substring(16,18))/3+1;i++){
					putData(1,i);
				}

				var today = new Date();

				for (var i = 0; i < json.list.length; i++) {
					
					if (new Date(json.list[i].dt_txt).toLocaleDateString() == new Date(today.getTime()+1*86400000).toLocaleDateString()) putData(2,i);
					if (new Date(json.list[i].dt_txt).toLocaleDateString() == new Date(today.getTime()+2*86400000).toLocaleDateString()) putData(3,i);
					if (new Date(json.list[i].dt_txt).toLocaleDateString() == new Date(today.getTime()+3*86400000).toLocaleDateString()) putData(4,i);
					if (new Date(json.list[i].dt_txt).toLocaleDateString() == new Date(today.getTime()+4*86400000).toLocaleDateString()) putData(5,i);
				}

				/*helper-function*/

				function putData(dayNumb,i){

					/*wind direction calculation*/
					var windDirection;
					switch (json.list[i].wind.deg) {
						case 0:windDirection = "N";
						break;
						case 90:windDirection = "E";
						break;
						case 180:windDirection = "S";
						break;
						case 270:windDirection = "W";
						break;
						case 360:windDirection = "N";
						break;
						default:windDirection = '';
					}
					if (json.list[i].wind.deg>0 && json.list[i].wind.deg<90) windDirection = "NE";
					if (json.list[i].wind.deg>90 && json.list[i].wind.deg<180) windDirection = "SE";
					if (json.list[i].wind.deg>180 && json.list[i].wind.deg<270) windDirection = "SW";
					if (json.list[i].wind.deg>270 && json.list[i].wind.deg<360) windDirection = "NW";
					/*wind direction calculation*/

					$('#day'+dayNumb+' thead tr').append("<th>"+json.list[i].dt_txt.substring(11,16)+"</th>");
					$('#day'+dayNumb+' tbody tr:eq(0)').append("<td>"+(json.list[i].main.temp-273.15).toFixed()+" &deg</td>");
					$('#day'+dayNumb+' tbody tr:eq(1)').append("<td>"+json.list[i].main.humidity+" </td>");	
					$('#day'+dayNumb+' tbody tr:eq(2)').append("<td>"+json.list[i].main.pressure+" </td>");
					$('#day'+dayNumb+' tbody tr:eq(3)').append("<td>"+json.list[i].wind.speed.toFixed(2)+" <img src='img/"+windDirection+".svg' alt='arrow'></td>");
					$('#day'+dayNumb+' tbody tr:eq(4)').append("<td><img src='http://openweathermap.org/img/w/"+json.list[i].weather[0].icon+".png'/></td>");
				}
			});
	}
