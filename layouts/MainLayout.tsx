import styled from '@emotion/styled'
import { ReactElement } from 'react'
import Header from '../components/Header'

const MainLayoutStyled = styled.div`
  min-height: 100vh;

  .MainContainer {
    box-sizing: content-box;
    margin: 0 auto;
    flex-grow: 1;
    width: var(--content-max-width);
  }
`

export default function PRMainHeaderLayout({ children }: { children: ReactElement }) {
  return (
    <MainLayoutStyled>
      <Header />
      <main className="MainContainer">{children}</main>
    </MainLayoutStyled>
  )
}
