export const clamp = (num: number, min: number, max: number) => {
  return num <= min ? min : num >= max ? max : num;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
