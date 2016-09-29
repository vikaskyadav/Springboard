// GETTING THE DATA

		var response;
		var tags = [];
		$(window).load(function(event) {
			event.preventDefault();
			$.ajax({
				url: 'https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths',
				type: 'GET',
				dataType: 'json',
			})
			.done(function(res) {
				response = res['paths'];
				for(var i = 0; i < response.length; ++i){
					var arr = response[i]['tags'].split(', ');
					for(var j = 0; j < arr.length; ++j){
						tags.push(arr[j]);
					}
				}
				var html = '';
				var likes = localStorage.getItem('likes');
				for(var i = 0; i < res['paths'].length; ++i){
				html += '<div class="row"> <div class="col-md-12">\
     <h1 class="text-center text-primary">' + response[i]['name']+ '</h1>\
     <h2 class="text-muted">' + response[i]['tags'] + '</h2>\
     <img class="img-responsive" src="' + response[i]['image'] + '">\
     <h2 class="text-muted text-right" style="paddingRight:15px;">'+'<i class="fa fa-users" aria-hidden="true"></i>\
' + response[i]['learner']+'</h2>\
     <h2 class="text-muted text-right">'+'<i class="fa fa-clock-o" aria-hidden="true"></i>\
'      + response[i]['hours'] + '</h2>\
     <h2 class="text-left text-muted">' + response[i]['description'] + '</h2>\
     <a class="btn btn-success" target="_blank" href="' + response[i]['sign_up'] + '">View Curriculum</a>\
      </div></div>'
			}
			$('#result_area').html(html);  
			})	
		});

// SEARCH

		$('#search_button').on('click', function(event) {
			// event.preventDefault();
			var ids = [];
			var html = '';

			if($('#search_bar').val().length == 0){
				window.location.assign('spring.html');  
			}		
			else{

				for(var i = 0; i < response.length; ++i){
					var str = response[i]['tags'];
					var tags = str.split(', ');
					for(var j = 0; j < tags.length; ++j){
						if($('#search_bar').val() == tags[j]){
							ids.push(response[i]['id']);
						}
					}
				}
				for(var i = 0; i < ids.length; ++i){
					var index = parseInt(ids[i]);
				html += '<div class="row"><div class="col-md-12">\
     <h1 class="text-center text-primary">' + response[index - 1]['name']+ '</h1>\
     <h2 class="text-muted">' + response[index - 1]['tags'] + '</h2>\
     <img class="img-responsive" src="' + response[index - 1]['image'] + '">\
     <h2 class="text-muted text-right">'+'<i class="fa fa-users" aria-hidden="true"></i>' + response[index - 1]['learner']+'</h2>\
     <h2 class="text-muted text-right">'+'<i class="fa fa-clock-o" aria-hidden="true"></i>' + response[index - 1]['hours'] + '</h2>\
     <h2 class="text-left text-muted">' + response[index - 1]['description'] + '</h2>\
     <a class="btn btn-success" target="_blank" href="' + response[index - 1]['sign_up'] + '">View Curriculum</a>\
      </div></div>'
			}
				$('#result_area').html(html);
			}
		});

// SORT 

	$('#radio_button').on('click', function(event) {
		event.preventDefault();
		if ($('#sort2').is(':checked')) {
			$('#sort2').prop('checked', false);
			sortByElement('learner', 1);
		}
		else if ($('#sort1').is(':checked')) {
			$('#sort1').prop('checked', false);
			sortByElement('learner', 0);	
		}

		else if ($('#sort3').is(':checked')) {
			$('#sort3').prop('checked', false);
			sortElementhours('hours', 0);	
		}

		else if ($('#sort4').is(':checked')) {
			$('#sort4').prop('checked', false);
			sortElementhours('hours', 1);		
		}
	});

function sortElementhours (attribute, value) {
	if(value == 0){
		response.sort(function (a, b) {
			var x = parseInt(a[attribute].slice(0, -1)); 
			var y = parseInt(b[attribute].slice(0, -1));
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	if(value == 1){
		response.sort(function (a, b) {
			var x = parseInt(a[attribute].slice(0, -1)); 
			var y = parseInt(b[attribute].slice(0, -1));
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		});		
	}

	var html = '';
	for(var i = 0; i < response.length; ++i){
			html += '<div class="row"> <div class="col-md-12">\
     <h1 class="text-center text-primary">' + response[i]['name']+ '</h1>\
     <h2 class="text-muted">' + response[i]['tags'] + '</h2>\
     <img class="img-responsive" src="' + response[i]['image'] + '">\
     <h2 class="text-muted text-right">'+'<i class="fa fa-users" aria-hidden="true"></i>' + response[i]['learner']+'</h2>\
     <h2 class="text-muted text-right">'+'<i class="fa fa-clock-o" aria-hidden="true"></i>' + response[i]['hours'] + '</h2>\
     <h2 class="text-left text-muted">' + response[i]['description'] + '</h2>\
     <a class="btn btn-success" target="_blank" href="' + response[i]['sign_up'] + '">View Curriculum</a>\
      </div></div>'
		}
		$('#result_area').html(html);
}


function sortByElement (attribute, value) {
	if(value == 0){
		response.sort(function (a, b) {
			var x = parseInt(a[attribute].replace(',', '')); 
			var y = parseInt(b[attribute].replace(',', ''));
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	if(value == 1){
		response.sort(function (a, b) {
			var x = parseInt(a[attribute].replace(',', '')); 
			var y = parseInt(b[attribute].replace(',', ''));
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		});		
	}

	var html = '';
	for(var i = 0; i < response.length; ++i){
			html += '<div class="row"> <div class="col-md-12 " id="contra" >\
     <h1 class="text-center text-primary">' + response[i]['name']+ '</h1>\
     <h2 class="text-muted">' + response[i]['tags'] + '</h2>\
     <img class="img-responsive" src="' + response[i]['image'] + '">\
     <h2 class="text-muted text-right">'+'<i class="fa fa-users" aria-hidden="true"></i>' + response[i]['learner']+'</h2>\
     <h2 class="text-muted text-right">'+'<i class="fa fa-clock-o" aria-hidden="true"></i>' + response[i]['hours'] + '</h2>\
     <h2 class="text-left text-muted">' + response[i]['description'] + '</h2>\
     <a class="btn btn-success" target="_blank" href="' + response[i]['sign_up'] + '">View Curriculum</a>\
     <hr></div></div>'
		}
		$('#result_area').html(html);
}

// TYPEAHEAD GROUND WORK

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'tags',
  source: substringMatcher(tags)
});