/*
&&&&&&&&  Generate Pagination Buttons &&&&&&&&
*/

// Pull in Experiences Data
fetch("./content/portfolio.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => generate_pagination_buttons(data.projects));

function generate_pagination_buttons(data) {
  // A list of unique html files to be included in pagination
  var html_list = unique_htmls(data);

  // Get the name of the current html file
  var current_html = window.location.pathname.match(/[^/].*html/g);

  // Get the index of the current html file in the pagination list
  var curr_pagination = get_current_index(html_list, current_html);

  var list_distance = 3; // Distance in direction of curr that pagination will show
  var pagination_start = Math.max(curr_pagination - list_distance, 0);
  var pagination_end = Math.min(
    curr_pagination + list_distance,
    html_list.length - 1
  );

  // Append back button
  if (curr_pagination > 0) {
    var template = ["<a href={{html}}>&laquo;</a>"].join("\n");

    var template_data = {
      html: "../" + html_list[curr_pagination - 1],
    };

    var html = Mustache.render(template, template_data);
    $(".pagination").append(html);
  }

  // Loop over each html to be included in pagination
  for (var i = pagination_start; i <= pagination_end; i++) {
    var template = [
      '<a {{#active}}class="active"{{/active}} href={{html}}>{{i}}</a>',
    ].join("\n");

    // The object containing the data to be included in the current pagination item
    var template_obj = {
      html: "../" + html_list[i],
      i: i + 1,
    };

    // If generating pagination button for current page, make active
    if (i == curr_pagination) {
      template_obj.active = true;
    }

    var html = Mustache.render(template, template_obj);

    $(".pagination").append(html);
  }

  // Append forward button
  if (curr_pagination < html_list.length - 1) {
    var template = ["<a href={{html}}>&raquo;</a>"].join("\n");

    var template_data = {
      html: "../" + html_list[curr_pagination + 1],
    };

    var html = Mustache.render(template, template_data);
    $(".pagination").append(html);
  }
}

/*
&&&&&&&&  Helpers &&&&&&&&
*/
function unique_htmls(projects) {
  var unique_htmls = {};

  for (var i = 0; i < projects.length; i++) {
    var html_address = projects[i].html_file;
    var regex = /.*html/g;
    var found = html_address.match(regex);

    if (!(found in unique_htmls)) {
      unique_htmls[found] = true;
    }
  }

  return Object.keys(unique_htmls);
}

function get_current_index(list, item) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] == item) {
      return i;
    }
  }
}
