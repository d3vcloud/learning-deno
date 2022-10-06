import {
  bgBrightBlack,
  bgGreen,
  bgYellow,
  bold,
  white,
} from "colors";


const COLOR_METHODS = {
  green: bgGreen,
  yellow: bgYellow,
  gray: bgBrightBlack,
};

export const paintLetter = (color: "green" | "yellow" | "gray", letter: string) => {
  const bg = COLOR_METHODS[color];
  const colorizedLetter = bg(bold(` ${white(letter)} `));
  return ` ${colorizedLetter} `;
};
