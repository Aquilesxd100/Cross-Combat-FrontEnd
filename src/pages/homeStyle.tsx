import { useState, useEffect } from "react";
import { Container, Button, styled } from "@mui/material";

export const Div = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
}));

export const GenerateBtn = styled(Button)(() => ({
  margin: '10px 10px',
  width: '50%',
  padding: "10px 20px",
  backgroundColor: "#00587a",
  color: "#fff",
  fontSize: "20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px",
})); 
export const DivPesquisa = styled('div')(() => ({
  display: 'inline-block',
})); 
export const GenerateBtn2 = styled(GenerateBtn)(() => ({
  width: '150px',
})); 
export const Input = styled('input')(() => ({
  margin: '10px 10px',
  width: '50%',
  padding: "10px 20px",
  backgroundColor: "#00587a",
  color: "#fff",
  fontSize: "20px",
  textTransform: 'lowercase'
}));
// pai dos cardsss todoss //
export const ContainerStyle = styled('div')(() => ({
  display: "flex",
  flexWrap: 'wrap',
  justifyContent: "center",
  width: '100%',
  padding: '1%',
  fontFamily: 'dansdisneyUi',
}));
// pai do pai do card //
export const CardsStyle = styled('div')(() => ({
  position: 'relative',
  width: '30%',
  height: '45vw',
  margin: '1%',

}));
// CARD PAI //
export const CharacterCardStyle = styled('div')(() => ({
  position: 'absolute',
  textAlign: "center",
  width: "100%",
  height: '100%',
  zIndex: '1',
  padding: '0',
  '& h1': {
    position: 'absolute',
    width: '100%',
    top: '6%',
    fontSize: '2.1vw',
    color: '#2D2431',
  },
  '& h3': {
    position: 'absolute',
    top: '56%',
    width: '100%',
    fontSize: '2.15vw',
    letterSpacing: '1px',
    color: '#DBB866',
    textShadow: '1px 2px 2px #000000',
  },
  '& div': {
    position: 'absolute',
    width: '90%',
    bottom: '11%',
    left: '5%',
  },
  '& h5': {
    position: 'relative',
    fontSize: '2.3vw',
    color: '#DBB866',
    textShadow: '1px 2px 2px #000000',
    letterSpacing: '0.5px',
  },
  '& span': {
    fontFamily: 'arial',
    fontSize: '2.1vw',
    letterSpacing: '0.5px',
  },
}));
// CARD img //
export const CharacterImageStyle = styled('img')(() => ({
  position: 'absolute',
  right: '5%',
  top: '5%',
  width: "90%",
  height: "65%",
}));
// CARD fundo //
export const CardBackground = styled('img')(() => ({
  position: 'absolute',
  width: "100%",
  height: "100%",
}));

// const CharacterCards = ({ characters }) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.characterCardsContainer}>
//       {characters.map((character) => (
//         <div className={classes.characterCard} key={character.name}>
//           <img
//             className={classes.characterImage}
//             src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png"
//             alt={character.name}
//           />
//           <p>{character.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   const [characters, setCharacters] = useState([]);
//   const classes = useStyles();

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       const response = await fetch("https://disneyapi.dev/api/characters/random?limit=8");
//       const data = await response.json();
//       setCharacters(data);
//     };

//     fetchCharacters();
//   }, []);

//    return (
//      <Container className={classes.container}>
//        <Button
//          id="GenerateBtn"
//          className={classes.GenerateBtn}
//          onClick={() => {
//            const fetchCharacters = async () => {
//              const response = await fetch("https://disneyapi.dev/api/characters/random?limit=8");
//              const data = await response.json();
//              setCharacters(data);
//            };

//            fetchCharacters();
//          }}
//        >
//          Gerar personagens
//        </Button>
//        {characters.length > 0 && <CharacterCards characters={characters} />}
//      </Container>
//    );
// };
