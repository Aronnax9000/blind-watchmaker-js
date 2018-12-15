$.widget('dawk.watchmakerSession', {
   options: {
       
   } ,
   _create: function () {
       var ul = $('<ul></ul>');
       this.element.append(ul);
       this.element.tabs();
       var newTabLi = $('<li><a href="#breeding">Breeding</a></li>');
       ul.append(newTabLi);
       var div = $('<div id="#breeding"></div>');
       this.element.append(div);
       div.breedingWindow();
       this.element.tabs("refresh");
     },

});