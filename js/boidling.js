Boidling = function () {
    var geometry = new THREE.CylinderGeometry(
        0, // radiusTop
        20, // radiusBottom
        100, // height
        20, // radiusSegments
        20, // heightSegments
        false // openEnded
    );

    var material = new THREE.MeshBasicMaterial( {color: 0x00ffff, wireframe: true} );

    this.mesh = new THREE.Mesh(geometry, material);

    this.update = function() {
        //geometry.position.x += velocity.x
    };
};
