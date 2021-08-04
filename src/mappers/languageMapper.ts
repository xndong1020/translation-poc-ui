import { Languages_Lookup } from "../constants/enums";

export const languageAbbrToFull = (abbr: string) => {
  // https://stackoverflow.com/questions/50417254/dynamically-access-enum-in-typescript-by-key
  return Languages_Lookup[abbr as keyof typeof Languages_Lookup];
};
