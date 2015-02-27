Boidling = function () {
    this.geometry = new THREE.CylinderGeometry(
        0, // radiusTop
        20, // radiusBottom
        100, // height
        20, // radiusSegments
        20, // heightSegments
        false // openEnded
    );

    this.posx = Math.floor((Math.random() * 10) + 1);
    this.posy = Math.floor((Math.random() * 10) + 1);
    this.posz = Math.floor((Math.random() * 10) + 1);

    this.geometry.position.x = this.posx;
    this.geometry.position.y = this.posy;
    this.geometry.position.z = this.posz;

    this.material = new THREE.MeshBasicMaterial( {color: 0x00ffff, wireframe: true} );

    this.mesh = new THREE.Mesh(geometry, material);

    this.num1 = Math.floor((Math.random() * 10) + 1);
    this.num2 = Math.floor((Math.random() * 10) + 1);
    this.num3 = Math.floor((Math.random() * 10) + 1);
    this.velocity = new THREE.Vector3(num1, num2, num3);

    this.update = function() {
        //geometry.position.x += velocity.x
    };
};
