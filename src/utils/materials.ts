import { MATERIALS } from "../data/materials";

export function getMaterial(id: number) {
    return MATERIALS[id] || null;
}