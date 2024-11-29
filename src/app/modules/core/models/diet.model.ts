export interface ChecklistDiet {
  id: number;
  dietName: string;
  dishes: DishDetails[];
  count: number;
}

export interface DishDetails {
  id: number;
  name: string;
}
