import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/configureStore";
import IMGCristaisDeposito from "../../resources/images/deposito_cristais.png";
import IMGCristal from "../../resources/images/cristal.png";
import { useEffect, useRef } from "react";

function Cristais() {
    const { quantidadeCristais } = useSelector((state : RootState) => state.pontuacao);
    const { pendingCristalAnimation } = useSelector((state : RootState) => state.extraAnimations);
    const cristal : any = useRef();

    useEffect(() => {
        if (pendingCristalAnimation) {
            cristal.current.classList.remove("escondido");
            setTimeout(() => {
                cristal.current.classList.add("animacao-cristal"); 
            }, 125);
        } else {
            cristal.current.classList.add("escondido");
            cristal.current.classList.remove("animacao-cristal"); 
        };

    }, [pendingCristalAnimation])

    return (
        <>
            <div className="fixed flex justify-center items-center right-[-1.3%] w-[12.5%] h-[calc(24vh+7px)] bg-100% top-[78.5%] z-10" style={{backgroundImage: `url(${IMGCristaisDeposito})`}}>
                <h2 className="relative valor-cristais top-[13%] font-[hobostd] text-[calc(4.8vw+7px)] off-user-selection" style={{filter: 'drop-shadow(0px 3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(0px -3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(-3.2px 0px 3.2px rgba(0, 0, 0, 0.7))'}}>{quantidadeCristais}</h2>
            </div>
            <img ref={cristal} className="fixed escondido w-[4.7%] h-[calc(13vh+7px)] bg-100% z-[9] top-[37%] right-[50%]" src={IMGCristal} />
        </>
    );
};
// Posicao Inicial = top-[37%] right-[50%]
// Posicao #1 = top-[20%] right-[29.5%]
// Posicao #2 = top-[11%] right-[24.5%]
// Posicao #3 = top-[8.5%] right-[18%]
// Posicao #4 = top-[39%] right-[22.5%]
// Posicao #5 = top-[47.5%] right-[23.5%]
// Posicao #6 = top-[70%] right-[17.5%]
// Posicao Final = top-[90%] right-[2.5%]

export default Cristais;