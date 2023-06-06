import IMGbotaoMusicaON from "../../resources/images/icone-som.png";
import IMGbotaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
import IMGPontuacao from "../../resources/images/display-pontos.png";
import IMGPainel from "../../resources/images/painel-direito.png";
import IMGBotaoMenu from "../../resources/images/botao-menu.png";
import IMGBotaoInfo from "../../resources/images/botao-info.png";
import IMGModalMenu from "../../resources/images/menu_opcoes.png";
import botaoPadrao from "../../resources/images/botao-padrao.png";
import IMGBotaoFechar from "../../resources/images/botao-fechar.png";
import IMGModalInfo from "../../resources/images/menu-maior.png";
import IMGPasso1 from "../../resources/images/foto-passo1.png";
import IMGPasso2 from "../../resources/images/foto-passo2.png";
import fundoCard from "../../resources/images/card_fundo.png";
import fundoCardTrunfo from "../../resources/images/card_fundo_trunfo.png";
import cardEscondido from "../../resources/images/card_fundo_tras.png";
import IMGLogo from "../../resources/images/logo.png";
import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";
import IMGbotaoVoltar from "../../resources/images/botao-voltar.png";
import IMGCardDisney from "../../resources/images/disney.png";
import IMGCardAnimes from "../../resources/images/animes.png";
import IMGCardHerois from "../../resources/images/herois.png";
import IMGCardMisturado from "../../resources/images/misturado.png";
import { useEffect, useState } from "react";
import { useStoreDispatch } from "../../redux/store/configureStore";
import { setResourcesLoadingState } from "../../redux/slices/loadingSlice";

function PreLoadResources() {
    const dispatch = useStoreDispatch();
    const [checkLoadedIMGs, setCheckLoadedIMGs] = useState(0);
    useEffect(() => {
        const div : any = document.getElementById('imagens-pre-load');
        let imagens = Array.from(div.querySelectorAll('img'));
        if (!imagens.some((img : any) => !img.complete)) {
            dispatch(setResourcesLoadingState(false));
        } else {
            setTimeout(() => { setCheckLoadedIMGs(checkLoadedIMGs + 1) }, 50);
        }
    }, [checkLoadedIMGs]);

    return(
        <div id="imagens-pre-load" className="hidden">
            <img src={IMGbotaoMusicaON} />
            <img src={IMGbotaoMusicaOFF} />
            <img src={IMGPontuacao} />
            <img src={IMGPainel} />
            <img src={IMGBotaoMenu} />
            <img src={IMGBotaoInfo} />
            <img src={IMGModalMenu} />
            <img src={botaoPadrao} />
            <img src={IMGBotaoFechar} />
            <img src={IMGPasso1} />
            <img src={IMGPasso2} />
            <img src={IMGModalInfo} />
            <img src={cardEscondido} />
            <img src={fundoCard} />
            <img src={fundoCardTrunfo} />
            <img src={IMGLogo} />
            <img src={IMGtituloMenu} />
            <img src={IMGbotaoVoltar} />
            <img src={IMGCardDisney} />
            <img src={IMGCardAnimes} />
            <img src={IMGCardHerois} />
            <img src={IMGCardMisturado} />
        </div>
    );
};

export default PreLoadResources;