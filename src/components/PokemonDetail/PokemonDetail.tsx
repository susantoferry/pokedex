import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { bgColorStatTitle, fetchStats, PokemonDetailModel, Stats, StatType } from '../../models/PokemonDetailModel';
import axios from 'axios';
import { capitaliseFirstLetter } from '../../utils/Uppercase';
import HexagonStatus from '../Status/HexagonStatus';
import { colorTypes } from '../../models/PokemonTypes';
import { getPokemonIdFromUrl, hexToRgba } from '../../utils/Utils';
import Skeleton from '../Skeleton/Skeleton';


interface PokemonDetailProps {
  isvisible: boolean;
  pokemonId: number | null;
  onPokemonClick: (id: number | null) => void;
}

interface BubbleProps {
  $size: number;
  $left: number;
  $duration: number;
  $delay: number;
}

interface PokemonSpecies {
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

// interface Species {
//   name: string;
//   url: string;
//   evolution_chain: {
//     url: string;
//   };
// }

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

interface EvolutionData {
  chain: EvolutionChain;
}

function generateRandomBubbles(numBubbles: number): BubbleProps[] {
  const bubbles: BubbleProps[] = [];
  for (let i = 0; i < numBubbles; i++) {
    bubbles.push({
      $size: Math.floor(Math.random() * 10) + 5,
      $left: Math.floor(Math.random() * 100),
      $duration: Math.random() * 5 + 3,
      $delay: Math.random() * 1.2,
    });
  }
  return bubbles;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ isvisible = false, pokemonId, onPokemonClick }) => {
  const bubbles = generateRandomBubbles(20);

  const [ pokemonDetail, setPokemonDetail ] = useState<PokemonDetailModel | null>(null);
  const [ speciesText, setSpeciesText ] = useState<any[]>([]);
  const [ pokemonEvolutionData, setPokemonEvolutionData ] = useState<EvolutionData | null>(null);
  const [ pokemonSpecies, setPokemonSpecies ] = useState<PokemonSpecies>();
  
{/* <div className={pokemonDetail ? "" : "p-skeleton p-component"} style={{height: '100px'}}>
                    {pokemonDetail ? (
                      <HexagonStatus stats={pokemonDetail?.stats}/>
                    ) : ""}
                    
                  </div> */}

  const generateStat = (stats: Stats[] | undefined) => {
    // if (!stats) return null;
    return (
      <FlexCol>
        {stats ? (
          <>
            {stats.map((stat, index) => {
              const { icon, title } = fetchStats(stat.stat.name)
              return (
                <FlexRow key={index}>
                  {stats ? (
                    <React.Fragment>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <RectanglePoint style={{ backgroundColor: bgColorStatTitle(stat.stat.name as StatType) }}>
                          <img src={`/images/status-icon/${icon}.png`} alt="" style={{height: '15px', width: '15px', filter: "contrast(2.5)"}}/>
                        </RectanglePoint>
                        <div style={{fontSize: '12px', fontWeight: 'bold', marginLeft: '10px', color: bgColorStatTitle(stat.stat.name as StatType), filter: "brightness(1) contrast(1.5)"}}>{title}</div>
                      </div>
                      <PokemonStats>{stat.base_stat}</PokemonStats>
                    </React.Fragment>
                  ) : <div style={{color: 'red'}}>test</div>}
                  
                </FlexRow>
              )
            })}
          </>
        ) : 
        <div style={{width: '100%'}}>
          <Skeleton size='stats' iterate={3}/>
        </div>
        }
        
      </FlexCol>
    );
  };

  async function fetchPokemonInfo(id: number): Promise<{ evolutionData: EvolutionData; pokemonSpecies: PokemonSpecies }> {
    try {
      const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

      const responseSpecies = await axios.get<PokemonSpecies>(urlSpecies);

      const evolutionUrl = responseSpecies.data.evolution_chain.url

      const responseEvolutions = await axios.get<EvolutionData>(evolutionUrl);

      return {
        evolutionData: responseEvolutions.data,
        pokemonSpecies: responseSpecies.data
      }
    } catch (error) {
        console.error("Error fetching Pokémon info:", error);
        throw error;
    }
  }

  useEffect(() => {
    const loadPokemonData = async () => {
      if (pokemonId !== null) {
        try {
          const { evolutionData, pokemonSpecies } = await fetchPokemonInfo(pokemonId);
          setPokemonEvolutionData(evolutionData);
          setPokemonSpecies(pokemonSpecies)
        } catch (err) {
          console.error("Failed to load Pokémon data.", err);
        }
      }
    };
    
    loadPokemonData();
  }, [pokemonId]);

  useEffect(() => {
    // Fetch the list of Pokémon from the API
    if (pokemonId) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(response => {
        setPokemonDetail(response.data);
      })
      .catch(error => {
        console.error('Error fetching the Pokémon list:', error);
      });
    }
    
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonId) {
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(response => {
        setSpeciesText(response.data.flavor_text_entries)
      })
      .catch(error => {
        console.error("Error fetching pokemon species", error)
      });
    }
  }, [pokemonId])

  const fetchEvolutionData = (evolutionData: EvolutionData | null) => {
    if (!evolutionData) return null
    
    console.log(evolutionData.chain)
    const pokemonId = getPokemonIdFromUrl(evolutionData.chain.species.url);
    const evolve1 = evolutionData.chain.evolves_to[0];
    const evolve2 = evolutionData.chain.evolves_to[0].evolves_to[0];
    
    const evolve1Id = evolve1 ? getPokemonIdFromUrl(evolve1.species.url) : null
    const evolve2Id = evolve2 ? getPokemonIdFromUrl(evolve2.species.url) : null

    return (
      <>
        {evolutionData && 
          <>
            
            <EvolveImage 
              $pokemonId={pokemonId}
              onClick={() => onPokemonClick(pokemonId)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${[pokemonId]}.png`}
            />
            <PokemonCaption>{evolutionData.chain.species.name}</PokemonCaption>
            <Level>Lv. {evolve1.evolution_details[0].min_level}</Level>
            {evolve1Id !== null && (
              <>
                <EvolveImage 
                  $pokemonId={evolve1Id}
                  onClick={() => onPokemonClick(evolve1Id)}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolve1Id}.png`}
                />
                <PokemonCaption>{evolve1.species.name}</PokemonCaption>
              </>
            )}
            {evolve2 && evolve2Id !== null &&  
              <>
                <Level>Lv. {evolve2.evolution_details[0].min_level}</Level>
                <EvolveImage 
                  $pokemonId={evolve2Id}
                  onClick={() => onPokemonClick(evolve2Id)}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolve2Id}.png`}
                />
                <PokemonCaption>{evolve2.species.name}</PokemonCaption>
              </>
            }
          </>
        }
        
        
      </>
    )
    
  }

  const totalStat = pokemonDetail?.stats.reduce(
    (sum, stat) => sum + stat.base_stat, 0
  )

  const LeftStats = pokemonDetail?.stats.slice(0, 3);
  const RightStats = pokemonDetail?.stats.slice(3);
  
  return (
    <PokemonDetailContainer $isvisible={isvisible}>
      <div style={{height: '230px', width: '100%', position: 'relative', maxHeight: '100vh', maxWidth: '350px', marginBottom: '15px'}}>
        <PokemonInfoBg src="/images/pokemon-info-bg.jpeg" alt=""/>
        <OverlaySparkles />
        {pokemonId &&
          <BubbleContainer>
            {bubbles.map((bubble, index) => (
              <Bubble
                key={index}
                $size={bubble.$size}
                $left={bubble.$left}
                $duration={bubble.$duration}
                $delay={bubble.$delay}
              />
            ))}
          </BubbleContainer>
        }

        <PokemonImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`}/>
        
      </div>
          
      <div style={{ width: '100%', position: 'relative', overflow: 'inherit', zIndex: -1}}>
        <PokemonInfoWrapper>
          <PokemonInfo>
            <PokemonNo>
              {pokemonDetail ? `#${pokemonDetail.id}` : ""}
            </PokemonNo>
            <PokedexTitle style={{fontSize: '1.5rem'}}>
              {pokemonDetail ? `${capitaliseFirstLetter(pokemonDetail.name)}` : ""}
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
              {pokemonDetail?.types.map((type, i) => {
                const { bgColor, iconType } = colorTypes(type.type.name);
                return (
                  <TypeRoundedRect key={i} $color={bgColor}>
                    <IconImg 
                      src={`/images/pokemon-icon/${iconType}`} 
                      alt="" 
                    />
                    <div>{capitaliseFirstLetter(type.type.name)}</div>  
                  </TypeRoundedRect>
                )
              })}
              
            </PokemonTypeWrapper>
          </PokemonInfo>
          
          <PokedexDescWrapper>
          { pokemonDetail ? (
            <>
              <PokedexTitle>Pokedex Entry</PokedexTitle>
              <PokedexDesc>
                <React.Fragment>
                  {speciesText.slice(1, 7).map((entry, index) => (
                    entry.language.name == "en" ? (
                      <span key={index}>
                        <span>{entry.flavor_text + ' '}</span>   
                      </span>
                    ) : null
                  ))}
                </React.Fragment>
              </PokedexDesc>
              </>
            ) : <Skeleton size={"md-box"} iterate={1}/>}
          </PokedexDescWrapper>

          <PokemonCharacteristics>
            <PokemonHWWrapper>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto'}}>
                <FlexCol>
                  { pokemonDetail ? 
                    <PokedexTitle>Height</PokedexTitle>
                    : <Skeleton size={"title"} iterate={1}/>
                  }  
                  
                  { pokemonDetail ? 
                    <PokemonContent>
                    { 
                      `${pokemonDetail.height / 10}m`
                    }
                  </PokemonContent>
                    : <Skeleton size={"sm-box"} iterate={1}/>
                  }
                      
                
                </FlexCol>
                <FlexCol>
                  { pokemonDetail ? 
                    <PokedexTitle>Weight</PokedexTitle>
                    : <Skeleton size={"title"} iterate={1}/>
                  }  
                  { pokemonDetail ? 
                    <PokemonContent>
                      { 
                        `${pokemonDetail.weight / 10}kg`
                      }
                    </PokemonContent>
                    : <Skeleton size={"sm-box"} iterate={1}/>
                  }
                </FlexCol>
              </div>
                
              
            </PokemonHWWrapper>

            <PokemonAbilitiesContainer>
              
                <FlexCol>
                  {pokemonDetail ? (
                    <PokedexTitle>Abilities</PokedexTitle>
                  ) : <Skeleton size={"title"} iterate={1} />}

                  {pokemonDetail ? (
                    <FlexRow>
                      {pokemonDetail?.abilities.map((ability, key) => (
                        <FlexCol key={key}>
                          <PokemonContent>{capitaliseFirstLetter(ability.ability.name)}</PokemonContent>
                        </FlexCol>
                      ))}
                    </FlexRow>
                  ) : <Skeleton size={"md-box"} iterate={1} />}
                </FlexCol>
              
              
            </PokemonAbilitiesContainer>
            
          </PokemonCharacteristics>


          <PokemonStatsContainer>
            {pokemonDetail ? (
              <PokedexTitle>Stats</PokedexTitle>
            ) : <Skeleton size={"title"} iterate={1}/>}
            
            <PokemonStatsWrapper>
              <FlexRow>
                {generateStat(LeftStats)}
                {generateStat(RightStats)}
              </FlexRow>
              
              <div style={{width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '0px'}}>
                {pokemonDetail ? (
                  <FlexRow style={{width: '50%', padding: '8px 0', paddingLeft: '4px', alignItems: 'center'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <RectanglePoint style={{backgroundColor: '#7195DC'}}>
                      <img src={`/images/status-icon/${fetchStats("").icon}.png`} alt="" style={{height: '12px', width: '12px', filter: "contrast(2.5)"}}/>
                    </RectanglePoint>
                    <div style={{fontSize: '12px', fontWeight: '900', marginLeft: '10px', color: "#7195DC", filter: "contrast(2.5)"}}>{fetchStats("").title}</div>
                  </div>
                  <PokemonStats>{totalStat}</PokemonStats>
                </FlexRow>
                ) : 
                  <div style={{width: '50%', paddingLeft: '5px'}}>
                    <Skeleton size='stats' iterate={1}/>
                  </div>
                }
                
              </div>
              
              <HexagonStatsWrapper>
                {pokemonDetail ? (
                    <>
                    <HexagonStatus stats={pokemonDetail?.stats}/>
                    </>
                  ) : 
                    <div style={{display: 'block', margin: '0 auto', paddingTop: '20px'}}>
                      <Skeleton size={"sm-box"} iterate={1} />
                    </div>
                }
              </HexagonStatsWrapper>
            </PokemonStatsWrapper>
            
          </PokemonStatsContainer>

          <PokemonEvolutionWrapper>
            {pokemonDetail ? (
              <PokedexTitle>Evolution</PokedexTitle>
            ) : <Skeleton size={"title"} iterate={1}/>}

            {pokemonDetail ? (
              <FlexRowEvolution>
                {fetchEvolutionData(pokemonEvolutionData)}
              </FlexRowEvolution>  
            ) : <Skeleton size={"md-box"} iterate={1}/>}
          </PokemonEvolutionWrapper>
        </PokemonInfoWrapper>
      </div>
      {/* } */}
    </PokemonDetailContainer>
  )
}

