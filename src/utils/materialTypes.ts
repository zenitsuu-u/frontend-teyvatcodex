export type Material = {
    id: number;
    name: string;
    rarity: number;
    type: string;   // "Boss", "Domaine", "Ennemi", "Région", etc.
    icon: string;
    source?: string;
};
