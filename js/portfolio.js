/*
&&&&&&&&  Job Experience Templating &&&&&&&&
*/

// Pull in Experiences Data
fetch("./content/portfolio.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => generate_portfolio(data.projects));

function generate_portfolio(data) {
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
      var template = [
        "<li>",
        '<a class="rig-cell" href={{html_file}}>',
        '<img class="rig-img" src={{image}}>',
        '<span class="rig-overlay"></span>',
        '<span class="rig-text">{{title}}',
        "<br>",
        '<i class="fas fa-chevron-circle-right"></i>',
        "</span>",
        "</a>",
        "</li>",
      ].join("\n");

      console.log(data[i].html_file.slice(0, 4));
      if (data[i].html_file.slice(0, 4) != "html") {
        data[i].html_file =
          "html/portfolio_item.html?content=" +
          data[i].html_file +
          "&index=" +
          i;
      }

      var html = Mustache.render(template, data[i]);

      $("#rig").append(html);
    }
  }
}

/*
&&&&&&&&  Portfolio Generation &&&&&&&&
*/
