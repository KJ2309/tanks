AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var pos1 = new THREE.Vector3()
            var pos2 = new THREE.Vector3()
            //Get enemey and player position using Three.js methods
            var enemy = els[i].object3D
            var player = docuemnt.querySelector("#weapon").object3D
            player.getWorldPosition(pos1)
            enemy.getWorldPosition(pos2)
            //set the velocity and it's direction
            var direction = new THREE.Vector3()
            direction.subVectors(pos1,pos2).normalize()
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(10))
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:0,
            });

            //Get text attribute
            var element = document.querySelector("#countlife")
            var playerlife = parseInt(element.getAttribute("text").value)

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here

                    if(playerlife > 0){
                        playerlife -= 1;
                        element.setAttribute("text",{
                            value:playerlife
                        })
                    }  
                    if(playerlife<= 0){
                        var txt = docuemnt.querySelector("#over");
                        txt.setAttribute("visible",true);
                        var tankE1 = docuemnt.querySelectorAll(".enemy");
                        for(var i = 0;i<tankE1.length;i++){
                            scene.removeChild(tankE1[i])
                        }
                    }

                }
            });

        }
    },

});