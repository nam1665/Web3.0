
$(document).ready(function(){
  var source = $("#girl_item_template").html();

  var girlItemTemplate = Handlebars.compile(source);

  requestNextPage(girlItemTemplate);

  $(window).on('scroll', function(){
    if($(document).height() <= $(window).scrollTop() + $(window).height() + 500){
      setTimeout(function(){
        requestNextPage(girlItemTemplate);
     }, 1000);
    }
  });

});

var isLoading = false;
var masonryInitialized = false;
var requestNextPage = function(girlItemTemplate){

  if(isLoading) return;
  isLoading = true;

  $.ajax({
    type : "GET",
    url : "../imagesData.json",
  }).done(function(data){
    if (masonryInitialized) {
    var $newItems = $(girlItemTemplate(data));
    $("#girl_item_container").append($newItems);
    $("#girl_item_container").masonry('appended', $newItems);
    }
    else{
      $("#girl_item_container").html(
				girlItemTemplate(data)
			);
    $("#girl_item_container").masonry({
      itemSelector: '.girl_item',
      columnWidth: '.girl_item',
      percentPosition: true
    });
    masonryInitialized = true;

  }
  }).fail(function(error){
    console.log(error);
  }).always(function(){
    isLoading = false;
  });
}
