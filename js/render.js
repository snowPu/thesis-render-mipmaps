

// post processing

var composer = new THREE.EffectComposer(supersampled_renderer);

var ssaaRenderPass = new THREE.SSAARenderPass(scene1, supersampled_camera);
ssaaRenderPass.unbiased = false;
ssaaRenderPass.sampleLevel = 5;

var sampleLevel = 5;

composer.addPass(ssaaRenderPass);

var copyPass = new THREE.ShaderPass(THREE.CopyShader);
composer.addPass(copyPass);



var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene1.add(light);
scene2.add(light);

console.log(composer);
// console.log(supersampled_renderer);


var render = function() {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.05;
    // mesh.rotation.y += 0.01;
    // console.log(mipmapped_camera.position);
    mipmapped_renderer.render(scene2, mipmapped_camera);
    console.log(texture2)
    console.log(mipmapped_renderer)
    document.getElementById('sampleLevel').innerHTML = mipmapped_renderer.getActiveMipmapLevel()
    // supersampled_renderer.render(scene, supersampled_camera);
    composer.render();
}

// animation

var rotSpeed = 0.1;

function onKeyDown(event) {
    event.preventDefault();

    var keyCode = event.which;
    console.log(keyCode);
    if (keyCode == 87) {
        mipmapped_camera.position.z -= 1;
        supersampled_camera.position.z -= 1;
    } else if (keyCode == 83) {
        mipmapped_camera.position.z += 1;
        supersampled_camera.position.z += 1;
    } else if (keyCode == 65) {
        mesh1.rotation.y -= rotSpeed;
        mesh2.rotation.y += rotSpeed;
    } else if (keyCode == 68) {
        mesh1.rotation.y += rotSpeed;
        mesh2.rotation.y -= rotSpeed;
    } else if (keyCode == 38) {
        sampleLevel++;
        document.getElementById('sampleLevel').innerHTML = sampleLevel;
        composer.passes[0].sampleLevel = sampleLevel;
        render();
    } else if (keyCode == 40) {
        if (sampleLevel > 0) {
            sampleLevel--;
            document.getElementById('sampleLevel').innerHTML = sampleLevel;
            composer.passes[0].sampleLevel = sampleLevel;
            render();
        }
    }

    render();
}

render();

// this.tl = new TimelineMax().delay(.3);


// function changeSample() {
//     var newValue = document.getElementById('sampleLevelSlider').value;
//     document.getElementById('sampleLevelDisplay').innerHTML = newValue;
//     composer.passes[0].sampleLevel = newValue;
//     render();
// }


window.addEventListener('keydown', onKeyDown, false);