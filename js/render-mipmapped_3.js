

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

subjectPickers = ['first-subject-picker', 'second-subject-picker', 'third-subject-picker'];
methodPickers = ['first-method-picker', 'second-method-picker', 'third-method-picker'];
geometryPickers = ['first-geometry-picker', 'second-geometry-picker', 'third-geometry-picker'];
meshes = ['first', 'second', 'third'];


function performUpdateScene() {
    // updateScene(lts, lmet, lrot, lg, rts, rmet, rrot, rg).then(up => {
    //     updatedSceneComp = up;
    //     applyMeshRotations();
    // });

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
    ts[0] = document.getElementById(subjectPickers[0]).value;
    ts[1] = document.getElementById(subjectPickers[0]).value;
    ts[2] = document.getElementById(subjectPickers[0]).value;
    // performUpdateMesh(0);
    // performUpdateMesh(1);
    // performUpdateMesh(2);
    performUpdateScene();
}

function changeMethod(i) {
    met[i] = document.getElementById(methodPickers[i]).value;
    performUpdateMesh(i);
}
function changeGeometry(){
    geo[0] = document.getElementById(geometryPickers[0]).value;
    geo[1] = document.getElementById(geometryPickers[0]).value;
    geo[2] = document.getElementById(geometryPickers[0]).value;
    // performUpdateMesh(i);
    
    performUpdateScene();
}

// console.log(supersampled_renderer);


var render = function() {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.05;
    // mesh.rotation.y += 0.01;
    // console.log(mipmapped_camera.position);
    // console.log(scene);
    mipmapped_renderer.render(scene1, mipmapped_camera);
    mipmapped_renderer2.render(scene2, mipmapped_camera);
    mipmapped_renderer3.render(scene3, mipmapped_camera);
    // console.log(scene)
    // console.log(mipmapped_renderer)
    // document.getElementById('mipmapLevel').innerHTML = mipmapped_renderer.getActiveMipmapLevel()
    // supersampled_renderer.render(scene, supersampled_camera);
}

// animation

var rotSpeed = 0.1;

function onKeyDown(event) {
    event.preventDefault();

    // console.log(updatedSceneComp);

    var keyCode = event.which;
    // console.log(keyCode);
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

        // updatedSceneComp.lmesh.rotation.y += rotSpeed;
        // updatedSceneComp.rmesh.rotation.y += rotSpeed;
        // lrot = updatedSceneComp.lmesh.rotation;
        // rrot = updatedSceneComp.rmesh.rotation;
    } else if (keyCode == 39) {
        yrot -= rotSpeed;
        applyMeshRotations();
        // updatedSceneComp.lmesh.rotation.y -= rotSpeed;
        // updatedSceneComp.rmesh.rotation.y -= rotSpeed;
        // lrot = updatedSceneComp.lmesh.rotation;
        // rrot = updatedSceneComp.rmesh.rotation;
    } else if (keyCode == 38) {
        xrot -= rotSpeed;
        applyMeshRotations();

        // updatedSceneComp.lmesh.rotation.x -= rotSpeed;
        // updatedSceneComp.rmesh.rotation.x -= rotSpeed;
        // lrot = updatedSceneComp.lmesh.rotation;
        // rrot = updatedSceneComp.rmesh.rotation;
    } else if (keyCode == 40) {
        xrot += rotSpeed;
        applyMeshRotations();

        // updatedSceneComp.lmesh.rotation.x += rotSpeed;
        // updatedSceneComp.rmesh.rotation.x += rotSpeed;
        // lrot = updatedSceneComp.lmesh.rotation;
        // rrot = updatedSceneComp.rmesh.rotation;
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

// console.log(scene);
// console.log("XXXXXXXXX");

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();
scene1.add(light);
scene2.add(light);
scene3.add(light);
render();

// this.tl = new TimelineMax().delay(.3);


// function changeSample() {
//     var newValue = document.getElementById('sampleLevelSlider').value;
//     document.getElementById('sampleLevelDisplay').innerHTML = newValue;
//     composer.passes[0].sampleLevel = newValue;
//     render();
// }


window.addEventListener('keydown', onKeyDown, false);