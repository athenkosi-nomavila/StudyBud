export type ModuleColor = "lime" | "sky" | "butter" | "coral";

export type StudyModule = {
  id: string;
  name: string;
  color: ModuleColor;
  cardsDue: number;
};
