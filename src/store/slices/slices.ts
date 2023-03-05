import { createSlice } from '@reduxjs/toolkit';
import { characterProfile, objAPI } from '../../types/types';
const initialState:any = {
  characters: [],
  charactersSearched: []
}
export const cardSlice = createSlice({
    name: 'cardGenerator',
    initialState,
    reducers: {
        attributes: (state, action) => {         
            let points = {
                strength : 1,
                vitality : 1,
                dexterity : 1,
                intelligence : 1,
                random : 16  
            };      
            while (points.random > 0) {
              const randomAttribute = Math.floor(Math.random() * 4) + 1;
              switch (randomAttribute) {
                case 1:
                  points.strength += 1;
                  break;
                case 2:
                  points.vitality += 1;
                  break;
                case 3:
                  points.dexterity += 1;
                  break;
                case 4:
                  points.intelligence += 1;
                  break;
              }       
              points.random -= 1;
            }
            if (state.characters.length < 8) {
              state.characters.push({
                name: action.payload.name,
                image: action.payload.image,
                strength: points.strength,
                dexterity: points.dexterity,
                vitality: points.vitality,
                inteligence: points.intelligence
            })
            }
        },
        attributesSearch: (state, action) => {
          let points = {
              strength : 1,
              vitality : 1,
              dexterity : 1,
              intelligence : 1,
              random : 16  
          };      
          while (points.random > 0) {
            const randomAttribute = Math.floor(Math.random() * 4) + 1;
            switch (randomAttribute) {
              case 1:
                points.strength += 1;
                break;
              case 2:
                points.vitality += 1;
                break;
              case 3:
                points.dexterity += 1;
                break;
              case 4:
                points.intelligence += 1;
                break;
            }       
            points.random -= 1;
          }
          if (state.charactersSearched.length < action.payload.arraySize) {
            state.charactersSearched.push({
              name: action.payload.name,
              image: action.payload.image,
              strength: points.strength,
              dexterity: points.dexterity,
              vitality: points.vitality,
              inteligence: points.intelligence
          })
          }
      },
      reset: (state) => {
        state.characters = [];
      },
      resetSearchResul: (state) => {
        state.charactersSearched = [];
      }
    }
});
export const { attributes, reset, resetSearchResul, attributesSearch } = cardSlice.actions;
export default cardSlice.reducer; 