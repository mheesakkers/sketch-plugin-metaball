import { UI } from 'sketch'
import getFilteredSelection from './getFilteredSelection'
import Circle from './Circle.js'

export default function innerTangents (context) {
	var ovals = getFilteredSelection()

	if (ovals.length > 1) {

		let ovalOne = ovals[0]
		let ovalTwo = ovals[1]

		var circleOne = new Circle(context)
		circleOne.radius = ovalOne.frame.width * 0.5
		circleOne.position.x = ovalOne.frame.x + circleOne.radius
		circleOne.position.y = ovalOne.frame.y + circleOne.radius
		circleOne.style = ovalOne.style

		var circleTwo = new Circle(context)
		circleTwo.radius = ovalTwo.frame.width * 0.5
		circleTwo.position.x = ovalTwo.frame.x + circleTwo.radius
		circleTwo.position.y = ovalTwo.frame.y + circleTwo.radius
		circleTwo.style = ovalTwo.style

		// Tangents!
		circleOne.calculateTangents( circleTwo )
		circleOne.drawInnerTangents(context)

		// Style second circle the same
		circleTwo.style = circleOne.style

	} else {
		UI.message("Try to select two ovals")
	}

}