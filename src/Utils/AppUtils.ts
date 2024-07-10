export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
}