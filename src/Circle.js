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

	calculateTangents (parent, other) {
		this.direction = other.position.subtract(this.position)
		line(this.context, this.position, other.position)

		// Midpoint Circle
    	const radiusMidpoint = this.direction.length() * 0.5;
	    this.midpoint = new Vector(
	      (this.position.x + other.position.x) * 0.5,
	      (this.position.y + other.position.y) * 0.5
	    )
	    // ellipse(parent, 'MidpointRadius', this.midpoint, '#F2CFDA', radiusMidpoint * 2)

	    const radiiOneAndTwo = this.radius + other.radius

	    // HELPER POINT ONE
	    // Find angle to rotate V1 (found by The Law of Cosine)
	    const angleTowardsHelperPointOne = Math.acos( ( Math.pow(radiiOneAndTwo, 2) + Math.pow(radiusMidpoint, 2) - Math.pow(radiusMidpoint, 2) ) / (2 * radiiOneAndTwo * radiusMidpoint) )
	    const posOneAngle = Math.atan2(this.direction.y, this.direction.x) - angleTowardsHelperPointOne

	    this.helperPointOne = new Vector(
	      this.position.x + (radiiOneAndTwo * Math.cos(posOneAngle)),
	      this.position.y + (radiiOneAndTwo * Math.sin(posOneAngle))
	    )

	    // INNER TANGENT POINT ONE //
	    let helperVectorT1 = this.helperPointOne.subtract(this.position)
	    helperVectorT1 = helperVectorT1.unit()
	    helperVectorT1 = helperVectorT1.multiply(this.radius)
	    this.tangentPointOne = this.position.add(helperVectorT1)
	    ellipse(parent, 'tangentPointOne', this.tangentPointOne, '#FF0000', 12)

	    // Parallel line One
	    const parallelVectorOne = other.position.subtract(this.helperPointOne);
	    this.tangentPointOneOpposite = this.tangentPointOne.add(parallelVectorOne);

	    // HELPER POINT TWO //
	    // Find angle to rotate V1 (found by The Law of Cosine)
	    const angleTowardsHelperPointTwo = Math.acos( ( Math.pow(radiiOneAndTwo, 2) + Math.pow(radiusMidpoint, 2) - Math.pow(radiusMidpoint, 2) ) / (2 * radiiOneAndTwo * radiusMidpoint) );
	    const posTwoAngle = Math.atan2(this.direction.y, this.direction.x) + angleTowardsHelperPointTwo;
	    this.helperPointTwo = new Vector(
	      this.position.x + radiiOneAndTwo * Math.cos(posTwoAngle), 
	      this.position.y + radiiOneAndTwo * Math.sin(posTwoAngle)
	    )

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
	    const helperRadiusThree = this.radius - other.radius;
	    const angleTowardsHelperPointThree = Math.acos( ( Math.pow(helperRadiusThree, 2) + Math.pow(radiusMidpoint, 2) - Math.pow(radiusMidpoint, 2) ) / (2 * helperRadiusThree * radiusMidpoint) );
	    const posThreeAngle = Math.atan2(this.direction.y, this.direction.x) - angleTowardsHelperPointThree;
	    this.helperPointThree = new Vector(
	      this.position.x + helperRadiusThree * Math.cos(posThreeAngle), 
	      this.position.y + helperRadiusThree * Math.sin(posThreeAngle)
	    )

	    // OUTER TANGENT POINT ONE
	    let helperVectorOT1 = this.helperPointThree.subtract(this.position)
	    helperVectorOT1 = helperVectorOT1.unit()
	    helperVectorOT1 = helperVectorOT1.multiply(this.radius)
	    this.outerTangentPointOne = this.position.add(helperVectorOT1)

	    // Parallel line Outer Tangent Two
	    const parallelVectorOT1 = other.position.subtract(this.helperPointThree)
	    this.outerTangentPointOneOpposite = this.outerTangentPointOne.add(parallelVectorOT1)

	    // OUTER TANGENT POINT TWO
	    const angleTowardsHelperPointFour = Math.acos( ( Math.pow(helperRadiusThree, 2) + Math.pow(radiusMidpoint, 2) - Math.pow(radiusMidpoint, 2) ) / (2 * helperRadiusThree * radiusMidpoint) );
	    const posFourAngle = Math.atan2(this.direction.y, this.direction.x) + angleTowardsHelperPointFour;
	    this.helperPointFour = new Vector(
	      this.position.x + helperRadiusThree * Math.cos(posFourAngle), 
	      this.position.y + helperRadiusThree * Math.sin(posFourAngle)
	    );

	    let helperVectorOT2 = this.helperPointFour.subtract(this.position)
	    helperVectorOT2 = helperVectorOT2.unit()
	    helperVectorOT2 = helperVectorOT2.multiply(this.radius)
	    this.outerTangentPointTwo = this.position.add(helperVectorOT2);

	    // Parallel line Outer Tangent Two
	    const parallelVectorOT2 = other.position.subtract(this.helperPointFour)
	    this.outerTangentPointTwoOpposite = this.outerTangentPointTwo.add(parallelVectorOT2)

	}

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

		// console.log(this.style.fills[0].color)
		console.log(hexToRgba(this.style.fills[0].color))

		var documentData = context.document.documentData()
		var currentParent = documentData.currentPage().currentArtboard() || documentData.currentPage()
		currentParent.addLayers([shape])

		console.log(currentParent)
	}
}

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

	var documentData = context.document.documentData();
	var currentParent = documentData.currentPage().currentArtboard() || documentData.currentPage()
	currentParent.addLayers([shape]);

}

function generateLine (parent, name, start, end) {
	const x = start.x
	const y = start.y
	const w = end.x - start.x
	const h = end.y - start.y

	const line = new ShapePath({
	  name: name,
	  shapeType: ShapePath.ShapeType.Custom,
	  style: { borders: ['#000000']},
	  frame: new Rectangle(x, y, w, h),
	  points: [
	    { point: { x: start.x, y: start.y}},
	    { point: { x: end.x, y: end.y }}
	  ],
	  parent: parent
	})
}