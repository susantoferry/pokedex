import styled, { keyframes } from "styled-components"

interface PokemonImageProps {
  pokemonId: number | null
}

interface BubbleProps {
  $size: number;
  $left: number;
  $duration: number;
  $delay: number;
}

const generateRandomBubbles = (bubbles: number): BubbleProps[] => {
  return Array.from({ length: bubbles }, () => ({
    $size: Math.floor(Math.random() * 10) + 5,
    $left: Math.floor(Math.random() * 100),
    $duration: Math.random() * 5 + 3,
    $delay: Math.random() * 1.2,
  }));
};


export const GeneratePokemonImage: React.FC<PokemonImageProps> = ({ pokemonId }) => {

  const bubbles = generateRandomBubbles(20);
  return (
    <PokemonImageContainer>
      <PokemonInfoBg src="/images/pokemon-info-bg.jpeg" alt="/pokemon-info-bg"/>
      <OverlaySparkles />
      {pokemonId &&
        <BubbleContainer>
          {bubbles.map((bubble, index) => (
            <Bubble
              key={index}
              $val={bubble.$duration}
              style={{
                left: `${bubble.$left}%`,
                width: `${bubble.$size}px`,
                height: `${bubble.$size}px`,
                animationDelay: `${bubble.$delay}s`
              }}
            />
          ))}
        </BubbleContainer>
      }

      <PokemonImage 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`}
      />
      
    </PokemonImageContainer>
  )
}

const PokemonImageContainer = styled.div`
  height: 230px;
  width: 100%;
  position: relative;
  max-height: 100vh;
  max-width: 350px;
  margin-bottom: 15px;

  @media (max-width: 650px) {
    max-width: 100%;
  }
`

const PokemonInfoBg = styled.img`
  width: 100%;
  height: 230px;
  max-width: 100%;
  max-height: 100vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 
    0 1px 45px 15px rgba(0, 0, 0, 0.9),
    0 25px 40px 20px rgba(1, 12, 45, 0.8),
    0 20px 50px 30px rgba(1, 12, 45, 0.2);

    &.test {
      max-width: 200px;
      height: 150px;
    }
`

const OverlaySparkles = styled.div`
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/sparkles.gif"), 
    url("/images/holo.png"), 
    linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%);
  background-position: 50% 50%;
  background-size: 160%;
  background-blend-mode: overlay;
  filter: brightness(1) contrast(1);
  mix-blend-mode: color-dodge;
  opacity: 0.35;
  max-height: 230px;
  max-width: 315px;
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

const Bubble = styled.div<{ $val: number }>`
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(circle,rgba(3, 255, 255, 1), rgba(3, 255, 255, 0.6),rgba(3, 255, 255, 0.4),transparent 75%);
  box-shadow: 0 0 15px 1px rgba(109, 255, 255, 0.6), 0 0 45px 3px rgba(109, 255, 255, 0.2);
  opacity: 0.8;
  margin: 0 15px;
  animation: ${({ $val }) => `floatAnimation ${$val}s infinite ease-in-out`};

  @keyframes floatAnimation {
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
  }
`;

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

  &.sml-img {
    max-width: 45px;
  }

  @media (max-width: 1000px) {
    max-width: 60px;
  }
`