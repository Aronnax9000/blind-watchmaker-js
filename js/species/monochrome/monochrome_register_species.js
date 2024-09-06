// Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Monochrome", 
        (function(session, drawer) { return new Monochrome(session, drawer)}),
        (function(session) { Monochrome.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.monochrome_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', canvas)})

);

