

/* trigger when page is ready */
$(document).ready(function (){

    $("a[rel=external]").click(function(){
        window.open(this.href);
        return false;
    });
    
    
  /*
  OWN CAROUSEL
  var owl = $('.owl-carousel');
    owl.owlCarousel({
    items:4,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplayHoverPause:true,
    nav: true,
    dots: true,
    navText: ["<img src='assets/images/prev@2x.png'>","<img src='assets/images/next@2x.png'>"],
     responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
}); 

*/
    
    
/*
SCROLL REVIEW
var slideUp1 = {
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    viewFactor: 0.5,
    delay: 0
};    
var slideUp2 = {
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    viewFactor: 0.5,
    delay: 100
};    
var slideUp3 = {
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    viewFactor: 0.5,
    delay: 220
};    
var slideUp4 = {
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    viewFactor: 0.5,
    delay: 300
};


ScrollReveal().reveal('.anima1',slideUp1);
ScrollReveal().reveal('.anima2', slideUp2);
ScrollReveal().reveal('.anima3', slideUp3);
ScrollReveal().reveal('.anima4', slideUp4);
*/

/*
SMOOTH SCROLL (scroll to)
var scroll = new SmoothScroll('a[href*="#"]');
*/  
  
/* submenu hover  
function toggleDropdown (e) {
  const _d = $(e.target).closest('.dropdown'),
    _m = $('.dropdown-menu', _d);
  setTimeout(function(){
    const shouldOpen = e.type !== 'click' && _d.is(':hover');
    _m.toggleClass('show', shouldOpen);
    _d.toggleClass('show', shouldOpen);
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
  }, e.type === 'mouseleave' ? 300 : 0);
}

$('body')
  .on('mouseenter mouseleave','.dropdown',toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);
 submenu hover fim */   
    
    

});



	
	/* optional triggers
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});
	
	*/