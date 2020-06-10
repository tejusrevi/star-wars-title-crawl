import React from 'react';
import * as Three from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as dat from 'dat.gui'
import planet from './planets'
import resetCamera from './cameraReset'
import {galaxyProps, cameraProps, lightProps} from './environmentProps';
var scene
var camera
var renderer;


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

	var light = new Three.PointLight(0xffffff,1.5,100); // soft white light
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
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelSegments: 1
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
	planet(scene);
	renderer.render(scene, camera);
	scene.getObjectByName('background').rotation.y = (scene.getObjectByName('background').rotation.y+0.0001);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
	
}



var interval;
function doAnimation(){
	scene.getObjectByName('text-geometry').position.y = - 7  - scene.getObjectByName('text-geometry').geometry.boundingBox.max.y;
	interval = setInterval(e=>{scene.getObjectByName('text-geometry').position.y = scene.getObjectByName('text-geometry').position.y+0.03;},50)

}

var cameraInterval;

init();

function ChangeText(props){
	if(props.reset) {
		clearInterval(interval);
		cameraInterval = setInterval(e=>resetCamera(camera, cameraInterval),70)
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