/*
&&&&&&&&  Job Experience Templating &&&&&&&&
*/

// Pull in Experiences Data
fetch(window.location.origin + "/content/experiences.json")
.then(response => {
   return response.json();
})
.then(data => generate_experiences(data.experiences));

function generate_experiences(data){
  // Example html of a resume entry
  /*<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">
              <img src="img\Experience Icons\hci_lab.jpg" class="icon_photo"> &nbsp
              Human Computer Intigration Lab - Chicago, IL
            </h3>
            <div class="subheading mb-3">Undergrad Research Assistant (Unity, HTC Vive, Arduino)</div>
            <ul class="fa-ul mb-0" style="list-style-type:disc;">
              <li>
                Design immersive VR applications which interface with experimental haptic devices 
              </li>
            </ul>
          </div>
          <div class="resume-date text-md-right">
            <span class="text-primary">November 2021 - Present</span>
          </div>
        </div>
  */

  // Loop through each experience
  for (var i = 0; i < data.length; i++) {
    if (data[i].display == true) {
      var template = [
          '<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">',
          ' <div class="resume-content">',
          '   <h3 class="mb-0">',
          '     {{#image}}',
          '       <img src="img\\Experience Icons\\{{image}}" class="icon_photo"> &nbsp',
          '     {{/image}}',
          '     {{company}} -  {{location}}',
          '   </h3>',
          '   <div class="subheading mb-3">{{title}}{{#skills}} ({{skills}}){{/skills}}</div>',
          '   <ul class="fa-ul mb-0" style="list-style-type:disc;">',
          '     {{#details}}',
          '       <li>{{.}}</li>',
          '     {{/details}}',
          '   </ul>',
          ' </div>',
          ' <div class="resume-date text-md-right">',
          '   <span class="text-primary">{{startDate}}{{#endDate}} - {{endDate}}{{/endDate}}</span>',
          ' </div>',
          '</div>'
      ].join("\n");

      // template: '<div ...>\n<h1 ...>{{title}}<h1>\n</div>'

      var html = Mustache.render(template, data[i]);
      
      $("#experience-container").append(html);
    }

  }

}



/*
&&&&&&&&  Portfolio Generation &&&&&&&&
*/