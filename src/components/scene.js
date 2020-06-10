import React from 'react';
import * as Three from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as dat from 'dat.gui'

var scene
var camera
var renderer;

//Environment Properties
var galaxyProps = {
	particleCount:1000, 
	particleDistance:100
};
var cameraProps = {
	positionx: 0.013714324047128142,
	positiony:-11.924465558681977,
	positionz:4.799862471866392,
	rotationx: 1.1881175060833271,
	rotationy: 0.0010669098934860991,
	rotationz: -0.0026505547079106184
};
var lightProps = {
	positionx: 1,
	positiony: -24,
	positionz: 18
}

function getBackground(){
	var geometry = new Three.SphereGeometry( 100, 60, 40 );
	geometry.scale( - 1, 1, 1 );
    var material = new Three.MeshBasicMaterial( {
    map: new Three.TextureLoader().load( 'galaxy.jpg' )
    } );
	var mesh = new Three.Mesh( geometry, material );
	mesh.rotation.x = Math.PI/2;
	mesh.name = 'background';
    scene.add( mesh );
}

function getLights(){
	var ambientLight = new Three.AmbientLight( 0x404040 ); // soft white light
	ambientLight.position.y = 10;
    scene.add( ambientLight );

	var light = new Three.PointLight(0xffffff,1,100); // soft white light
	light.position.y = lightProps.positiony;
	light.position.z = lightProps.positionz;
	scene.add( light );
}

function getCamera(){
	camera = new Three.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.x = cameraProps.positionx;
	camera.position.y = cameraProps.positiony;
	camera.position.z = cameraProps.positionz;
	camera.lookAt(new Three.Vector3(0, 0, 0));
}

function getParticles(){
	var particleGeo = new Three.Geometry();
	var particleMat = new Three.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 1,
		map: new Three.TextureLoader().load('/particle.jpg'),
		transparent: true,
		blending: Three.AdditiveBlending,
		depthWrite: false
	});
	for (var i=0; i<galaxyProps.particleCount; i++) {
		var posX = (Math.random() - 0.5) * galaxyProps.particleDistance;
		var posY = (Math.random() - 0.5) * galaxyProps.particleDistance;
		var posZ = (Math.random() - 0.5) * galaxyProps.particleDistance;

		if ((Math.abs(posX) + Math.abs(posY) + Math.abs(posZ)) >=20){
			var particle = new Three.Vector3(posX, posY, posZ);
		    particleGeo.vertices.push(particle);
		}
		
	}

	var particleSystem = new Three.Points(
		particleGeo,
		particleMat
	);
	particleSystem.geometry.verticesNeedUpdate = true;
	particleSystem.name = 'particle-system';
	scene.add(particleSystem);
}

function getText(text){
	var loader = new Three.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var geometry = new Three.TextGeometry( text, {
		font: font,
        size: 0.7,
        height: 0.01,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelSegments: 6
      } );
      geometry.center();
	  var material = new Three.MeshPhongMaterial({color  : '#f2ce0a'});
	  var mesh = new Three.Mesh( geometry, material );

	  mesh.name = 'text-geometry';
	  scene.add( mesh );
    } );
}

function getCustomParticles(num){
	var so = 1;
	for(var i =0; i<num; i++){
		var geometry = new Three.SphereGeometry( 10, 12, 12 );
		var radius = Math.random()*0.03 +0.02;
		geometry.scale(radius, radius, radius);
		var material = new Three.MeshPhongMaterial( {
		map: new Three.TextureLoader().load('/bump.jpg'),
		shininess: 150,
		emissive: '#a4a4a4',
		emissiveIntensity:10,
		bumpMap: new Three.TextureLoader().load('/bump.jpg')
		} );
		var mesh = new Three.Mesh( geometry, material );
		mesh.name = 'planet-'+so++;
		mesh.scale.x = 0.8;
		mesh.scale.y = 0.8;
		mesh.scale.z = 0.8;

		mesh.position.x = Math.random() *97 - 46;
		mesh.position.y = Math.random() *35 + 60;
		mesh.position.z = Math.random() *(-60) + 20;
	    
		scene.add( mesh );
	}
}
function init() {
	scene = new Three.Scene();
	//var text  = props.text;
    getBackground();

	getLights();
	
	getCamera();
	
	getParticles();
	getCustomParticles(15);
	
	// renderer
	renderer = new Three.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(0, 5, 20)');


	var controls = new OrbitControls( camera, renderer.domElement );

	//controls.maxDistance = 20;
	controls.maxAzimuthAngle = Math.PI/4;
	controls.minAzimuthAngle = -Math.PI/4;
	
	var node = document.getElementById('webgl');
	if (node.hasChildNodes()) node.removeChild(node.childNodes[0]);
	node.appendChild(renderer.domElement);
	
	update(renderer, scene, camera, controls);

	return null;
}

function update(renderer, scene, camera, controls) {
	controls.update();
	/*
	const datGui  = new dat.GUI({ autoPlace: true });
	
    datGui.domElement.id = 'gui' 
  
	var folder = datGui.addFolder(`Cube`);
	folder.add(galaxyProps,"particleCount",1,10000).listen();
	*/
	//console.log(scene.getObjectByName('text-geometry'))
	//scene.remove(scene.getObjectByName('text-geometry'))
	renderer.setSize(window.innerWidth, window.innerHeight);
	planet();
	renderer.render(scene, camera);
	scene.getObjectByName('background').rotation.y = (scene.getObjectByName('background').rotation.y+0.0001);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
	
}

