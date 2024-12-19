import HavokPhysics from "@babylonjs/havok";


namespace NodeJS {
    export interface Global {
        HK: any
    }
}

export async function LoadHavok() {
    // generate your scene, do your magic!
  
    // initialize the plugin using the HavokPlugin constructor
    const havokInstance = await HavokPhysics();
    //@ts-ignore
    globalThis.HK = havokInstance;
}
