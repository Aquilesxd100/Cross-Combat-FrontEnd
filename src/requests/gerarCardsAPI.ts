import { CardType } from "../types/types";
import gerarCardAnime from "./temasCards/gerarCardAnime";
import gerarCardDisney from "./temasCards/gerarCardDisney";
import gerarCardHeroi from "./temasCards/gerarCardsHerois";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>) {
    let cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    const nomesCards : Array<string> = !cardsAtuais ? [] : cardsAtuais.map((card) => card.nome);
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                const cardGeradoDisney : CardType = await gerarCardDisney(nomesCards, tipoCard);
                cardsGerados.push(cardGeradoDisney);
                nomesCards.push(cardGeradoDisney.nome);
            break;
            case "herois":
                const cardsGeradosHerois : Array<CardType> = await gerarCardHeroi(nomesCards, tipoCard);
                cardsGerados = cardsGerados.concat(cardsGeradosHerois);
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