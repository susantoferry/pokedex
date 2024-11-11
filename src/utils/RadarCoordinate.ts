export const adjustingRadarCoordinate = (label: string, x: number,y: number) => {
  let adjustedX = x;
  let adjustedY = y;

  switch (label) {
    case 'HP':
      adjustedX = x;
      adjustedY = y - 8;
      break;
    case 'ATK':
      adjustedX = x + 8;
      adjustedY = y
      break;
    case 'DEF':
      adjustedX = x + 5;
      adjustedY = y + 12;
      break;
    case 'SpATK':
      adjustedX = x;
      adjustedY = y + 20;
      break;
    case 'SpDEF':
      adjustedX = x - 8;
      adjustedY = y + 10;
      break;
    case 'SPD':
      adjustedX = x - 8;
      adjustedY = y - 3;
      break;
    default:
      adjustedX = x;
      adjustedY = y;
      break;
  }
  return {adjustedX, adjustedY}
}