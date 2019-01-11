$.widget('dawk.watchmakerView', {
  options: {
      session: null
  },
  _create: function() {
      this._super("_create")
      $(this.element).addClass('watchmakerView')
  },
  _init: function() {
      $(this.element).on('dawk:viewGainedFocus', this.viewGainedFocus)
  },
  viewGainedFocus: function(event) {
  },
  buildMenu: function(menuContents) {
      let li = $('<li><div>Close View</div></li>')
      menuContents.append(li)
  },
})