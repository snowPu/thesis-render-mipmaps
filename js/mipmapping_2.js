

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

var chessboard = [];
var chessboard_normal = [];


var lena_box = [];

chessboard_images.forEach(chessboard_img => {
    var im = new Image();
    // console.log(chessboard_img);
    im.src = chessboard_img;
    chessboard.push(im);
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

var textures = [];

const textureSubjects = {
    'texture1': {
        'name': 'rceafb000t',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture2': {
        'name': 'rcee7b651t',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture3': {
        'name': 'rd05a2e77t',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture4': {
        'name': 'rd6d9dd77t',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture5': {
        'name': 'rd26a8614t',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    }    
}

const lowPassFilters = ['lanczos', 'box', 'sinc', 'gaussian_3', 'gaussian_5'];
const subsamplingMethods = ['max', 'min', 'average', 'first', 'second', 'third', 'fourth', 'median', 'random', 'extreme'];
const existing_work_methods = ['dpid', 'L02e2_6', 'L02e2_8', 'L02e4_6', 'L02e4_8', 'perceptual'];
const autoencoder_methods = [
    'weights_perceptual_ssim_nadam_300_0.0002_0.9_0.999_1586918017.307248',
    'weights_perceptual_ssim_mse_nadam_500_0.0002_0.9_0.999_1586947041.876116',
    'weights_perceptual_ssim_nadam_1000_0.0002_0.9_0.999_1587342021.930168',
    'weights_perceptual_ssim_nadam_500_0.0002_0.9_0.999_1587477844.121406'
];
const texturePath = 'mipmap_LPF_SS/';
var textureImages = {};
let materials = {};

// load options in front end

function loadSelectOptions(select_id) {
    let selectElement = document.getElementById(select_id);

    lowPassFilters.forEach(lpf => {
        subsamplingMethods.forEach(ssm => {
            let lpf_ss = lpf + '_' + ssm;
            var opt = document.createElement('option');
            opt.value = lpf_ss;
            opt.innerHTML = lpf_ss;
            selectElement.appendChild(opt);
        });
    });

    existing_work_methods.forEach(ew => {
        var opt = document.createElement('option');
        opt.value = ew;
        opt.innerHTML = ew;
        selectElement.appendChild(opt);
    });

    autoencoder_methods.forEach(ae => {
        var opt = document.createElement('option');
        opt.value = ae;
        opt.innerHTML = ae;
        selectElement.appendChild(opt);
    });
}

for (let ts in textureSubjects) {
    textureImages[ts] = {};
    var originalImage = texturePath + '256x256/' + textureSubjects[ts]['name'] + textureSubjects[ts]['ext'];

    // low pass filters and ss
    let lpfss_folder = 'lpf_ss/'
    lowPassFilters.forEach(lpf => {
        subsamplingMethods.forEach(ssm => {
            let folder_path = lpfss_folder + lpf + '_' + ssm + '/';
            let size = 128;
            textureImages[ts][lpf + '_' + ssm] = [];
            while (size >= 1) {
                let size_folder = texturePath + size.toString() + 'x' + size.toString() + '/';
                let file_path = size_folder + folder_path + textureSubjects[ts]['name'] + textureSubjects[ts]['ext'];
                textureImages[ts][lpf + '_' + ssm].push(file_path);
                size = size / 2;
            }
        });
    });

    // related work
    let existing_work_folder = 'existing_work/';

    existing_work_methods.forEach(ew => {
        let folder_path = existing_work_folder + ew + '/';
        let size = 128;
        textureImages[ts][ew] = [];
        while (size >= 1) {
            let size_folder = texturePath + size.toString() + 'x' + size.toString() + '/';
            let file_path = size_folder + folder_path + textureSubjects[ts]['name'] + textureSubjects[ts]['ext'];
            textureImages[ts][ew].push(file_path);
            size = size / 2;
        }
    });

    // related work
    let autoencoder_folder = 'autoencoder/';

    autoencoder_methods.forEach(ae => {
        let folder_path = autoencoder_folder + ae + '/';
        let size = 128;
        textureImages[ts][ae] = [];
        while (size >= 1) {
            let size_folder = texturePath + size.toString() + 'x' + size.toString() + '/';
            let file_path = size_folder + folder_path + textureSubjects[ts]['name'] + textureSubjects[ts]['ext'];
            textureImages[ts][ae].push(file_path);
            size = size / 2;
        }
    });

}

console.log(textureImages);

// for (let ts in textureSubjects) {
//     textureImages[ts] = {};
//     var originalImage = texturePath + ts + '/' + ts + textureSubjects[ts]['ext'];
//     lowPassFilters.forEach(lpf => {
//         textureImages[ts][lpf] = {};
//         subsamplingMethods.forEach(ssm => {
//             textureImages[ts][lpf][ssm] = [];

//             textureImages[ts][lpf][ssm].push(originalImage);
//             var path = texturePath + ts + '/' + lpf + '/' + ssm + '/';
//             for (let i = 0; i < textureSubjects[ts]['count']; i ++) {
//                 var ipath = path + i.toString() + textureSubjects[ts]['ext'];
//                 textureImages[ts][lpf][ssm].push(ipath);
//             }

            

//         });
//     });
// }


async function getMaterial(ts, met) {

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
    console.log(ts);
    for (let img of textureImages[ts][met]) {
        var im = await new Image();
        // console.log(img);
        im.src = img;
        mipmapImages.push(im);
    }

    console.log(mipmapImages);

    let texture = await new THREE.TextureLoader().load( textureImages[ts][met][0] );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    let repeat = textureSubjects[ts]['repeat'];
    console.log(repeat);
    texture.repeat.set(repeat, repeat);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = false;
    texture.mipmaps = mipmapImages;
    texture.generateMipmaps = false;
    texture.rotation = textureSubjects[ts]['rotation'];
    
    var material = await new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    return material;
}

async function getMesh(which, ts, met, g) {
    let material = await getMaterial(ts, met);
    let mesh;
    let width = 0;
    if (g == '' || g == 'plane') {
        var plane_width = 30;
        var plane_height = 20;
        var plane = new THREE.PlaneGeometry(plane_width, plane_height, 8 );
        mesh = await new THREE.Mesh(plane, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = plane_width;
    } else if (g == 'sphere') {
        var sphere_radius = 3;
        var sphere_segments = 64;
        var sphere = new THREE.SphereGeometry( sphere_radius, sphere_segments, sphere_segments );
        mesh = await new THREE.Mesh(sphere, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = sphere_radius;
    } else if (g == 'box') {
        var box_width = 3;
        var box = new THREE.BoxGeometry( box_width, box_width, box_width);
        mesh = await new THREE.Mesh(box, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = box_width;
    } else if (g == 'cylinder') {
        var cylinder_radius = 2;
        var cylinder_height = 5;
        var cylinder_segments = 32;
        var cylinder = new THREE.CylinderGeometry( cylinder_radius, cylinder_radius, cylinder_height, cylinder_segments);
        mesh = await new THREE.Mesh(cylinder, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = cylinder_radius;
    } else if (g == 'torus') {
        var torus_radius = 4;
        var tube_radius = 1;
        var radial_segments = 8;
        var tubular_segments = 32;
        var torus = new THREE.TorusGeometry( torus_radius, tube_radius, radial_segments, tubular_segments);
        mesh = await new THREE.Mesh(torus, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = torus_radius;
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
        mesh.rotation.x = 90;
        width = torus_radius;
    }

    if (which == 'first') {
        mesh.position.x = -width * 2;
    } else if (which == 'second') {
        mesh.position.x = 0;
    } else {
        mesh.position.x = width * 2;
    }
    
    return mesh;
}

async function updateScene(lts, lmet, lrot, lg, rts, rmet, rrot, rg) {
    let fmesh = await getMesh('first', lts, lmet, lg);
    let smesh = await getMesh('second', rts, rmet, rg);
    let tmesh = await getMesh('third', rts, rmet, rg);

    // console.log(lmesh);
    // console.log(rmesh);
    // remove current meshes
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    // console.log(lrot);
    // if (lrot) {
    //     lmesh.rotation = lrot;
    // }
    // if (rrot) {
    //     rmesh.rotation = rrot;
    // }

    scene.add(fmesh);
    scene.add(smesh);
    scene.add(tmesh);



    return {
        scene: scene,
        fmesh: fmesh,
        smesh: smesh,
        tmesh: tmesh
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
