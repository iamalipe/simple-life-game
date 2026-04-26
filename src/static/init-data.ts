import type { IAttributes } from "@/type/general";

export const getInitAttributes = (): IAttributes => {
  return {
    fitness: 0,
    happiness: 0,
    health: 0,
    healthComplexity: 0,
    karma: 0,
    looks: 0,
    smarts: 0,
  };
};
