Boidling = function () {
    var geometry = new THREE.CylinderGeometry(
        0, // radiusTop
        10, // radiusBottom
        50, // height
        10, // radiusSegments
        10, // heightSegments
        false // openEnded
    );

    var color = Math.floor(Math.random() * 16777215).toString(16)
    var material = new THREE.MeshBasicMaterial( {color: parseInt(color, 16), wireframe: false} );

    var coneMesh = new THREE.Mesh(geometry, material);
    coneMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    var mesh = new THREE.Object3D();
    mesh.add(coneMesh);

    // var axisHelper = new THREE.AxisHelper(50);
    // mesh.add(axisHelper);

    //mesh.position.y = 10;
    mesh.position.x = (Math.random() * 700) - 350;
    mesh.position.y = (Math.random() * 700) - 350;
    mesh.position.z = (Math.random() * 700) - 350;

    mesh.lookAt(new THREE.Vector3(0, 0, 0));



    this.getMesh = function() {
        return mesh;
    }

    var autoForward = true;
    var movementSpeed = 100;
    var rotSpeed = Math.PI / 4;

    var tmpQuaternion = new THREE.Quaternion();

    var currentDirVector = new THREE.Vector3();

    var targetAxis = new THREE.Vector3();
    var targetAngle = 0;

    this.updateMovement = function(delta) {

        var moveMult = delta * movementSpeed;
        var rotMult = delta * rotSpeed;

        if (targetAngle != 0) {
            var rotationAngle = Math.min(targetAngle, rotMult);
            var toLookAt = new THREE.Vector3();
            toLookAt.copy(currentDirVector);
            toLookAt.applyAxisAngle(targetAxis, rotationAngle);
            toLookAt.add(mesh.position);
            mesh.lookAt(toLookAt);
        }

        if (autoForward) {
            mesh.translateZ(moveMult);
        }


    };

    this.computeCurrentDirVector = function() {
        currentDirVector.copy(mesh.localToWorld(new THREE.Vector3(0, 0, 1)));
        currentDirVector.sub(mesh.localToWorld(new THREE.Vector3(0, 0, 0)));
        currentDirVector.normalize();
    };

    this.updateTargetFromVector = function(targetVec) {
        this.computeCurrentDirVector();
        var targetDirVec = new THREE.Vector3();
        targetDirVec.copy(targetVec);
        targetDirVec.sub(mesh.position).normalize();
        targetAngle = currentDirVector.angleTo(targetDirVec);
        targetAxis.copy(currentDirVector);
        targetAxis.cross(targetDirVec).normalize();
    };

    this.getCurrentDir = function() {
        return currentDirVector;
    };

    this.getPosition = function() {
        return mesh.position;
    }

    this.computeCurrentDirVector();
};
