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
var marvelchart = Object.create(Pie);
marvelchart = {
  "theme": "dark",
};

var chart = AmCharts.makeChart( "chartdiv", Pie);

function viewCharts(topic){
  var chart = AmCharts.makeChart( "chartdiv", Pie);
}

function getRequest(searchTerm, pageToken) {
  console.log('get');

  var params = {
    r: 'json',
    q: searchTerm,
    part: 'snippet',
    order: 'viewCount',
    pageToken: pageToken,
    maxResults: 10,
    key:'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M',
  };

 
  $.getJSON(url, params, function(data){

    showResults(data.items);
    nextPageToken = data.nextPageToken;
    prevPageToken = data.prevPageToken;
    query = searchTerm;
    });
}

// 2.
//Curren
function selectGet(apiSelected){

  if (apiSelected == 'nasa'){
  var nasa = {
    url: 'https://api.nasa.gov/planetary/apod?api_key=',
    key: 'pafCzaHE6vFx9Pu1alThTDHibWb57O0aTd95rwnp',
  };
}

  else if (apiSelected == 'marvel'){
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  var privateKey = 'ef9561628f5de17da7dc979e830fe93c2a1962a0';
  var params = {
    apikey: 'ad6db08464ed1fdeb0350ccb3488b073',
    ts: Date.now(),
    }
    params.hash = md5(params.ts+privateKey+params.apikey);
  }


  $.getJSON(url, params, function(data){
    // viewCharts(data.items);
    event.preventDefault();
    console.log(data);
  });
}


// 1. Start here
$('form').submit(function(choice){
  var topic = $('input:checked').val();
  // console.log(topic);
  selectGet(topic);
  $('input:checked').prop('checked', false);
});







// end of script
});