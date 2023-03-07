import imgLogo from "../../resources/images/logo.png";
function TelaInicial() {
    return (
        <div className="h-full w-full p-2.5 flex flex-col">
            <header className="bg-red-50 h-3/6 w-full">
                <img src={imgLogo}/>
            </header>
            <main className="bg-blue-50 h-3/6 w-full">
                
            </main>
        </div>
    );
}

export default TelaInicial;
