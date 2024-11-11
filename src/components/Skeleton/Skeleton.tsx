import styled, { keyframes } from "styled-components";

interface SkeletonProps {
  size: string
  iterate: number
}

export default function Skeleton({ size, iterate }: SkeletonProps) {

  const getWidth = () => {
    let width = "150px"
    let height = "80px"

    switch (size) {
      case "title":
        width = "150px"
        height = "20px"
        break;
      case "sm-box":
        width = "150px"
        break;
      case "md-box":
        width = "215px";
        break
      case "stats":
        width = "100%";
        height = "20px";
        break
      default:
        width
        height
    }
    return { width, height }
  };

  return (
    <SkeletonContainer>
      {Array.from({ length: iterate }).map((_, i) => (
        <SkeletonWrapper key={i} size={getWidth()} />
      ))}
    </SkeletonContainer>
  )
}

const SkeletonAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }  
`

const SkeletonContainer = styled.div`
  position: relative;
  margin: 0 auto;
`

const SkeletonWrapper = styled.div<{size: { width: string; height: string }}>`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
  border-radius: 8px;
  background-color: #112d3e57;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0 183 255 / 44%) 0px 2px 10px;
  border: 1px solid rgb(180 180 180 / 30%);
  margin-bottom: 10px;

  &::after {
    content: "";
    width: 100%;
    background: linear-gradient(90deg, 
              rgba(255, 255, 255, 0), 
              rgba(255, 255, 255, 0.4), 
              rgba(255, 255, 255, 0));
    animation: ${SkeletonAnimation} 1.2s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
  }
`