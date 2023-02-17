var url = window.location.href;
var params = (new URL(url)).searchParams;
var content = params.get("content");
console.log("content: " + content);
var index = params.get("index");
console.log("index: " + index);


$(function(){
  $("#includedContent").load("../content/projects/" + content + ".html"); 
});