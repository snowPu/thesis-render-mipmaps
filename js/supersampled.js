
var supersampled_renderer = new THREE.WebGLRenderer({antialias: true});
supersampled_renderer.setClearColor("#000000");
supersampled_renderer.setSize(window.innerWidth / 2, window.innerHeight);
supersampled_renderer.autoClear = false;
supersampled_renderer.setPixelRatio( window.devicePixelRatio );

var sampleRatio = 2;


var supersampled_camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / 2 / window.innerHeight,
    0.1,
    1000
);

supersampled_camera.position.z = 10;
// supersampled_camera.position.x = -2;

document.getElementById('right-canvas').appendChild(supersampled_renderer.domElement);

window.addEventListener('resize', () => {
    supersampled_renderer.setSize(window.innerWidth / 2, window.innerHeight);
    supersampled_camera.aspect = window.innerWidth / 2 / window.innerHeight;

    supersampled_camera.updateProjectionMatrix();
});


var box1 = new THREE.BoxGeometry(1, 1, 1);

// var box2 = new THREE.BoxGeometry(2, 2, 2);
// var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 

// var dpid_textures = [];
// var perceptual_textures = [];

// dpid_texture_images.forEach(texture_image => {
//     var im = new Image();
//     im.src = texture_image;
//     dpid_textures.push(im);
// });

// perceptual_texture_images.forEach(texture_image => {
//     var im = new Image();
//     im.src = texture_image;
//     perceptual_textures.push(im);
// });


var texture1 = new THREE.TextureLoader().load( 'textures/texture.jpeg' );
texture1.anisotropy = 1;
// texture1.mipmaps = dpid_textures;
// texture1.generateMipmaps = false;
var material1 = new THREE.MeshBasicMaterial({map: texture1});

var mesh1 = new THREE.Mesh(box1, material1);
mesh1.scale.x = 1;
mesh1.scale.y = 1;
mesh1.position.x = 1;


// mesh1.position.set(1000, 100, 0);
console.log(mesh1)
scene1.add(mesh1);
