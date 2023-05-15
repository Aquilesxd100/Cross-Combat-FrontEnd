import checkDisneyIMG from "../../helpers/checkDisneyIMG";
import comprimirNome from "../../helpers/comprimirNome";
import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardDisney(nomesCardsRegistrados : Array<string>, tipoCard : string) {
    let cardGerado : CardType | undefined = undefined;
    let erroAPI : number = -1;
    while(!cardGerado && erroAPI < 10) {
        const idAleatorio : number = Math.trunc(Math.random() * 7438);
        let checkIMG : any = false;
        await fetch(`https://api.disneyapi.dev/character/${idAleatorio}`)
            .then((res) => res.json())
            .then(async function(data) {
                if(data.data && data.data.imageUrl && data.data.name) {
                    checkIMG = await checkDisneyIMG(data.data.imageUrl);
                    data.data.name = data.data.name.length > 18 ? comprimirNome(data.data.name) : data.data.name;
                };
                return data.data;
            })
            .then((data) => {
                if(data.imageUrl !== undefined && checkIMG && !nomesCardsRegistrados.some(nome => nome === data.name)) {
                    const trunfoStatus : boolean = setTrunfo();
                    const statusGerados : CardStatusType = setAtributos(trunfoStatus);
                    cardGerado = {
                        id: crypto.randomUUID(),
                        idAPI: idAleatorio,
                        escondido: tipoCard === "inimigo" ? true : false,
                        morto: false,
                        trunfo: trunfoStatus,
                        universo: "Disney",
                        nome: data.name,
                        imagem: data.imageUrl,
                        forca: statusGerados.forca,
                        destreza: statusGerados.destreza,
                        inteligencia: statusGerados.inteligencia
                    }
                    console.log(data)
                }
            })
            .catch((error) => console.log(error))
        if (!cardGerado) {
            erroAPI += 1;
        };
    };
    return cardGerado;
};
export default gerarCardDisney;