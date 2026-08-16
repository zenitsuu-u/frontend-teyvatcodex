
export type Weapon = {
    id: number;
    name: string;
    slug: string;
    type: string;
    rarity: number;
    icon: string;
    image: string;
    description: string;
};

export type Character = {
    name: string;
    slug: string;
    element: string;
    weapon: string;
    rarity: number;
    region: string;
    description: string;
    icon: string;
    image: string;
};

export type Build = {
    weapon_slug: any;
    id: number;
    character_slug: string;
    weapon: string;
    artifacts: string[];
    sands: string;
    goblet: string;
    circlet: string;
    substats: string[];
    talents: string[];
    synergies: string[];
    stats_priority: string[];
    image: string;
};
