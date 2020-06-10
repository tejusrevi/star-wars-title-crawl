import * as Three from 'three';

//Defines rules for planetary motions

function planetReset(mesh){
	mesh.position.x = Math.random() *97 - 46;
    mesh.position.y = Math.random() *35 + 60;
	mesh.position.z = Math.random() *(-60) + 20;

	return mesh;
}

function planet(scene){
	//console.log(scene.getObjectByName('planet-1'));

	var planet1 = scene.getObjectByName('planet-1');
	planet1.position.x = (planet1.position.x-0.05)*1.001;
	planet1.position.y = planet1.position.y+0.05;
	planet1.position.z = planet1.position.z+0.005;
	if(Math.abs(planet1.position.x)>200 || Math.abs(planet1.position.y)>200 || Math.abs(planet1.position.z)>200) planetReset(planet1);

	var planet2 = scene.getObjectByName('planet-2');
	planet2.position.x = (planet2.position.x-0.05)*1.01;
	planet2.position.y = planet2.position.y+0.05;
	planet2.position.z = planet2.position.z+0.05;
	if(Math.abs(planet2.position.x)>200 || Math.abs(planet2.position.y)>200 || Math.abs(planet2.position.z)>200) planetReset(planet2);
	
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

export default planet;