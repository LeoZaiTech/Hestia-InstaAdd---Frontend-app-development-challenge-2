export interface FilteredOption<T> {
  label: OptionLabel[];
  data: T;
}

export interface OptionLabel {
  index: number;
  text: string;
  isHighlight: boolean;
}
