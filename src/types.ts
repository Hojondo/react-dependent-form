export interface OptionDataObj {
  value: string | number | boolean;
  label: string;
  disabled?: boolean; // todo support async fc
}
export type OptionDataType =
  | Array<OptionDataObj>
  | ((record: Object) => Promise<Array<OptionDataObj>>);

export interface RegisterConfigFormat {
  required: boolean | string;
  validate?: {
    [prop: string]: (data: any) => boolean | string;
  };
}
export type RegisterType =
  | RegisterConfigFormat
  | ((record: Object, actionType?: string) => RegisterConfigFormat);

export type ExcludeKeys = 'disabled' | 'defaultValue' | 'value';
