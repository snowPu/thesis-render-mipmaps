

var mipmapped_renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
mipmapped_renderer.setClearColor( 0xffffff, 0);
mipmapped_renderer.setSize(window.innerWidth , window.innerHeight);
mipmapped_renderer.autoClear = false;


var mipmapped_camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

mipmapped_camera.position.z = 10;
// mipmapped_camera.position.x = 2;


document.getElementById('left-canvas').appendChild(mipmapped_renderer.domElement);

window.addEventListener('resize', () => {
    mipmapped_renderer.setSize(window.innerWidth, window.innerHeight);
    mipmapped_camera.aspect = window.innerWidth / window.innerHeight;

    mipmapped_camera.updateProjectionMatrix();
});


// var box2 = new THREE.BoxGeometry(2, 2, 2);

var box2 = new THREE.PlaneGeometry(10, 10, 8 );
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

// var perceptual_texture_images = [
//     'textures/rose/original.jpg',
//     'textures/rose/perceptual/D256x256_perceptual.jpg',
//     'textures/rose/perceptual/D128x128_perceptual.jpg',
//     'textures/rose/perceptual/D64x64_perceptual.jpg',
//     'textures/rose/perceptual/D32x32_perceptual.jpg',
//     'textures/rose/perceptual/D16x16_perceptual.jpg',
//     'textures/rose/perceptual/D8x8_perceptual.jpg',
//     'textures/rose/perceptual/D4x4_perceptual.jpg',
//     'textures/rose/perceptual/D2x2_perceptual.jpg',
//     'textures/rose/perceptual/D1x1_perceptual.jpg'
// ];


var chessboard_images = [
    'textures/chessboard/white/chessboard_512.png',
    'textures/chessboard/red/chessboard_256.png',
    'textures/chessboard/blue/chessboard_128.png',
    'textures/chessboard/green/chessboard_64.png',
    'textures/chessboard/pink/chessboard_32.png',
    'textures/chessboard/yellow/chessboard_16.png',
    'textures/chessboard/orange/chessboard_8.png',
    'textures/chessboard/violet/chessboard_4.png',
    'textures/chessboard/maroon/chessboard_2.png',
    'textures/chessboard/grey/chessboard_1.png'
];

var chessboard_images_normal = [
    'textures/chessboard/white/chessboard_512.png',
    'textures/chessboard/white/chessboard_256.png',
    'textures/chessboard/white/chessboard_128.png',
    'textures/chessboard/white/chessboard_64.png',
    'textures/chessboard/white/chessboard_32.png',
    'textures/chessboard/white/chessboard_16.png',
    'textures/chessboard/white/chessboard_8.png',
    'textures/chessboard/white/chessboard_4.png',
    'textures/chessboard/white/chessboard_2.png',
    'textures/chessboard/white/chessboard_1.png'
];

var lanczos_images = {
    max: [
        'textures/lena/lena.png',
        'textures/lena/lanczos/max/0.png',
        'textures/lena/lanczos/max/1.png',
        'textures/lena/lanczos/max/2.png',
        'textures/lena/lanczos/max/3.png',
        'textures/lena/lanczos/max/4.png',
        'textures/lena/lanczos/max/5.png',
        'textures/lena/lanczos/max/6.png',
        'textures/lena/lanczos/max/7.png',
        'textures/lena/lanczos/max/8.png'
    ],
    
    average: [
        'textures/lena/lena.png',
        'textures/lena/lanczos/average/0.png',
        'textures/lena/lanczos/average/1.png',
        'textures/lena/lanczos/average/2.png',
        'textures/lena/lanczos/average/3.png',
        'textures/lena/lanczos/average/4.png',
        'textures/lena/lanczos/average/5.png',
        'textures/lena/lanczos/average/6.png',
        'textures/lena/lanczos/average/7.png',
        'textures/lena/lanczos/average/8.png'
    ],

    first: [
        'textures/lena/lena.png',
        'textures/lena/lanczos/first/0.png',
        'textures/lena/lanczos/first/1.png',
        'textures/lena/lanczos/first/2.png',
        'textures/lena/lanczos/first/3.png',
        'textures/lena/lanczos/first/4.png',
        'textures/lena/lanczos/first/5.png',
        'textures/lena/lanczos/first/6.png',
        'textures/lena/lanczos/first/7.png',
        'textures/lena/lanczos/first/8.png'
    ]
}


