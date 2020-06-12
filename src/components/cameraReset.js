import * as Three from 'three';
import {galaxyProps, cameraProps, lightProps} from './environmentProps';

function resetCamera(camera){
		camera.position.x = cameraProps.positionx;
		camera.position.y = cameraProps.positiony;
		camera.position.z = cameraProps.positionz;

		camera.rotation.x = cameraProps.rotationx;
		camera.rotation.y = cameraProps.rotationy;
		camera.rotation.z = cameraProps.rotationz;
		return;
}

export default resetCamera;