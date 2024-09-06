
//Register the species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Snails", 
        (function(session, drawer) { return new Shells(session, drawer)}),
        (function(session) { Shells.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.shells_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).shells_geneboxes('updateFromCanvas', canvas)}));
