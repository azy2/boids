Boidling = function () {
    var geometry = new THREE.CylinderGeometry(
        0, // radiusTop
        20, // radiusBottom
        100, // height
        20, // radiusSegments
        20, // heightSegments
        false // openEnded
    );

    var color = Math.floor(Math.random() * 16777215).toString(16)
    var material = new THREE.MeshBasicMaterial( {color: parseInt(color, 16), wireframe: true} );

    var coneMesh = new THREE.Mesh(geometry, material);
    coneMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    var mesh = new THREE.Object3D();
    mesh.add(coneMesh);

    var axisHelper = new THREE.AxisHelper(50);
    mesh.add(axisHelper);

    // mesh.position.y = 10;
    mesh.lookAt(new THREE.Vector3(0, 0, 0));

    this.getMesh = function() {
        return mesh;
    }

    var autoForward = false;
    var movementSpeed = 10;
    var rotSpeed = Math.PI / 12;

    var tmpQuaternion = new THREE.Quaternion();

    var currentDirVector = new THREE.Vector3();

    var targetAxis = new THREE.Vector3();
    var targetAngle = 0;

    this.update = function(delta) {
        this.computeCurrentDirVector();
        this.updateTarget(camera.position);
        this.updateMovement(delta);
    };

    this.updateMovement = function( delta ) {

        var moveMult = delta * movementSpeed;
        var rotMult = delta * rotSpeed;

        if (targetAngle != 0) {
            var rotationAngle = Math.min(targetAngle, rotMult);
            var toLookAt = new THREE.Vector3();
            toLookAt.copy(currentDirVector);
            toLookAt.applyAxisAngle(targetAxis, rotationAngle);
            mesh.lookAt(toLookAt);
        }

        if (autoForward) {
            mesh.position = mesh.position.add(currentDirVector.multiplyScalar(moveMult));
        }
    };

    this.computeCurrentDirVector = function() {
        currentDirVector = mesh.localToWorld(new THREE.Vector3(0, 0, 1)).sub(mesh.localToWorld(new THREE.Vector3(0, 0, 0))).normalize();
    };

    this.updateTarget = function(targetVec) {
        if (targetVec === null) {
            console.log('what this isn\'t implemented crazy');
        } else {
            var targetDirVec = new THREE.Vector3();
            targetDirVec.copy(targetVec);
            targetDirVec.sub(mesh.position).normalize();
            console.log(targetDirVec);
            targetAngle = currentDirVector.angleTo(targetDirVec);
            targetAxis.copy(currentDirVector);
            targetAxis.cross(targetDirVec).normalize();
        }
    };
};
