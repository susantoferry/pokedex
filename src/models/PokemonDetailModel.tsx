export interface PokemonDetailModel {
  id: number;
  name: string;
  url: string;
  types: Type[];
  weight: number;
  height: number;
  abilities: Ability[];
  stats: Stats[];
  text: string;
}

export type StatType = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';

export const fetchStats = (type: string) => {
  let icon = ""
  let title = ""

  switch (type) {
    case 'hp':
      icon = "heart"
      title = "HP"
      break;
    case 'attack':
      icon = "attack"
      title = "ATK"
      break;
    case 'defense':
      icon = "shield"
      title = "DEF"
      break;
    case 'special-attack':
      icon = "special-atk"
      title = "SpATK"
      break;
    case 'special-defense':
      icon = "special-def"
      title = "SpDEF"
      break;
    case 'speed':
      icon = "speed"
      title = "SPD"
      break;
    default:
      icon = "total"
      title = "TOTAL"
      break;
  }

  return { icon, title }
}

export function bgColorStatTitle(stat: StatType): string {
  switch (stat) {
    case 'hp':
      return '#DF2140'
    case 'attack':
      return '#FF994D'
    case 'defense':
      return '#EECD3D'
    case 'special-attack':
      return '#85DDFF'
    case 'special-defense':
      return '#96DA83'
    case 'speed':
      return '#DB94A8'
    default: 
      return 'gray'
  }
}

export interface Type {
  type: {
    name: string;
  };
}

export interface AbilityName {
  name: string;
}

export interface Ability {
  ability: AbilityName;
}

export interface StatName {
  name: string;
}

export interface Stats {
  base_stat: number;
  stat: StatName;
}