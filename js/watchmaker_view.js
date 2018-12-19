$.widget('dawk.watchmakerView', {
  options: {
      speciesFactory: null,
  },
  _create: function() {
      
      $(this.element).addClass('watchmakerView');
      
  },
  _init: function() {
      $(this.element).on('dawk:viewGainedFocus', this.viewGainedFocus);
  },
  viewGainedFocus: function(event) {console.log('View gained focus');}
  ,
  buildMenu: function(menuContents) {
      console.log('in view buildmenu');
      var li;
      li = $('<li><div>Close View</div></li>');
      menuContents.append(li);
  },
})