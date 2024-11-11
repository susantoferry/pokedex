import styled, { keyframes } from 'styled-components'
import { PokemonModel } from '../../models/pokemon';
import { capitaliseFirstLetter } from '../../utils/Uppercase';
import { colorTypes } from '../../models/PokemonTypes';
import { getPokemonIdFromUrl } from '../../utils/Utils';

interface PokemonProps {
  pokemon: PokemonModel;
  onClick: () => void;
}

export default function Pokemon({ pokemon, onClick }: PokemonProps) {

  const pokemonId = getPokemonIdFromUrl(pokemon.url)
  
  return (
    <PokemonRenderContainer onClick={onClick}>
      <PokemonNo>#{pokemonId}</PokemonNo>
      <PokemonName>{capitaliseFirstLetter(pokemon.name)}</PokemonName>
      <PokemonTypeWrapper>
        {pokemon.types.length > 0 && 
          pokemon.types.map((type) => {
            const { bgColor, iconType } = colorTypes(type);
            return (
              <IconImg 
                key={type} 
                src={`/images/pokemon-icon/${iconType}`} 
                alt="" 
                style={{ backgroundColor: bgColor }}
              />
            );
          })
        } 
      </PokemonTypeWrapper>
      
    </PokemonRenderContainer>
  )
}

/* Shiny Animation */
const shine = keyframes`
  0% {
    transform: translate(-150%, -150%) rotate(45deg);
  }
  100% {
    transform: translate(150%, 150%) rotate(45deg);
  }
`

const PokemonRenderContainer = styled.div`
  
  flex: 1 1 30%;
  margin: 10px;
  margin-top: 60px;
  padding: 15px;
  padding-top: 40px;
  position: relative;
  cursor: pointer;
  border: 1px solid white;
  transition-duration: 100ms;
  box-shadow: rgb(0, 183, 255, 0.74) 0px 2px 10px;
  background: rgb(136 196 255 / 20%);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  padding: 20px;
  border: 1px solid rgb(144, 200, 222);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1100px) {
    margin-right: 8px;
    margin-left: 8px;
  }
`
  
// const Image = styled.img`
//   position: absolute;
//   top: -70px;
//   image-rendering: pixelated;
//   transition-duration: 100ms;
// `

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

  /* Shiny animation overlay */
  &::before {
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
    animation: ${shine} 2s infinite;
  }
`