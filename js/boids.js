var scene, camera, renderer;
var controls;
var clock, flyControls;
var boidling;

init();
animate();

function init() {

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    boidling = new Boidling();
    scene.add(boidling.mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.showMapEnabled = true;

    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 300;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    flyControls = new THREE.FlyControls(camera);

    flyControls.movementSpeed = 100;
    flyControls.domElement = document.querySelector("#WebGL-output");
    flyControls.rollSpeed = Math.PI / 6;

    //$("#WebGL-output").append(renderer.domElement);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, Window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    renderer.clear();
    requestAnimationFrame( animate );

    var delta = clock.getDelta();
    flyControls.update(delta);

    boidling.update();

    renderer.render( scene, camera );
}
