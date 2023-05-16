import { CardType } from "../types/types";
import gerarCardsAnimes from "./temasCards/gerarCardsAnimes";
import gerarCardsDisney from "./temasCards/gerarCardsDisney";
import gerarCardsHerois from "./temasCards/gerarCardsHerois";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>, nomesAtuaisOposicao? : Array<CardType>) {
    const qntCardsAGerar : number = cardsAtuais ? 3 - cardsAtuais.length : 3;
    let cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    let nomesCards : Array<string> = !cardsAtuais ? [] : cardsAtuais.map((card) => card.nome);
    if(nomesAtuaisOposicao) {
        nomesCards = nomesCards.concat(nomesAtuaisOposicao.map(card => card.nome));
    };
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                const cardsGeradosDisney : Array<CardType> | undefined = await gerarCardsDisney(qntCardsAGerar, tipoCard, nomesCards);
                if (cardsGeradosDisney) {
                    cardsGerados = cardsGerados.concat(cardsGeradosDisney);
                } else {
                    return;
                };
            break;
            case "herois":
                const cardsGeradosHerois : Array<CardType> | undefined = await gerarCardsHerois(qntCardsAGerar, tipoCard, nomesCards);
                if (cardsGeradosHerois) {
                    cardsGerados = cardsGerados.concat(cardsGeradosHerois);
                } else {
                    return;
                };
            break;
            case "animes":
                const cardsGeradosAnimes : Array<CardType> | undefined = await gerarCardsAnimes(qntCardsAGerar, tipoCard, nomesCards);
                if (cardsGeradosAnimes) {
                    cardsGerados = cardsGerados.concat(cardsGeradosAnimes);
                } else {
                    return;
                };            
            break;
            case "aleatorio":
                const cardsAGerar = {
                    qntCardsDisney: 0,
                    qntCardsHerois: 0,
                    qntCardsAnimes: 0
                };
                const tipoCardAleatorio : any = [
                    function(){ cardsAGerar.qntCardsDisney += 1 },
                    function(){ cardsAGerar.qntCardsHerois += 1 },
                    function(){ cardsAGerar.qntCardsAnimes += 1 }
                ];
                for(let c = 1; c <= qntCardsAGerar; c++) {
                    const indexCardAleatorio : number = Math.floor(Math.random() * 3);
                    tipoCardAleatorio[indexCardAleatorio]();
                };
                if(cardsAGerar.qntCardsDisney > 0) {
                    const cardsGeradosDisney : Array<CardType> | undefined = await gerarCardsDisney(cardsAGerar.qntCardsDisney, tipoCard, nomesCards);
                    if (cardsGeradosDisney) {
                        cardsGerados = cardsGerados.concat(cardsGeradosDisney);
                    } else {
                        return;
                    };
                };
                if(cardsAGerar.qntCardsHerois > 0) {
                    const cardsGeradosHerois : Array<CardType> | undefined = await gerarCardsHerois(cardsAGerar.qntCardsHerois, tipoCard, nomesCards);
                    if (cardsGeradosHerois) {
                        cardsGerados = cardsGerados.concat(cardsGeradosHerois);
                    } else {
                        return;
                    };
                };
                if(cardsAGerar.qntCardsAnimes > 0) {
                    const cardsGeradosAnimes : Array<CardType> | undefined = await gerarCardsAnimes(cardsAGerar.qntCardsAnimes, tipoCard, nomesCards);
                    if (cardsGeradosAnimes) {
                        cardsGerados = cardsGerados.concat(cardsGeradosAnimes);
                    } else {
                        return;
                    };
                };
            break;
        };
    };
    return cardsGerados;
};
export default gerarCardsAPI;