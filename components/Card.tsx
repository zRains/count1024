import styled from '@emotion/styled'

export type CardType = {
  value: number | string
  amount: number
}

type Props = CardType & {
  controlCardHandle: (diff: number) => void
}

export const CommonCardStyled = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0 calc(var(--u-gap) * 1.25);
  margin-bottom: calc(var(--u-gap) * 2);
  padding: var(--u-gap);
  height: 110px;
  width: 80px;
  border: 2.5px solid var(--c-text-1);
  border-radius: var(--u-gap);
  background-color: var(--c-bg);
  transition: background-color var(--u-dur), color var(--u-dur);
  user-select: none;
`

const CardStyled = styled(CommonCardStyled)`
  .CardContent {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .CardAmount {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.8rem;
    background-color: var(--c-text-1);
    color: var(--c-text-dark-1);
    padding: calc(var(--u-gap) * 0.2) calc(var(--u-gap) * 0.5) calc(var(--u-gap) * 0.1) var(--u-gap);
    border-radius: 8px 0 0 0;
  }

  .CardOperations {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0.6rem;
    left: 0;
    right: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity calc(var(--u-dur) * 0.8), visibility calc(var(--u-dur) * 0.8);

    svg {
      margin: 0 calc(var(--u-gap) * 0.5);
      height: 1.2rem;
      width: 1.2rem;
      cursor: pointer;
      color: var(--c-text-3);

      &:nth-of-type(1):hover {
        color: var(--c-green);
      }

      &:nth-of-type(2):hover {
        color: var(--c-red);
      }
    }
  }

  &:hover .CardOperations {
    opacity: 1;
    visibility: visible;
  }
`

export default function Card({ value, amount, controlCardHandle }: Props) {
  return (
    <CardStyled>
      <div className="CardContent">{value}</div>
      <div className="CardAmount">x{amount}</div>
      <div className="CardOperations">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          onClick={() => controlCardHandle(1)}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 12 12"
          onClick={() => controlCardHandle(-1)}
        >
          <path fill="currentColor" d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6Zm3-.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z" />
        </svg>
      </div>
    </CardStyled>
  )
}
