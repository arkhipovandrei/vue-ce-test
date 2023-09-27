export type TFormatsInput = Record<string, IFormatInput>

export interface IFormatInput {
  type: string
  placeholder: string
  options?: TOptions
}

export type TOptions = {
  value: string
  text: string
}[]