export default PokemonDetail;

const slideIn = keyframes`
  0% {
    right: -400px;
  }

  100% {
    right: calc(10vw - 20px);
  }
`

const slideOut = keyframes`
  0% {
    right: calc(10vw - 20px);
  }

  100% {
    right: -400px;
  }
`

/* Keyframes for float animation */
const floatAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) scale(0.4);
    opacity: 0.1;
  }
  100% {
    transform: translateY(-100vh) scale(0.1);
    opacity: 0;
  }
`

const PokemonDetailContainer = styled.div<{ $isvisible: boolean }>`
  /* display: ${({ $isvisible }) => ($isvisible ? 'flex' : 'none')}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(136 196 255 / 5%);
  backdrop-filter: blur(10px) saturate(150%);
  border-radius: 20px;
  width: 100%;
  max-width: 300px;
  height: 82vh;
  position: fixed;
  right: calc(10vw - 20px);
  text-align: center;
  bottom: 0;
  margin-bottom: 20px;
  animation: display ease-in-out 0.65s, ${({ $isvisible }) => ($isvisible ? slideIn : slideOut)} ease-in-out 0.65s;
  animation-fill-mode: forwards;
  border: 1px solid #6dffff99;
  box-shadow: 0 0 5px 3px rgba(109, 255, 255, 0.2), 
              0 0 10px 3px rgba(109, 255, 255, 0.2), 
              0 0 5px 3px rgba(109, 255, 255, 0.1);
  overflow: hidden;
  transition: max-width 1s ease-in-out, width 1s ease-in-out; /* Added transition for smooth resizing */

  @media (min-width: 1241px) and (max-width: 1400px) {
    max-width: 280px;
  }

  @media (min-width: 1000px) and (max-width: 1240px) {
    max-width: 250px;
  }

  @media (max-width: 1100px) {
    animation: ${slideOut} ease-in-out 0.65s;
    animation-fill-mode: forwards;
    visibility: hidden;
  }