var sinc_images = {
    max: [
        'textures/lena/lena.png',
        'textures/lena/sinc/max/0.png',
        'textures/lena/sinc/max/1.png',
        'textures/lena/sinc/max/2.png',
        'textures/lena/sinc/max/3.png',
        'textures/lena/sinc/max/4.png',
        'textures/lena/sinc/max/5.png',
        'textures/lena/sinc/max/6.png',
        'textures/lena/sinc/max/7.png',
        'textures/lena/sinc/max/8.png'
    ],
    
    average: [
        'textures/lena/lena.png',
        'textures/lena/sinc/average/0.png',
        'textures/lena/sinc/average/1.png',
        'textures/lena/sinc/average/2.png',
        'textures/lena/sinc/average/3.png',
        'textures/lena/sinc/average/4.png',
        'textures/lena/sinc/average/5.png',
        'textures/lena/sinc/average/6.png',
        'textures/lena/sinc/average/7.png',
        'textures/lena/sinc/average/8.png'
    ]
}

var box_images = {
    max: [
        'textures/lena/lena.png',
        'textures/lena/box/max/0.png',
        'textures/lena/box/max/1.png',
        'textures/lena/box/max/2.png',
        'textures/lena/box/max/3.png',
        'textures/lena/box/max/4.png',
        'textures/lena/box/max/5.png',
        'textures/lena/box/max/6.png',
        'textures/lena/box/max/7.png',
        'textures/lena/box/max/8.png'
    ],
    
    average: [
        'textures/lena/lena.png',
        'textures/lena/box/average/0.png',
        'textures/lena/box/average/1.png',
        'textures/lena/box/average/2.png',
        'textures/lena/box/average/3.png',
        'textures/lena/box/average/4.png',
        'textures/lena/box/average/5.png',
        'textures/lena/box/average/6.png',
        'textures/lena/box/average/7.png',
        'textures/lena/box/average/8.png'
    ],

    first: [
        'textures/lena/lena.png',
        'textures/lena/box/first/0.png',
        'textures/lena/box/first/1.png',
        'textures/lena/box/first/2.png',
        'textures/lena/box/first/3.png',
        'textures/lena/box/first/4.png',
        'textures/lena/box/first/5.png',
        'textures/lena/box/first/6.png',
        'textures/lena/box/first/7.png',
        'textures/lena/box/first/8.png'
    ]
}


var dpid_textures = [];
var perceptual_textures = [];
var chessboard = [];
var chessboard_normal = [];
var chessboard_lanczos = [];
var chessboard_sinc = [];

var lena_box = [];

dpid_texture_images.forEach(texture_image => {
    var im = new Image();
    im.src = texture_image;
    dpid_textures.push(im);
});


chessboard_images.forEach(chessboard_img => {
    var im = new Image();
    // console.log(chessboard_img);
    im.src = chessboard_img;
    chessboard.push(im);
});

lanczos_images['first'].forEach(img => {
    var im = new Image();
    // console.log(img);
    im.src = img;
    chessboard_lanczos.push(im);
});

sinc_images['average'].forEach(img => {
    var im = new Image();
    // console.log(img);
    im.src = img;
    chessboard_sinc.push(im);
});


box_images['first'].forEach(img => {
    var im = new Image();
    // console.log(img);
    im.src = img;
    lena_box.push(im);
});

chessboard_images_normal.forEach(chessboard_img => {
    var im = new Image();
    console.log(chessboard_img);
    im.src = chessboard_img;
    chessboard_normal.push(im);
});

