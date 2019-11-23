import sketch from 'sketch'
import { ShapePath, Rectangle } from 'sketch'
import Vector from './Vector.js'
import hexToRgba from './helpers/hexToRgba.js'

export default class Circle {

	constructor(context) {
		// Stats
		this.context = context
		this.position = new Vector(0, 0)
		this.radius = 0;
		this.style = {};

		// Tangents
		this.direction;
		this.midpoint;

		this.tangentPointOne;
		this.tangentPointOneOpposite;
		this.tangentPointTwo;
		this.tangentPointTwoOpposite;

		this.outerTangentPointOne;
		this.outerTangentPointOneOpposite;
		this.outerTangentPointTwo;
		this.outerTangentPointTwoOpposite;

		// Helpers / Guides
		this.helperPointOne;
		this.helperPointTwo;
		this.helperPointThree;
		this.helperPointFour;
	}

	calculateTangents (other) {
		this.direction = other.position.subtract(this.position)

		// Midpoint Circle
    	const radiusMidpoint = this.direction.length() * 0.5;
	    this.midpoint = new Vector(
	      (this.position.x + other.position.x) * 0.5,
	      (this.position.y + other.position.y) * 0.5
	    )
	    // ellipse(parent, 'MidpointRadius', this.midpoint, '#F2CFDA', radiusMidpoint * 2)

	    const radiiOneAndTwo = this.radius + other.radius
	    this.helperPointOne = this._getHelperPoint(radiiOneAndTwo, radiusMidpoint, this.position, this.direction, false)

	    // INNER TANGENT POINT ONE //
	    let helperVectorT1 = this.helperPointOne.subtract(this.position)
	    helperVectorT1 = helperVectorT1.unit()
	    helperVectorT1 = helperVectorT1.multiply(this.radius)
	    this.tangentPointOne = this.position.add(helperVectorT1)

	    // Parallel line One
	    const parallelVectorOne = other.position.subtract(this.helperPointOne);
	    this.tangentPointOneOpposite = this.tangentPointOne.add(parallelVectorOne);

	    // HELPER POINT TWO //
	    this.helperPointTwo = this._getHelperPoint(radiiOneAndTwo, radiusMidpoint, this.position, this.direction, true)

	    // INNER TANGENT POINT TWO //
	    let helperVectorT2 = this.helperPointTwo.subtract(this.position)
	    helperVectorT2 = helperVectorT2.unit()
	    helperVectorT2 = helperVectorT2.multiply(this.radius)
	    this.tangentPointTwo = this.position.add(helperVectorT2)

	    // Parallel line Two
	    const parallelVectorTwo = other.position.subtract(this.helperPointTwo)
	    this.tangentPointTwoOpposite = this.tangentPointTwo.add(parallelVectorTwo)

	    // *** OUTER TANGENTS *** //
	    
	    // only works when r1 >= r2
	    if (this.radius > other.radius) {
		    const subtractedRadii = this.radius - other.radius;
		    this.helperPointThree = this._getHelperPoint(subtractedRadii, radiusMidpoint, this.position, this.direction, false)

		    // OUTER TANGENT POINT ONE
		    let helperVectorOT1 = this.helperPointThree.subtract(this.position)
		    helperVectorOT1 = helperVectorOT1.unit()
		    helperVectorOT1 = helperVectorOT1.multiply(this.radius)
		    this.outerTangentPointOne = this.position.add(helperVectorOT1)

		    // Parallel line Outer Tangent Two
		    const parallelVectorOT1 = other.position.subtract(this.helperPointThree)
		    this.outerTangentPointOneOpposite = this.outerTangentPointOne.add(parallelVectorOT1)

		    // OUTER TANGENT POINT TWO
		    this.helperPointFour = this._getHelperPoint(subtractedRadii, radiusMidpoint, this.position, this.direction, true)

		    let helperVectorOT2 = this.helperPointFour.subtract(this.position)
		    helperVectorOT2 = helperVectorOT2.unit()
		    helperVectorOT2 = helperVectorOT2.multiply(this.radius)
		    this.outerTangentPointTwo = this.position.add(helperVectorOT2);

		    // Parallel line Outer Tangent Two
		    const parallelVectorOT2 = other.position.subtract(this.helperPointFour)
		    this.outerTangentPointTwoOpposite = this.outerTangentPointTwo.add(parallelVectorOT2)
		} else {
			other.calculateTangents(this)

			this.outerTangentPointOne = other.outerTangentPointOneOpposite
			this.outerTangentPointOneOpposite = other.outerTangentPointOne
			this.outerTangentPointTwo = other.outerTangentPointTwoOpposite
			this.outerTangentPointTwoOpposite = other.outerTangentPointTwo

		}

	}

