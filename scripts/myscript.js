// Returns true if the specified element is in the window, based on its top & middle position
 function isScrolledIntoView(elem) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height();
   var elemTop = $(elem).offset().top;
   var elemBottom = elemTop + ($(elem).height() / 4) + 10;
   elemTop = elemTop + ($(elem).height() / 4) - 10;
     return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
 }

 function isHeaderHidden(elem) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height();
   var elemTop = $(elem).offset().top;
   var elemBottom = elemTop + $(elem).height();
   return (elemBottom - 64 < docViewTop);
 }

 $(document).ready(function() {

   var animating = false;
   $('.nav-link').on('click', function(e) {
     e.preventDefault();

     var href = $(this).attr('href');

      // Give clicked header link 'active' class
     $('#header nav-bar a h4').removeClass('active');
     $('#header nav-bar a[href="' + href + '"] h4').addClass('active');

           // Don't animate on smaller screens, to help performance
           var animationTime = 0;
           if ($(window).width() > 680)
               animationTime = 1000;

     // Stop current animations and animate to position of link's href
     $('html, body').stop(true, false);

     animating = true;
     $('html, body').animate({
       scrollTop: $(href).offset().top
     }, animationTime, function() {
       animating = false;
     });
           // Hide hamburger menu if it's currently showing
     $('#mobile_nav_toggle .hamburger').removeClass('is-active');
     document.body.classList.remove('hamburgler-active');
   });

   // Set active header link when the user scrolls to the corresponding section
   var ids = [];
   $('#header nav-bar a.nav-link').each(function() { ids.push($(this).attr('href')); });
   $(document).scroll(function() {

     if (animating)
       return;

     var found = false;
     for (var i = 0; i < ids.length; i++) {
       if (isScrolledIntoView($(ids[i]))) {
         $('#header nav a h4').removeClass('active');
         $('#header nav a[href="' + ids[i] + '"] h4').addClass('active');
         found = true;
       }
     }
     if (!found) {
       $('#header nav a h4').removeClass('active');
     }
   });

  // Set active header link based on initial URL & hash
   var currHash = '#home';
   if(window.location.hash) {
     currHash = window.location.hash;
   }
   $('#header nav a[href="' + currHash + '"] h4').addClass('active');
 });
