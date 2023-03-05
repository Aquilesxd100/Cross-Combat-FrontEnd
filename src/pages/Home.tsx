import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Card from "../components/Card";
import { charactersList, cleanState } from "../store/characters";
/* import { getCharactersList } from "../store/characters"; */
import { useStoreDispatch } from "../store/configureStore";
import { attributes, attributesSearch, reset, resetSearchResul } from '../store/slices/slices';
import { charactersSearch, resetSearch } from "../store/searchCharacter";
import { GenerateBtn, ContainerStyle, Div, Input, GenerateBtn2, DivPesquisa} from "./homeStyle";

function Home() {
  const dispatch = useStoreDispatch();
  const characters : any = useSelector((state : any) => state.setCharacters.characters);
  const charactersProcessed : any = useSelector((state : any) => state.setAttributes.characters);
  const searchedCharacter : any = useSelector((state : any) => state.setSearch.filteredCharacter);
  const searchedCharacterProcessed : any = useSelector((state : any) => state.setAttributes.charactersSearched)
  const [cardsDisplay, setCardsDisplay] = useState([]);

  const [search, setSearch] = useState("");
  let complete = false;
  let complete2 = false;
    useEffect(() => {
      if (search === "") {
        dispatch(cleanState());
        dispatch(reset());
        dispatch(resetSearch());
        dispatch(resetSearchResul());
      }
    }, [search])
   useEffect(() => {
    if(characters.length) {
      if (complete === false) {
        let filteredCharacters = characters.map((character : any) => {
          return ({
            name: character.name,
            image: character.imageUrl,
          })
        })
          filteredCharacters.forEach((character : any) => { dispatch(attributes(character)) });
          if (charactersProcessed.length === 8) {
            setCardsDisplay(charactersProcessed);
            complete = true;
          }
      }
    }
  }, [characters, charactersProcessed]) 
  useEffect(() => {
    if (complete2 === false) {
      let filteredCharacters = [];
      if (searchedCharacter.length) {
        filteredCharacters = searchedCharacter.map((character : any) => {
          return ({
            name: character.name,
            image: character.imageUrl,
            arraySize: searchedCharacter.length,
          })
        })
        filteredCharacters.forEach((character : any) => { dispatch(attributesSearch(character)) });
      }        
        if (searchedCharacterProcessed.length !== 0) {
          setCardsDisplay(searchedCharacterProcessed);
          complete2 = true;
        }
    }
  }, [searchedCharacter, searchedCharacterProcessed]) 
  return (
    <Div>
    <GenerateBtn onClick={() => { 
        complete = false; 
        dispatch(reset());
        dispatch(charactersList());
      }}>
      Gerar Personagens
    </GenerateBtn>
    <DivPesquisa>
    <Input placeholder="Pesquisar..." onChange={(event) => { 
        setSearch(event.target.value);               
      }} />
    <GenerateBtn2 onClick={() => { 
      let whiteSpaces = 0;
      let searchCopy = search;
      while (searchCopy.search(" ") !== -1) {
        let index = searchCopy.search(" ");
        whiteSpaces = whiteSpaces + 1;
        searchCopy = searchCopy.substring(0, index) + searchCopy.substring(index + 1, searchCopy.length);
      }
        if (search !== "") {
          complete2 = false; 
          dispatch(resetSearch());
          dispatch(resetSearchResul());
          dispatch(charactersSearch(search));
        }
      }}>
      Pesquisar
    </GenerateBtn2>
    </DivPesquisa>
      <ContainerStyle>
        {(cardsDisplay.length !== 0 && search === "") && cardsDisplay.map((card : any, i) => (
          <Card key={`${card.name}-${i}`} name={card.name} strength={card.strength} dexterity={card.dexterity} inteligence={card.inteligence} vitality={card.vitality} image={card.image}
           /> 
        ))}  
        {(cardsDisplay.length !== 0 && searchedCharacterProcessed.length !== 0) && cardsDisplay.map((card : any, i) => (
          <Card key={`${card.name}-${i}`} name={card.name} strength={card.strength} dexterity={card.dexterity} inteligence={card.inteligence} vitality={card.vitality} image={card.image}
           /> 
        ))} 
      </ContainerStyle>
    </Div>
  );
}

export default Home;
