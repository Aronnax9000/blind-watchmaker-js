$.widget('dawk.blindWatchmaker', {
   options: {
       
   } ,
   _create: function () {
     var ul = $('<ul></ul>');
     this.element.append(ul);
     this.element.tabs();
     var newTabLi = $('<li><a href="#monochrome">Monochrome</a></li>');
     ul.append(newTabLi);
     var div = $('<div id="#monochrome"></div>');
     this.element.append(div);
     div.watchmakerSession();
     this.element.tabs("refresh");
   },
});