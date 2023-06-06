import setAtributos from "../helpers/setAtributos";
import setTrunfo from "../helpers/setTrunfo";
import { APIRequestFillCards, APIResponseFillCards, CardStatusType, CardType } from "../types/types";

async function completarTimesAPI(temaJogador : string, timeJogador : Array<CardType>) {
    const qntCardsJogadorAGerar : number = 3 - timeJogador.length;
    const cardsAleatoriosJogador : number = temaJogador === "aleatorio" ? qntCardsJogadorAGerar : 0;

    const requisicaoAPI : APIRequestFillCards = {
        nomesAtuais: timeJogador.map((card) => card.nome),
        cardsDisney: 0,
        cardsHeroi: 0,
        cardsAnime: 0
    };

    if (temaJogador === "disney") {
        requisicaoAPI.cardsDisney = qntCardsJogadorAGerar;
    } else if (temaJogador === "herois") {
        requisicaoAPI.cardsHeroi = qntCardsJogadorAGerar;
    } else if (temaJogador === "animes") {
        requisicaoAPI.cardsAnime = qntCardsJogadorAGerar;
    };

    const tipoCardAleatorio : any = [
        function(){ requisicaoAPI.cardsDisney += 1 },
        function(){ requisicaoAPI.cardsHeroi += 1 },
        function(){ requisicaoAPI.cardsAnime += 1 }
    ];

    for (let c = 0; c < 3 + cardsAleatoriosJogador; c++) {
        const indexCardAleatorio : number = Math.floor(Math.random() * 3);
        tipoCardAleatorio[indexCardAleatorio]();
    }; 

    let respostaAPI : APIResponseFillCards | any  = await fetch("https://cross-combat-api.onrender.com/completarTimes", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(requisicaoAPI)
    })
    .then((res) => res.json())
    .catch((error) => console.log(error))

    let timeJogadorFill : Array<CardType> = [];
    let timeInimigo : Array<CardType> = [];

    if (!respostaAPI.message) {
        const cardsAProcessar : APIResponseFillCards = respostaAPI as APIResponseFillCards;
        let cardsAnime : Array<CardType> = [];
        let cardsHeroi : Array<CardType> = [];
        let cardsDisney : Array<CardType> = [];


        cardsDisney = cardsAProcessar.cardsDisney.map((card : any) => {
            const trunfoStatus : boolean = setTrunfo();
            const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
            return({
                id: crypto.randomUUID(),
                idAPI: card._id,
                escondido: true,
                morto: false,
                trunfo: trunfoStatus,
                universo: "Disney",
                nome: card.name,
                imagem: card.imageUrl,
                forca: statusGerados.forca,
                destreza: statusGerados.destreza,
                inteligencia: statusGerados.inteligencia
            });
        });

        cardsAnime = cardsAProcessar.cardsAnime.map((card : any) => {
            const trunfoStatus : boolean = setTrunfo();
            const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
            return({
                id: crypto.randomUUID(),
                idAPI: card.id,
                escondido: true,
                morto: false,
                trunfo: trunfoStatus,
                universo: "Animes",
                nome: card.attributes.canonicalName,
                imagem: card.attributes.image.original,
                forca: statusGerados.forca,
                destreza: statusGerados.destreza,
                inteligencia: statusGerados.inteligencia
            });
        });

        cardsHeroi = cardsAProcessar.cardsHeroi.map((card : any) => {
            const trunfoStatus : boolean = setTrunfo();
            const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
            return({
                id: crypto.randomUUID(),
                idAPI: card.id,
                escondido: true,
                morto: false,
                trunfo: trunfoStatus,
                universo: "Heróis",
                nome: card.name,
                imagem: card.image.url,
                forca: statusGerados.forca,
                destreza: statusGerados.destreza,
                inteligencia: statusGerados.inteligencia
            });
        });

        let cardsAleatorios : Array<CardType> = [];

        if (qntCardsJogadorAGerar) {
            switch (temaJogador) {
                case "disney":
                    timeJogadorFill = cardsDisney.slice(0, qntCardsJogadorAGerar);
                    cardsDisney = cardsDisney.splice(qntCardsJogadorAGerar, cardsDisney.length);
                break;
                case "herois":
                    timeJogadorFill = cardsHeroi.slice(0, qntCardsJogadorAGerar);
                    cardsHeroi = cardsHeroi.splice(qntCardsJogadorAGerar, cardsHeroi.length);   
                break;
                case "animes":
                    timeJogadorFill = cardsAnime.slice(0, qntCardsJogadorAGerar);
                    cardsAnime = cardsAnime.splice(qntCardsJogadorAGerar, cardsAnime.length);  
                break;
                case "aleatorio":
                    cardsAleatorios = cardsAnime.concat(cardsDisney, cardsHeroi);
                    for (let c = 1; c <= qntCardsJogadorAGerar; c++) {

                        const posicaoAleatoria = Math.floor(Math.random() * cardsAleatorios.length);

                        const cardGerado : CardType = cardsAleatorios[posicaoAleatoria];

                        timeJogadorFill.push(cardGerado);
                        cardsAleatorios = cardsAleatorios.filter((card) => card.id !== cardGerado.id);
                    };
                break;
            };
            timeJogadorFill = timeJogadorFill.map((card : CardType) => {
                card.escondido = false;
                return card;
            });
        };

        if (!cardsAleatorios.length) {
            cardsAleatorios = cardsAnime.concat(cardsDisney, cardsHeroi);
        };
        for (let c = 1; c <= 3; c++) {
            const posicaoAleatoria2 = Math.floor(Math.random() * cardsAleatorios.length);

            const cardGerado : CardType = cardsAleatorios[posicaoAleatoria2];

            timeInimigo.push(cardGerado);
            cardsAleatorios = cardsAleatorios.filter((card) => card.id !== cardGerado.id);
        };
    }; 


    return {
        timeJogadorFill: timeJogadorFill,
        timeInimigo: timeInimigo
    };
};
export default completarTimesAPI;