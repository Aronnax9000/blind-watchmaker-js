/* 
 * QuickDraw style point, with h (horizontal) and v (vertical) 
 */
class Point {
    constructor(x,y) {
        this.h = x;
        this.v = y;
    }
    toString() {
        return "(" + this.h + "," + this.v + ")";
    }
    copy() {
        var child = new Point(this.h, this.v);
        return child;
    }
}

class Rect {


    /*
     * QuickDraw style Rect, with left, right, top and bottom
     */
    constructor(left, top, right, bottom) {


        if(left) {
            this.left = left;
        } else {
            this.left = 0;
        }
        if(right) {
            this.right = right;
        } else {
            this.right = 0;
        }
        if(top) {
            this.top = top;
        } else {
            this.top = 0;
        }
        if(bottom) {
            this.bottom = bottom;
        } else {
            this.bottom = 0;
        }
    }



    toString() {
        return "Rect (" + this.left + "," + this.top + "),(" + this.right + "," + this.bottom + ")";
    }

    setRect(left, top, right, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }

    ptInRect(pt) {
        return (pt.h >= this.left 
                && pt.h <= this.right 
                && pt.v >= this.top
                && pt.v <= this.bottom)
    }

//  FUNCTION SectRect (srcl,src2: Rect; VAR dstRect: Rect) : BOOLEAN;
//  SectRect calculates the rectangle that's the intersection of the two given rectangles, and returns
//  TRUE if they indeed intersect or FALSE if they don't. Rectangles that "touch" at a line or a point
//  are not considered intersecting, because their intersection rectangle (actually, in this case, an
//  intersection line or point) doesn't enclose any bits in the bit image.
//  If the rectangles don't intersect, the destination rectangle is set to (0,0)(0,0). SectRect works
//  correctly even if one of the source rectangles is also the destination
    sectRect(otherRect, destRect) {
        let x5 = max(this.left, otherRect.left);
        let y5 = max(this.top, otherRect.top);
        let x6 = min(this.right, otherRect.right);
        let y6 = min(this.bottom, otherRect.bottom);
        if(x5 >= x6 || y5 >= y6) {
            destRect.left = 0
            destRect.top = 0
            destRect.right = 0
            destRect.bottom = 0
            return false
        } else {
            destRect.left = x5
            destRect.top = y5
            destRect.right = x6
            destRect.bottom = y6
            return true
        }
    }

//  PROCEDURE InsetRect (VAR r: Rect; dh,dv: INTEGER);
//  InsetRect shrinks or expands the given rectangle. The left and right sides are moved in by the
//  amount specified by dh; the top and bottom are moved toward the center by the amount specified
//  by dv. If dh or dv is negative, the appropriate pair of sides is moved outward instead of inward.
//  The effect is to alter the size by 2*dh horizontally and 2*dv vertically, with the rectangle
//  remaining centered in the same place on the coordinate plane.
//  If the resulting width or height becomes less than 1, the rectangle is set to the empty rectangle
//  (0,0)(0,0). 
    insetRect(dh, dv) {
        this.left += dh
        this.right -= dh
        this.top += dv
        this.bottom -= dv
        if(this.left >= this.right || this.top >= this.bottom) {
            this.left = 0
            this.top = 0
            this.right = 0
            this.bottom = 0
        }
    }

    equalRect(otherRect) {
        return (this.left == otherRect.left &&
                this.right == otherRect.right &&
                this.top == otherRect.top &&
                this.bottom == otherRect.bottom)
    }
    isDegenerate() {
        return (this.left == 0 &&
                this.right == 0 &&
                this.top == 0 &&
                this.bottom == 0 || 
                this.left >= this.right ||
                this.top >= this.bottom)
    }

    getWidth() {
        return this.right - this.left
    }

    getHeight() {
        return this.bottom - this.top
    }
}