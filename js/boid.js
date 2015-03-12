Boid = function() {
    var boidlings = [];

    this.numOfBoidlings = 500;

    var boidBehaviour = true;

    var distanceThreshold = 70;

    var randomCount = 0;

    for (var i = 0; i < this.numOfBoidlings; i++) {
        boidlings[i] = new Boidling();
    }

    this.getBoidlings = function() {
        return boidlings;
    };

    function distanceBetween(a, b) {
        return a.getPosition().distanceTo(b.getPosition());
    }

    this.update = function(delta) {
        for (var i = 0; i < this.numOfBoidlings; i++) {
            boidlings[i].computeCurrentDirVector();
        }

        if (boidBehaviour) {
            for (var i = 0; i < this.numOfBoidlings; i++) {
                var boidlingsInZone = [];
                for (var j = 0; j < this.numOfBoidlings; j++) {
                    if (i != j && distanceBetween(boidlings[i], boidlings[j]) < distanceThreshold) {
                        boidlingsInZone[boidlingsInZone.length] = boidlings[j];
                    }
                }
                if (boidlingsInZone.length > 0) {
                    var averageHeading = new THREE.Vector3();
                    averageHeading.copy(boidlingsInZone[0].getCurrentDir());
                    for (var j = 1; j < boidlingsInZone.length; j++) {
                        averageHeading.add(boidlingsInZone[j].getCurrentDir());
                    }
                    averageHeading.normalize();
                    averageHeading.multiplyScalar(1.6);

                    var steerAway = new THREE.Vector3(0, 0, 0);
                    for (var j = 0; j < boidlingsInZone.length; j++) {
                        var tempVec = new THREE.Vector3();
                        tempVec.copy(boidlings[i].getPosition());
                        tempVec.sub(boidlingsInZone[j].getPosition());
                        tempVec.multiplyScalar(1 / Math.pow(tempVec.length(), 2));
                        steerAway.add(tempVec);
                    }
                    steerAway.normalize();
                    steerAway.multiplyScalar(2.015);

                    var centerOfMass = new THREE.Vector3(0, 0, 0);
                    for (var j = 0; j < boidlingsInZone.length; j++) {
                        centerOfMass.add(boidlingsInZone[j].getPosition());
                    }
                    centerOfMass.multiplyScalar(1/boidlingsInZone.length);
                    centerOfMass.sub(boidlings[i].getPosition());
                    centerOfMass.normalize();
                    centerOfMass.multiplyScalar(2.015);

                    var centerOfSpace = new THREE.Vector3(0, 0, 0);
                    centerOfSpace.sub(boidlings[i].getPosition());
                    centerOfSpace.normalize();
                    centerOfSpace.multiplyScalar(0.01);

                    var heading = new THREE.Vector3();
                    heading.copy(averageHeading);
                    heading.add(steerAway);
                    heading.add(centerOfMass);
                    heading.add(centerOfSpace);
                    heading.normalize();
                    heading.add(boidlings[i].getPosition());
                    boidlings[i].updateTargetFromVector(heading);
                } else {
                    var heading = new THREE.Vector3();
                    heading.copy(boidlings[i].getCurrentDir());
                    var center = new THREE.Vector3(0, 0, 0);
                    center.sub(boidlings[i].getPosition());
                    heading.add(center);
                    heading.normalize();
                    heading.add(boidlings[i].getPosition());
                    boidlings[i].updateTargetFromVector(heading);
                }

            }
        } else {
            for (var i = 0; i < this.numOfBoidlings; i++) {
                boidlings[i].updateTargetFromVector(camera.position);
            }
        }

        for (var i = 0; i < this.numOfBoidlings; i++) {
            boidlings[i].updateMovement(delta);
        }
    };
}
