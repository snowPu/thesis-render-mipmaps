

var mipmapped_renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
mipmapped_renderer.setClearColor( 0xffffff, 0);
mipmapped_renderer.setSize(window.innerWidth / 4 , window.innerHeight);
mipmapped_renderer.autoClear = false;

var mipmapped_renderer2 = new THREE.WebGLRenderer({antialias: true, alpha: true});
mipmapped_renderer2.setClearColor( 0xffffff, 0);
mipmapped_renderer2.setSize(window.innerWidth / 4 , window.innerHeight);
mipmapped_renderer2.autoClear = false;

var mipmapped_renderer3 = new THREE.WebGLRenderer({antialias: true, alpha: true});
mipmapped_renderer3.setClearColor( 0xffffff, 0);
mipmapped_renderer3.setSize(window.innerWidth / 4 , window.innerHeight);
mipmapped_renderer3.autoClear = false;



var mipmapped_camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / ( 4 * window.innerHeight),
    0.1,
    1000
);

mipmapped_camera.position.z = 60;
// mipmapped_camera.position.x = 2;


document.getElementById('first-canvas').appendChild(mipmapped_renderer.domElement);
document.getElementById('second-canvas').appendChild(mipmapped_renderer2.domElement);
document.getElementById('third-canvas').appendChild(mipmapped_renderer3.domElement);

window.addEventListener('resize', () => {
    mipmapped_renderer.setSize(window.innerWidth / 4, window.innerHeight);
    mipmapped_renderer2.setSize(window.innerWidth / 4, window.innerHeight);
    mipmapped_renderer3.setSize(window.innerWidth / 4, window.innerHeight);
    mipmapped_camera.aspect = window.innerWidth / (4 * window.innerHeight);

    mipmapped_camera.updateProjectionMatrix();
});


// var box2 = new THREE.BoxGeometry(2, 2, 2);

var box2 = new THREE.PlaneGeometry(10, 10, 8 );
// var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});


// var chessboard_images = [
//     'textures/chessboard/white/chessboard_512.png',
//     'textures/chessboard/red/chessboard_256.png',
//     'textures/chessboard/blue/chessboard_128.png',
//     'textures/chessboard/green/chessboard_64.png',
//     'textures/chessboard/pink/chessboard_32.png',
//     'textures/chessboard/yellow/chessboard_16.png',
//     'textures/chessboard/orange/chessboard_8.png',
//     'textures/chessboard/violet/chessboard_4.png',
//     'textures/chessboard/maroon/chessboard_2.png',
//     'textures/chessboard/grey/chessboard_1.png'
// ];

// var chessboard_images_normal = [
//     'textures/chessboard/white/chessboard_512.png',
//     'textures/chessboard/white/chessboard_256.png',
//     'textures/chessboard/white/chessboard_128.png',
//     'textures/chessboard/white/chessboard_64.png',
//     'textures/chessboard/white/chessboard_32.png',
//     'textures/chessboard/white/chessboard_16.png',
//     'textures/chessboard/white/chessboard_8.png',
//     'textures/chessboard/white/chessboard_4.png',
//     'textures/chessboard/white/chessboard_2.png',
//     'textures/chessboard/white/chessboard_1.png'
// ];

// var chessboard = [];
// var chessboard_normal = [];


var lena_box = [];

// chessboard_images.forEach(chessboard_img => {
//     var im = new Image();
//     // console.log(chessboard_img);
//     im.src = chessboard_img;
//     chessboard.push(im);
// });

// chessboard_images_normal.forEach(chessboard_img => {
//     var im = new Image();
//     console.log(chessboard_img);
//     im.src = chessboard_img;
//     chessboard_normal.push(im);
// });

var textures = [];

const textureSubjects = {
    'texture1': {
        'name': 'wood',
        'ext': '.png',
        'rotation': 0,
        'repeat': 1
    },
    'texture2': {
        'name': 'water',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture3': {
        'name': 'checkerboard',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture4': {
        'name': 'design1',
        'ext': '.png',
        'rotation': Math.PI,
        'repeat': 1
    },
    'texture5': {
        'name': 'rceafb000t',
        'ext': '.png',
        'rotation': 0,
        'repeat': 1
    }
}

// const lowPassFilters = ['lanczos', 'sinc', 'gaussian_3', 'gaussian_5'];
const lowPassFilters = ['box', 'gaussian_3'];
// const subsamplingMethods = ['max', 'min', 'average', 'first', 'second', 'third', 'fourth', 'median', 'random', 'extreme'];
const subsamplingMethods = ['first', 'median', 'average'];
const existing_work_methods = ['dpid', 'perceptual'];
//, 'L02e2_6', 'L02e2_8', 'L02e4_6', 'L02e4_8', 'perceptual'];
const autoencoder_methods = [
    'weights_perceptual_ssim_nadam_500_0.0002_0.9_0.999_1587746299.670421_00000390'
];
const texturePath = 'mipmap_LPF_SS/';
var textureImages = {};
let materials = {};

// load options in front end

