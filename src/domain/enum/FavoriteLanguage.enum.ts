export enum FavoriteLanguageEnum {
  'C/C++' = 1,
  'Python' = 2,
  'C#' = 3,
  'SQL' = 4,
  'Java' = 5,
  'Assembly' = 6,
}

export const getLanguageId = (language: FavoriteLanguageEnum): number => parseInt(FavoriteLanguageEnum[language]);