`;

const PokemonInfoWrapper = styled.div`
  padding-top: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
`

const PokemonInfo = styled.div`

`

const PokemonInfoBg = styled.img`
  width: 100%;
  height: 230px;
  max-width: 350px;
  max-height: 100vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 
    0 1px 45px 15px rgba(0, 0, 0, 0.9),
    0 25px 40px 20px rgba(1, 12, 45, 0.8),
    0 20px 50px 30px rgba(1, 12, 45, 0.2);
`

const OverlaySparkles = styled.div`
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/aura-sparkle.gif"), 
    url(/images/holo.png), 
    linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
  background-position: 50% 50%;
  background-size: 160%;
  background-blend-mode: overlay;
  filter: brightness(1) contrast(1);
  transition: all .33s ease;
  mix-blend-mode: color-dodge;
  opacity: 0.35;
  max-height: 230px;
  filter: brightness(1.25);
`

const BubbleContainer = styled.div`
  position: absolute;
  width: 40%;
  height: 170px;
  overflow: hidden;
  left: 30.5%;
  top: 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Bubble = styled.div<BubbleProps>`
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(
      circle,
      rgba(3, 255, 255, 1), 
      rgba(3, 255, 255, 0.6),
      rgba(3, 255, 255, 0.4),
      transparent 75%
    );
  box-shadow: 0 0 15px 1px rgba(109, 255, 255, 0.6), 
              /* 0 0 30px 2px rgba(109, 255, 255, 0.4), */
              0 0 45px 3px rgba(109, 255, 255, 0.2);
  opacity: 0.8;
  animation: ${floatAnimation} ${({ $duration }) => $duration}s infinite ease-in-out;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  animation-delay: ${({ $delay }) => $delay}s;
  margin: 0 15px;
`

