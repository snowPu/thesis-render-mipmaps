

// post processing


var lts = 'none';
var rts = 'grass';

var llpf = 'lanczos';
var rlpf = 'box';

var lssm = 'first';
var rssm = 'first';

var lrot = null;
var rrot = null;

var xrot = 90;
var yrot = 0;

var lg = 'box';
var rg = 'box';

var updatedSceneComp;

function performUpdateScene() {
    updateScene(lts, llpf, lssm, lrot, lg, rts, rlpf, rssm, rrot, rg).then(up => {
        updatedSceneComp = up;
        applyMeshRotations();
    });
}

performUpdateScene();


function changeLeftSubject() {
    lts = document.getElementById('left-subject-picker').value;
    performUpdateScene();
}
function changeRightSubject() {
    rts = document.getElementById('right-subject-picker').value;
    performUpdateScene();
}
function changeLeftLowPassFilter() {
    llpf = document.getElementById('left-filter-picker').value;
    performUpdateScene();
}
function changeRightLowPassFilter() {
    rlpf = document.getElementById('right-filter-picker').value;
    performUpdateScene();
}
function changeLeftSubsamplingMethod() {
    lssm = document.getElementById('left-subsample-picker').value;
    performUpdateScene();
}
function changeRightSubsamplingMethod() {
    rssm = document.getElementById('right-subsample-picker').value;
    performUpdateScene();
}
function changeLeftGeometry(){
    lg = document.getElementById('left-geometry-picker').value;
    performUpdateScene();
}
function changeRightGeometry(){
    rg = document.getElementById('right-geometry-picker').value;
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
    console.log(scene)
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
    updatedSceneComp.lmesh.rotation.x = xrot;
    updatedSceneComp.rmesh.rotation.x = xrot;

    updatedSceneComp.lmesh.rotation.y = yrot;
    updatedSceneComp.rmesh.rotation.y = yrot;
}

console.log(scene);
console.log("XXXXXXXXX");

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