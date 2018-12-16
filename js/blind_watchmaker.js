$.widget('dawk.blindWatchmaker', {
   options: {
       
   } ,
   _create: function () {
       var ul = $('<ul></ul>');
       this.element.append(ul);
       this.element.tabs();
       this.newMonochromeSession();
       this.element.tabs('option', 'active', 0);
       this.element.tabs("refresh");
       
   },
   newMonochromeSession: function() {
       var newTabLi = $('<li><a href="#monochrome">Monochrome</a></li>');
       this.element.find('ul').append(newTabLi);
       var div = $('<div id="monochrome"></div>');
       this.element.append(div);
       div.watchmakerSession();
       this.element.tabs("refresh");
   },

});