function loadSelectOptions(select_id, select_value) {
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

    selectElement.value = select_value;
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
            textureImages[ts][lpf + '_' + ssm].push(originalImage);
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
        textureImages[ts][ew].push(originalImage);
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
        textureImages[ts][ae].push(originalImage);
        while (size >= 1) {
            let size_folder = texturePath + size.toString() + 'x' + size.toString() + '/';
            let file_path = size_folder + folder_path + textureSubjects[ts]['name'] + textureSubjects[ts]['ext'];
            textureImages[ts][ae].push(file_path);
            size = size / 2;
        }
    });

}

console.log(textureImages);

async function getMaterial(ts, met) {

    let mipmapImages = [];

    // if (ts === 'reference') {
    //     let texture = await new THREE.TextureLoader().load( chessboard_images[0] );
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.offset.set(0, 0);
    //     texture.repeat.set(2, 2);
    //     // texture.minFilter = THREE.NearestMipmapNearestFilter;
    //     texture.minFilter = THREE.NearestFilter;
    //     texture.magFilter = THREE.LinearFilter;
    //     texture.needsUpdate = true;
    //     texture.mipmaps = chessboard;
    //     texture.generateMipmaps = true;
    //     var material = await new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    //     return material;
    // } else 
    if (ts === 'none') { 
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

    // Nearest - NearestMipmapNearestFilter
    // Bilinear - LinearMipmapNearestFilter
    // Trilinear - LinearMipmapLinearFilter

    texture.minFilter = THREE.NearestMipmapNearestFilter;
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
        var plane_width = 10;
        var plane_height = 20;
        var plane = new THREE.PlaneGeometry(plane_width, plane_height, 8 );
        mesh = await new THREE.Mesh(plane, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = plane_width * 1.005;
    } else if (g == 'sphere') {
        var sphere_radius = 8;
        var sphere_segments = 64;
        var sphere = new THREE.SphereGeometry( sphere_radius, sphere_segments, sphere_segments );
        mesh = await new THREE.Mesh(sphere, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = sphere_radius * 3;
    } else if (g == 'box') {
        var box_width = 15;
        var box = new THREE.BoxGeometry( box_width, box_width, box_width);
        mesh = await new THREE.Mesh(box, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = box_width * 2;
    } else if (g == 'cylinder') {
        var cylinder_radius = 5;
        var cylinder_height = 12;
        var cylinder_segments = 32;
        var cylinder = new THREE.CylinderGeometry( cylinder_radius, cylinder_radius, cylinder_height, cylinder_segments);
        mesh = await new THREE.Mesh(cylinder, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = cylinder_radius * 3;
    } else if (g == 'torus') {
        var torus_radius = 6;
        var tube_radius = 2;
        var radial_segments = 8;
        var tubular_segments = 32;
        var torus = new THREE.TorusGeometry( torus_radius, tube_radius, radial_segments, tubular_segments);
        mesh = await new THREE.Mesh(torus, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = torus_radius * 3;
    } else if (g == 'torus-knot') {
        var torus_radius = 2;
        var tube_radius = 1;
        var radial_segments = 32;
        var tubular_segments = 32;
        var p = 2;
        var q = 3;
        var torus_knot = new THREE.TorusKnotGeometry( torus_radius, tube_radius, radial_segments, tubular_segments);
        mesh = await new THREE.Mesh(torus_knot, material);
        mesh.scale.x = -1;
        mesh.rotation.x = 90;
        width = torus_radius * 3;
    }
    mesh.position.x = 0;

    if (which == 'first') {
        mesh.name = 'first';
        // mesh.position.x = -width;
    } else if (which == 'second') {
        mesh.name = 'second';
        mesh.position.x = 0;
    } else {
        mesh.name = 'third';
        // mesh.position.x = width;
    }
    
    return mesh;
}

async function updateMesh(which, ts, met, geo) {
    let mesh = await getMesh(which, ts, met, geo);
    let scene = scene1;
    if (which === 'second') {
        scene = scene2;
    } else if (which === 'third') {
        scene = scene3;
    }

    if (scene.children) {
        if (scene.children[0].material) { scene.children[0].material.dispose(); }
        if (scene.children[0].geometry) { scene.children[0].geometry.dispose(); }
        scene.remove(scene.children[0]);
    }

    scene.add(mesh);
    return mesh;
}

async function updateScene(ts, met, geo) {

    let fmesh = await getMesh('first', ts[0], met[0], geo[0]);
    let smesh = await getMesh('second', ts[1], met[1], geo[1]);
    let tmesh = await getMesh('third', ts[2], met[2], geo[2]);

    for (scene of scenes) {
        while (scene.children.length > 0) {
            if (scene.children[0].material) { scene.children[0].material.dispose(); }
            if (scene.children[0].geometry) { scene.children[0].geometry.dispose(); }
            scene.remove(scene.children[0]);
        }
    }

    scene1.add(fmesh);
    scene2.add(smesh);
    scene3.add(tmesh);

    return {
        scenes: [scene1, scene2, scene3],
        first: fmesh,
        second: smesh,
        third: tmesh
    };
}
