import { FreeCamera, HemisphericLight, MeshBuilder, Vector3, ArcRotateCamera, HavokPlugin, CannonJSPlugin, PhysicsAggregate, PhysicsShapeType, DebugBlock, PointerDragBehavior, Mesh } from "@babylonjs/core";
import { MyEngine } from "./core/Engine";
import { MyScene } from "./core/Scene";
import { Engine, Scene } from "@babylonjs/core";
import { Snake } from "./Objects/Snake";
import {LoadHavok} from './modules/HavokLoad'
import { PhysicsProperty } from "./core/Properties";
import { AdvancedDynamicTexture, IAdvancedDynamicTextureOptions } from "@babylonjs/gui";
import { CustomUI } from "./GUI";

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
        let camera = new ArcRotateCamera('camera1', -Math. PI / 2, Math.PI / 3, 10, new Vector3(0, 5, -10))
        // let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
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

        // Включение физики
        await LoadHavok()
        this.scene.enablePhysics(PhysicsProperty.gravity, new HavokPlugin());

        //главная сцена
        let light = new HemisphericLight('light1', new Vector3(1,10,10));
        let ground = MeshBuilder.CreateGround('ground1', {width: 20, height: 15});
        ground.visibility = 0.1
        let snake = new Snake("Snake1", this.scene, 3, new Vector3(-4, 3, 0));
        const ui = AdvancedDynamicTexture.CreateFullscreenUI("cusUi")
        ui.addControl(new CustomUI(ui.name, this.scene))
        

        let groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX, {mass: 0})
    }
}



new Main()