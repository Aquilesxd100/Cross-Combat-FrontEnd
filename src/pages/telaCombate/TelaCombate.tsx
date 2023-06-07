import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BotaoGerarCards from "../../components/botaoGerarCards/BotaoGerarCards";
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";
import { RootState } from "../../redux/store/configureStore";
import { CardType } from "../../types/types";
import { setModoNormal } from "../../redux/slices/setModoSlice";
import { setTimeJogador, setTimeInimigo } from "../../redux/slices/setCardsSlice";
import { setPlayerCardType } from "../../redux/slices/playerCardTypeSlice";
import MenuOpcoes from "../../components/menuOpcoes/MenuOpcoes";
import { aumentarPontuacao, setPontuacao } from "../../redux/slices/pontuacaoSlice";
import Pontuacao from "../../components/pontuacao/Pontuacao";
import checkCardsMortos from "../../helpers/checkCardsMortos";
import { useNavigate } from "react-router-dom";
import { deleteSaveGame } from "../../redux/slices/saveGameSlice";
import MenuAjuda from "../../components/menuAjuda/MenuAjuda";
import { activateEffect, changeMusic } from "../../redux/slices/soundSlice";
import completarTimesAPI from "../../requests/completarTimes";

function TelaCombate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saveGame } = useSelector((state : RootState) => state.saveGame);
    const { playerCardType } = useSelector((state : RootState) => state.playerCardType);
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const { timeInimigo, timeJogador } = useSelector((state : RootState) => state.setCards);
    const [cardsInimigos, setCardsInimigos] = useState<Array<CardType>>([]);
    const [cardsJogador, setCardsJogador] = useState<Array<CardType>>([]);
    const [gerarCardsIniciaisState, setGerarCardsIniciaisState] = useState(false);
    const [checkUserResolution, setCheckUserResolution] = useState(0);
    const telaCorpo : any = useRef();

    window.addEventListener("resize", () => {
        setCheckUserResolution(Math.random());
    });

    useEffect(() => {
        const larguraUsuario : number = window.innerWidth;
        const alturaUsuario : number = window.innerHeight;
        if (alturaUsuario < 619 || larguraUsuario < 810) {
            navigate('/erro');
        };

    }, [checkUserResolution]);

    const gerarCardsIniciais = async () => {
        const cardsGerados = await completarTimesAPI(playerCardType, []);
        dispatch(setTimeJogador(cardsGerados.timeJogadorFill));
        dispatch(setTimeInimigo(cardsGerados.timeInimigo));
    };

    useEffect(() => {
        dispatch(changeMusic('combate'));

        if (!timeInimigo.length && !timeJogador.length && !saveGame) {
            setGerarCardsIniciaisState(true);
        };

    }, [])

    useEffect(() => {
        if(gerarCardsIniciaisState) {
            gerarCardsIniciais(); 
        };
    }, [gerarCardsIniciaisState])
    
    useEffect(() => {
        if(saveGame && !timeJogador.length) {
            dispatch(setTimeJogador(saveGame.cardsJogador));
            dispatch(setTimeInimigo(saveGame.cardsInimigos));
            dispatch(setPlayerCardType(saveGame.playerCardType)); 
            dispatch(setPontuacao(saveGame.pontos));
        };
    }, [saveGame]);

    const [checkModoCombate, setCheckModoCombate] = useState(0);
    useEffect(() => {
        if (modoAtual === 'combate') {
            dispatch(setModoNormal());
            dispatch(activateEffect('botaoNegativo'));
        };
    }, [checkModoCombate]);

    useEffect(() => {
        window.addEventListener("click", (event : any) => {
            const cardsInimigos = document.querySelectorAll(".cardInimigo, h5.cardJogador");
            let clickFora = 0;
            for(let c = 0; c < cardsInimigos.length; c++) {
                if(cardsInimigos[c].contains(event.target)){}
                else {
                    clickFora++;
                };
            }
            if(clickFora === cardsInimigos.length) {
                setCheckModoCombate(Math.random());
            };
        });
    }, [])

    useEffect(() => {
        const elementosCursor = document.querySelectorAll("h5, button");
        if(modoAtual === "combate") {
            elementosCursor.forEach((elemento) => elemento.classList.add("cursorCombate"));
            telaCorpo.current.classList.add("cursorCombate");
        }
        else {
            telaCorpo.current.classList.remove("cursorCombate");  
            elementosCursor.forEach((elemento) => elemento.classList.remove("cursorCombate"));  
        };
    }, [modoAtual]);
    useEffect(() => {
        setCardsInimigos(timeInimigo);
    }, [timeInimigo]);

    useEffect(() => {
        setCardsJogador(timeJogador);
    }, [timeJogador]);

    const completarTimes =
        async (timeJogadorParam : Array<CardType>) => {
            setActiveTeamFiller(true);
            const cardsJogadorVivos : Array<CardType> =
            timeJogadorParam.filter((card : CardType) => !card.morto);

            const cardsSubs = await completarTimesAPI(playerCardType, cardsJogadorVivos);

            if (cardsJogadorVivos.length < 3) {
                if (cardsSubs.timeJogadorFill.length) {
                    let novoTimeJogador : Array<CardType> = timeJogadorParam.concat();
                    let indexCardSubst = -1;
                    novoTimeJogador = novoTimeJogador.map((card) => {
                        if (card.morto) {
                            indexCardSubst += 1;
                            return cardsSubs.timeJogadorFill[indexCardSubst]; 
                        };
                        return card;
                    });
                    dispatch(setTimeJogador(novoTimeJogador));
                };
            };
            if(cardsSubs.timeInimigo.length) {
                dispatch(setTimeInimigo(cardsSubs.timeInimigo));
                dispatch(aumentarPontuacao());
            };
            setActiveTeamFiller(false);
        };

    const [activeTeamFiller, setActiveTeamFiller] = useState(false);
    useEffect(() => {
        if (timeInimigo.length && timeJogador.length && !activeTeamFiller) {
            const checkDerrota : boolean = checkCardsMortos(timeJogador);
            if (checkDerrota){
                dispatch(deleteSaveGame())
                navigate('/tela-inicial');
                return;
            };
            const checkVitoria : boolean = checkCardsMortos(timeInimigo);
            if (checkVitoria) {
                completarTimes(timeJogador);
            };
        };
    }, [timeInimigo, timeJogador]);

    return (
        <div className="h-full w-full px-2.5 flex flex-col" ref={telaCorpo}>
            <Pontuacao />
            <MenuOpcoes />
            <MenuAjuda />
            <div className="h-[50%] flex items-end justify-center pb-1">
                {!cardsInimigos.length && <BotaoGerarCards />} 
                {!!cardsInimigos.length && cardsInimigos.map((card) => 
                    <Card tipo="Inimigo" cardInfos={card} key={card.id} />
                )}               
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="h-[50%] flex items-start justify-center">
                {!cardsJogador.length && <BotaoGerarCards />} 
                {!!cardsJogador.length && cardsJogador.map((card) => 
                    <Card tipo="Aliado" cardInfos={card} key={card.id} />
                )}               
            </div>
        </div>  
    )
};
export default TelaCombate;