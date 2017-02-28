function init() {
    //RENDERER: 渲染器将和Canvas元素进行绑定
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(1600, 1200);
    document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);

    //SCENE: 在Three.js中添加的物体都是添加到场景中的，相当于一个大容器。
    var scene = new THREE.Scene();

    //CAMERA
    var camera = new THREE.OrthographicCamera(-15, 15, 12, -12, 1, 50);
    camera.position.set(3, 2, 5);


    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    var light = new THREE.DirectionalLight();
    light.position.set(2, 5, 3);

    scene.add(light);

    //OBJECTS
    /*
    THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
    THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
    THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    THREE.TetrahedronGeometry(radius, detail)
    THREE.OctahedronGeometry(radius, detail)
    THREE.IcosahedronGeometry(radius, detail)
    THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
    THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
    */

    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
    var cube = new THREE.Mesh(new THREE.CubeGeometry(6, 3, 3), material);
    var torus1 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 20, 20), material);
    var torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 20, 20), material);
    var torus3 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 20, 20), material);
    var torus4 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 20, 20), material);
    torus1.position.set(1.5, -1.5, 1.5);
    torus2.position.set(-1.5, -1.5, 1.5);
    torus3.position.set(-1.5, 1.5, 1.5);
    torus4.position.set(-1.5, 1.5, 1.5);
    scene.add(cube);
    scene.add(torus1);
    scene.add(torus2);

    //RENDER
    renderer.render(scene, camera);
}
