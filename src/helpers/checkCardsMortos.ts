import { CardType } from "../types/types";

export default function checkCardsMortos(cards : Array<CardType>) : boolean {
    return cards.every((card : CardType) => card.morto)
};