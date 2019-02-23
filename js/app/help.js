var WatchmakerHelp = {
        BREEDING_HELP: ['Breeding Help', 
            "The parent is in the middle, surrounded by its (mutant) offspring. Breed (asexually) from one by clicking on it.  It glides to the centre and become the parent of the next generation. As the generations go by you'll see evolutionary change.",
            "If you breed a biomorph that you like, you could Save it (File Menu) or put it in an album (Add to Album under Album Menu). The present parent (or a Highlighted biomorph  -  see Album Menu) will be the one selected for this.",
            "Initialize Fossil Record (Operation Menu) and until further notice each (parent) biomorph will be saved in a 'Fossil History'.  Play back the fossil history at any time, again from Operation Menu."],

        MOVING_HELP: [ 'Moving Help', "Without changing a pedigree in any biologically significant way, you can rearrange it more pleasingly on the screen.",
            "Move the hand so that the index finger is in a biomorph's rectangle, press the button, drag the biomorph to your preferred new location and release it there.  The umbilical cord comes too, but all other biomorphs stay still.",
            "Notice that, to save space, you can stack biomorphs up on top of each other.  They then behave like miniature 'Windows', coming to the front when clicked with the finger."],

        COPY_HELP: ['Copy Help', "You can Copy (Edit Menu) a biomorph & Paste it into e.g. MacDraw, presumably via the Scrapbook.  You can also Paste such biomorphs into an Album, but only into a previously Cleared slot."],

        ENGINEERING_HELP: ['Engineering Help', "Rather than Breed from randomly thrown-up mutations, you can intervene directly and induce mutations in any direction.  Move the 'hypodermic' up into the 'chromosome' at the top of the screen.",
            "When it enters a 'gene', the cursor becomes an arrowhead.  The direction of the arrow depends on whether the cursor lies in the 'decreasing' (left) or the 'increasing' (right) zone of the gene.  Click around to see how the value of the gene changes.",
            "Some genes have zones in the vertical plane too.  In many cases this is concerned with segmental gradients (see Manual).\nWhile Engineering, you can change (View Menu) the thickness of the drawing 'pen'."],

        DRIFT_HELP: ['Drift Help', "Drift, here, means 'genetic drift'.  Evolution goes on, step by step, as in Breed, but in Drift there is no selection, no intervention by you.",
            "The only way to stop Drifting is to move the mouse up into the Menu bar.  Then you can choose another option.  If you leave Drift running for a very long time, the biomorphs often become unmanageably large.",
            "There are two ways of viewing Drift: 'Sweep' and 'Cinematic'.  Toggle between them by choosing Sweep in the View Menu."],

        KILLING_HELP: ['Killing Help', "If a Pedigree is becoming large and unwieldy, it is convient to prune it.  Use the gun to shoot not only an individual biomorph on a pedigree but all its descendants (if any).",
            "Just as you can act as a selecting agent in Drawing Out Offspring (birth bias), obviously you can also act as a selecting agent in Killing.",
            "",
            "WARNING: There is no Undo!"],

        PLAYING_BACK_FOSSILS_HELP: ['Playing Back Fossils Help', "'Use the scroll-bar slider to 'sink' down through the fossil strata from the most recent to the earliest of the biomorphs that you have bred.",
            "When the fossil window is displayed, only a few menus are available.  You can either Breed from the currently displayed fossil, or simply remove the Fossil Window and return to the previous activity.",
            "You can also Load as Fossils any collection of biomorphs previously Saved.  A Fossil Window appears, with the most 'recent' biomorph showing (Note: this is not quite as described in the Manual.  The program was improved after the Manual went to press.)"],

        ALBUM_HELP: ['Album Help', "An Album is a collection of biomorphs viewed together on the screen.  An individual member of an album can be selected by clicking, and it then becomes the active biomorphs for subsequenty operations, like Breed.",
            "There can be only one Album active at once, but it can have up to 4 Pages.  View in miniature (Show Album), then Zoom into one page by clicking anywhere in it.\nAdd to Album appends the current biomorph to the current Album.",
            "Albums can be Loaded and Saved in the same way as single biomorphs.  They can also be double-clicked to launch Blind Watchmaker itself.\nSelected Album slots can be Cleared, Copied (to ClipBoard), and Pasted (into a Cleared slot)."],

        PEDIGREE_HELP: ['Pedigree Help', "This is a different way of breeding.  Press the mouse button in the rectangle of any biomorph and 'Draw Out' an umbilical cord.  When you let go, an infant (which may be mutant) will be born at that point.",
            "In this way you build up a complete pedigree, with its own history remaining available to you on the screen.  Not just available to see, but available to breed from.\nTo speed up breeding, use the 'Mirrors' to draw out 2 or 4 offspring simultaneously.",
            "By being selective about which ones you breed from you can influence evolution by 'birth bias'.  You can rearrange an existing pedigree in various ways  -  Kill, Move, Detach.  These options each have their own Help messages."],

        DETACHING_HELP: ['Detaching Help', "Use the scissors (on the biomorph itself, not its umbilical cord!) to Detach a biomorph and all its descendants from the rest of a pedigree  -  as a hived-off sub-clade."],

        TRIANGLE_HELP: ['Triangle Help', "This is a way of representing genetic change as change in 2-dimensional space.  It is explained in the book, The Blind Watchmaker.  Essentially you use the mouse to sample genetic space.",
            "The three biomorphs at the tips of the triangles are 'anchors' defining the particular plane in genetic space.  There are three default anchors.  They can be changed using the appropriate options under the View Menu.",
            "Click the mouse to draw on the screen the biomorph at the current location in genetic space.  As the cursor moves around you can see it changing to (a usually miniature version of) the biomorph at the current location in genetic space."],

        HIGHLIGHTING_HELP: ['Highlighting Help', "When you click on a biomorph it will go black, but no other action is taken.  This is to enable you to use that biomorph in some subsequent action.",
            "For instance, you might Save it, Add to Album, or Copy (to ClipBoard and hence to other applications such as MacDraw).",
            "You can do all these things without first highlighting a biomorph.  But then you will be using the automatically (default) selected biomorph, for instance the one in the centre of the breeding screen."],

        MISCELLANEOUS_HELP: ['Miscellaneous Help', "When Breeding, you can change the numbers of rows or columns (View Menu).",
            "Mutations Menu enables you to toggle on or off various categories of mutation.  When a given category is off (no check mark), evolution is constrained not to vary from the present animal in that respect.",
            "The program described in the book, The Blind Watchmaker, is a subset of the present program.  You can recreate that subset (and the IBM and Nimbus versions of the program) by toggling OFF the first four mutation categories."],

        HOPEFUL_MONSTER_HELP: ['Hopeful Monster Help', "Delivers a biomorph with a randomly chosen genome.  Every time you click, until you exit by choosing another menu option, you get a new random biomorph.",
            "When you exit to another option, the current random biomorph will be the one selected for, e.g. Breeding."],
}


$.widget('dawk.helpDialog', $.ui.dialog, {
    options: {
        "ui-dialog": "help-dialog",
        width: 660,
        height: 480
    },
    _create: function() {
        let helpkey = this.options.helpkey
        let helptextarray = WatchmakerHelp[helpkey]
        this.options.title = helptextarray[0]
        for(let i = 1; i < helptextarray.length; i++) {
            let p = $("<p class='helptext'>")
            p.text(helptextarray[i])
            p.appendTo(this.element)
        }
        return this._super()
    }
})