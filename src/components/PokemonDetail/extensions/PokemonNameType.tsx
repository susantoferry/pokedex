import styled from "styled-components";
import { capitaliseFirstLetter } from "../../../utils/Uppercase";
import React from "react";
import { colorTypes } from "../../../models/PokemonTypes";
import { hexToRgba } from "../../../utils/Utils";
import { PokemonDetailModel } from "../../../models/PokemonDetailModel";
import { PokemonSpecies } from "../../../models/PokemonSpecies";

interface PokemonNameTypeProps {
  pokemonData: PokemonDetailModel | null
  pokemonSpecies?: PokemonSpecies
}

export const GeneratePokemonNameType: React.FC<PokemonNameTypeProps> = ({ pokemonData, pokemonSpecies }) => {
  return (
    <PokemonInfo>
      <PokemonNo>
        {pokemonData ? `#${pokemonData.id}` : ""}
      </PokemonNo>
      <PokedexTitle>
        {pokemonData ? `${capitaliseFirstLetter(pokemonData.name)}` : ""}
      </PokedexTitle>
      <div style={{marginBottom: '10px'}}>
        {pokemonSpecies &&
          <OtherNames>
            {pokemonSpecies.names.slice(0, 2).map((otherName, index) => (
              <React.Fragment key={index}>
                <div>
                {otherName.name}
                </div>
                {index === 0 && <div>|</div> }
              </React.Fragment>
              
            ))}
          </OtherNames>
        }
      </div>
      <PokemonTypeWrapper>
        {pokemonData?.types.map((type, i) => {
          const { bgColor, iconType } = colorTypes(type.type.name);
          return (
            <TypeRoundedRect key={i} $color={bgColor}>
              <IconImg 
                src={`/images/pokemon-icon/${iconType}`} 
                alt={iconType.replace('.png', '')} 
              />
              <div>{capitaliseFirstLetter(type.type.name)}</div>  
            </TypeRoundedRect>
          )
        })}
        
      </PokemonTypeWrapper>
    </PokemonInfo>
  )
}

const PokemonInfo = styled.div`

`

const PokemonNo = styled.span`
  position: relative;
  font-size: 13px;
  font-weight: 900;
  color: #ecf0f2;
  margin-top: 15px;
  bottom: -8px;
`

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
  font-size: 1.5rem;
`

const OtherNames = styled.div`
  display: flex;
  color: #94ddff;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  font-size: 13px;
`

const PokemonTypeWrapper = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  margin-bottom: 15px;
  justify-content: center;
`

const TypeRoundedRect = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: row;
  gap: 2px;
  background-color: ${({ $color }) => $color};
  border-radius: 30px;
  padding: 3px 7px;
  color: #fff;
  margin: 5px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 14px;
  opacity: 1;
  box-shadow: 0 4px 20px ${({ $color }) => hexToRgba($color, 0.5)},
              inset 0 -8px 10px ${({ $color }) => hexToRgba($color, 0.8)},
              inset 0 6px 10px rgba(255, 255, 255, 0.6);
`

const IconImg = styled.img`
  height: 20px;
  width: 20px;
`