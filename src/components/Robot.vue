<template>
    <div ref="container"></div>
  </template>
  
  <script>
import * as THREE from 'three';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
// import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default {
    name: 'RobotModel',
    props: {
        width: {
            type: Number,
            default: 750
        },
        height: {
            type: Number,
            default: 550
        },
        action: {
            default: 'Idle'
        },
    },

    data() {
        return {
            container: null,
            stats: null,
            clock: null,
            gui: null,
            mixer: null,
            actions: {},
            activeAction: null,
            previousAction: null,
        };
    },

    mounted() {
        this.init();
        
    },
    watch: {
        // state(newValue, oldValue) {
        //     console.log('myProp changed from', oldValue, 'to', newValue)
        //     this.fadeToAction(newValue, 0.5)
        // },
        action(newValue) {
            this.fadeToAction(newValue, 0.5)
        }
    },

    methods: {
        init() {
            // 初始化容器
            this.container = this.$refs.container;

            // 创建摄像头
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
            this.camera.position.set(0, 3, 10);
            this.camera.lookAt(0, 2, 0);

            // 创建场景
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xe0e0e0);
            this.scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

            // 创建时钟
            this.clock = new THREE.Clock();

            // 创建渲染器
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.width, this.height);
            this.container.appendChild(this.renderer.domElement);

            // 设置动画循环
            this.renderer.setAnimationLoop(this.animate);

            // 创建性能监视器
            // this.stats = new Stats();
            // this.container.appendChild(this.stats.dom);

            // 加载模型
            const loader = new GLTFLoader();
            loader.load('models/gltf/RobotExpressive/RobotExpressive.glb', (gltf) => {
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.frustumCulled = false;
                        child.castShadow = true;
                    }
                });
                
                this.model = gltf.scene;
                this.scene.add(this.model);

                //增强环境光的强度
                const ambientLight = new THREE.AmbientLight(0xffffff, 3); //光强度设置为 1
                this.scene.add(ambientLight);

                //增强平行光的强度
                const directionalLight = new THREE.DirectionalLight(0xffffff, 2); //光强度设置为 2
                directionalLight.position.set(30, 40, 20);
                directionalLight.castShadow = true;
                this.scene.add(directionalLight);
                // 创建动作混合器
                this.mixer = new THREE.AnimationMixer(this.model);

                gltf.animations.forEach((clip) => {
                    const action = this.mixer.clipAction(clip);
                    this.actions[clip.name] = action;
                });

                // 播放默认动作
                this.activeAction = this.actions[this.action];
                this.activeAction.play();

                // const axesHelper = new THREE.AxesHelper(5);

                // // 将AxesHelper添加到场景中
                // this.scene.add(axesHelper);

                // 创建GUI控制器
                // this.createGUI(gltf.animations);
            }, undefined, function (e) {
                console.error(e);
            });

        },

        // createGUI(animations) {
        //     const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
        //     const actions = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

        //     this.gui = new GUI();

        //     // 动作
        //     this.actions = {};
        //     for (let i = 0; i < animations.length; i++) {
        //         const clip = animations[i];
        //         const action = this.mixer.clipAction(clip);
        //         this.actions[clip.name] = action;
        //         if (actions.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
        //             action.clampWhenFinished = true;
        //             action.loop = THREE.LoopOnce;
        //         }
        //     }

        //     // States
        //     const statesFolder = this.gui.addFolder('States');
        //     statesFolder.add(this.api, 'state').options(states).onChange(() => this.fadeToAction(this.api.state, 0.5));
        //     statesFolder.open();

        //     // Emotes
        //     const actionFolder = this.gui.addFolder('Actions');
        //     actions.forEach(emote => {
        //         actionFolder.add({ [emote]: () => this.fadeToAction(emote, 0.2) }, emote);
        //     });
        //     actionFolder.oepn();

        //     // 默认动作
        //     this.activeAction = this.actions['Walking'];
        //     this.activeAction.play();
        // },

        fadeToAction(name, duration) {
            this.previousAction = this.activeAction;
            this.activeAction = this.actions[name];

            if (this.previousAction && this.previousAction !== this.activeAction) {
                this.previousAction.fadeOut(duration);
            }

            this.activeAction
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(duration)
                .play();
        },

        animate() {
            // 动画更新函数
            const dt = this.clock.getDelta();
            if (this.mixer) this.mixer.update(dt);
            this.renderer.render(this.scene, this.camera);
            // this.stats.update();
        },
    },


};
</script>
  
  <style scoped></style>