	// HELPER FUNCTIONS
	_getHelperPoint(currentRadius, otherRadius, position, direction, positive) {
		// Find angle to rotate V1 (found by The Law of Cosine)
		let angleTowardsHelperPoint = Math.acos( ( Math.pow(currentRadius, 2) + Math.pow(otherRadius, 2) - Math.pow(otherRadius, 2) ) / (2 * currentRadius * otherRadius) )
		angleTowardsHelperPoint = positive ? angleTowardsHelperPoint : -angleTowardsHelperPoint
		const angle = Math.atan2(direction.y, direction.x) + angleTowardsHelperPoint

		return new Vector(
		  position.x + currentRadius * Math.cos(angle),
		  position.y + currentRadius * Math.sin(angle)
		)
	}

	// DRAWING FUNCTIONS

	drawHelpers (parent) {
		// Anchor
		ellipse(parent, 'Anchor', this.position, '#00FF00')

		// Helper dots
		ellipse(parent, 'Midpoint', this.midpoint, '#00FF00')
		ellipse(parent, 'helperPointOne', this.helperPointOne, '#00FFFF')
		ellipse(parent, 'helperPointTwo', this.helperPointTwo, '#00FFFF')
		ellipse(parent, 'helperPointThree', this.helperPointThree, '#00FFFF')
		ellipse(parent, 'helperPointFour', this.helperPointFour, '#00FFFF')

		// Inner tangents
		line(this.context, this.tangentPointOne, this.tangentPointOneOpposite)
		line(this.context, this.tangentPointTwo, this.tangentPointTwoOpposite)

		// Outer tangents
		line(this.context, this.outerTangentPointOne, this.outerTangentPointOneOpposite)
		line(this.context, this.outerTangentPointTwo, this.outerTangentPointTwoOpposite)
	}

	drawOutertangents (context) {
		// All coordinates are provided in pixels
		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(this.outerTangentPointOne.x, this.outerTangentPointOne.y))
		path.lineToPoint(NSMakePoint(this.outerTangentPointOneOpposite.x, this.outerTangentPointOneOpposite.y ))
		path.lineToPoint(NSMakePoint(this.outerTangentPointTwoOpposite.x, this.outerTangentPointTwoOpposite.y))
		path.lineToPoint(NSMakePoint(this.outerTangentPointTwo.x, this.outerTangentPointTwo.y ))
		path.closePath();

		var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
		// Add fill
		var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
		fill.color = MSColor.colorWithRGBADictionary( hexToRgba(this.style.fills[0].color) )

		getCurrentParent(context).addLayers([shape])
	}
}

// DRAWING HELPERS FUNCTIONS
function ellipse (parent, name, position, color, diameter = 8) {
	const anchor = new ShapePath({
	  name: name,
	  shapeType: ShapePath.ShapeType.Oval,
	  frame: { 
			x: position.x - diameter * 0.5,
			y: position.y - diameter * 0.5, 
			width: diameter, 
			height: diameter 
		},
	  style: {
			borders: [{
				enabled: false
			}],
			fills: [ color ]
		}, 
	  parent: parent
	})
}

function line (context, start, end) {
	// All coordinates are provided in pixels
	var path = NSBezierPath.bezierPath();
	path.moveToPoint(NSMakePoint(start.x, start.y));
	path.lineToPoint(NSMakePoint(end.x, end.y));
	path.closePath();

	var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
	// var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
	// fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});
	var border = shape.style().addStylePartOfType(1);
	border.color = MSColor.colorWithRGBADictionary( {r: 0.0, g: 1.0, b: 1.0, a: 1.0} );
	border.thickness = 1;

	getCurrentParent(context).addLayers([shape])

}

// Only for old API use
function getCurrentParent (context) {
	var documentData = context.document.documentData()
	return documentData.currentPage().currentArtboard() || documentData.currentPage()
}