// perceptual_texture_images.forEach(texture_image => {
//     var im = new Image();
//     im.src = texture_image;
//     perceptual_textures.push(im);
// });


var texture2 = new THREE.TextureLoader().load( box_images['first'][0] );
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.offset.set(0, 0);
// texture2.repeat.set(2, 2);
texture2.minFilter = THREE.LinearMipmapLinearFilterww;
texture2.magFilter = THREE.LinearFilter;
texture2.needsUpdate = true;
texture2.mipmaps = lena_box;
texture2.generateMipmaps = true;
texture2.rotation = Math.PI;

var textures = [];

const textureSubjects = {
    'chessboard': {
        'ext': '.png',
        'count': 9,
        'repeat': 2,
        'rotation': 0
    }, 
    'lena': {
        'ext': '.png',
        'count': 9,
        'repeat': 1,
        'rotation': Math.PI
    }, 
    'grass': {
        'ext': '.png',
        'count': 10,
        'repeat': 2,
        'rotation': 0
    }, 
    'winterlandscape': {
        'ext': '.png',
        'count': 9,
        'repeat': 1,
        'rotation': Math.PI
    }
};
const lowPassFilters = ['lanczos', 'box', 'sinc', 'gaussian_3', 'gaussian_5'];
const subsamplingMethods = ['max', 'min', 'average', 'first', 'second', 'third', 'fourth', 'median', 'random', 'extreme'];
const texturePath = 'textures/'
var textureImages = {};
let materials = {};

for (let ts in textureSubjects) {
    textureImages[ts] = {};
    var originalImage = texturePath + ts + '/' + ts + textureSubjects[ts]['ext'];
    lowPassFilters.forEach(lpf => {
        textureImages[ts][lpf] = {};
        subsamplingMethods.forEach(ssm => {
            textureImages[ts][lpf][ssm] = [];

            textureImages[ts][lpf][ssm].push(originalImage);
            var path = texturePath + ts + '/' + lpf + '/' + ssm + '/';
            for (let i = 0; i < textureSubjects[ts]['count']; i ++) {
                var ipath = path + i.toString() + textureSubjects[ts]['ext'];
                textureImages[ts][lpf][ssm].push(ipath);
            }

            

        });
    });
}


async function getMaterial(ts, lpf, ssm) {

    let mipmapImages = [];

    if (ts === 'reference') {
        let texture = await new THREE.TextureLoader().load( chessboard_images[0] );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(2, 2);
        texture.minFilter = THREE.NearestMipmapNearestFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        texture.mipmaps = chessboard;
        texture.generateMipmaps = true;
        var material = await new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
        return material;
    } else if (ts === 'none') { 
        var material = await new THREE.MeshLambertMaterial({color: 0x4400ff});
        return material;
    }

    for (let img of textureImages[ts][lpf][ssm]) {
        var im = await new Image();
        // console.log(img);
        im.src = img;
        mipmapImages.push(im);
    }

    // console.log(mipmapImages);

    let texture = await new THREE.TextureLoader().load( textureImages[ts][lpf][ssm][0] );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    let repeat = textureSubjects[ts]['repeat'];
    console.log(repeat);
    texture.repeat.set(repeat, repeat);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    texture.mipmaps = mipmapImages;
    texture.generateMipmaps = false;
    texture.rotation = textureSubjects[ts]['rotation'];
    
    var material = await new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    return material;
}

