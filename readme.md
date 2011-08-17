# deCSS3

deCSS3 is a bookmarklet that will let you see how well your pages are gracefully degrading without having to open up IE6-8.

## TODO

* Create `gh-pages` for bookmarklet (see below)
* Create `emptyStyles` function that loops through CSS and empties out all (parenthetical) properties.

Fun part: minimum browser requirement is modern browsers only.

### Bookmarklet

		javascript:(function(){
		  s=document.createElement('script');
		  s.type='text/javascript';
		  s.src='http://raw.github.com/davatron5000/deCSS3/master/deCSS3.js';
		  document.body.appendChild(s);
		})();