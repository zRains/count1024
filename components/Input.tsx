import styled from '@emotion/styled'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  inputValue: string
  placeholder: string
  inputHandle: Dispatch<SetStateAction<string>>
}

const InputStyled = styled.input`
  padding: 0 calc(var(--u-gap) * 0.5);
  padding-bottom: 2px;
  outline: none;
  border: none;
  border-bottom: 2px solid currentColor;
  background-color: transparent;
  font-family: var(--f-fira-slab);
  font-size: 0.9rem;
  width: 60px;
`

export default function Input({ inputValue, placeholder, inputHandle }: Props) {
  return (
    <InputStyled
      className="InputItem"
      value={inputValue}
      onChange={(e) => inputHandle(e.target.value)}
      placeholder={placeholder}
    />
  )
}
