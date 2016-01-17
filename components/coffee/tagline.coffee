$ = require 'jquery'

do fill = (item = 'Next Chat: February 2,2016!') ->
	$('.tagline').append "#{item}"
fill