import * as Three from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import * as dat from 'dat.gui'
import { Euler } from 'three';
var geometry;

var map = new Three.TextureLoader().load('/particle.jpg');

var galaxyProps = {
	particleCount:1500, 
	particleDistance:100
};
var cameraProps = {
	positionx:0.0090575,
	positiony:-13.457231,
	positionz:3.17002531,
	rotationx: 1.2583043,
	rotationy: 0.00064046,
	rotationz: -0.0019823
};
var lightProps = {
	positionx: 1,
	positiony: -24,
	positionz: 18
}
function init() {
	var scene = new Three.Scene();

	var ambientLight = new Three.AmbientLight( 0x404040 ); // soft white light
	ambientLight.position.y = 10;
    scene.add( ambientLight );

	var light = new Three.PointLight(0xffffff,1,100); // soft white light
	light.position.y = lightProps.positiony;
	light.position.z = lightProps.positionz;
	scene.add( light );
	
	scene.fog = new Three.FogExp2( 0xffffff, 0.02 );
	// camera
	var camera = new Three.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.x = cameraProps.positionx;
	camera.position.y = cameraProps.positiony;
	camera.position.z = cameraProps.positionz;
	

	camera.lookAt(new Three.Vector3(0, 0, 0));
	var particleGeo = new Three.Geometry();
	var particleMat = new Three.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 1,
		map: map,
		transparent: true,
		blending: Three.AdditiveBlending,
		depthWrite: false
    });

	for (var i=0; i<galaxyProps.particleCount; i++) {
		var posX = (Math.random() - 0.5) * galaxyProps.particleDistance;
		var posY = (Math.random() - 0.5) * galaxyProps.particleDistance;
		var posZ = (Math.random() - 0.5) * galaxyProps.particleDistance;
		var particle = new Three.Vector3(posX, posY, posZ);

		particleGeo.vertices.push(particle);
	}

	var particleSystem = new Three.Points(
		particleGeo,
		particleMat
	);
	scene.add(particleSystem);

    //Text
    
	var loader = new Three.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        geometry = new Three.TextGeometry( 'kkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk\nkkkkkkkkkkkkkkkkkkkkkkkk', {
		font: font,
        size: 1,
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
		scene.add( mesh );
    } );
    
	// renderer
	var renderer = new Three.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(0, 5, 20)');


	var controls = new OrbitControls( camera, renderer.domElement );

	controls.maxDistance = 20;
	controls.maxAzimuthAngle = Math.PI/4;
	controls.minAzimuthAngle = -Math.PI/4;


	
	const datGui  = new dat.GUI({ autoPlace: true });
  
    datGui.domElement.id = 'gui' 
  
	var folder = datGui.addFolder(`Cube`);
	folder.add(galaxyProps,"particleCount",1,10000).listen();
	/*
	folder.add(camera.position,"x",1,10).listen();
	folder.add(camera.position,"y",1,10).listen();
	folder.add(camera.position,"z",1,10).listen();

	folder.add(camera.rotation,"x",-Math.PI,Math.PI).listen();
	folder.add(camera.rotation,"y",1,10).listen();
	folder.add(camera.rotation,"z",1,10).listen();

	*/
	folder.add(light.position,"x",-100,100).listen();
	folder.add(light.position,"y",-100,100).listen();
	folder.add(light.position,"z",-100,100).listen();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);




	update(renderer, scene, camera, controls);
}


function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	
	console.log(camera)
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
	
}


export default init;