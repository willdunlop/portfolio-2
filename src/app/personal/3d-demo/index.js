import dom from 'jsx-render';

class Demo  {
    constructor(props) {

        this.props = props;

        this.renderContainer;
        this.renderer = new THREE.WebGLRenderer({ antialias: true  });
        this.camera = new THREE.PerspectiveCamera(45, props.size.desktop.width / props.size.desktop.height, 1, 1000);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.scene = new THREE.Scene();
    
        this.init = this.init.bind(this);
        this.render3D = this.render3D.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        this.init();
        this.animate(0);


        this.render = this.render.bind(this);
    }

    
    
    init() {
        this.renderer.setSize(this.props.size.desktop.width, this.props.size.desktop.height);
        this.camera.position.set(300,300,300);
        
        this.controls.target.set(0, 0, 0);
        this.controls.panningMode = THREE.HorizontalPanning;
        this.controls.minDistance = 40.0;
        this.controls.maxDistance = 2000.0;
        
        this.camera.lookAt(this.controls.target);
        
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(300, 300, 300)
        light.castShadow = true;
        
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0a420d, 0.4 );
        hemiLight.position.y = 50;
        
        const geo = new THREE.BoxGeometry(100, 100, 100);
        const mat = new THREE.MeshPhongMaterial({ color: 0x00ffff });
        const mesh = new THREE.Mesh(geo, mat);
        
        this.scene.add(light);
        this.scene.add(hemiLight);
        this.scene.add(mesh);
        
        document.addEventListener(`resize-3dDemo`, this.onWindowResize, false);
    }

    onWindowResize() {
        console.log("resize was detected",this.renderContainer.clientWidth)
        this.camera.aspect = this.renderContainer.clientWidth / this.renderContainer.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderContainer.clientWidth, this.renderContainer.clientHeight);
    }

    
    animate(timestamp) {
        timestamp++
        this.renderer.setAnimationLoop(this.render3D);
        this.controls.update();
        this.render3D(timestamp);
    }
    
    render3D(timestamp) {
        this.renderer.render(this.scene, this.camera);
    }
    
    render() {
        const jsx = <div ref={elm => this.renderContainer = elm} className="window__body-container" tabindex="1"></div>;
        
        this.renderContainer.appendChild(this.renderer.domElement);
        this.renderContainer.onclick = this.renderContainer.focus;

        return jsx;
    }

}

export default Demo;