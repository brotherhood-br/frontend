import { useCallback, useState } from "react"

export type useBooleanOutput = [
  boolean,
  {
    setValue: (value: boolean) => void
    on: () => void
    off: () => void
    toggle: () => void
  }
]

export function useBoolean(defaultValue?: boolean): useBooleanOutput {
  const [value, setValue] = useState(!!defaultValue)

  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((x) => !x), [])

  return [value, { setValue, on, off, toggle }]
}
