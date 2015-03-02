Boidling = function () {
    // var geometry = new THREE.CylinderGeometry(
    //     0, // radiusTop
    //     20, // radiusBottom
    //     100, // height
    //     20, // radiusSegments
    //     20, // heightSegments
    //     false // openEnded
    // );
    var geometry = new THREE.SphereGeometry(
        1000,
        500,
        500
    );

    var color = Math.floor(Math.random() * 16777215).toString(16)
    var material = new THREE.MeshBasicMaterial( {color: parseInt(color, 16), wireframe: true} );

    var mesh = new THREE.Mesh(geometry, material);

    mesh.translateX(Math.floor((Math.random() * 100) - 50));
    mesh.translateY(Math.floor((Math.random() * 100) - 50));
    mesh.translateZ(Math.floor((Math.random() * 100) - 50));

    this.getMesh = function() {
        return mesh;
    }

    var autoForward = false;
    var movementSpeed = 100;
    var rollSpeed = Math.PI / 12;

    var tmpQuaternion = new THREE.Quaternion();


    //var moveState = {pitch: (Math.random() * 10) - 5, yaw: (Math.random() * 10) - 5, roll: (Math.random() * 10) - 5};
    var moveState = {pitch: 0, yaw: 0, roll: 0};
    var rotationVector = new THREE.Vector3( 0, 0, 0 );

    var target = new THREE.Vector3(0, 1, 0);

    this.update = function(delta) {
        this.updateMovement(delta);
        target = camera.position;
        this.updateRotationVector();
    };

    this.updateMovement = function( delta ) {

        var moveMult = delta * movementSpeed;
        var rotMult = delta * rollSpeed;

        if (autoForward) mesh.translateY( moveMult );

        tmpQuaternion.set( rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1 ).normalize();
        mesh.quaternion.multiply( tmpQuaternion );

        // expose the rotation vector for convenience
        mesh.rotation.setFromQuaternion( mesh.quaternion, mesh.rotation.order);
    };

    this.updateRotationVector = function() {

        rotationVector.x = (moveState.pitch);
        rotationVector.y = (moveState.yaw);
        rotationVector.z = (moveState.roll);

        // console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

    };
};