function planetReset(mesh){
	mesh.position.x = Math.random() *97 - 46;
    mesh.position.y = Math.random() *35 + 60;
	mesh.position.z = Math.random() *(-60) + 20;

	return mesh;
}

function planet(){
	//console.log(scene.getObjectByName('planet-1'));

	var planet1 = scene.getObjectByName('planet-1');
	planet1.position.x = (planet1.position.x-0.05)*1.001;
	planet1.position.y = planet1.position.y+0.05;
	planet1.position.z = planet1.position.z+0.005;
	

	var planet2 = scene.getObjectByName('planet-2');
	planet2.position.x = (planet2.position.x-0.05)*1.01;
	planet2.position.y = planet2.position.y+0.05;
	planet2.position.z = planet2.position.z+0.05;
	
	//Comets
	var planet3 = scene.getObjectByName('planet-3');
	planet3.scale.x = 0.2;
	planet3.scale.y = 0.2;
	planet3.scale.z = 0.2;

	planet3.position.y = planet3.position.y-(0.3*1.1);
	planet3.position.x = planet3.position.x/1.01;
	planet3.position.z = planet3.position.z/1.01;
	if (planet3.position.y < -300) planet3 = planetReset(planet3);

	var planet4 = scene.getObjectByName('planet-4');
	planet4.scale.x = 0.2;
	planet4.scale.y = 0.2;
	planet4.scale.z = 0.2;

	planet4.position.y = planet4.position.y-(0.4*1.7);
	planet4.position.x = planet4.position.x/1.01;
	planet4.position.z = planet4.position.z/1.01;
	if (planet4.position.y < -150) planet4 = planetReset(planet4);

	var planet5 = scene.getObjectByName('planet-5');
	planet5.scale.x = 0.05;
	planet5.scale.y = 0.05;
	planet5.scale.z = 0.05;

	planet5.position.y = planet5.position.y-(0.4*2);
	planet5.position.x = planet5.position.x/1.01;
	planet5.position.z = planet5.position.z/1.01;
	if (planet5.position.y < -100) planet5 = planetReset(planet5);

	var planet6 = scene.getObjectByName('planet-6');
	planet6.scale.x = 0.05;
	planet6.scale.y = 0.05;
	planet6.scale.z = 0.05;

	planet6.position.y = planet6.position.y-(0.4*3);
	planet6.position.x = planet6.position.x/1.01;
	planet6.position.z = planet6.position.z/1.01;
	if (planet6.position.y < -100) planet6 = planetReset(planet6);

	var planet7 = scene.getObjectByName('planet-7');
	planet7.scale.x = 0.05;
	planet7.scale.y = 0.05;
	planet7.scale.z = 0.05;

	planet7.position.y = planet7.position.y-(0.4*3);
	planet7.position.x = planet7.position.x/1.01;
	planet7.position.z = planet7.position.z/1.01;
	if (planet7.position.y < -100) planet7 = planetReset(planet7);

	var planet8 = scene.getObjectByName('planet-8');
	planet8.material.emissiveIntensity = (Math.random()<0.94)?0:50;
	planet8.scale.x = 0.05;
	planet8.scale.y = 0.05;
	planet8.scale.z = 0.05;

	var planet9 = scene.getObjectByName('planet-9');
	planet9.material.emissiveIntensity = (Math.random()<0.94)?0:50;
	planet9.scale.x = 0.05;
	planet9.scale.y = 0.05;
	planet9.scale.z = 0.05;
	scene.getObjectByName('planet-10').material.emissiveIntensity = 0.3+Math.random()*2;
	scene.getObjectByName('planet-11').material.emissiveIntensity = 0.3+Math.random()*2;
}

var interval;
function doAnimation(){
	scene.getObjectByName('text-geometry').position.y = -9;
	interval = setInterval(e=>{scene.getObjectByName('text-geometry').position.y = scene.getObjectByName('text-geometry').position.y+0.03;},50)

}

var cameraInterval;
function resetCamera(){
	if(Math.abs(camera.position.x - cameraProps.positionx) <1){
		console.log("clearing interval")
		clearInterval(cameraInterval);
		camera.position.x = cameraProps.positionx;
		camera.position.y = cameraProps.positiony;
		camera.position.z = cameraProps.positionz;
		return;
	}
	if(camera.position.x>cameraProps.positionx) camera.position.x = camera.position.x -0.4;
	else camera.position.x = camera.position.x + 0.4;

	if(camera.position.y>cameraProps.positiony) camera.position.y = camera.position.y -1;
	else camera.position.y = camera.position.y + 1;

	if(camera.position.z>cameraProps.positionz) camera.position.z = camera.position.z -1;
	else camera.position.z = camera.position.z + 1;
}
init();

function ChangeText(props){
	console.log(props)
	if(props.reset) {
		clearInterval(interval);
		cameraInterval = setInterval(e=>resetCamera(),100)
		//resetCamera();
		props.resetConfirm(false);
		return null;
	}
	if(props.play) doAnimation();
	else{
		clearInterval(interval);
		scene.remove(scene.getObjectByName('text-geometry'));
	    getText(props.text);
	}
	return null;
}

export default ChangeText;