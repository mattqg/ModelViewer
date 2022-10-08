var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.position.y = 5
var mesh = null;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 1, 1, 0 );
scene.add( directionalLight );
// var light = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( light );


var loader = new THREE.STLLoader();
loader.load( '/object.stl', function ( geometry ) {
    var material = new THREE.MeshPhongMaterial( { color:0xbffffa } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 0,0);
    scene.add( mesh );
    camera.lookAt(mesh.position);
});

function render() {
    if(mesh!=null){
        mesh.rotation.y += 0.01;
    }
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();
