import { FreeCamera, HemisphericLight, MeshBuilder, Vector3, ArcRotateCamera, HavokPlugin, CannonJSPlugin } from "@babylonjs/core";
import { MyEngine } from "./core/Engine";
import { MyScene } from "./core/Scene";
import { Engine, Scene } from "@babylonjs/core";
import { Snake } from "./Objects/Snake";
import HavokPhysics, { } from "@babylonjs/havok"
import * as Cannon from "cannon"
import {LoadHavok} from './modules/HavokLoad'

class Main {

    private readonly renderCanvas: HTMLCanvasElement;
    private readonly engine: Engine;
    private readonly scene: Scene;

    constructor(canvas?: HTMLCanvasElement, engine?: Engine, scene?: Scene)
    {
        this.renderCanvas = canvas || <HTMLCanvasElement>document.getElementById("renderCanvas")
        this.engine = engine || new MyEngine(this.renderCanvas, true)
        this.scene = scene || new MyScene(this.engine)

        //задаю камеру
        let camera = new ArcRotateCamera('camera1', -Math. PI / 2, Math.PI / 3, 20, new Vector3(-5, 5, -15))
        // let camera = new FreeCamera("camera1", new Vector3(-5, 5, -10), scene);
        camera.attachControl(this.renderCanvas, true);
        
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })
        
        window.addEventListener('resize', ()=>{
            this.engine.resize();
        });

        this.createScene()
        .then(()=>{
            
        })
    }


    private async createScene() {

        await LoadHavok()
        this.scene.enablePhysics(new Vector3(0, -0.91,0), new HavokPlugin())


        //главная сцена
        let light = new HemisphericLight('light1', new Vector3(1,10,10));
        let ground = MeshBuilder.CreateGround('ground1', {width: 10, height: 10});
        let snake = new Snake("Snake1", 4, Vector3.Zero());

        
    }
}



new Main()