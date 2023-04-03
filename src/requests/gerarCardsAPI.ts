import { CardType } from "../types/types";
import gerarCardAnime from "./temasCards/gerarCardAnime";
import gerarCardDisney from "./temasCards/gerarCardDisney";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>) {
    const cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    const nomesCards : Array<string> = [];
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                const cardGeradoDisney : CardType = await gerarCardDisney(nomesCards, tipoCard);
                cardsGerados.push(cardGeradoDisney);
                nomesCards.push(cardGeradoDisney.nome);
            break;
            case "herois":
            
            break;
            case "animes":
                const cardGeradoAnime : CardType = await gerarCardAnime(nomesCards, tipoCard);
                cardsGerados.push(cardGeradoAnime);
                nomesCards.push(cardGeradoAnime.nome);
            break;
            case "aleatorio":
            
            break;
        };
    };
    return cardsGerados;
};
export default gerarCardsAPI;