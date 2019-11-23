import sketch from 'sketch'
import Circle from './Circle.js'

// TO DO:
//  - Beziers
// 	- Interface
//  - Inner tangents
//  - Further clean up
//  - Icon
//  - Seperate commands
//  - Let the circle decide which circle calculates the outer tangents in case of radii diference
export default function(context) {
	var document = sketch.getSelectedDocument()
	var page = document.selectedPage
	var selection = document.selectedLayers
	var ovals = []

	if (!selection.isEmpty) {

		// console.log(selection)

		// FILTER SELECTION
		selection.layers.forEach(layer => {
			if (layer.type == 'ShapePath') {
				if (layer.shapeType === 'Oval') {
					ovals.push(layer)
				} else {
					sketch.UI.message("Works only with two Oval layers")
				}
			} else {
				sketch.UI.message("Works only with two Ovals")
			}
		})

		// SELECTION PARENT


		// START CALCULATIONS
		if (ovals.length > 1) {
			// Get first two ovals in selection

			let ovalOne = ovals[0]
			let ovalTwo = ovals[1]

			// First Circle
			var circleOne = new Circle(context)
			circleOne.radius = ovalOne.frame.width * 0.5
			circleOne.position.x = ovalOne.frame.x + circleOne.radius
			circleOne.position.y = ovalOne.frame.y + circleOne.radius
			circleOne.style = ovalOne.style

			// Second circle
			var circleTwo = new Circle(context)
			circleTwo.radius = ovalTwo.frame.width * 0.5
			circleTwo.position.x = ovalTwo.frame.x + circleTwo.radius
			circleTwo.position.y = ovalTwo.frame.y + circleTwo.radius
			circleTwo.style = ovalTwo.style

			// Tangents!
			circleOne.calculateTangents( circleTwo )
			circleOne.drawOutertangents(context)
			circleTwo.style = circleOne.style
			

		} else {
			sketch.UI.message("Try to select at least two ovals.")
		}


	} else {
		sketch.UI.message("Try to select two Ovals")
	}
	
}
