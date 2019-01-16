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


$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingView", $.dawk.watchmakerView, {
        options: { 
            species: null,
            watchmakerSessionTab: null,
            biomorph: null
        },
        viewGainedFocus: function(event) {
            var watchmakerSessionTab = $(this).breedingView("option", "watchmakerSessionTab");
            var newMenu = $('<ul></ul>');
            var operation = $('<li><div><a href="#">Operation</a></div><ul></ul></li>');
            newMenu.append(operation);
            var li = $('<li><div><a href="#">Breed in new</a></div></li>');
            newMenu.append(li);
            var li = $('<li><div><a href="#">Engineer in new</a></div></li>');
            newMenu.append(li);
            $(watchmakerSessionTab.element).watchmakerSessionTab('raiseAlert', newMenu);
        },

        _create: function (options) {
            this._super("_create")
            var species = this.options.session.species
            $(this.element).addClass('breedingView')
            $("<div></div>").breedingAutoReproduceControl().appendTo(this.element)
            $("<div></div>").modeToolbar({
                parentView: this,
                session: this.options.session,
                species: this.options.session.species}
            ).appendTo(this.element)
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

            var midCanvas = $(this.element).find('.midBox').get(0);
            $(midCanvas).trigger('mouseover');
            $(midCanvas).trigger('click');
        }})});

