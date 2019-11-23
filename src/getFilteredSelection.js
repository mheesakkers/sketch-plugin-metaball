import { Document, UI } from 'sketch'

export default function getFilteredSelection () {

	var document = Document.getSelectedDocument()
	var selection = document.selectedLayers
	var ovals = []

	if (!selection.isEmpty) {

		selection.layers.forEach(layer => {
			if (layer.type == 'ShapePath') {
				if (layer.shapeType === 'Oval') {
					// Check if width and height match
					if (layer.frame.width === layer.frame.height) {
						ovals.push(layer)
					} else {
						UI.message("It appears one of the ovals isn't a true circle. Width and heigh don't match")
					}
				} else {
					UI.message("This plugin works only with two Oval layers")
				}
			} else {
				UI.message("This plugin works only with two Ovals")
			}
		})

	} else {
		UI.message("Try to select two Ovals")
	}

	return ovals
}

// TO DO:
//  - Arc / Beziers
// 	- Interface
//  - Further clean up
//  - Icon