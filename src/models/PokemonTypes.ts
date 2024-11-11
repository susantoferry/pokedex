export const pokemonTypes = {
  results: [
    {
      name: "normal",
      url: "https://pokeapi.co/api/v2/type/1/"
    },
    {
      name: "fighting",
      url: "https://pokeapi.co/api/v2/type/2/"
    },
    {
      name: "flying",
      url: "https://pokeapi.co/api/v2/type/3/"
    },
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/"
    },
    {
      name: "ground",
      url: "https://pokeapi.co/api/v2/type/5/"
    },
    {
      name: "rock",
      url: "https://pokeapi.co/api/v2/type/6/"
    },
    {
      name: "bug",
      url: "https://pokeapi.co/api/v2/type/7/"
    },
    {
      name: "ghost",
      url: "https://pokeapi.co/api/v2/type/8/"
    },
    {
      name: "steel",
      url: "https://pokeapi.co/api/v2/type/9/"
    },
    {
      name: "fire",
      url: "https://pokeapi.co/api/v2/type/10/"
    },
    {
      name: "water",
      url: "https://pokeapi.co/api/v2/type/11/"
    },
    {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    },
    {
      name: "electric",
      url: "https://pokeapi.co/api/v2/type/13/"
    },
    {
      name: "psychic",
      url: "https://pokeapi.co/api/v2/type/14/"
    },
    {
      name: "ice",
      url: "https://pokeapi.co/api/v2/type/15/"
    },
    {
      name: "dragon",
      url: "https://pokeapi.co/api/v2/type/16/"
    },
    {
      name: "dark",
      url: "https://pokeapi.co/api/v2/type/17/"
    },
    {
      name: "fairy",
      url: "https://pokeapi.co/api/v2/type/18/"
    },
    {
      name: "stellar",
      url: "https://pokeapi.co/api/v2/type/19/"
    }
  ]
};

// export const iconTypes = (type)

export const colorTypes = (type: string) => {
  let bgColor = ""
  let iconType = ""

  switch (type) {
    case 'normal': 
      bgColor = '#BCBCAC';
      iconType = "normal.png";
      break;
    case 'fighting':
      bgColor = '#BC5442';
      iconType = "fighting.png";
      break;
    case 'flying':
      bgColor = '#669AFF';
      iconType = "flying.png";
      break;
    case 'poison':
      bgColor = '#AB549A';
      iconType = "poison.png";
      break;
    case 'ground':
      bgColor = '#DEBC54';
      iconType = "ground.png";
      break;
    case 'rock':
      bgColor = '#BCAC66';
      iconType = "rock.png";
      break;
    case 'bug':
      bgColor = '#ABBC1C';
      iconType = "bug.png";
      break;
    case 'ghost':
      bgColor = '#6666BC';
      iconType = "ghost.png";
      break;
    case 'steel':
      bgColor = '#ABACBC';
      iconType = "steel.png";
      break;
    case 'fire':
      bgColor = '#FF421C';
      iconType = "fire.png";
      break;
    case 'water':
      bgColor = '#2F9AFF';
      iconType = "water.png";
      break;
    case 'grass':
      bgColor = '#78CD54';
      iconType = "grass.png";
      break;
    case 'electric':
      bgColor = '#FFCD30';
      iconType = "electric.png";
      break;
    case 'psychic':
      bgColor = '#FF549A';
      iconType = "psychic.png";
      break;
    case 'ice':
      bgColor = '#78DEFF';
      iconType = "ice.png";
      break;
    case 'dragon':
      bgColor = '#7866EF';
      iconType = "dragon.png";
      break;
    case 'dark':
      bgColor = '#785442';
      iconType = "dark.png";
      break;
    case 'fairy':
      bgColor = '#FFACFF';
      iconType = "fairy.png";
      break;
    case 'shadow':
      bgColor = '#0E2E4C';
      iconType = "";
      break;
    default:
      bgColor = '#000'
      iconType = "";
      break;
  }  

  return {bgColor, iconType}
  
}