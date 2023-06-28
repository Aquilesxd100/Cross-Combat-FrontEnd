import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BotaoGerarCards from "../../components/botaoGerarCards/BotaoGerarCards";
import Card from "../../components/cardGerador/Card";
import PainelCombate from "../../components/painelCombate/PainelCombate";
import { RootState } from "../../redux/store/configureStore";
import { CardType } from "../../types/types";
import { setModoNormal } from "../../redux/slices/setModoSlice";
import { setTimeJogador, setTimeInimigo, setPreLoadTimeInimigo, setPreLoadTimeJogador } from "../../redux/slices/setCardsSlice";
import { setPlayerCardType } from "../../redux/slices/playerCardTypeSlice";
import MenuOpcoes from "../../components/menuOpcoes/MenuOpcoes";
import { aumentarPontuacao, setPontuacao } from "../../redux/slices/pontuacaoSlice";
import Pontuacao from "../../components/pontuacao/Pontuacao";
import checkCardsMortos from "../../helpers/checkCardsMortos";
import { useNavigate } from "react-router-dom";
import { deleteSaveGame, setLoadedGameType, setSaveGameRequest } from "../../redux/slices/saveGameSlice";
import MenuAjuda from "../../components/menuAjuda/MenuAjuda";
import { activateEffect, changeMusic } from "../../redux/slices/soundSlice";
import completarTimesAPI from "../../requests/completarTimes";
import { setCardsLoadingState, setCardsPreLoadingState } from "../../redux/slices/loadingSlice";
import { setPendingResetDefeatedCards } from "../../redux/slices/extraAnimationsSlice";
import MenuVitoriaDerrota from "../../components/menuVitória&Derrota/MenuVitoriaDerrota";
import { setDerrotaModal, setVitoriaModal } from "../../redux/slices/modalSlice";
import CardFake from "../../components/fakeCards/CardFake";
import CardsFake from "../../components/fakeCards/CardsFake";

function TelaCombate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saveGame } = useSelector((state : RootState) => state.saveGame);
    const { playerCardType } = useSelector((state : RootState) => state.playerCardType);
    const { modoAtual } = useSelector((state : RootState) => state.setModo);
    const { timeInimigo, timeJogador, preLoadTimeInimigo, preLoadTimeJogador, userReadyState } = useSelector((state : RootState) => state.setCards);
    const { cardsLoadingState, cardsPreLoadingState } = useSelector((state : RootState) => state.loadingScreen);
    const [cardsInimigos, setCardsInimigos] = useState<Array<CardType>>([]);
    const [cardsJogador, setCardsJogador] = useState<Array<CardType>>([]);
    const [gerarCardsIniciaisState, setGerarCardsIniciaisState] = useState(false);
    const [checkUserResolution, setCheckUserResolution] = useState(0);
    const telaCorpo : any = useRef();

    useEffect(() => {
        const larguraUsuario : number = window.innerWidth;
        const alturaUsuario : number = window.innerHeight;
        if (alturaUsuario * 1.23 > larguraUsuario || alturaUsuario <= 450) {
            navigate('/erro');
        };

        const handleResize = () => {
            setCheckUserResolution(Math.random());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [checkUserResolution]);

    const gerarCardsIniciais = async () => {
        const cardsGerados = await completarTimesAPI(playerCardType, []);
        dispatch(setTimeJogador(cardsGerados.timeJogadorFill));
        dispatch(setTimeInimigo(cardsGerados.timeInimigo));
    };

    useEffect(() => {
        dispatch(changeMusic('combate'));
        dispatch(setCardsLoadingState(true));

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
            dispatch(setLoadedGameType(true));
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
        if (cardsInimigos.length) {
            setCardsInimigos(timeInimigo);
        } else if (cardsLoadingState === false) {
            setCardsInimigos(timeInimigo);
        };
    }, [timeInimigo, cardsLoadingState]);

    useEffect(() => {
        if (cardsJogador.length) {
            setCardsJogador(timeJogador);
        } else if (cardsLoadingState === false) {
            setCardsJogador(timeJogador); 
        };
    }, [timeJogador, cardsLoadingState]);

    const completarTimes =
        async (timeJogadorParam : Array<CardType>) => {
            dispatch(setCardsPreLoadingState(true))
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
                    if (novoTimeJogador.length) {
                        dispatch(setPreLoadTimeJogador(novoTimeJogador));
                    };
                };
            };
            if(cardsSubs.timeInimigo.length) {
                dispatch(setPreLoadTimeInimigo(cardsSubs.timeInimigo));
            };
            setActiveTeamFiller(false);
        };
    const [activeTeamFiller, setActiveTeamFiller] = useState(false);
    useEffect(() => {
        if (timeInimigo.length && timeJogador.length && !activeTeamFiller) {
            const checkDerrota : boolean = checkCardsMortos(timeJogador);
            if (checkDerrota){
                dispatch(setDerrotaModal(true));
                setTimeout(() => {
                    dispatch(activateEffect("derrota"));
                    dispatch(deleteSaveGame());
                }, 300);
                return;
            };
            const checkVitoria : boolean = checkCardsMortos(timeInimigo);
            if (checkVitoria) {
                setTimeout(() => {
                    dispatch(setPendingResetDefeatedCards(true));
                    dispatch(setVitoriaModal(true));
                    setTimeout(() => {
                        setTimeout(() => {dispatch(activateEffect("vitoria"));}, 200);
                        completarTimes(timeJogador);
                    }, 500);
                }, 850)
            };
        };
    }, [timeInimigo, timeJogador]);

    useEffect(() => {
        if (userReadyState && !cardsPreLoadingState && preLoadTimeInimigo.length) {
            setTimeout(() => {
                dispatch(setTimeInimigo(preLoadTimeInimigo));
                if (preLoadTimeJogador.length) {
                    dispatch(setTimeJogador(preLoadTimeJogador));
                };
                dispatch(setPreLoadTimeInimigo([]));
                dispatch(setPreLoadTimeJogador([]));
                dispatch(setSaveGameRequest(true));
                dispatch(aumentarPontuacao());
            }, 450);
        };
    }, [cardsPreLoadingState, userReadyState]);

    return (
        <div className="h-full w-full px-2.5 flex flex-col" ref={telaCorpo}>
            <Pontuacao />
            <MenuOpcoes />
            <MenuVitoriaDerrota />
            <MenuAjuda />
            <div className="relative h-[50%] flex items-end justify-center pb-1">
                {!cardsInimigos.length && <BotaoGerarCards />} 
                {!!cardsInimigos.length && cardsInimigos.map((card, indice) => 
                    <Card tipo="Inimigo" cardInfos={card} indice={indice} key={card.id} />
                )}
                <CardsFake tipo={"Inimigo"} />               
            </div>
            <hr className="absolute left-0 top-[49%] h-[1.3vh] w-[100%] bg-[#FFA64D] border-0" />
            <PainelCombate />
            <div className="relative h-[50%] flex items-start justify-center overflow-hidden">
                {!cardsJogador.length && <BotaoGerarCards />} 
                {!!cardsJogador.length && cardsJogador.map((card, indice) => 
                    <Card tipo="Aliado" cardInfos={card} indice={indice} key={card.id} />
                )}  
                <CardsFake tipo={"Aliado"} />              
            </div>
        </div>  
    )
};
export default TelaCombate;