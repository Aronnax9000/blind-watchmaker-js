/*
 * Album Page view
 */
$.widget( "dawk.albumPageView", $.dawk.watchmakerView, {
    viewGainedFocus: function(event, ui) {
        console.log('albumPageView gained focus')
        let session  = $(this).albumPageView("option", "session")
        $(this).albumPageView("updateMenus", session, this)
        session.updateMenus(session, this)
        // resume animation (if enabled) here?
    },
})