async function getMesh(which, ts, lpf, ssm, g) {
    let material = await getMaterial(ts, lpf, ssm);
    let mesh;
    if (g == '' || g == 'plane') {
        var plane_width = 30;
        var plane_height = 20;
        var plane = new THREE.PlaneGeometry(plane_width, plane_height, 8 );
        mesh = await new THREE.Mesh(plane, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = -plane_width / 2;
        } else {
            mesh.position.x = plane_width / 2;
        }
    } else if (g == 'sphere') {
        var sphere_radius = 3;
        var sphere_segments = 64;
        var sphere = new THREE.SphereGeometry( sphere_radius, sphere_segments, sphere_segments );
        mesh = await new THREE.Mesh(sphere, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = - sphere_radius * 2;
        } else {
            mesh.position.x = sphere_radius * 2;
        }
    } else if (g == 'box') {
        var box_width = 3;
        var box = new THREE.BoxGeometry( box_width, box_width, box_width);
        mesh = await new THREE.Mesh(box, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = - box_width * 2;
        } else {
            mesh.position.x = box_width * 2;
        }
    } else if (g == 'cylinder') {
        var cylinder_radius = 2;
        var cylinder_height = 5;
        var cylinder_segments = 32;
        var cylinder = new THREE.CylinderGeometry( cylinder_radius, cylinder_radius, cylinder_height, cylinder_segments);
        mesh = await new THREE.Mesh(cylinder, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = - cylinder_radius * 2;
        } else {
            mesh.position.x = cylinder_radius * 2;
        }
    } else if (g == 'torus') {
        var torus_radius = 4;
        var tube_radius = 1;
        var radial_segments = 8;
        var tubular_segments = 32;
        var torus = new THREE.TorusGeometry( torus_radius, tube_radius, radial_segments, tubular_segments);
        mesh = await new THREE.Mesh(torus, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = - torus_radius * 2;
        } else {
            mesh.position.x = torus_radius * 2;
        }
    } else if (g == 'torus-knot') {
        var torus_radius = 4;
        var tube_radius = 1;
        var radial_segments = 32;
        var tubular_segments = 32;
        var p = 2;
        var q = 3;
        var torus_knot = new THREE.TorusKnotGeometry( torus_radius, tube_radius, radial_segments, tubular_segments);
        mesh = await new THREE.Mesh(torus_knot, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90
        if (which == 'left') {
            mesh.position.x = - torus_radius * 2;
        } else {
            mesh.position.x = torus_radius * 2;
        }
    }
    
    return mesh;
}

async function updateScene(lts, llpf, lssm, lrot, lg, rts, rlpf, rssm, rrot, rg) {
    let lmesh = await getMesh('left', lts, llpf, lssm, lg);
    let rmesh = await getMesh('right', rts, rlpf, rssm, rg);

    // console.log(lmesh);
    // console.log(rmesh);
    // remove current meshes
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    console.log(lrot);
    // if (lrot) {
    //     lmesh.rotation = lrot;
    // }
    // if (rrot) {
    //     rmesh.rotation = rrot;
    // }

    scene.add(lmesh);
    scene.add(rmesh);



    return {
        scene: scene,
        lmesh: lmesh,
        rmesh: rmesh
    };
}


// console.log(textureImages);



// var texture1 = new THREE.TextureLoader().load( lanczos_images['first'][0] );
// texture1.wrapS = THREE.RepeatWrapping;
// texture1.wrapT = THREE.RepeatWrapping;
// texture1.offset.set(0, 0);
// // texture1.repeat.set(2, 2);
// texture1.minFilter = THREE.LinearMipmapLinearFilter;
// texture1.magFilter = THREE.LinearFilter;
// texture1.needsUpdate = true;
// texture1.mipmaps = chessboard_lanczos;
// texture1.generateMipmaps = true;
// texture1.rotation = Math.PI;

// var material1 = new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide});
// var material2 = new THREE.MeshBasicMaterial({map: texture2, side: THREE.DoubleSide});

// var mesh1 = new THREE.Mesh(box2, material1);
// var mesh2 = new THREE.Mesh(box2, material2);
// mesh1.scale.x = -1;
// mesh2.scale.x = -1;
// mesh1.rotation.x = 90
// mesh2.rotation.x = 90
// // mesh2.scale.y = -1;
// mesh1.position.x = 5;
// mesh2.position.x = -5;
// // mesh1.position.set(1000, 100, 0);
// console.log(texture2)
// scene2.add(mesh1);
// scene2.add(mesh2);


// this.tl.to(this.mesh.scale, 1, {x: 2, ease: Expo.easeOut});
