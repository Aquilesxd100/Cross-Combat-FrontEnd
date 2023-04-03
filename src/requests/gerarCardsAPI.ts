import { CardType } from "../types/types";
import gerarCardDisney from "./temasCards/gerarCardDisney";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>) {
    const cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    const nomesCards : Array<string> = [];
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                const cardGerado : CardType = await gerarCardDisney(nomesCards, tipoCard);
                cardsGerados.push(cardGerado);
                nomesCards.push(cardGerado.nome);
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