// ===== 基础场景 =====
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ===== 灯光 =====
let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

let pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(0, 10, 10);
pointLight.castShadow = true;
scene.add(pointLight);

// ===== 地面 =====
let groundGeo = new THREE.PlaneGeometry(50, 200);
let groundMat = new THREE.MeshStandardMaterial({
color: 0x111111,
roughness: 0.8
});
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// ===== 战车 =====
let carGroup = new THREE.Group();

let bodyGeo = new THREE.BoxGeometry(1.5, 0.5, 3);
let bodyMat = new THREE.MeshStandardMaterial({
color: 0x00ffff,
metalness: 0.8,
roughness: 0.2
});
let body = new THREE.Mesh(bodyGeo, bodyMat);
body.castShadow = true;

carGroup.add(body);
scene.add(carGroup);

// ===== 粒子尾焰 =====
let particles = [];
function createParticle() {
let geo = new THREE.SphereGeometry(0.1);
let mat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
let p = new THREE.Mesh(geo, mat);
p.position.copy(carGroup.position);
p.position.z += 1.8;
scene.add(p);
particles.push(p);
}

// ===== 摄像机位置 =====
camera.position.set(0, 3, 6);
camera.lookAt(carGroup.position);

// ===== 控制变量 =====
let moveX = 0;

// 键盘控制（测试用）
window.addEventListener("keydown", e => {
if (e.key === "ArrowLeft") moveX = -0.2;
if (e.key === "ArrowRight") moveX = 0.2;
});

window.addEventListener("keyup", () => {
moveX = 0;
});

// ===== 动画循环 =====
function animate() {

requestAnimationFrame(animate);

// 移动车
carGroup.position.x += moveX;

// 粒子生成
if (Math.random() < 0.3) createParticle();

// 粒子动画
particles.forEach((p, i) => {
p.position.z += 0.2;
p.material.opacity -= 0.02;
p.material.transparent = true;

if (p.material.opacity <= 0) {
scene.remove(p);
particles.splice(i, 1);
}
});

// 相机跟随
camera.position.x = carGroup.position.x;
camera.lookAt(carGroup.position);

renderer.render(scene, camera);
}

animate();
