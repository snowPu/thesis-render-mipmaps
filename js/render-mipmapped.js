

// post processing


var lts = 'none';
var rts = 'texture1';
ts = ['texture4', 'texture4', 'texture4'];

var lmet = 'lanczos_first';
var rmet = 'box_average';
met = ['box_first', 'dpid', 'weights_perceptual_ssim_nadam_500_0.0002_0.9_0.999_1587746299.670421_00000390'];

var lrot = null;
var rrot = null;

var xrot = 90;
var yrot = 0;

var lg = 'box';
var rg = 'box';
geo = ['box', 'box', 'box'];

var updatedSceneComp;

subjectPicker = 'first-subject-picker';
methodPickers = ['first-method-picker', 'second-method-picker', 'third-method-picker'];
geometryPicker = 'first-geometry-picker';
meshes = ['first', 'second', 'third'];


function performUpdateScene() {
    updateScene(ts, met, geo).then(up => {
        updatedSceneComp = up;
        applyMeshRotations();
    })
}

function performUpdateMesh(i) {
    updateMesh(meshes[i], ts[i], met[i], geo[i]).then(m => {
        updatedSceneComp[meshes[i]] = m;
        applyMeshRotations();
    })
}

performUpdateScene();


function changeSubject() {
    ts[0] = document.getElementById(subjectPicker).value;
    ts[1] = document.getElementById(subjectPicker).value;
    ts[2] = document.getElementById(subjectPicker).value;
    performUpdateScene();
}

function changeMethod(i) {
    met[i] = document.getElementById(methodPickers[i]).value;
    performUpdateMesh(i);
}
function changeGeometry(){
    geo[0] = document.getElementById(geometryPicker).value;
    geo[1] = document.getElementById(geometryPicker).value;
    geo[2] = document.getElementById(geometryPicker).value;
    performUpdateScene();
}


var render = function() {
    requestAnimationFrame(render);
    mipmapped_renderer.render(scene1, mipmapped_camera);
    mipmapped_renderer2.render(scene2, mipmapped_camera);
    mipmapped_renderer3.render(scene3, mipmapped_camera);
}

// animation

var rotSpeed = 0.1;

function onKeyDown(event) {
    event.preventDefault();

    var keyCode = event.which;
    if (keyCode == 87) {
        mipmapped_camera.position.z -= 1;
    } else if (keyCode == 83) {
        mipmapped_camera.position.z += 1;
    } else if (keyCode == 65) {
        mipmapped_camera.position.x -= 1;
    } else if (keyCode == 68) {
        mipmapped_camera.position.x += 1;
    } else if (keyCode == 37) {
        yrot += rotSpeed;
        applyMeshRotations();
    } else if (keyCode == 39) {
        yrot -= rotSpeed;
        applyMeshRotations();
    } else if (keyCode == 38) {
        xrot -= rotSpeed;
        applyMeshRotations();
    } else if (keyCode == 40) {
        xrot += rotSpeed;
        applyMeshRotations();
    }
    
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene1.add(light);
    scene2.add(light);
    scene3.add(light);
    render();
}


function applyMeshRotations() {
    console.log(updatedSceneComp);
    updatedSceneComp.first.rotation.x = xrot;
    updatedSceneComp.second.rotation.x = xrot;
    updatedSceneComp.third.rotation.x = xrot;

    updatedSceneComp.first.rotation.y = yrot;
    updatedSceneComp.second.rotation.y = yrot;
    updatedSceneComp.third.rotation.y = yrot;
}

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();
scene1.add(light);
scene2.add(light);
scene3.add(light);
render();



window.addEventListener('keydown', onKeyDown, false);