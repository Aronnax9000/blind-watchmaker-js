$.widget('dawk.watchmakerSession', {
   options: {
       
   },
   _create: function () {
       var ul = $('<ul></ul>');
       this.element.append(ul);
       this.element.tabs();
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.element.tabs('option', 'active', 0);
  },
  newBreedingWindow: function() {
      var uuid = uuidv4();
      var string = '<li><a href="#' + uuid + '">Breeding</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
      var newTabLi = $(string);
      var ul = this.element.find('ul').get(0);
      $(ul).append(newTabLi);
      var div = $('<div id="' + uuid + '"></div>');
      this.element.append(div);
      div.breedingWindow();
      this.element.tabs("refresh");
  },
  newEngineeringWindow: function() {
      var uuid = uuidv4();
      var string = '<li><a href="#' + uuid + '">Engineering</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
      var newTabLi = $(string);
      var ul = this.element.find('ul').get(0);
      $(ul).append(newTabLi);
      var div = $('<div id="' + uuid + '"></div>');
      this.element.append(div);
      div.engineeringWindow();
      this.element.tabs("refresh");
  }
});