$.widget('dawk.watchmakerSession', {
   options: {
       species: null,
       name: 'Default Session',
       blindWatchmaker: null
   },
   raiseAlert: function(newMenu) {
       console.log('raise alert in watchmaker session')
       console.log(newMenu);
       var blindWatchmaker = $(this.element).watchmakerSession('option', 'blindWatchmaker');
       $(blindWatchmaker.element).blindWatchmaker('raiseAlert');
   },
   buildMenu: function(menuContents) {
       var li;
       li = $('<li><div>New Breeding</div></li>');
       menuContents.append(li);
       this._on(li, {click: 'newBreedingWindow'});

       li = $('<li><div>New Engineering</div></li>');
       menuContents.append(li);
       this._on(li, {click: 'newEngineeringWindow'});
//       console.log('watchmakerSession BuildMenu');
       
//       console.log($(this.element).tabs("option", "active"));
       var activeIndex = $(this.element).tabs("option", "active");
//       console.log(activeIndex);
       var activeView = $(this.element).find('.watchmakerView').get(activeIndex);
//       console.log("watchmakerSession.buildMenu Active view: " + activeView);
//       var viewName = $(activeView).watchmakerView('option', 'name');
//       var viewLi = $("<li><div>" + viewName + "</div></li>")
//       menuContents.append(sessionLi);
//       var viewMenu = $('<ul></ul>');
//       viewLi.append(viewMenu);
//       $(activeView).watchmakerView('buildMenu', viewMenu);
       
   },
   on_activate: function (event, ui) {
       // One of the session's views, like Breeding, has just become active.
       var newlyActiveView = $(ui.newTab).parents('.watchmakerView').get(0);
//       $(parents).watchmakerView('buildMenu');
//       console.log(ui.newPanel);
       $(ui.newPanel).trigger('dawk:viewGainedFocus');
       
   },   
   _create: function () {
       console.log('new WatchmakerSession ' + this.options.species);
       this.element.addClass('watchmakerSession');
       var ul = $('<ul class="watchmakerViewTabs"></ul>');
       this.element.append(ul);
       this.element.tabs({activate: this.on_activate});
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.element.tabs('option', 'active', 0);
       this.element.tabs("refresh");
  },
  newBreedingWindow: function() {
      var uuid = uuidv4();
      var string = '<li><a href="#' + uuid + '">Breeding</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
      var newTabLi = $(string);
      var ul = this.element.find('ul').get(0);
      $(ul).append(newTabLi);
      var div = $('<div id="' + uuid + '"></div>');
      this.element.append(div);
      div.breedingWindow({hi: 'there', test: 'data', watchmakerSession: this});
      $('.ui-closable-tab').click(
              function() {
                  var tabContainerDiv = $(this).closest(".ui-tabs")
                          .attr("id");
                  var panelId = $(this).closest("li").remove().attr(
                          "aria-controls");
                  $("#" + panelId).remove();
                  $("#" + tabContainerDiv).tabs("refresh");
                  var tabCount = $("#" + tabContainerDiv).find(
                          ".ui-closable-tab").length;
                  if (tabCount < 1) {
                      $("#" + tabContainerDiv).hide();
                  }
              });    
      this.element.tabs("refresh");
      var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
      console.log('watchmaker view tabcount '+ tabcount);
      this.element.tabs("refresh");
      this.element.tabs("option", "active", tabcount - 1);

  },
  newEngineeringWindow: function() {
      var uuid = uuidv4();
      var string = '<li><a href="#' + uuid + '">Engineering</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
      var newTabLi = $(string);
      var ul = this.element.find('ul').get(0);
      $(ul).append(newTabLi);
      var div = $('<div id="' + uuid + '"></div>');
      this.element.append(div);
      div.engineeringWindow({watchmakerSession: this});
      $('.ui-closable-tab').click(
              function() {
                  var tabContainerDiv = $(this).closest(".ui-tabs")
                          .attr("id");
                  var panelId = $(this).closest("li").remove().attr(
                          "aria-controls");
                  $("#" + panelId).remove();
                  $("#" + tabContainerDiv).tabs("refresh");
                  var tabCount = $("#" + tabContainerDiv).find(
                          ".ui-closable-tab").length;
                  if (tabCount < 1) {
                      $("#" + tabContainerDiv).hide();
                  }
              });    
      
      var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
      console.log('watchmaker view tabcount '+ tabcount);
      this.element.tabs("refresh");
      this.element.tabs("option", "active", tabcount - 1);
  }
});