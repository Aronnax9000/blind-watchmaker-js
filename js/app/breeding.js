function getBiomorphFromCanvas(canvas) {
    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}

$( function() {
    $.widget( "dawk.breedingOffspringCounter", {

        _create: function() {
            $(this.element).addClass('breedingOffspringCounter');
            var string = '<span>Offspring count: <input type="number" value="0" class="generations" />\
                Offspring per second: <input type="number" value="0"\
                class="generationRate" />\
                </span>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.breedingView", $.dawk.watchmakerView, {
    options: { 
        species: null,
        watchmakerSessionTab: null,
        biomorph: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).breedingView("option", "session")
        session.viewGainedFocus(session, this)
    },

    _create: function (options) {
        this._super("_create")
        var species = this.options.session.species
        $(this.element).addClass('breedingView')
        $("<div></div>").breedingAutoReproduceControl().appendTo(this.element)
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div></div>");
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes);
        var container = $("<div></div>");
        container.addClass('container');
        var boxes = $("<div></div>").breedingBoxes({session: this.options.session, biomorph: this.options.biomorph})
        this.options.boxes = boxes
        var overlay = $("<div></div>");
        overlay.addClass("overlay");
        container.append(overlay);
        container.append(boxes);

        var overlayCanvas = $('<canvas></canvas>');
        overlayCanvas.attr('width', 1000);
        overlayCanvas.attr('height', 600);
        overlayCanvas.addClass('overlayCanvas');
        overlay.append(overlayCanvas);
        this.element.append(container);

        $("<div></div>").breedingOffspringCounter().appendTo(this.element)

        this.options.menuHandler.nextMenuHandler = new BreedingMenuHandler()
        
        var midCanvas = $(this.element).find('.midBox').get(0);
        $(midCanvas).trigger('mouseover');
        $(midCanvas).trigger('click');
    }
})

function BreedingMenuHandler() {
    
}

BreedingMenuHandler.prototype.menuclick = function(event) {
    console.log('BreedingMenuHandler'  + $(event.target).data('menuid'))
}
