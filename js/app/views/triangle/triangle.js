
function Triangle() {}

Triangle.divisibleByEight = function(n) {
    return n % 8 == 0
}

Triangle.atLeast = function(outRect) {
    outRect.insetRect(-3, -3);
    while(! Triangle.divisibleByEight(outRect.left)) {
        outRect.left--
    }
    while(! Triangle.divisibleByEight(outRect.right)) {
        outRect.right++
    }
}

Triangle.triangle = function(screenwidth, screenheight, b, m) {
//    console.log(screenwidth + ',' + screenheight + ',' + b + ',' + m)
    // k is the equator of the triangle
    var k = Math.round(200.5 * screenheight / 340); // was 200. 
    // horizontal difference between the mouse and the left of triangle (b)
    // positive if to the right of b, 
    var x = m.h - b.h;
    // (screenheight - m.v) is how high up from the bottom we are
    // (screenheight - b.v) is how high up from the bottom point b is.
    // Difference is how much lower mouse is than b.
    var y = (screenheight - m.v) - (screenheight - b.v);

    var r1 = y / k;
    var r3 = (x - y / 2) / k;
    var r2 = (k - x - y / 2) / k;
    
    return [r1, r2, r3];
}
