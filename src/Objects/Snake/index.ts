import { MeshBuilder, Vector3, PointerDragBehavior, PhysicsAggregate, PhysicsShapeType, PhysicsShape, Scene, Color3, Mesh, BallAndSocketConstraint, HingeConstraint, LockConstraint, DistanceConstraint, PhysicsBody } from "@babylonjs/core";
import { PhysicsProperty } from "../../core/Properties"

// type ComplexMesh = {
//     mesh: Mesh,
//     phys_mesh: PhysicsAggregate
// }


export class Snake extends Mesh{

    protected lenght: number;
    protected mesh: Mesh[] = [];
    protected mesh_phys: PhysicsAggregate[] = [];
    protected activeBody: PhysicsBody | null = null
    // public meshes: ComplexMesh[] = [];
    
    constructor(name: string = "Snake", scene: Scene, lenght?: number, pos?: Vector3){
        super(name, scene)

        this.lenght = lenght || 3;
        this.position = pos || this.position;

        let activeBody: PhysicsBody | null = null;

        // Уменьшаем расстояние между кубами
        const distanceBetweenBlocks = 1.1; // Меньше расстояние
        const collisionBuffer = 1.5; // Меньший буфер, чтобы избежать пересечений
        let joint = new DistanceConstraint(
                    3,
                    scene
        )

        for (let i = 0; i < 4; i++) {
            let box = MeshBuilder.CreateBox(`box${i}`, { size: 1 }, scene);
            box.position = new Vector3(i * distanceBetweenBlocks, 3, 0);
            this.mesh.push(box);

            // Создание физического объекта
            let physicsAggregate = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 1 }, scene);
            physicsAggregate.body.disablePreStep = false;

            // Ограничение скорости и поведение
            physicsAggregate.body.setLinearDamping(0.8); // Уменьшаем демпфирование для более плотного движения
            physicsAggregate.body.setAngularDamping(0.8);
            physicsAggregate.body.setLinearVelocity(new Vector3(0,1,0));
            this.mesh_phys.push(physicsAggregate);

            // Добавление поведения перетаскивания
            let pointer = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 1, 0) });
            pointer.useObjectOrientationForDragging = false;

            pointer.onDragStartObservable.add((dP) => {
                activeBody = physicsAggregate.body;
            });

            pointer.onDragEndObservable.add(() => {
                activeBody = null;

                // Сбрасываем силы и скорости всех объектов
                this.mesh_phys.forEach((aggregate) => {
                    // aggregate.body.setLinearVelocity(Vector3.Zero());
                    aggregate.body.setAngularVelocity(Vector3.Zero());
                });
            });

            box.addBehavior(pointer);
        }

        for ( let i = 0; i < this.mesh_phys.length - 1; i++){
            this.mesh_phys[i].body.addConstraint(this.mesh_phys[i+1].body, joint)
        }

        // Логика обновления движения
        scene.onBeforeRenderObservable.add((sc) => {
            for (let i = 0; i < this.mesh_phys.length; i++) {
                let currBody = this.mesh_phys[i].body;

                if (activeBody){
                    currBody.setLinearVelocity(new Vector3(-0.2,-1,-0.2));
                }
                // // Если пользователь не управляет, замедляем движение
                if (!activeBody && (currBody.getLinearVelocity() > PhysicsProperty.maxVelocity)) {
                    currBody.setLinearVelocity(Vector3.Zero()
                    .add(PhysicsProperty.gravity).scale(0.15)); // Постепенное затухание скорости
                    
                }
            }
        });
    }
}
