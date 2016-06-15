var $ = require('jquery');
require('jquery');
require('async');
require('packery'); 
require('./app');

var makeBackgroundRed = require('./background');


$(document).ready(function() {
	makeBackgroundRed();
});

