import { Button, } from "@babylonjs/gui";



export class CustomSimpleButton extends Button{
    constructor(name: string){
        super(name)

        this.width = "150px";
        this.height = "40px";
        this.color = "white";
    }

}

