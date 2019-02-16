//the widget definition, where "custom" is the namespace,
//"colorize" the widget name
$.widget( "dawk.breedingView", $.dawk.watchmakerView, {
    options: { 
        species: null,
        watchmakerSessionTab: null,
        biomorph: null,
        generationsPreviousSecond: 0,
        newRandomStart: false

    },
    viewGainedFocus: function(event, ui) {
        let session  = $(this).breedingView("option", "session")
        $(this).breedingView("updateMenus", session, this)
        session.updateMenus(session, this)
        // resume animation (if enabled) here?
    },
    viewLostFocus: function(event, ui) {
        this._super(event, ui)
        // stop animation here
    },

    _create: function (options) {
        this._super("_create")
        var species = this.options.session.species
        $(this.element).addClass('breedingView')
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div>");
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes);
        var container = $("<div>");
        container.addClass('container');
        var boxes = $("<div>").breedingBoxes({session: 
            this.options.session, 
            biomorph: this.options.biomorph,
            newRandomStart: this.options.newRandomStart})
        this.options.boxes = boxes
        var overlay = $("<div>");
        overlay.addClass("overlay");
        container.append(overlay);
        container.append(boxes);

        var overlayCanvas = $('<canvas></canvas>');
        overlayCanvas.attr('width', 1000);
        overlayCanvas.attr('height', 600);
        overlayCanvas.addClass('overlayCanvas');
        overlay.append(overlayCanvas);
        this.element.append(container);

        $("<div>").breedingOffspringCounter().appendTo(this.element)

        this.options.menuHandler.nextMenuHandler = new BreedingMenuHandler(this)
        
        var midCanvas = $(this.element).find('.midBox').get(0);
        this.options.timingDialog = Breeding.createTimingDialog(this.element, boxes.element)
        $(midCanvas).trigger('mouseover');
        if(! this.options.newRandomStart) {
            $(midCanvas).trigger('click');
        }
    },
    startAutoBreeding: function(event) {
        var startButton = $(this.options.timingDialog).find('.startAutoReproduce').get(0);
        var text = $(startButton).text()
        if(text == 'Stop') {
            this.options.autoRunning = false;
            $(startButton).text('Start');
        } else {
            $(startButton).text('Stop');
            this.options.autoRunning = true;
            this.autoBreed();
            var generations = $(this.element).find('.generations').get(0);
            this.measureGenerationRate(Number(generations.value));
        }
    },
    autoBreed: function() {
        var breedingBoxes = $(this.element).closest('.breedingView').find('.boxes').get(0);
        if (this.options.autoRunning) {
            var useFitnessCheckbox = $(this.element).find('.useFitness').get(0)
            var useFitness = false
            if(useFitnessCheckbox) {
                useFitness = useFitnessCheckbox.checked;
            }
            var numBoxes = $(this.options.boxes).breedingBoxes("option", "numBoxes");
            if (useFitness) {
                var canvas = $(breedingBoxes).find('.box').get(0);
                var biomorph = $(canvas).data('genotype');
                var bestSoFar = canvas;

                var errorToBeat = biomorph.fitness(canvas);
                $(breedingBoxes).find('.box').each( function(index) {
                    canvas = this;
                    var currentError = $(canvas).data('genotype').fitness(canvas);
                    if (currentError < errorToBeat) {
                        bestSoFar = canvas;
                        errorToBeat = currentError;
                    }
                });
                $(bestSoFar).trigger('click');
            } else {
                var luckyParent = Math.trunc(Math.random() * numBoxes);
                var luckyCanvas = $(breedingBoxes).find('.box').get(luckyParent);
                $(luckyCanvas).trigger('click');
            }
            let autoReproduceIntervalStr = $(this.element).find('.autoReproduceInterval').get(0).value 
            var interval = Number(autoReproduceIntervalStr);
            this._delay(this.autoBreed, interval);

        }            
    },
    measureGenerationRate: function() {
        var generationCounter = $(this.element).find('.generations').get(0);
        var newGenerationValue = Number(generationCounter.value) + 1;
        generationCounter.value = newGenerationValue;
        var generationRate = $(this.element).find('.generationRate').get(0);

        generationRate.value = newGenerationValue - this.options.generationsPreviousSecond;
        this.options.generationsPreviousSecond = newGenerationValue;
        if(this.options.autoRunning)
            this._delay(this.measureGenerationRate, 1000);
    }
})

function BreedingMenuHandler(breedingView) {
    this.breedingView = breedingView
}

BreedingMenuHandler.prototype.menuclick = function(event) {
    let target = event.target
    let menuid = $(target).data('menuid')
    switch(menuid) {
    case 'Timing':
        this.breedingView.options.timingDialog.dialog('open') 
        return false    
    }
    return true
}
