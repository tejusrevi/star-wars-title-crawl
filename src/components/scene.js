import * as Three from 'three';
import * as OrbitControls from 'three-orbitcontrols';
var geometry;

function init() {
	var scene = new Three.Scene();

	// camera
	var camera = new Three.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 0;
	camera.position.x = 0;
	camera.position.y = 1;
	camera.lookAt(new Three.Vector3(0, 0, 0));

	var particleGeo = new Three.Geometry();
	var particleMat = new Three.PointsMaterial({
		color: 'rgb(25, 25, 255)',
		size: 1,
		map: new Three.TextureLoader().load('./particle.jpg'),
		transparent: true,
		blending: Three.AdditiveBlending,
		depthWrite: false
    });
    
	var particleCount = 1000;
	var particleDistance = 100;

	for (var i=0; i<particleCount; i++) {
		var posX = (Math.random() - 0.5) * particleDistance;
		var posY = (Math.random() - 0.5) * particleDistance;
		var posZ = (Math.random() - 0.5) * particleDistance;
		var particle = new Three.Vector3(posX, posY, posZ);

		particleGeo.vertices.push(particle);
	}

	var particleSystem = new Three.Points(
		particleGeo,
		particleMat
	);
	scene.add(particleSystem);

    //Text
    /*
	var loader = new Three.FontLoader();
    loader.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
        geometry = new Three.TextGeometry( 'A long time ago in a galaxy far, far away...\nkkkkkkkkkkkkkkkkkkkkkkkk', {
        font: font,
        size: 1,
        height: 0.001,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelSegments: 6
      } );
      geometry.center();
      var material = new Three.MeshNormalMaterial();
      var mesh = new Three.Mesh( geometry, material );
		scene.add( mesh );
    } );
    */
	// renderer
	var renderer = new Three.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(70, 20, 70)');


	var controls = new OrbitControls( camera, renderer.domElement );

	controls.maxDistance = 20;
	controls.maxAzimuthAngle = Math.PI/4;
	controls.minAzimuthAngle = -Math.PI/4;

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls);
}


function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	//console.log("updating")
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

var scene = init();

export default init;