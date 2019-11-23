import Circle from './Circle.js'
import Vector from './vendor/Vector.js'
import hexToRgba from './helpers/hexToRgba.js'
import rotateVector from './helpers/rotateVector.js'
import { ShapePath, Rectangle } from 'sketch'

export default class Metaball {
	constructor(context) {
		this.context = context;
		this.circleOne = null;
		this.circleTwo = null;
		this.tpoints = []
	}

	createCircleBasedOnOvalLayer (layer) {
		const c = new Circle(this.context)

		// Set values
		c.radius = layer.frame.width * 0.5
		c.position.x = layer.frame.x + c.radius
		c.position.y = layer.frame.y + c.radius
		c.style = layer.style

		return c;
	}

	drawInnerTangents (context) {
		this.initTangentPoints()
		
		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(this.tpoints[0].x, this.tpoints[0].y))
		path.lineToPoint(NSMakePoint(this.tpoints[2].x, this.tpoints[2].y))
		path.lineToPoint(NSMakePoint(this.tpoints[3].x, this.tpoints[3].y))
		path.lineToPoint(NSMakePoint(this.tpoints[1].x, this.tpoints[1].y))
		path.closePath();

		var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
		var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
		fill.color = MSColor.colorWithRGBADictionary( hexToRgba(this.circleOne.style.fills[0].color) )

		getCurrentParent(context).addLayers([shape])
		
		this.circleTwo.style = this.circleOne.style
	}

	initTangentPoints () {
		this.circleOne.calculateTangents( this.circleTwo )
		this.tpoints[0] = this.circleOne.tangentPointOne
		this.tpoints[1] = this.circleOne.tangentPointTwo
		this.tpoints[2] = this.circleTwo.tangentPointOne
		this.tpoints[3] = this.circleTwo.tangentPointTwo
	}

	drawBezierTangentLines (context) {
		this.initTangentPoints()

		const direction = this.circleTwo.position.subtract(this.circleOne.position)
		let intersection = this._getIntersectionPointOfTangentLines()
		let intersectionOne = intersection.clone()
		let intersectionTwo = intersection.clone()

		// Calculate offset intersection point
		let offsetVector = direction.clone()
		const offset = 10
	
		offsetVector = offsetVector.unit()
		offsetVector = rotateVector(offsetVector, 90)
		offsetVector = offsetVector.multiply(offset)
		intersectionOne = intersectionOne.subtract(offsetVector)
		intersectionTwo = intersectionTwo.add(offsetVector)

		// const parent = context.document.currentPage().currentArtboard() || context.document.currentPage()
		// ellipse(parent, 'intersectionOne', intersectionOne, '#FF0000', 2)
		// ellipse(parent, 'intersectionTwo', intersectionTwo, '#FF0000', 2)

		// Calculate Control Points
		let bezierOffsetVector = direction.clone();
		const bezierOffset = offset * 0.5
		bezierOffsetVector = bezierOffsetVector.unit()
		bezierOffsetVector = bezierOffsetVector.multiply(bezierOffset)

		const cp1 = intersectionOne.subtract(bezierOffsetVector)
		const cp2 = intersectionOne.add(bezierOffsetVector)
		// ellipse(parent, 'cp1', cp1, '#FFFF00', 2)
		// ellipse(parent, 'cp2', cp2, '#FFFF00', 2)

		const cp3 = intersectionTwo.subtract(bezierOffsetVector)
		const cp4 = intersectionTwo.add(bezierOffsetVector)
		// ellipse(parent, 'cp3', cp3, '#FFFF00', 2)
		// ellipse(parent, 'cp4', cp4, '#FFFF00', 2)

		// Draw
		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(this.tpoints[0].x, this.tpoints[0].y))

		path.curveToPoint_controlPoint1_controlPoint2(
			NSMakePoint(intersectionTwo.x, intersectionTwo.y),
			NSMakePoint(this.tpoints[0].x, this.tpoints[0].y),
			NSMakePoint(cp3.x, cp3.y)
		)

		path.curveToPoint_controlPoint1_controlPoint2(
			NSMakePoint(this.tpoints[3].x, this.tpoints[3].y),
			NSMakePoint(cp4.x, cp4.y),
			NSMakePoint(this.tpoints[3].x, this.tpoints[3].y)
		)

		path.lineToPoint(NSMakePoint(this.tpoints[2].x, this.tpoints[2].y))

		path.curveToPoint_controlPoint1_controlPoint2(
			NSMakePoint(intersectionOne.x, intersectionOne.y),
			NSMakePoint(this.tpoints[2].x, this.tpoints[2].y),
			NSMakePoint(cp2.x, cp2.y)
		)

		path.curveToPoint_controlPoint1_controlPoint2(
			NSMakePoint(this.tpoints[1].x, this.tpoints[1].y),
			NSMakePoint(cp1.x, cp1.y),
			NSMakePoint(this.tpoints[1].x, this.tpoints[1].y)
		)
		
		path.closePath()

		var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
		var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
		fill.color = MSColor.colorWithRGBADictionary( hexToRgba(this.circleOne.style.fills[0].color) )

		getCurrentParent(context).addLayers([shape])

	}

	_getIntersectionPointOfTangentLines () {
		const x1 = this.tpoints[0].x;
		const x2 = this.tpoints[2].x;
		const x3 = this.tpoints[1].x;
		const x4 = this.tpoints[3].x;
		const y1 = this.tpoints[0].y;
		const y2 = this.tpoints[2].y;
		const y3 = this.tpoints[1].y;
		const y4 = this.tpoints[3].y;

		const x = ( (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4) ) / ( (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4) );
		const y = ( (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 *  y4 - y3 * x4) ) / ( (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4) );

		return new Vector(x, y);
	}

}

// Only for old API use
function getCurrentParent (context) {
	var documentData = context.document.documentData()
	return documentData.currentPage().currentArtboard() || documentData.currentPage()
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