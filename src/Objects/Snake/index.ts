import { Mesh, MeshBuilder, Vector3, PointerDragBehavior } from "@babylonjs/core";

export class Snake extends Mesh{

    protected lenght: number;
    public meshes: Mesh[] = []
    
    constructor(name: string = "Snake", lenght?: number, pos?: Vector3){
        super(name);

        this.lenght = lenght || 3;
        this.position = pos || this.position;

        for ( let i = 0; i <= this.lenght; i++){
            let pointer = new PointerDragBehavior({dragAxis: new Vector3(0,0,0)})
            pointer.useObjectOrientationForDragging = false;
            pointer.detachCameraControls = true

            this.meshes[i] = MeshBuilder.CreatePolyhedron("oct", {size: 1, type: 13})
            this.meshes[i].position = new Vector3((1 + 1 * i), 2, 1)
            this.meshes[i].parent = this;

            this.meshes[i].addBehavior(pointer)
        }
    }
}