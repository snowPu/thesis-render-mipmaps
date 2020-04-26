

var mipmapped_renderer = new THREE.WebGLRenderer({antialias: true});
mipmapped_renderer.setClearColor("#000000");
mipmapped_renderer.setSize(window.innerWidth / 2, window.innerHeight);
mipmapped_renderer.autoClear = false;


var mipmapped_camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / 2 / window.innerHeight,
    0.1,
    1000
);

mipmapped_camera.position.z = 10;
// mipmapped_camera.position.x = 2;


document.getElementById('left-canvas').appendChild(mipmapped_renderer.domElement);

window.addEventListener('resize', () => {
    mipmapped_renderer.setSize(window.innerWidth / 2, window.innerHeight);
    mipmapped_camera.aspect = window.innerWidth / 2 / window.innerHeight;

    mipmapped_camera.updateProjectionMatrix();
});


// var box2 = new THREE.BoxGeometry(2, 2, 2);

var box2 = new THREE.BoxGeometry(4, 4, 4);
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


var texture2 = new THREE.TextureLoader().load( 'textures/texture.jpeg' );
texture2.mipmaps = dpid_textures;
texture2.generateMipmaps = true;
var material2 = new THREE.MeshBasicMaterial({map: texture2});

var mesh2 = new THREE.Mesh(box2, material2);
mesh2.scale.x = -1;
// mesh2.scale.y = -1;
mesh2.position.x = -1;
// mesh1.position.set(1000, 100, 0);
console.log(mesh2)
scene2.add(mesh2);


// this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut});
