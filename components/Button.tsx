import styled from '@emotion/styled'
import type { ReactElement } from 'react'

type Props = {
  onClick: () => void
  children: ReactElement
  text: string
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  border: none;
  padding: calc(var(--u-gap) * 0.8) calc(var(--u-gap) * 2);
  border-radius: 5px;
  background-color: var(--c-text-1);
  color: var(--c-bg);
  font-size: 1rem;
  font-family: var(--f-fira-slab);
  cursor: pointer;

  svg {
    margin-right: var(--u-gap);
    height: 1.1rem;
    width: 1, 1rem;
  }
`

export default function Button({ onClick, children, text }: Props) {
  return (
    <ButtonStyled onClick={onClick}>
      {children}
      {text}
    </ButtonStyled>
  )
}
