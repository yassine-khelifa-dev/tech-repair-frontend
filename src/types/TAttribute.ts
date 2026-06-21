export type TOption = {
  id: number;
  label: string;
  value: string;
};
export type TAttribute = {
      id: number,
      name: string,
      unit: string | null,
      options: TOption[]
};
