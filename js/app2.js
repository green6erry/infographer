$(function(){

	var nextPageToken, prevPageToken, query, findex;
$('#controls').hide();


var Tube = function(){

};
Tube.prototype.clearEntry = function(){
	$('#user-input').val('')
}

Tube.prototype.entryList = function (newEntry){
	var allHtml;
	allHtml += newEntry+'<hr>';
	$('#search-results').append(allHtml);
	$('#controls').fadeIn(1000);
}


Tube.prototype.showResults = function(results){
	console.log('show');
	var html=' ';
	$.each(results, function(index, value){
    	
		var result = results[index];
		var position = index+1;
		if (result.id.kind == 'youtube#channel'){
			var url = 'https://www.youtube.com/channel/'+result.id.channelId;
		}
		else {
			var url = 'https://www.youtube.com/watch?v='+result.id.videoId;
		}
    	var title = result.snippet.title;
    	var thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+result.snippet.thumbnails.high.url+')"></div></a>';
  
	    html += '<div class="result"><h3>'+ position +'. '+title+'</h3>'+thumb+'<p>'+result.snippet.description+'<br>'+ position +'</p></div>';

	});

Tube.prototype.getRequest = function(searchTerm, pageToken) {
	console.log('get');
	var params = {
		// s: searchTerm,
		r: 'json',
		q: searchTerm,
		part: 'snippet',
		order: 'viewCount',
		pageToken: pageToken,
		maxResults: 10,
		key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'

	};
	url = 'https://www.googleapis.com/youtube/v3/search';
	console.log(params);
	$.getJSON(url, params, function(data){
		console.log(data.items);
		showResults(data.items);

		nextPageToken = data.nextPageToken;
		prevPageToken = data.prevPageToken;
		query = searchTerm;
		});
};

Tube.prototype.start = function() {
	console.log('start');
	clearEntry();
	$('#search-form').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#user-input').val();
		getRequest(searchTerm);
	});

	entryList(html);
	clearEntry();


	
}
$('#reset').click(event, function(){
	event.preventDefault();
	$('#search-results').empty();
});
$('#next-page').click(function(event){
	console.log('here');
	event.preventDefault();
	getRequest(query, nextPageToken);
});

});

