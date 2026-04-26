export type data = {
  player: {
    id: string; // uuid
    age: number;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    country: string;
    relationship?: {
      playerId: string;
      // playerData:PlayerData;
      closeness: number;
      group: "PARENT" | "SIBLINGS";
    };
    stat: {
      health: number; // 0 - 100
      happiness: number; // 0 - 100
      smarts: number; // 0 - 100
      looks: number; // 0 - 100
      fitness: number; // 0 - 100
      karma: number; // 0 - 100
      healthComplexity: number; // 0 - 100
    };
    life: {
      age: number;
      activity: string[];
    }[];
  };
}[];