const PokemonImage = styled.img`
  position: absolute;
  right: 0;
  left: 9px;
  bottom: 0;
  margin: 0 auto;
  object-fit: contain;
  image-rendering: pixelated;
  height: 100px;
  max-width: 80px;
  max-height: 100px;
  top: 55px;
  
`

const PokemonNo = styled.span`
  position: relative;
  font-size: 13px;
  font-weight: 900;
  color: #ecf0f2;
  margin-top: 15px;
  bottom: -8px;
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

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
`

const OtherNames = styled.div`
  display: flex;
  color: #94ddff;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  font-size: 13px;
`

const PokedexDescWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  padding: 0px 10px;
`

const PokedexDesc = styled.span`
  font-size: 13.5px;
  color: #98ACBC;
  font-weight: bold;
  /* margin: 0 10px; */
  padding-top: 10px;
  height: 100%;
  display: block;
`

const PokemonCharacteristics = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  margin-bottom: 15px;
  padding: 0px 10px;
`

const PokemonHWWrapper = styled.div`
  /* margin: 0 auto; */
`

const PokemonAbilitiesContainer = styled.div`
  display: grid;
  position: relative;
  
`

// const PokemonAbilitiesWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  gap: 10px;
`

const FlexCol = styled(FlexRow)`
  flex-direction: column;
  padding: 5px 0;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h4 {
    margin-bottom: 0;
  }
