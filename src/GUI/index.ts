import { AbstractMesh, Color3, Mesh, Scene, StandardMaterial } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui"
import { AdvancedDynamicTexture, IAdvancedDynamicTextureOptions, Control } from "@babylonjs/gui";
import { CustomSimpleButton } from "./CustomButton";

export class CustomUI extends GUI.Container{

    protected picked_object: Mesh | undefined | AbstractMesh;

    constructor(name: string, scene: Scene ){
        super(name)
    
        const panel = new GUI.StackPanel();
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        
        panel.width = "200px"
        panel.paddingTop = "10px"

        for (let i = 0; i < 2; i++) {
            const new_butt = new CustomSimpleButton(`button_${i}`)
            new_butt.background = Color3.Random().toHexString()
            console.log(new_butt.background)
            new_butt.onPointerUpObservable.add(( ev, state )=>{

                if ( !this.picked_object ){
                    return
                }

                let material = new StandardMaterial(`${name}_mat`)
                material.diffuseColor.fromHexString(new_butt.background)
                this.picked_object.material = material;   
            })

            panel.addControl(new_butt)
        }

        const text_field = new GUI.InputText("inp_block")
        text_field.width = "150px";
        text_field.maxWidth = 0.1;
        text_field.height = "50px";
        text_field.color = "white"
        text_field.paddingTop = "10px";

        panel.addControl(text_field)

        scene.onPointerUp = (ev, pick) => {
            if ( pick?.pickedMesh ){
                this.picked_object = pick.pickedMesh
                text_field.text = pick.pickedMesh.name
            }
        }

        this.addControl(panel)

    };
}
