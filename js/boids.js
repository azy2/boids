var scene, camera, renderer;
var controls;
var clock, flyControls;
var boidlings = [];
var numOfBoidlings;

init();
animate();

function init() {

    numOfBoidlings = 300;

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);

    for (var i = 0; i < numOfBoidlings; i++) {
        boidlings[i] = new Boidling();
        scene.add(boidlings[i].getMesh());
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.showMapEnabled = true;

    camera.position.x = -1500;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    flyControls = new THREE.FlyControls(camera);

    flyControls.movementSpeed = 200;
    flyControls.domElement = document.querySelector("#WebGL-output");
    flyControls.rollSpeed = Math.PI / 4;


    // var urlPrefix = "images/"
    // var urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
    //             urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
    //             urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"];
    // THREE.ImageUtils.crossOrigin = '';
    // var cubemap = THREE.ImageUtils.loadTextureCube(urls);
    // cubemap.format = THREE.RGBFormat

    // var shader = THREE.ShaderLib['cube'];
    // shader.uniforms['tCube'].value = cubemap;

    // var skyBoxMaterial = new THREE.ShaderMaterial( {
    //     fragmentShader: shader.fragmentShader,
    //     vertexShader: shader.vertexShader,
    //     uniforms: shader.uniforms,
    //     depthWrite: false,
    //     side: THREE.BackSide
    // });

    // // create skybox mesh
    // var skybox = new THREE.Mesh(
    //     new THREE.BoxGeometry(1000, 1000, 1000),
    //     skyBoxMaterial
    // );

    // scene.add(skybox);

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

    for (var i = 0; i < numOfBoidlings; i++) {
        boidlings[i].update(delta);
    }

    renderer.render( scene, camera );
}
