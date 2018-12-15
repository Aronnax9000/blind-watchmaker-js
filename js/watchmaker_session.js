$.widget('dawk.watchmakerSession', {
   options: {
       
   },
   _create: function () {
       var ul = $('<ul></ul>');
       this.element.append(ul);
       this.element.tabs();
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.element.tabs('option', 'active', 0);
  },
  newBreedingWindow: function() {
      var newTabLi = $('<li><a href="#breeding">Breeding</a></li>');
      this.element.find('ul').append(newTabLi);
      var div = $('<div id="breeding"></div>');
      this.element.append(div);
      div.breedingWindow();
      this.element.tabs("refresh");
  },
  newEngineeringWindow: function() {
      var newTabLi = $('<li><a href="#engineering">Engineering</a></li>');
      this.element.find('ul').append(newTabLi);
      var div = $('<div id="engineering"></div>');
      this.element.append(div);
      div.engineeringWindow();
      this.element.tabs("refresh");
  }
});