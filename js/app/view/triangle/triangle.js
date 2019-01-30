$.widget( "dawk.triangleView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Triangling,
        species: null,
        biomorph: null,
        topOfTriangle: null,
        leftOfTriangle: null,
        rightOfTriangle: null
    },
    viewGainedFocus: function(event) {
        let session = $(this).triangleView("option", "session")
        session.viewGainedFocus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('triangleView')

        this.options.menuHandler.nextMenuHandler = new TriangleMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)
        let triangleLineCanvas = $("<canvas width='1000' height='600' class='triangleLineCanvas'>")
        triangleLineCanvas.appendTo(container)
        triangleContext = triangleLineCanvas[0].getContext('2d')
        // Draw triangle here
        let triangleDiv = $('<div class="triangleDiv">')
        triangleDiv.addClass('boxes')
        triangleDiv.appendTo(container)
        this._on(triangleDiv, {
            mousedown: function(event) { this.mousedown(event) },
            mousemove: function(event) { this.mousemove(event) },
        })
        this.drawTriangle()
        let session = this.options.session
        
        this.options.topOfTriangle = session.options.topOfTriangle
        this.fullandadd(this.options.topOfTriangle, this.options.a)
        this.options.leftOfTriangle = session.options.leftOfTriangle
        this.fullandadd(this.options.leftOfTriangle, this.options.b)
        this.options.rightOfTriangle = session.options.rightOfTriangle
        this.fullandadd(this.options.rightOfTriangle, this.options.c)
    },
    buildMenus: function(menu) {
        this._super('buildMenus')
    },
    markIf: function(thisFull) {
        // Remove midBox class from every canvas
        $(this.element).find('canvas').removeClass('midBox')

        if(thisFull != null) {
            // Mark this one as special
            $(thisFull.genome.drawer).addClass('midBox')
            // Move it to the centre
            $(this.element).find('.triangleDiv').append(thisFull.genome.drawer)
        }
    },
    addone: function(full, point) {
        console.log(point)
        let biomorph = full.genome
        let surround = full.surround
        full.centre = point
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2
        let canvas = $("<canvas class='triangleMorphCanvas'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('triangleBox midBox')
        let triangleDiv = $(this.element).find('.triangleDiv')
        triangleDiv.append(canvas)
        this._on(canvas, {
            mousedown: function(event) { this.markIf($(event.target).data('genotype').full) },
        })
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
    },
    bumper:  function(current, here) {
        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        let triangleDiv = $(this.element).find('.triangleDiv')[0]
        let pRect = new Rect(0, 0, $(triangleDiv).width(), $(triangleDiv).height())
        let error = here.v - (height / 2)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }
    },
    fullandadd: function(biomorph, here) {
        let current = new Full(biomorph)
        console.log(biomorph)
        this.addone(current, here)
        this.markIf(current);
    },
    spawnone: function(thisFull, here) {
        let biomorph = thisFull.genome

        let spawn = biomorph.reproduce(null)
        let current = new Full(spawn, thisFull)
        this.bumper(current, here)
        this.addone(current, here)
        this.markIf(current);
    },
    mousedown: function(event) {
        let triangleDivOffset = $(this.element).find('.triangleDiv')[0].getBoundingClientRect()
        let x = event.pageX - triangleDivOffset.left
        let y = event.pageY - triangleDivOffset.top
        console.log(triangleDivOffset)
        let m = new Point(x,y)
        let r = Triangle.triangle(
                triangleDivOffset.right - triangleDivOffset.left,
                triangleDivOffset.bottom - triangleDivOffset.top, 
                this.options.b, m);
        let session = this.options.session
        let newone = _speciesFactorySingleton.getSpecies(session.species, session, document.createElement('canvas'))
        let options = this.options
        newone.concoct(r, options.topOfTriangle, options.leftOfTriangle, options.rightOfTriangle)
        this.fullandadd(newone, m)
    },
    mousemove: function(event) {
    },
    drawTriangle: function() {
        let triangleDiv = $(this.element).find('.triangleDiv')
        let screenWidth = triangleDiv.width()
        let screenHeight = triangleDiv.height()
        let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
        let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        console.log(a + b + c)
        let ctx = $(this.element).find('.triangleLineCanvas')[0].getContext('2d')
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(a.h, a.v);
        ctx.lineTo(b.h, b.v);
        ctx.lineTo(c.h, c.v);
        ctx.lineTo(a.h, a.v);
        ctx.closePath()
        ctx.stroke()
        this.options.a = a
        this.options.b = b
        this.options.c = c
    }

})
