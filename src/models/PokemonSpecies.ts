export interface PokemonSpecies {
  name: string;
  url: string;
  evolution_chain: {
    url: string;
  };
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}