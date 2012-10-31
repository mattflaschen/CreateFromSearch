// ==UserScript==
// @name        Create From Search
// @namespace   https://github.com/mattflaschen
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://en.wikipedia.org/w/index.php?title=Special%3ASearch*&search=*
// @include     http://en.wikipedia.org/w/index.php?title=Special:Search*&search=*
// @version     1
// ==/UserScript==

function makeButton(text, click)
{
	// Production version would use classes and separate CSS file.
	return $('<button />',
	       {
		       text: text,
		       click: click,
		       css:
		       {
			       backgroundColor: 'blue',
			       color: 'white',
			       width: '200px',
			       height: '40px',
			       fontWeight: 'bold'
		       }
	       });
}

var $doesNotExist = $('.mw-search-createlink');
$('i, br', $doesNotExist).remove();
var page = $('#searchText').val();

var $create = $('<div />',
	       {
		       css:
		       {
			       marginLeft: '0.4em'
		       }
	       });
var $button;
if(unsafeWindow.mw.config.get('wgUsername') === null)
{
		$button = makeButton('Log In', function()
                {
			window.location.href = $('#pt-login a').attr('href');
		});
}
$create.append($('<p />',
		       {
			       text: 'To create the "' + page + '" article:',
			       css:
			       {
				       fontSize: '135%',
				       fontWeight: 'bold',
				       marginLeft: '0',
				       marginBottom: '0.2em'
			       }
		       }), $button);
$doesNotExist.append($create);
