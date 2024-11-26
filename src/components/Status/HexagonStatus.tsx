import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';
import { fetchStats, Stats } from '../../models/PokemonDetailModel';
import { adjustingRadarCoordinate } from '../../utils/RadarCoordinate';

interface HexagonStatProps {
  stats: Stats[]
}

interface StatData {
  subject: {icon: string; title: string};
  value: number;
  fullMark: number;
}

export default function HexagonStatus({stats}: HexagonStatProps) {

  if (!stats || stats.length === 0) {
    return <div>Loading...</div>;
  }
  
  const transformedData: StatData[] = stats.map(stat => ({
    subject: fetchStats(stat.stat.name),
    value: stat.base_stat,
    fullMark: 2000
  }));

  return (
    <ChartContainer>
      <HexagonBackground>
        <HexagonClip1 />
        <HexagonClip2 />
        <HexagonClip3 />
        <HexagonClip4 />
        <Circle />
      </HexagonBackground>

      <div>
        <RadarContainer>
          <ResponsiveContainer width="100%" height={250} >
          
            <RadarChart data={transformedData} margin={{ top: 10, right: 14, bottom: 10, left: 10 }}>
              <defs>
                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4d4d" stopOpacity={1} />
                  <stop offset="50%" stopColor="#ff4d4d" stopOpacity={0.75} />
                  <stop offset="100%" stopColor="#ff4d4d" stopOpacity={1} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#fff" strokeOpacity={1} strokeWidth={2}/> 
              <PolarAngleAxis 
                dataKey="subject.title" 
                stroke="#fff" 
                strokeWidth={3}
                tick={({ payload, x, y, textAnchor, ...rest }) => {
                  const { adjustedX, adjustedY } = adjustingRadarCoordinate(payload.value, x, y);
                  return (
                    <text
                      {...rest}
                      x={adjustedX}
                      y={adjustedY}
                      textAnchor={textAnchor}
                      fill="#ffffff"
                      fontSize={12}
                      fontWeight="700"
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <PolarRadiusAxis
                domain={[0, 110]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="base_stat"
                dataKey="value"
                stroke="#ff4d4d"
                strokeOpacity={0.3}
                fill="url(#gradientFill)"
                fillOpacity={1}
              />
            </RadarChart>
          </ResponsiveContainer>
        </RadarContainer>
      </div>
    </ChartContainer>
    
  );
};

const ChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
  z-index: -1;
`;

const HexagonBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const RadarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const Hexagon = styled.div`
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: absolute;
  opacity: 0.6;
`

const HexagonClip1 = styled(Hexagon)`
  width: 35px;
  height: 40px;
  background-color: #698edc;
  transform: translate(0px, 25px);
  z-index: 4;
`;

const HexagonClip2 = styled(Hexagon)`
  width: 68px;
  height: 75px;
  background-color: #8dbef5;
  transform: translate(0px, 25px);
  z-index: 3;
`

const HexagonClip3 = styled(Hexagon)`
  width: 95px;
  height: 110px;
  background-color: #a9d1ff;
  transform: translate(0px, 25px);
  z-index: 2;
`

const HexagonClip4 = styled(Hexagon)`
  width: 125px;
  height: 140px;
  background-color: #c6e4ff;
  transform: translate(0px, 25px);
  z-index: 1;
`

const Circle = styled.div`
  background: #c6e4ff;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: absolute;
  opacity: 0.3;
  filter: blur(10px);
  transform: translate(0px, 25px);
`