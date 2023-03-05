export interface characterProfile {
    name: string,
    image: string,
    strength: number,
    dexterity: number,
    vitality: number,
    inteligence: number,
};
export interface objAPI {
    characters: characterProfile[]
}
export interface perso {
    films: [],
    shortFilms: [],
    tvShows: [],
    videoGames: [],
    parkAttractions: [],
    allies: [],
    enemies: [],
    _id: number,
    name: string,
    imageUrl: string,
    url: string
}