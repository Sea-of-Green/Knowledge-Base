// Add query strings to external links
// @link https://gist.github.com/lowmess/473f4c425b5be8d26e00

var addQueryString = function ( el, queryString ) {

  // Check if el is a link
  if ( !el.href ) {
    console.log(el + ': \n this element is not a link or is missing an href');
    return;
  }

  // Check if el uses an HTTP request
  if ( el.protocol !== 'http:' && el.protocol !== 'https:' ) {
    console.log(el.href + ': \n this link is not using an HTTP protocol');
    return;
  }

  // Check if link host does not match current window host
  if ( window.location.host !== el.host ) {

    // If link already has a query string add to it, else create one
    if ( el.search ) {
      el.search += '&' + queryString;
    } else {
      el.search = queryString;
    }
  }
};

var links     = $$('a');
var utmString = 'utm_source=sea-of-green&utm_medium=referral';

for ( var i = 0; i < links.length; i++ ) {
  // Add query string to valid links
  addQueryString(links[i], utmString);
}
