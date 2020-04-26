

// post processing


var lts = 'none';
var rts = 'texture1';
ts = ['texture1', 'texture1', 'texture1'];

var lmet = 'lanczos_first';
var rmet = 'box_average';
met = ['lanczos_first', 'box_average', 'box_average'];

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

performUpdateScene();


function changeSubject(i) {
    ts[i] = document.getElementById(subjectPickers[i]).value;
    performUpdateScene();
}

function changeMethod(i) {
    met[i] = document.getElementById(methodPickers[i]).value;
    performUpdateScene();
}
function changeGeometry(i){
    geo[i] = document.getElementById(geometryPickers[i]).value;
    performUpdateScene();
}

// console.log(supersampled_renderer);


var render = function() {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.05;
    // mesh.rotation.y += 0.01;
    // console.log(mipmapped_camera.position);
    // console.log(scene);
    mipmapped_renderer.render(scene, mipmapped_camera);
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
    scene.add(light);
    render();
}


function applyMeshRotations() {
    updatedSceneComp.fmesh.rotation.x = xrot;
    updatedSceneComp.smesh.rotation.x = xrot;
    updatedSceneComp.tmesh.rotation.x = xrot;

    updatedSceneComp.fmesh.rotation.y = yrot;
    updatedSceneComp.smesh.rotation.y = yrot;
    updatedSceneComp.tmesh.rotation.y = yrot;
}

// console.log(scene);
// console.log("XXXXXXXXX");

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();
scene.add(light);
render();

// this.tl = new TimelineMax().delay(.3);


// function changeSample() {
//     var newValue = document.getElementById('sampleLevelSlider').value;
//     document.getElementById('sampleLevelDisplay').innerHTML = newValue;
//     composer.passes[0].sampleLevel = newValue;
//     render();
// }


window.addEventListener('keydown', onKeyDown, false);