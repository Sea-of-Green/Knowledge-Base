// Send newsletter signup to Mailchimp
var newsletterSignup = function() {
  var email = $('#footer__newsletter-signup-input').value;
  var link = 'http://sea-of-green.us7.list-manage2.com/subscribe?u=fdddde00588b5c6e72568d831&id=878c26efbd&MERGE0=';
  window.location.replace(link+email);
};

// Add Year to Copyright
$('#footer__copyright-year').innerHTML = new Date().getFullYear();

// Make sure footer always extends to bottom of page
// Not responsive currently (only sets the new height once)
var footer = $('.footer');
var footerHeight = footer.getBoundingClientRect().height;
var footerBottom = footer.getBoundingClientRect().bottom;
var windowHeight = window.innerHeight;

if ( footerBottom < windowHeight ) {
  footer.style.height = footerHeight + (windowHeight - footerBottom) + 1 + 'px';
}
