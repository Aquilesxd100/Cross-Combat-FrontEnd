import { CardType } from "../types/types";
import gerarCardAnime from "./temasCards/gerarCardAnime";
import gerarCardDisney from "./temasCards/gerarCardDisney";
import gerarCardsHerois from "./temasCards/gerarCardsHerois";

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
                const cardsGeradosHerois : Array<CardType> = await gerarCardsHerois(nomesCards, tipoCard);
                cardsGerados = cardsGerados.concat(cardsGeradosHerois);
            break;
            case "animes":
                const cardGeradoAnime : CardType = await gerarCardAnime(nomesCards, tipoCard);
                cardsGerados.push(cardGeradoAnime);
                nomesCards.push(cardGeradoAnime.nome);
            break;
            case "aleatorio":
                let qntCardsHerois : number = 0;
                const tipoCardAleatorio : any = [
                    function(){ return gerarCardDisney(nomesCards, tipoCard) },
                    function(){ return gerarCardAnime(nomesCards, tipoCard) },
                    (() => { return 1 })
                ];
                for(let c = 0; c <= 3 - cardsGerados.length; c++) {
                    const indexCardAleatorio : number = Math.floor(Math.random() * 3);
                    const cardAleatorio : any = await tipoCardAleatorio[indexCardAleatorio]();
                    console.log(cardAleatorio)
                    if(typeof cardAleatorio !== "number") {
                        cardsGerados.push(cardAleatorio);
                        nomesCards.push(cardAleatorio.nome);
                    } else {
                        qntCardsHerois += 1;
                    }
                };
                if(qntCardsHerois !== 0) {
                    cardsGerados = cardsGerados.concat(await gerarCardsHerois(nomesCards, tipoCard));
                };
            break;
        };
    };
    return cardsGerados;
};
export default gerarCardsAPI;