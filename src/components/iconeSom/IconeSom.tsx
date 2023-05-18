import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import IMGbotaoMusicaON from "../../resources/images/icone-som.png";
import IMGbotaoMusicaOFF from "../../resources/images/icone-som-desligado.png";
import { RootState } from "../../redux/store/configureStore";
import MP3Selecao from "../../resources/sounds/hitting-hard.mp3";
import MP3Combate from "../../resources/sounds/just-a-click-away-edited.mp3";

function IconeSom() {
    const { musicType } = useSelector((state : RootState) => state.sound);
    const [musicStatus, setMusicStatus] = useState(false);
    const musicaSelecao : any = useRef();
    const musicaCombate : any = useRef();

    const switchMusicStatus = () => {
        if(!musicStatus) {
            setMusicStatus(true);

        } else {
            setMusicStatus(false);
        }
    };

    useEffect(() => {
        if (!musicStatus) {
            musicaCombate.current.pause();
            musicaSelecao.current.pause();            
        } else {
            if (musicType === 'selecao') {
                musicaSelecao.current.play(); 
            } else {
                musicaCombate.current.play();
            }
        }
    }, [musicStatus])

    useEffect(() => {
        if (musicStatus) {
            if(musicType === 'selecao') {
                musicaCombate.current.pause();
                musicaSelecao.current.currentTime = 0;
                musicaSelecao.current.play();
            } else {
                musicaSelecao.current.pause();
                musicaCombate.current.currentTime = 0;
                musicaCombate.current.play();
            }
        }
    }, [musicType]);

    return (
        <>
            <button onClick={(() => { switchMusicStatus() })} className="min-h-[6vw] h-14 min-w-[6vw] w-14 absolute left-3.5 top-3 bg-contain brightness-[0.85] hover:brightness-110" style={{backgroundImage: `url(${musicStatus ? IMGbotaoMusicaON : IMGbotaoMusicaOFF})`, zIndex: '+4'}} />
            <audio ref={musicaSelecao} src={MP3Selecao} loop />
            <audio ref={musicaCombate} src={MP3Combate} loop />
        </>
    )
}
export default IconeSom;