`

const PokemonContent = styled.div`
  padding: 5px;
  /* border-radius: 10px; */
  border-radius: 20px;
  font-weight: 500;
  width: 100%;
  background-color: #112d3e57;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0 183 255 / 44%) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 30%);
  margin-bottom: 10px;
  /* height: 25px; */

  /* padding: 5px;
  border-radius: 20px;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0, 183, 255, 0.74) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 59%); */
`

const RectanglePoint = styled.div`
  border-radius: 30px;
  width: 25px;
  height: 25px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`

const PokemonStatsContainer = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0px 10px;
  /* width: 100%;
  position: relative;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-direction: column; */
`

const PokemonStatsWrapper = styled.div`
  
`

const HexagonStatsWrapper = styled(PokemonStatsContainer)`
  
`

const PokemonStats = styled.div`
  font-weight: 900;
  font-size: 13px;
`

const PokemonEvolutionWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding-top: 20px;
`

const FlexRowEvolution = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const EvolveImage = styled.img<{ $pokemonId: number}>`
  height: 75px;
  width: 75px;
  cursor: pointer;
  margin: 0 5px;
  padding: 3px;
  border-radius: 50%;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`

const Level = styled.div`
  /* width: 17%; */
  width: 70px;
  padding: 4px 0;
  border-radius: 30px;
  margin: 0 5px;
  font-size: 12px;
  font-weight: 600;
  /* width: 100%; */
  background-color: transparent;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0, 183, 255, 0.74) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 59%);
`

const PokemonCaption = styled.div`
  position: relative;
  bottom: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  text-transform: capitalize;
  margin-bottom: 10px;
`