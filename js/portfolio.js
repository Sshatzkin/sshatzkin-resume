/*
&&&&&&&&  Job Experience Templating &&&&&&&&
*/

// Pull in Experiences Data
fetch("../content/portfolio.json")
.then(response => {
   return response.json();
})
.then(data => generate_portfolio(data.projects));

function generate_portfolio(data){
  console.log(data);
  console.log(data.length);

  /*<li>
      <a class="rig-cell" href="html/portfolio.html#EB">
        <img class="rig-img" src="img\EarlyBird\4-3.png">
        <span class="rig-overlay"></span>
        <span class="rig-text">Early Bird
          <br>
          <i class="fas fa-chevron-circle-right"></i>
        </span>
      </a>
    </li>
  */

  // Loop through each project
  for (var i = 0; i < data.length; i++) {
    if (data[i].display == true) {
      console.log(data[i]);
      var template = [
        '<li>',
        '<a class="rig-cell" href={{html_file}}>',
          '<img class="rig-img" src={{image}}>',
          '<span class="rig-overlay"></span>',
          '<span class="rig-text">{{title}}',
            '<br>',
            '<i class="fas fa-chevron-circle-right"></i>',
          '</span>',
        '</a>',
      '</li>'
      ].join("\n");

      // template: '<div ...>\n<h1 ...>{{title}}<h1>\n</div>'

      var html = Mustache.render(template, data[i]);
      
    
      console.log(html);
      $("#rig").append(html);
    }

  }

}



/*
&&&&&&&&  Portfolio Generation &&&&&&&&
*/