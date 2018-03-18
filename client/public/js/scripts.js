var btnMenu = document.getElementById('btn-menu');
var nav = document.getElementById('nav');

btnMenu.addEventListener('click', function(){
    nav.classList.toggle('mostrar');
})

var $doc = $('html, body');
  $('a').click(function() {
  $doc.animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});
            

