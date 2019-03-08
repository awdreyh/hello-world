// JavaScript Document

$(document).ready(function(){
    $.getJSON( "../customers.json", function( data ) {
  var customers = [];
  $.each( data, function( key, val ) {
    customers.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: customers.join( "" )
  }).appendTo( "body" );
});
    
});