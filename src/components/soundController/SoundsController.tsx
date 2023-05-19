import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";

import MP3Botao1 from "../../resources/sounds/botao-1.mp3";
import MP3Botao2 from "../../resources/sounds/botao-2.mp3";
import MP3BotaoNegativo from "../../resources/sounds/botao-negativo.mp3";
import MP3BotaoGerarCards from "../../resources/sounds/botao-gerar-cards.mp3";
import MP3AtaqueEspada from "../../resources/sounds/espada.mp3";
import MP3SelecaoUniverso from "../../resources/sounds/selecao-universo.mp3";
import MP3VirarCard from "../../resources/sounds/virar-card.mp3";
import MP3HitDano from "../../resources/sounds/som-hit.mp3";
import MP3Vitoria from "../../resources/sounds/vitoria.mp3";
import MP3Derrota from "../../resources/sounds/derrota.mp3";

function SoundsController() {
    const { soundEffect } = useSelector((state : RootState) => state.sounds)
    const dispatch = useStoreDispatch();
    const efeitoBotao1 : any = useRef();
    const efeitoBotao2 : any = useRef();
    const efeitoBotaoNegativo : any = useRef();
    const efeitoBotaoGerarCards : any = useRef();
    const efeitoAtaqueEspada : any = useRef();
    const efeitoSelecaoUniverso : any = useRef();
    const efeitoVirarCard : any = useRef();
    const efeitoHitDano : any = useRef();
    const efeitoVitoria : any = useRef();
    const efeitoDerrota : any = useRef();

    useEffect(() => {
        
    }, [soundEffect]);

    return(
        <>
            <audio ref={efeitoBotao1} src={MP3Botao1} />
            <audio ref={efeitoBotao2} src={MP3Botao2} />
            <audio ref={efeitoBotaoNegativo} src={MP3BotaoNegativo} />
            <audio ref={efeitoBotaoGerarCards} src={MP3BotaoGerarCards} />
            <audio ref={efeitoAtaqueEspada} src={MP3AtaqueEspada} />
            <audio ref={efeitoSelecaoUniverso} src={MP3SelecaoUniverso} />
            <audio ref={efeitoVirarCard} src={MP3VirarCard} />
            <audio ref={efeitoHitDano} src={MP3HitDano} />
            <audio ref={efeitoVitoria} src={MP3Vitoria} />
            <audio ref={efeitoDerrota} src={MP3Derrota} />
        </>
    );
};

export default SoundsController;