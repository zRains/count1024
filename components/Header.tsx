import styled from '@emotion/styled'
import Nav from './Nav'

const HeaderStyled = styled.header`
  height: var(--header-height);

  .HeaderContainer {
    display: flex;
    height: var(--header-height);
    width: var(--content-max-width);
    margin: 0 auto;

    .HeaderTitle {
      line-height: var(--header-height);
      font-weight: 700;
      font-size: 2.5rem;
    }
  }
`

export default function Header() {
  return (
    <HeaderStyled>
      <div className="HeaderContainer">
        <div className="HeaderTitle">Count.1024</div>
        <Nav />
      </div>
    </HeaderStyled>
  )
}
