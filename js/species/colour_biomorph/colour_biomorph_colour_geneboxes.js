$.widget( "dawk.backgroundColourGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasLeftRight: false,
        hasColor: true
    },
    _launchPicker: function() {
        $(this.element).tooltip('disable')
        $('<div class="backgroundColourGenebox"></div>').colourPicker({
            colourGenebox: this.element,
            colors: this.options.colors,
            title: this.options.title,
            value: this.options.value,
            appendTo: this.element
        })

    },
    manipulate: function(event) {
        let value = $(event.target).data("value")
        $(this.element).parents('.colourGeneboxes').eq(0).colour_geneboxes(
                "manipulate",
                this.options.geneboxIndex, 
                value, 0)
                return false;

    },  
    _create: function() {
        this.element.addClass('backgroundColourGenebox')
        return this._super()
    },    
} );

$.widget( "dawk.colourGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasLeftRight: false,
        hasColor: true
    },
    _launchPicker: function() {
        $(this.element).tooltip('disable')
        $('<div class="colourGenebox"></div>').colourPicker({
            colourGenebox: this.element,
            colors: this.options.colors,
            title: this.options.title,
            value: this.options.value,
            appendTo: this.element
        })

    },
    manipulate: function(event) {
        let value = $(event.target).data("value")
        $(this.element).parents('.colourGeneboxes').eq(0).colour_geneboxes(
                "manipulate",
                this.options.geneboxIndex, 
                value, 0)
                return false;

    },  
    _create: function() {
        this.element.addClass('colourGenebox')
        return this._super()
    },    
} );

$.widget('dawk.colourPicker', {
    options: {
        colourGenebox: null,
        value: '',
        title: 'Untitled Colour Picker',
        colors: []
    },
    _create: function() {
        $(this.element).addClass('colourPicker')
        this.element.attr('title', this.options.title)

        let colors = this.options.colors
        let value = this.options.value

        let colourSwatchTemplate = '<div class="colourPickerCubeSwatch"></div>'; 

        let counterFloor = 0

        let cubeDiv = $('<div class="colourPickerCubeDiv"></div>').appendTo(this.element)
        for(let cubeRow = 0; cubeRow < 6; cubeRow++) {
            let templateSlice = $('<div class="colourPickerCubeDivSlice"></div>').appendTo(cubeDiv)
            for(let i = counterFloor; i < counterFloor + 36; i++) {
                let colorswatch = $(colourSwatchTemplate)
                $(templateSlice).append(colorswatch)
                let color = colors[i]
                $(colorswatch).css('background-color', color)
                $(colorswatch).data('value', i)
                this._on(colorswatch, {click: "_colorSwatchClicked"})
                if(color == value) {
                    $(colorswatch).addClass('selected')
                }
            }
            counterFloor += 36
        }

        colourSwatchTemplate = '<div class="colourPickerRampSwatch"></div>'; 
        template = $('<div class="colourPickerRampDiv"></div>').appendTo(this.element)
        for(let i = 216; i < 256; i++) {
            let colorswatch = $(colourSwatchTemplate)
            $(template).append(colorswatch)
            let color = colors[i]
            $(colorswatch).css('background-color', color)
            $(colorswatch).data('value', i)
            this._on(colorswatch, {click: "_colorSwatchClicked"})
            if(color == value) {
                $(colorswatch).addClass('colourPickerSelected')
            }
        }
        $(this.element).append(template)

        let engineeringBox = $(this.options.appendTo).parents('.engineeringView').find('.engineeringBox').eq(0)
        $(this.element).dialog({
            width: 220,
            height: 230,
            title: this.options.title,
            draggable: true,
            modal: true,
            appendTo: this.options.appendTo,
            close: function(event, ui) {
                let colourGenebox = $(event.target).dialog("option", "appendTo")
                $(colourGenebox).tooltip('enable')    
            },
            position: {
                my: 'left top',
                at: 'left+20px top+20px',
                of: engineeringBox
            },
            offset: {
                left:20,
                right:20
            }
        })
    },
    _colorSwatchClicked: function(event) {
        $(this.options.colourGenebox).colourGenebox("manipulate", event)
    }
});

