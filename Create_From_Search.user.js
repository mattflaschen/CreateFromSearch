// ==UserScript==
// @name        Create From Search
// @namespace   https://github.com/mattflaschen
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://en.wikipedia.org/w/index.php?*search=*
// @version     1
// ==/UserScript==

// Production version would use classes and separate CSS file.
function addButtonCss($btn, isPrimary)
{
	return $btn.css(
	{
		border: '1px solid black',
		borderRadius: '4px',
		backgroundColor: isPrimary ? 'blue' : '#C9FFF6',
		color: isPrimary ? 'white' : 'black',
		display: 'inline-block',
		minWidth: '200px',
		fontWeight: 'bold',
		marginRight: '5px',
		paddingBottom: '10px',
		paddingTop: '10px',
		textAlign: 'center',
		textDecoration: 'none'
	});
}

function makeButton(text, url, isPrimary)
{
	var $btn = $('<a />',
	{
		text: text,
		href: url
	});
	return addButtonCss($btn, isPrimary);
}

var mw = unsafeWindow.mw; // prototype-only

var $doesNotExist = $('.mw-search-createlink');
$('i, br', $doesNotExist).remove();

var page = $('#searchText').val();
page = page.charAt(0).toUpperCase() + page.substr(1);

var $create = $('<div />',
	       {
		       css:
		       {
			       marginLeft: '0.4em'
		       }
	       });
var $buttons;
if(mw.config.get('wgUserName') === null)
{
	$buttons =
	[
		makeButton('Log In', $('#pt-login a').attr('href'), true),
		makeButton('Sign Up', $('#pt-createaccount a').attr('href'), true)
	];
}
else
{
	var readUrl = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=';
	var editUrl = mw.config.get('wgServer') + mw.config.get('wgScript') + '?action=edit&title=';
	$buttons =
	[
		makeButton('Learn More', readUrl + 'Wikipedia:Your_first_article', true),
		makeButton('Create Draft', editUrl + 'Special:MyPage/Sandbox/' + page, true),
		makeButton('Create Immediately', editUrl + page, false)
	];
}

$create.append($('<p />',
		       {
			       text: 'You can create the "' + page + '" article:',
			       css:
			       {
				       fontSize: '135%',
				       fontWeight: 'bold',
				       marginLeft: '0',
				       marginBottom: '0.2em'
			       }
		       }), $buttons);
$doesNotExist.append($create);
