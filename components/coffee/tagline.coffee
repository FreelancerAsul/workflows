$ = require 'jquery'

do fill = (item = 'Next Chat: February 2,2015.') ->
	$('.tagline').append "#{item}"
fill