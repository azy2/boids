Boidling = function () {
    var geometry = new THREE.CylinderGeometry(
        0, // radiusTop
        20, // radiusBottom
        100, // height
        40, // radiusSegments
        40, // heightSegments
        false // openEnded
    );

    var color = Math.floor(Math.random() * 16777215).toString(16)
    var material = new THREE.MeshBasicMaterial( {color: parseInt(color, 16), wireframe: true} );

    var coneMesh = new THREE.Mesh(geometry, material);

    coneMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    var mesh = new THREE.Object3D();
    mesh.add(coneMesh);

    this.getMesh = function() {
        return mesh;
    }

    var autoForward = true;
    var movementSpeed = 100;
    var rollSpeed = Math.PI / 12;

    var tmpQuaternion = new THREE.Quaternion();

    var rand1 = (Math.random() * 5) - 2.5;
    var rand2 = (Math.random() * 5) - 2.5;
    var rand3 = (Math.random() * 5) - 2.5;

    var moveState = {pitch: rand1, yaw: 0, roll: 0};
    var moveVector = new THREE.Vector3( 0, 0, 1);
    var rotationVector = new THREE.Vector3( 0, 0, 0 );

    this.update = function( delta ) {

        var moveMult = delta * movementSpeed;
        var rotMult = delta * rollSpeed;

        mesh.translateZ( moveVector.z * moveMult );

        tmpQuaternion.set( rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1 ).normalize();
        mesh.quaternion.multiply( tmpQuaternion );

        // expose the rotation vector for convenience
        mesh.rotation.setFromQuaternion( mesh.quaternion, mesh.rotation.order );


    };

    this.updateRotationVector = function() {

        rotationVector.x = (moveState.pitch);
        rotationVector.y = (moveState.yaw);
        rotationVector.z = (moveState.roll);

        // console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

    };

    this.updateRotationVector();
};
