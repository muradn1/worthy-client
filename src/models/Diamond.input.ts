import { DiamondClarity } from "../enums/DiamondClarity.enum";
import { DiamondColor } from "../enums/DiamondColor.enum";
import { DiamondCut } from "../enums/DiamondCut.enum";

export interface DiamondInput {
    ownerId?: string;
    photo?: string;
    caratWeight: number;
    cut: DiamondCut;
    color: DiamondColor;
    clarity: DiamondClarity;
}