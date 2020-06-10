import * as Three from 'three';
import {galaxyProps, cameraProps, lightProps} from './environmentProps';

function generateMotion(current, approach){
    var offset = (Math.abs(current) + Math.abs(approach))/5;

    return offset;

}

function resetCamera(camera, cameraInterval){
	if(Math.abs(camera.position.x - cameraProps.positionx) <0.5){
        clearInterval(cameraInterval);
        document.getElementById('camera-reset').disabled = false;
		document.getElementById('camera-reset').style.visibility = "visible";
		console.log("resetting camera")
		camera.position.x = cameraProps.positionx;
		camera.position.y = cameraProps.positiony;
		camera.position.z = cameraProps.positionz;
		return;
	}
	if(camera.position.x>cameraProps.positionx) camera.position.x = camera.position.x - generateMotion(camera.position.x,cameraProps.positionx);
    else camera.position.x = camera.position.x + generateMotion(camera.position.x,cameraProps.positionx);
    
    
    if(camera.position.y>cameraProps.positiony) camera.position.y = camera.position.y - generateMotion(camera.position.y,cameraProps.positiony);

	if(camera.position.z>0) camera.position.z = camera.position.z - generateMotion(camera.position.z,cameraProps.positionz)/5;
}

export default resetCamera;