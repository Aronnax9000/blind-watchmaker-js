$.widget('dawk.about', {
    options: {
        slides: ['img/AboutBlindWatchmaker_PICT_26817_463x287.png',
            'img/AboutColourWatchmaker_PICT_00257_486x352.png',
            'img/AboutArthromorphs.png']
    },
    _create: function() {
        let slides = this.options.slides
        for(let i = 0; i < slides.length; i++) {
            let div = $("<div>").appendTo(this.element)
            let img = $("<img>").appendTo(div)
            $(img).attr('src', slides[i])
            if(i == 0) {
                $(img).addClass('active')
            }
        }
        $(this.element).dialog({
            width: 600,
//          position: { my: "left top", at: "left+312 top+104", of: this.options.appendTo },
            classes: 
            {
                "ui-dialog": "about",
                "ui-dialog-titlebar": "dialogNoTitle",
            }
        ,
        modal: true
        })
        $(this.element).slick({
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    }
})