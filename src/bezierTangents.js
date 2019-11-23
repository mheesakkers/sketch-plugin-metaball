// Variation where the inner tangents gets drawn with bezierCurves

import { UI } from 'sketch'
import getFilteredSelection from './getFilteredSelection'
import getMetaball from './getMetaball'

export default function bezierTangents (context) {
	var ovals = getFilteredSelection()
	var metaball = getMetaball(context, ovals)

	// Draw
	// metaball.drawInnerTangents(context)
	metaball.drawBezierTangentLines(context)
}