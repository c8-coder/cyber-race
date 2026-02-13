let scene=new THREE.Scene();
let camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z=5;

let geometry=new THREE.BoxGeometry();
let material=new THREE.MeshBasicMaterial({color:0x00ffff});
let cube=new THREE.Mesh(geometry,material);

scene.add(cube);

function animate3D(){
cube.rotation.x+=0.01;
cube.rotation.y+=0.01;
renderer.render(scene,camera);
requestAnimationFrame(animate3D);
}

animate3D();
