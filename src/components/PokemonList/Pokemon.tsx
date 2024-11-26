import styled, { keyframes } from 'styled-components'
import { PokemonModel } from '../../models/pokemon';
import { capitaliseFirstLetter } from '../../utils/Uppercase';
import { colorTypes } from '../../models/PokemonTypes';
import { getPokemonIdFromUrl } from '../../utils/Utils';
import Skeleton from '../Skeleton/Skeleton';
import { useActiveIndex } from '../../context/ActiveIndexProvider';

interface PokemonProps {
  pokemon: PokemonModel;
}

export default function Pokemon({ pokemon }: PokemonProps) {

  const pokemonId = getPokemonIdFromUrl(pokemon.url)
  const { activeIndex, setActiveIndex } = useActiveIndex();

  const handlePokemonClick = (pokId: number) => {
    setActiveIndex(pokId)
  };
  
  return (
    <PokemonRenderContainer
      className={pokemonId === activeIndex ? "active" : ""}
      onClick={() => handlePokemonClick(pokemonId)}
    >
      
      <PokemonWrapper>
        <PokemonImageWrapper>
          {pokemonId ? (
            <Image 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              alt={capitaliseFirstLetter(pokemon.name)}
            />
          ): <Skeleton size={"md-box"} iterate={1}/>}
        </PokemonImageWrapper>
      
        <PokemonInfoWrapper>
          {pokemonId ? (
            <PokemonNo>#{pokemonId}</PokemonNo>
          ): <Skeleton size={"title"} iterate={1}/>}

          {pokemonId ? (
            <PokemonName>{capitaliseFirstLetter(pokemon.name)}</PokemonName>
          ): <Skeleton size={"title"} iterate={1}/>}

          {pokemon ? (
            <PokemonTypeWrapper>
              {pokemon.types.length > 0 && 
                pokemon.types.map((type) => {
                  const { bgColor, iconType } = colorTypes(type);
                  return (
                    <IconImg 
                      key={type} 
                      src={`/images/pokemon-icon/${iconType}`} 
                      alt={iconType.replace('.png', '')} 
                      style={{ backgroundColor: bgColor }}
                    />
                  );
                })
              } 
            </PokemonTypeWrapper>
          ): <Skeleton size={"title"} iterate={1}/>}
        </PokemonInfoWrapper>
      </PokemonWrapper>
    </PokemonRenderContainer>
  )
}



const PokemonRenderContainer = styled.div`
  margin: 10px;
  margin-top: 5px;
  padding: 15px;
  padding-top: 40px;
  position: relative;
  cursor: pointer;
  transition-duration: 100ms;
  transition: filter 0.5s ease-in-out, border 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  box-shadow: rgb(0, 183, 255, 0.74) 0px 2px 10px;
  background-image: url("./images/file.png");
  background-repeat: no-repeat;
  background-size: 100% 98%;
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  filter: brightness(0.7);
  border: 1px solid transparent;
  border-radius: 20px !important;
  height: 190px;
  background-position: center;

  @media (max-width: 1100px) {
    margin-right: 8px;
    margin-left: 8px;
  }

  @media (max-width: 768px) {
    margin: 0%;
    width: 100%;
    max-width: 360px;
  }

  &:hover{
    border: 1px solid rgb(118, 192, 221);
    box-shadow: rgb(0, 183, 255, 0.8) 0px 6px 16px;
    filter: brightness(1);
  }

  &.active {
    border: 1px solid rgb(118, 192, 221);
    box-shadow: rgb(0, 183, 255, 0.8) 0px 2px 16px 2px;
    transform: scale(0.98);
    filter: brightness(1);
  }
`
  
const PokemonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`

const PokemonImageWrapper = styled.div`
  
`

const PokemonInfoWrapper = styled.div`
  
`

const Image = styled.img`
  image-rendering: pixelated;
  transition-duration: 100ms;
  position: relative;
  top: 8px;
`

const PokemonNo = styled.span`
  font-size: 12px;
  font-weight: 900;
  color: #dde3e8;
`

const PokemonName = styled.div`
  font-weight: bold;
  margin: 5px;
  color: #fff;
  padding-bottom: 10px;
`

const PokemonTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const IconImg = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  padding: 5px;
  position: relative;
  box-shadow: 
    0 6px 10px rgba(0, 0, 0, 0.4),         
    inset 0 -8px 10px rgba(0, 0, 0, 0.3),  
    inset 0 6px 10px rgba(255, 255, 255, 0.6);

  /* &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    transform: rotate(45deg);
    animation: shine 2s infinite;
  } */
`

/* Shiny Animation */
// const shine = keyframes`
//   0% {
//     transform: translate(-150%, -150%) rotate(45deg);
//   }
//   100% {
//     transform: translate(150%, 150%) rotate(45deg);
//   }
// `