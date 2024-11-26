import styled from "styled-components"
import Skeleton from "../../Skeleton/Skeleton"
import HexagonStatus from "../../Status/HexagonStatus"
import { bgColorStatTitle, fetchStats, PokemonDetailModel, Stats, StatType } from "../../../models/PokemonDetailModel";
import React from "react";

interface PokemonStatsProps {
  pokemonStats: PokemonDetailModel | null;
}

export const GeneratePokemonStats: React.FC<PokemonStatsProps> = ({ pokemonStats }) => {

  const LeftStats = pokemonStats?.stats.slice(0, 3);
  const RightStats = pokemonStats?.stats.slice(3);

  const totalStat = pokemonStats?.stats.reduce(
    (sum, stat) => sum + stat.base_stat, 0
  )

  const generateStat = (stats: Stats[] | undefined) => {
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


  return (
    <PokemonStatsContainer>
      {pokemonStats ? (
        <PokedexTitle>Stats</PokedexTitle>
      ) : <Skeleton size={"title"} iterate={1}/>}

      <PokemonStatsWrapper>
        <FlexRow>
          {generateStat(LeftStats)}
          {generateStat(RightStats)}
        </FlexRow>
        
        <div style={{width: '100%', display: 'flex', alignItems: 'center', marginBottom: '0px'}}>
          {pokemonStats ? (
            <div style={{display: 'flex', width: '100%', gap: '20px'}}>
              <div style={{width: '100%'}}>
                
              </div>
              <FlexRow style={{padding: '8px 0px 0px 0px'}}
              >
                <div style={{display: 'flex', alignItems: 'center', marginRight: '-1px'}}>
                  <RectanglePoint style={{backgroundColor: '#7195DC'}}>
                    <img src={`/images/status-icon/${fetchStats("").icon}.png`} alt="" style={{height: '12px', width: '12px', filter: "contrast(2.5)"}}/>
                  </RectanglePoint>
                  <div style={{fontSize: '12px', fontWeight: '900', marginLeft: '10px', color: "#7195DC", filter: "contrast(2.5)"}}>{fetchStats("").title}</div>
                </div>
                <PokemonStats>{totalStat}</PokemonStats>
              </FlexRow>
            </div>
          ) : 
            <div style={{width: '50%', paddingLeft: '5px'}}>
              <Skeleton size='stats' iterate={1}/>
            </div>
          }
          
        </div>
        
        <HexagonStatsWrapper>
          {pokemonStats ? (
              <>
              <HexagonStatus stats={pokemonStats?.stats}/>
              </>
            ) : 
              <div style={{display: 'block', margin: '0 auto', paddingTop: '20px'}}>
                <Skeleton size={"sm-box"} iterate={1} />
              </div>
          }
        </HexagonStatsWrapper>
      </PokemonStatsWrapper>
    </PokemonStatsContainer>
  )
}

const PokemonStatsContainer = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0px 10px;
  text-align: center;
`

const PokemonStatsWrapper = styled.div`
  
`

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  gap: 20px;
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

const PokemonStats = styled.div`
  font-weight: 900;
  font-size: 13px;
`

const HexagonStatsWrapper = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0px 10px;
`