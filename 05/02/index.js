//COLORS
var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
};
// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH,
    mousePos = {
        x: 0,
        y: 0
    };

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

    HEIGHT = 0.8 * window.innerHeight;
    WIDTH = 0.8 * window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    camera.position.x = 100;
    camera.position.z = 200;

    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(0x000000);

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function createLights() {

    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(-20, 30, 50);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -100;
    shadowLight.shadow.camera.right = 100;
    shadowLight.shadow.camera.top = 100;
    shadowLight.shadow.camera.bottom = -100;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 200;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
    var helper = new THREE.CameraHelper(shadowLight.shadow.camera);
    scene.add(helper);
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}


var car = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "car";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Create the cabin
    var geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({
        color: Colors.white,
        shading: THREE.FlatShading
    });
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Create Engine
    var geomWheel = new THREE.TorusGeometry(6, 3, 30, 30);
    var matWheel = new THREE.MeshPhongMaterial({
        color: Colors.white,
        //shading: THREE.FlatShading
    });
    var Wheels = [
        [20, -25, 25],
        [-20, -25, 25],
        [20, -25, -25],
        [-20, -25, -25]
    ]
    for (var i = 0; i < 4; i++) {
        var wheel = new THREE.Mesh(geomWheel, matWheel);
        wheel.position.set(Wheels[i][0], Wheels[i][1], Wheels[i][2]);
        wheel.castShadow = true;
        wheel.receiveShadow = true;
        this.mesh.add(wheel);
    }


};

function createFloor() {
    var geom = new THREE.PlaneGeometry(200, 200, 4, 4)
    var mat = new THREE.MeshLambertMaterial({
        color: Colors.brown,
        //side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });
    var floor = new THREE.Mesh(geom, mat);
    floor.rotateX(-Math.PI / 2);
    floor.castShadow = true;
    floor.receiveShadow = true;
    //floor.rotation.y += Math.PI / 4;
    //floor.rotation.z += Math.PI / 4;
    scene.add(floor);


}

function createCar() {
    car = new car();
    car.mesh.scale.set(1, 1, 1);
    car.mesh.position.y = 35;

    scene.add(car.mesh);
}

function render(animated) {
    if (animated) {
        requestAnimationFrame(render);
        scene.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

function init() {
    //RENDERER: 渲染器将和Canvas元素进行绑定
    createScene();
    createLights();
    createFloor();
    createCar();


    //CAMERA

    axes = new THREE.AxisHelper(100);
    scene.add(axes);

    render(0);
    //render(1);
}
