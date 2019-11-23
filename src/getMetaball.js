import { UI } from 'sketch'
import Metaball from './Metaball.js'

export default function getMetaball (context, ovalLayers) {
	var metaball = new Metaball(context)

	if (ovalLayers.length > 1) {
		metaball.circleOne = metaball.createCircleBasedOnOvalLayer(ovalLayers[0])
		metaball.circleTwo = metaball.createCircleBasedOnOvalLayer(ovalLayers[1])
		metaball.circleOne.calculateTangents( metaball.circleTwo )

	} else {
		UI.message("Try to select two ovals")
	}

	return metaball
}