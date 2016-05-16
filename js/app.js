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

var nextPageToken, prevPageToken, findex;
marvelchart = {
  "theme": "dark",
};

// var chart = AmCharts.makeChart( "chartdiv", Pie);

function viewCharts(topic){
  var chart = AmCharts.makeChart( "chartdiv", Pie);
}



//4.

function showOmdb(items){
$.each(items, function(index, value){
    var result, url, thumb, title, desc, entry, site, logoPic, logo;

    result = items[index];
    thumbPic = result.Poster;
    thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+thumbPic+'); background-size: 100%"></div></a>';
    title = '<b>'+result.Title+'<br>'+result.Year+'</b><br>';
    desc = '<em>('+result.Type+')</em><br>';

    site = "http://www.imdb.com";
    logoPic = 'images/imdb.png';
    logo = '<a href="'+site+'" target="_blank"><div class="logo" style="background-image: url('+logoPic+'); background-size: 80%;"></div></a>';

    entry = '<div class="entry grid-item">'+logo+title+desc+'</div>';
    $('#starting').append(entry);
  });
}


function showTube(items){
  $.each(items, function(index, value){
    var url, thumb, title, desc, entry, site, logoPic, logo;

    var result = items[index];

    if (result.id.kind == 'youtube#channel'){
      url = 'https://www.youtube.com/channel/'+result.id.channelId;
    }
    else {
      url = 'https://www.youtube.com/watch?v='+result.id.videoId;
    }

    thumbPic = result.snippet.thumbnails.high.url;
    thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+thumbPic+')"></div></a><br>';
    title = '<b>'+result.snippet.title+'</b><br>';
    desc = '<sub>'+result.snippet.description+'</sub><br>';
    site = "http://www.youtube.com";
    logoPic = 'images/youtube.png';
    logo = '<a href="'+site+'" target="_blank"><div class="logo" style="background-image: url('+logoPic+'); background-size: 100%"></div></a>';


    entry = '<div class="grid-item entry">'+logo+thumb+title+desc+'</div>';
    $('#starting').append(entry);
      

  });
}

function showMarvel(items){
  $.each(items, function(index, value){
    var url, thumb, title, desc, comics, series, site, logo, entry;

    var result = items[index];

    url = result.urls[0].url;
    thumbPic = result.thumbnail.path+'.'+result.thumbnail.extension;
    thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+thumbPic+'); background-size: 100%"></div></a>';
    title = '<b>'+result.name+'</b><br>';
    desc = '<sub>'+result.description+'</sub><br>';
    comics = '<br>'+result.name+' is been in '+result.comics.available+' comics and ';
    series = result.series.available+' series.<br>';
    site = "http://www.marvel.com";
    logoPic = 'images/marvel.png';
    logo = '<a href="'+site+'" target="_blank"><div class="logo" style="background-image: url('+logoPic+'); background-size: 100%"></div></a>';

    entry = '<div class="entry .grid-item--width2">'+logo+thumb+'<p>'+title+desc+comics+series+'</p></div>';
    // $('#results-index').prepend(entry);
    $('#starting').prepend(entry);
    
  });
}


//2c. OMDB

function getOmdb(searchTerm, callback){
  var params = {
    r: 'json',
    s: searchTerm,
    limit: 20
  };
  var url = 'http://www.omdbapi.com/?';
  

  $.getJSON(url, params, function(data){
    console.log(data.Search);
    showOmdb(data.Search);
  });
}


//2b. YouTube
function getTube(searchTerm, callback) {
  var params = {
    r: 'json',
    q: searchTerm,
    part: 'snippet',
    order: 'viewCount',
    // pageToken: pageToken,
    maxResults: 10,
    key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'
    };
  
  url = 'https://www.googleapis.com/youtube/v3/search';
  
  $.getJSON(url, params, function(data){
    console.log(data.items);
    showTube(data.items);
    });
  }

// 2a. Marvel
function getterfallMarvel(searchTerm, callback){
  var params = {

    name: searchTerm,
    apikey: 'ad6db08464ed1fdeb0350ccb3488b073',
    ts: Date.now(),
    limit: 10,
    };
  
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  var privateKey = 'ef9561628f5de17da7dc979e830fe93c2a1962a0';
  params.hash = md5(params.ts+privateKey+params.apikey);

  $.getJSON(url, params, function(data){
    console.log(data.data.results);
    showMarvel(data.data.results);
  });

}

// 2. Async parallel thing

function doStuff (searchTerm){
  async.parallel({
      marvel: function(callback){
        getterfallMarvel(searchTerm, function(data){
          callback(null, data);
        });
      },
      youTube: function(callback){
        getTube(searchTerm, function(data){
          callback(null, data);
        });
      },
      ombd: function(callback){
        getOmdb(searchTerm, function(data){
          callback(null, data);
        });
      },
    },

    function(err, results){
      console.log(err, results);
    });
}




// 0. 
$('input[type="text"]').focus();

// 1. Start here
$('form').submit(function(event){
  event.preventDefault();
  var searchTerm = $('input[type="text"]').val();
  doStuff(searchTerm);
  $('input[type="text"]').val('');
});







// end of script
});

$('.grid').packery({
  // options
  itemSelector: '.grid-item',
  gutter: 100
});