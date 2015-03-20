var scene, camera, renderer, axisHelper;
var controls;
var clock, flyControls;
var boid;

init();
animate();

function init() {

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);

    axisHelper = new THREE.AxisHelper(50);

    scene.add(axisHelper);

    boid = new Boid();

    var boidlings = boid.getBoidlings();
    var sharks = boid.getSharks();

    for (var i = 0; i < boid.numOfBoidlings; i++) {
        scene.add(boidlings[i].getMesh());
    }
    for (var i = 0; i < boid.numOfSharks; i++) {
        scene.add(sharks[i].getMesh());
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.showMapEnabled = true;

    camera.position.x = -200;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    flyControls = new THREE.FlyControls(camera);

    flyControls.movementSpeed = 400;
    flyControls.domElement = document.querySelector("#WebGL-output");
    flyControls.rollSpeed = Math.PI / 4;

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

    boid.update(delta);

    renderer.render( scene, camera );
}
