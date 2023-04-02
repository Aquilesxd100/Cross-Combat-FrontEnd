async function gerarCardDisney(idsCardsRegistrados : Array<Number>) {
    let cardGerado = undefined;
    while(!cardGerado) {
        const idAleatorio : number = Math.trunc(Math.random() * 7438);
        await fetch(`https://api.disneyapi.dev/characters/${idAleatorio}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                    cardGerado = {
                        nome: data.name,
                        image: data.imageUrl,
                        universo: "Disney"
                    }
            })
            .catch((error) => console.log(error))
    };
    return cardGerado;
};
export default gerarCardDisney;