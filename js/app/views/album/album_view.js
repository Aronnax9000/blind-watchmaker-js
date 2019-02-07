/*
 * Album view
 */
$.widget( "dawk.albumView", $.dawk.watchmakerView, {
    viewGainedFocus: function(event, ui) {
        console.log('albumView gained focus')
        let session  = $(this).albumView("option", "session")
        $(this).albumView("updateMenus", session, this)
        session.updateMenus(session, this)
        // resume animation (if enabled) here?
    },
})
