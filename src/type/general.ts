export interface IAttributes {
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  fitness: number;
  karma: number;
  healthComplexity: number;
}

export type GenderType = "Male" | "Female";

export interface ICharacter {
  id: string;
  age: number;
  firstName: string;
  lastName: string;
  gender: GenderType;
  country: string;
  attributes: IAttributes;
}
