// Variation where the inner tangents gets drawn with bezierCurves

import { UI } from 'sketch'
import getFilteredSelection from './getFilteredSelection'
import getMetaball from './getMetaball'

export default function bezierTangents (context) {
	var ovals = getFilteredSelection()
	var metaball = getMetaball(context, ovals)

	// USER INPUT
	UI.getInputFromUser("Define intersection offset", {
	  type: UI.INPUT_TYPE.slider,
	  min: 0.05,
	  max: 1.0,
	  // possibleValues: ['Sketch', 'Paper']
	}, (err, intersectionOffset) => {
	  if (err) { return }
	  if (intersectionOffset) {
	  	UI.getInputFromUser("Define bezier length", {
	  	  type: UI.INPUT_TYPE.slider,
	  	  min: 0.05,
	  	  max: 1.0,
	  	  // possibleValues: ['Sketch', 'Paper']
	  	}, (err, bezierOffset) => {
	  	  if (err) {
	  	    // most likely the user canceled the input
	  	    return
	  	  }
	  	  if (bezierOffset) {
	  	  	metaball.drawBezierTangentLines(context, intersectionOffset, bezierOffset)
	  	  }
	  	})
	  }
	})
}