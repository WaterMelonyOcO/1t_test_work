import { Mesh, MeshBuilder, Vector3, PointerDragBehavior, PhysicsAggregate, PhysicsShapeType, PhysicsShape, PhysicsShapeMesh, Scene } from "@babylonjs/core";

export class Snake extends Mesh{

    protected lenght: number;
    public meshes: Mesh[] = []
    
    constructor(name: string = "Snake", lenght?: number, pos?: Vector3){
        super(name);

        this.lenght = lenght || 3;
        this.position = pos || this.position;

        for ( let i = 0; i <= this.lenght; i++){

            //сознадие каждого меша
            // this.meshes[i] = MeshBuilder.CreatePolyhedron("oct", {size: 1, type: 13})
            this.meshes[i] = MeshBuilder.CreateBox("box"+i, {size: 1})
            this.meshes[i].position = new Vector3((1 + 1 * i), 2, 1)
            this.meshes[i].setParent(this);

            //создание управление каждым мешем
            let pointer = new PointerDragBehavior({dragAxis: new Vector3(0,0,0)})
            pointer.useObjectOrientationForDragging = false;
            pointer.detachCameraControls = true
            this.meshes[i].addBehavior(pointer)

            //phis

            new PhysicsAggregate(this.meshes[i], PhysicsShapeType.BOX, {mass: 1})

        }
    }
}