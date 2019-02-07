/*
 * Drift view
 */
$.widget( "dawk.fossilsView", $.dawk.watchmakerView, {
    viewGainedFocus: function(event) {
        let session = $(this).fossilsView("option", "session")
        $(this).fossilsView("updateMenus", session, this)
        session.updateMenus(session, this)
    },

})
