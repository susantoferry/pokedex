interface EvolutionDetail {
  min_level: number;
}

interface EvolutionChain {
  species: {
    name: string;
    url: string;
  }
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionChain[]
}

export interface EvolutionData {
  chain: EvolutionChain;
}