// ==UserScript==
// @name        Create From Search
// @namespace   https://github.com/mattflaschen
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://en.wikipedia.org/w/index.php?*search=*
// @include     http://en.wikipedia.org/w/index.php?title=Special:UserLogin&action=submitlogin&type=login*
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
		fontSize: '120%',
		fontWeight: 'bold',
		marginRight: '5px',
		paddingBottom: '10px',
		paddingTop: '10px',
		textAlign: 'center',
		textDecoration: 'none'
	});
}

function makeButton(text, title, url, isPrimary)
{
	var $btn = $('<a />',
	{
		text: text,
		title: title,
		href: url
	});
	return addButtonCss($btn, isPrimary);
}

function addSearchButtons()
{
	var $doesNotExist = $('.mw-search-createlink');
	if($('a.new', $doesNotExist).length == 0)
	{
		return; // Article already exists, despite mw-search-createlink
	}
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
			makeButton('Log In', 'Log in to Wikipedia', $('#pt-login a').attr('href'), true),
			makeButton('Sign Up', 'Create a Wikipedia account', $('#pt-createaccount a').attr('href'), true)
		];
	}
	else
	{
		var readUrl = mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=';
		var editUrl = mw.config.get('wgServer') + mw.config.get('wgScript') + '?action=edit&title=';
		$buttons =
		[
			makeButton('Learn More', 'Learn about creating your first article', readUrl + 'Wikipedia:Your_first_article', true),
			makeButton('Create Draft', 'Create a draft in your personal sandbox', editUrl + 'Special:MyPage/Sandbox/' + page, true),
			makeButton('Create Immediately', 'Create an article on the live encyclopedia', editUrl + page, false)
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
}

function addReturnButton()
{
	var $returnTo = $('#mw-returnto');
	var html = $returnTo.html();
	var url = $('a', $returnTo).attr('href');
	var $btn = makeButton('Return', 'Return to your previous page', url, true);
	html = html.replace('Return', '');
	$returnTo.html(html).prepend($btn);
}

var mw = unsafeWindow.mw; // prototype-only

var pageName = mw.config.get('wgPageName');
if(pageName == 'Special:UserLogin')
{
	addReturnButton();
}
else if(pageName == 'Special:Search')
{
	addSearchButtons();
}

