import styled from '@emotion/styled'
import type { ReactElement } from 'react'

type Props = {
  children?: ReactElement
  text: string
}

export const ContainerBannerStyled = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;

  svg {
    margin-right: calc(var(--u-gap) * 0.8);
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: -0.3rem;
  }
`

export default function ContainerBanner({ children, text }: Props) {
  return (
    <ContainerBannerStyled>
      {children || (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m21.47 4.35l-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79c.01-.26-.04-.55-.13-.81L13 3.5a1.954 1.954 0 0 0-1.81-1.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34"
          />
        </svg>
      )}
      <span>{text}</span>
    </ContainerBannerStyled>
  )
}
