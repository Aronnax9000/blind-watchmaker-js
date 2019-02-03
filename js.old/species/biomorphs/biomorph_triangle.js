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
