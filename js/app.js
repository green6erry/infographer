$(function(){


// var Pie = {
//   "type": "pie",
//   "theme": "light",
//   "dataProvider": [ {
//     "country": "Lithuania",
//     "litres": 501.9
//   }, {
//     "country": "Czech Republic",
//     "litres": 301.9
//   }, {
//     "country": "Ireland",
//     "litres": 201.1
//   }, {
//     "country": "Germany",
//     "litres": 165.8
//   }, {
//     "country": "Australia",
//     "litres": 139.9
//   }, {
//     "country": "Austria",
//     "litres": 128.3
//   }, {
//     "country": "UK",
//     "litres": 99
//   }, {
//     "country": "Belgium",
//     "litres": 60
//   }, {
//     "country": "The Netherlands",
//     "litres": 50
//   } ],
//   "valueField": "litres",
//   "titleField": "country",
//    "balloon":{
//    "fixedPosition":true
//   },
//   "export": {
//     "enabled": true
//   }
// }

var Pie = {
  "type": "pie",
  "theme": "light",
  "dataProvider": [ {
    "country": "Creators",
    "litres": 501.9
  }, {
    "country": "Character",
    "litres": 301.9
  }, {
    "country": "Series",
    "litres": 201.1
  }, {
    "country": "Germany",
    "litres": 165.8
  }, {
    "country": "Australia",
    "litres": 139.9
  }, {
    "country": "Austria",
    "litres": 128.3
  }, {
    "country": "UK",
    "litres": 99
  }, {
    "country": "Belgium",
    "litres": 60
  }, {
    "country": "The Netherlands",
    "litres": 50
  } ],
  "valueField": "litres",
  "titleField": "country",
   "balloon":{
   "fixedPosition":true
  },
  "export": {
    "enabled": true
  }
}

var apiType = '';
var marvelchart = Object.create(Pie);

var nextPageToken, prevPageToken, query, findex;
marvelchart = {
  "theme": "dark",
};

var chart = AmCharts.makeChart( "chartdiv", Pie);

function viewCharts(topic){
  var chart = AmCharts.makeChart( "chartdiv", Pie);
}



//4.

function getterfallTube(searchTerm, pageToken){
  var params = {
    r: 'json',
    q: searchTerm,
    part: 'snippet',
    order: 'viewCount',
    pageToken: pageToken,
    maxResults: 10,
    key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'

  };
  url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, function(data){
    console.log(data.items);
    showResults(data.items);

    nextPageToken = data.nextPageToken;
    prevPageToken = data.prevPageToken;
    query = searchTerm;
    });
}

//3.

function addResults(results, api){
  console.log('show');
  var html=' ';
  $.each(results, function(index, value){
    var result = results[index];
    console.log(result);
    
    html += '<p>'+result.firstName+'</p><h2>'+result.fullName+'</h2>';
    

    $('#results-index').append('<div id="results-'+api+'">'+html+'</div>');

  });

  
}

// 2.

function getterfallMarvel(searchTerm){

  apiType = 'marvel';
  var url = 'http://gateway.marvel.com:80/v1/public/creators';
  var privateKey = 'ef9561628f5de17da7dc979e830fe93c2a1962a0';
  var input = searchTerm;
  var params = {

    firstName: input,
    apikey: 'ad6db08464ed1fdeb0350ccb3488b073',
    ts: Date.now()
    };
  params.hash = md5(params.ts+privateKey+params.apikey);

  $.getJSON(url, params, function(data){
    if(data.data.total > 0) {
      addResults(data.data.results, apiType);
      var logo = '<a href="www.marvel.com"><img src="images/marvel.png" alt="Marvel logo" /></a>';

    }

    getterfallTube(searchTerm);
  });

}

// 0. 
$('input[type="text"]').focus();

// 1. Start here
$('form').submit(function(event){
  event.preventDefault();
  var searchTerm = $('input[type="text"]').val();
  console.log(searchTerm);
  getterfallMarvel(searchTerm);
  $('input[type="text"]').val('');
});







// end of script
});