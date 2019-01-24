$.widget('dawk.about', {
    options: {
        slides: ['img/AboutBlindWatchmaker_PICT_26817_463x287.png',
            'img/AboutColourWatchmaker_PICT_00257_486x352.png',
            'img/AboutArthromorphs.png',
            'img/AboutWatchmakerJS2.png'
        ]
    },
    _create: function() {
        let slides = this.options.slides
        for(let i = 0; i < slides.length; i++) {
            let div = $("<div>").appendTo(this.element)
            // this is your chance to conditionally add a widget instead of an img.
            let img = $("<img>").appendTo(div)
            $(img).attr('src', slides[i])
            if(i == 0) {
                $(img).addClass('active')
            }
        }
        $(this.element).dialog({
//            open: function (event, ui) {
//                $(this.element).css('overflow', 'hidden'); //this line does the actual hiding
//              },
            width: '1240px',
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