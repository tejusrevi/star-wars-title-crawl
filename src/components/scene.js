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

	  const datGui  = new dat.GUI({ autoPlace: true });
	
      datGui.domElement.id = 'gui' 
  
	  var folder = datGui.addFolder(`Cube`);
	  folder.add(mesh.position,"x",-100,100);
	  folder.add(mesh.position,"y",-100,100);
	  folder.add(mesh.position,"z",-100,100);
    } );
}

function getCustomParticles(num){
	var so = 1;
	var colors = ['#c87831','#0c4485','#486b87']
	for(var i =0; i<num; i++){
		var geometry = new Three.SphereGeometry( 10, 12, 12 );
		var radius = Math.random()*0.03 +0.02;
		geometry.scale(radius, radius, radius);
		var material = new Three.MeshPhongMaterial( {
		color: colors[Math.floor(Math.random()*3)],
		shininess: 150,
		emissive: '#a4a4a4',
		emissiveIntensity:1
		} );
		var mesh = new Three.Mesh( geometry, material );
		mesh.name = 'planet-'+so++;

		mesh.position.x = Math.random() *97 - 46;
		mesh.position.y = Math.random() *35 + 60;
		mesh.position.z = Math.random() *(-60) + 20;
	    
		scene.add( mesh );
	}
}
function init(text) {
	scene = new Three.Scene();
	console.log(text)
    getBackground();

	getLights();
	
	getCamera();
	
	getParticles();
	getCustomParticles(15);
	
	getText(text);
    
	// renderer
	renderer = new Three.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(0, 5, 20)');


	var controls = new OrbitControls( camera, renderer.domElement );

	//controls.maxDistance = 20;
	controls.maxAzimuthAngle = Math.PI/4;
	controls.minAzimuthAngle = -Math.PI/4;

	renderer.setSize(window.innerWidth, window.innerHeight);
	

	document.getElementById('webgl').appendChild(renderer.domElement);


	update(renderer, scene, camera, controls);
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
	planet3.scale.x = 0.1;
	planet3.scale.y = 0.1;
	planet3.scale.z = 0.1;

	planet3.position.y = planet3.position.y-(0.3*1.5);
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
}

function update(renderer, scene, camera, controls) {
	controls.update();
	/*
	const datGui  = new dat.GUI({ autoPlace: true });
	
    datGui.domElement.id = 'gui' 
  
	var folder = datGui.addFolder(`Cube`);
	folder.add(galaxyProps,"particleCount",1,10000).listen();
	*/
	planet();
	renderer.render(scene, camera);
	scene.getObjectByName('background').rotation.y = (scene.getObjectByName('background').rotation.y+0.0001);
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
	
}


export default init;