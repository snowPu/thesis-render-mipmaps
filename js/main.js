var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

var box1 = new THREE.BoxGeometry(2, 2, 2);

var box2 = new THREE.BoxGeometry(2, 2, 2);
// var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});

var dpid_texture_images = [
    'textures/rose/original.jpg',
    'textures/rose/dpid/D256x256_dpid.jpg',
    'textures/rose/dpid/D128x128_dpid.jpg',
    'textures/rose/dpid/D64x64_dpid.jpg',
    'textures/rose/dpid/D32x32_dpid.jpg',
    'textures/rose/dpid/D16x16_dpid.jpg',
    'textures/rose/dpid/D8x8_dpid.jpg',
    'textures/rose/dpid/D4x4_dpid.jpg',
    'textures/rose/dpid/D2x2_dpid.jpg',
    'textures/rose/dpid/D1x1_dpid.jpg'
];

var perceptual_texture_images = [
    'textures/rose/original.jpg',
    'textures/rose/perceptual/D256x256_perceptual.jpg',
    'textures/rose/perceptual/D128x128_perceptual.jpg',
    'textures/rose/perceptual/D64x64_perceptual.jpg',
    'textures/rose/perceptual/D32x32_perceptual.jpg',
    'textures/rose/perceptual/D16x16_perceptual.jpg',
    'textures/rose/perceptual/D8x8_perceptual.jpg',
    'textures/rose/perceptual/D4x4_perceptual.jpg',
    'textures/rose/perceptual/D2x2_perceptual.jpg',
    'textures/rose/perceptual/D1x1_perceptual.jpg'
];


var dpid_textures = [];
var perceptual_textures = [];

dpid_texture_images.forEach(texture_image => {
    var im = new Image();
    im.src = texture_image;
    dpid_textures.push(im);
});

perceptual_texture_images.forEach(texture_image => {
    var im = new Image();
    im.src = texture_image;
    perceptual_textures.push(im);
});


var texture1 = new THREE.TextureLoader().load( 'textures/rose/original.jpg' );
texture1.mipmaps = dpid_textures;
texture1.generateMipmaps = false;
var material1 = new THREE.MeshBasicMaterial({map: texture1});

var mesh1 = new THREE.Mesh(box1, material1);
mesh1.scale.x = -1;
mesh1.scale.y = -1;
// mesh1.position.set(1000, 100, 0);
console.log(mesh1.position)
scene.add(mesh1);




var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.05;
    // mesh.rotation.y += 0.01;
    // console.log(camera.position);
    renderer.render(scene, camera);
}

function onKeyDown(event) {
    event.preventDefault();

    var keyCode = event.which;
    console.log(keyCode);
    if (keyCode == 87) {
        camera.position.z -= 1;
    } else if (keyCode == 83) {
        camera.position.z += 1;
    }

    render();
}

render();

this.tl = new TimelineMax().delay(.3);

window.addEventListener('keydown', onKeyDown, false);
// this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut});
