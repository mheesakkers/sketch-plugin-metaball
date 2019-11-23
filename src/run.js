import sketch from 'sketch'
import Circle from './Circle.js'

// documentation: https://developer.sketchapp.com/reference/api/

export default function(context) {
	var document = sketch.getSelectedDocument()
	var page = document.selectedPage
	var selection = document.selectedLayers
	var ovals = []

	if (!selection.isEmpty) {

		console.log(selection)

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

		// START CALCULATIONS
		if (ovals.length > 1) {
			// Get first two ovals in selection

			// First Circle
			var circleOne = new Circle(context)
			circleOne.radius = ovals[0].frame.width * 0.5
			circleOne.position.x = ovals[0].frame.x + circleOne.radius
			circleOne.position.y = ovals[0].frame.y + circleOne.radius
			circleOne.style = ovals[0].style

			// Second circle
			var circleTwo = new Circle(context)
			circleTwo.radius = ovals[1].frame.width * 0.5
			circleTwo.position.x = ovals[1].frame.x + circleTwo.radius
			circleTwo.position.y = ovals[1].frame.y + circleTwo.radius
			circleTwo.style = ovals[1].style

			// Currently the outerTangents calculation only works 
			// if the first circle is bigger than the other
			if (circleOne.radius > circleTwo.radius) {
				circleOne.calculateTangents(page, circleTwo)
				circleOne.drawHelpers(page)
				circleOne.drawOutertangents(context)
				circleTwo.style = circleOne.style
			} else {
				circleTwo.calculateTangents(page, circleOne)
				circleTwo.drawHelpers(page)
				circleTwo.drawOutertangents(context)
				circleOne.style = circleTwo.style
			}
			

		} else {
			sketch.UI.message("Try to select at least two ovals.")
		}


	} else {
		sketch.UI.message("Try to select two Ovals")
	}
	
}
