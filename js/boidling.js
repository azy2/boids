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

    var mesh = new THREE.Mesh(geometry, material);

    this.getMesh = function() {
        return mesh;
    }

    var autoForward = false;
    var movementSpeed = 50;
    var rollSpeed = Math.PI / 12;

    var tmpQuaternion = new THREE.Quaternion();

    var moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 1, pitchDown: 0, yawLeft: 1, yawRight: 0, rollLeft: 1, rollRight: 0 };
    var moveVector = new THREE.Vector3( 0, 0, 0 );
    var rotationVector = new THREE.Vector3( 0, 0, 0 );

    this.update = function( delta ) {

        var moveMult = delta * movementSpeed;
        var rotMult = delta * rollSpeed;

        mesh.translateX( moveVector.x * moveMult );
        mesh.translateY( moveVector.y * moveMult );
        mesh.translateZ( moveVector.z * moveMult );

        tmpQuaternion.set( rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1 ).normalize();
        mesh.quaternion.multiply( tmpQuaternion );

        // expose the rotation vector for convenience
        mesh.rotation.setFromQuaternion( mesh.quaternion, mesh.rotation.order );


    };

    this.updateMovementVector = function() {

        var forward = ( moveState.forward || ( autoForward && !moveState.back ) ) ? 1 : 0;

        moveVector.x = ( -moveState.left    + moveState.right );
        moveVector.y = ( -moveState.down    + moveState.up );
        moveVector.z = ( -forward + moveState.back );

        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

    };

    this.updateRotationVector = function() {

        rotationVector.x = ( -moveState.pitchDown + moveState.pitchUp );
        rotationVector.y = ( -moveState.yawRight  + moveState.yawLeft );
        rotationVector.z = ( -moveState.rollRight + moveState.rollLeft );

        // console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

    };

    this.updateMovementVector();
    this.updateRotationVector();
};
