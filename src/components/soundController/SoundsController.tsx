import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../redux/store/configureStore";
import { resetEffect } from "../../redux/slices/soundSlice";

import MP3SelecaoHover from "../../resources/sounds/selecao-hover.mp3";
import MP3BotaoPadrao from "../../resources/sounds/botao-padrao.mp3";
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
    const efeitoBotaoPadrao : any = useRef();
    const efeitoBotaoNegativo : any = useRef();
    const efeitoBotaoGerarCards : any = useRef();
    const efeitoSelecaoUniverso : any = useRef();
    const efeitoVirarCard : any = useRef();
    const efeitoHitDano : any = useRef();
    const efeitoVitoria : any = useRef();
    const efeitoDerrota : any = useRef();

    useEffect(() => {
        if (soundEffect.effectActive) {
            switch(soundEffect.effectType) {
                case 'botaoPadrao':
                    efeitoBotaoPadrao.current.play();
                break;
                case 'botaoNegativo':
                    efeitoBotaoNegativo.current.play();
                break;
                case 'selecaoHover':
                    const temporaryAudioSelecao = document.createElement("audio");
                    temporaryAudioSelecao.setAttribute("src", MP3SelecaoHover);
                    temporaryAudioSelecao.play();
                    setTimeout(() => {temporaryAudioSelecao.remove()}, 450);
                break;
                case 'botaoSelecaoUniverso':
                    efeitoSelecaoUniverso.current.play();
                break;
                case 'modoCombate':
                    const temporaryAudioCombate = document.createElement("audio");
                    temporaryAudioCombate.setAttribute("src", MP3AtaqueEspada);
                    temporaryAudioCombate.play();
                    setTimeout(() => {temporaryAudioCombate.remove()}, 450);
                break;
                case 'hit':
                    const temporaryAudioHit = document.createElement("audio");
                    temporaryAudioHit.setAttribute("src", MP3HitDano);
                    temporaryAudioHit.play();
                    setTimeout(() => {temporaryAudioHit.remove()}, 150);
                    dispatch(resetEffect());
                break;
            }
            dispatch(resetEffect());
        }
    }, [soundEffect]);

    return(
        <>
            <audio ref={efeitoBotaoPadrao} src={MP3BotaoPadrao} />
            <audio src={MP3SelecaoHover} />
            <audio src={MP3AtaqueEspada} />
            <audio ref={efeitoBotaoNegativo} src={MP3BotaoNegativo} />
            <audio ref={efeitoBotaoGerarCards} src={MP3BotaoGerarCards} />
            <audio ref={efeitoSelecaoUniverso} src={MP3SelecaoUniverso} />
            <audio ref={efeitoVirarCard} src={MP3VirarCard} />
            <audio ref={efeitoHitDano} src={MP3HitDano} />
            <audio ref={efeitoVitoria} src={MP3Vitoria} />
            <audio ref={efeitoDerrota} src={MP3Derrota} />
        </>
    );
};

export default SoundsController;