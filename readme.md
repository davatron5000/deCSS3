# deCSS3

deCSS3 is a bookmarklet that will let you see how well your pages are gracefully degrading without having to open up IE6-8.

Drag this -> [deCSS3](javascript:s=document.createElement('script'\);s.type='text/javascript';s.src='http://raw.github.com/davatron5000/deCSS3/master/deCSS3.js?v='+parseInt(Math.random(\)*99999999\);document.body.appendChild(s\);)

## TODO

* Create `gh-pages` for bookmarklet (see below)
* Create `emptyStyles` function that loops through CSS and empties out all (parenthetical) properties.

Fun part: minimum browser requirement is modern browsers only.

## Feature Roadmap Matrix in the Cloud

Our cloud-based feature matrix serves as a roadmap for what is hopefully full support for all CSS3 properties.

<table>
<thead>
<tr>
  <th>Feature</th><th>Currently Supported?</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>animation</code></td><td>No</td>
</tr>
<tr>
  <td><code>background-clip</code></td><td>No</td>
</tr>
<tr>
  <td><code>background-origin</code></td><td>No</td>
</tr>
<tr>
  <td><code>background-size</code></td><td>No</td>
</tr>
<tr>
  <td><code>border-radius</code></td><td>Yes</td>
</tr>
<tr>
  <td><code>box-shadow</code></td><td>Yes</td>
</tr>
<tr>
  <td>colors: <code>rgb, rgba, hsl, hsla</code></td><td>No</td>
</tr>
<tr>
  <td><code>column-count</code></td><td>Yes</td>
</tr>
<tr>
  <td><code>linear-gradient</code></td><td>No</td>
</tr>
<tr>
  <td><code>@media</code> queries</td><td>No</td>
</tr>
<tr>
  <td>multiple backgrounds</td><td>No</td>
</tr>
<tr>
  <td><code>text-shadow</code></td><td>Yes</td>
</tr>
<tr>
  <td><code>transform</code></td><td>Yes</td>
</tr>
<tr>
  <td><code>transition</code></td><td>Yes</td>
</tr>
</tbody>
</table>

### Bookmarklet

		javascript:(function(){
		  s=document.createElement('script');
		  s.type='text/javascript';
		  s.src='http://raw.github.com/davatron5000/deCSS3/master/deCSS3.js';
		  document.body.appendChild(s);
		})();