import { CardType } from "../types/types";
import gerarCardDisney from "./temasCards/gerarCardDisney";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>) {
    const cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                const cardGerado = await gerarCardDisney([1], tipoCard);
                cardsGerados.push(cardGerado);
            break;
            case "herois":
            
            break;
            case "animes":
            
            break;
            case "aleatorio":
            
            break;
        };
    };
    return cardsGerados;
};
export default gerarCardsAPI;