import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { ContainerBannerStyled } from './ContainerBanner'
import cn from 'classnames'

type Props = {
  result: {
    numbers: number[]
    symbols: string[]
  }[]
}

const ResultBoxStyled = styled.div`
  position: relative;
  height: 178px;
  overflow: auto;
  padding: var(--u-gap);
  border: 2.5px solid var(--c-text-1);
  border-radius: var(--u-gap);
  columns: 2;
  column-fill: auto;

  .ResultItem {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--c-text-3);

    span {
      display: inline-block;

      &.ResultNumberItem,
      &.ResultSymbolItem {
        color: var(--c-text-1);
      }

      &:not(:last-child) {
        margin-right: var(--u-gap);
      }
    }

    &:not(:last-child) {
      margin-bottom: var(--u-gap);
    }
  }

  .ResultBoxMask {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 1.5rem;
    color: var(--c-text-2);
    font-weight: 700;
    user-select: none;
    opacity: 1;
    visibility: visible;
    transition: opacity calc(var(--u-dur) * 0.8), visibility calc(var(--u-dur) * 0.8);

    svg {
      margin-right: calc(var(--u-gap) * 2);
      height: 1.5rem;
      width: 1.5rem;
    }

    &.disable {
      opacity: 0;
      visibility: hidden;
    }
  }
`

const ResultContainerBannerStyled = styled(ContainerBannerStyled)`
  .BoxOperations {
    display: inline-block;
    margin-left: var(--u-gap);
    vertical-align: 0.08rem;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--c-text-2);

    span {
      cursor: pointer;

      &:hover,
      &.active {
        color: var(--c-text-1);
        text-decoration: underline;
      }
    }
  }
`

const ModeDescStyled = styled.div`
  margin-top: var(--u-gap);
  margin-bottom: calc(var(--u-gap) * 2);

  p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--c-text-2);

    strong {
      color: var(--c-text-1);
    }
  }
`

export default function ResultBox({ result }: Props) {
  const [res, setRes] = useState(result)
  const [status, setStatus] = useState(-1)

  useEffect(() => {
    setRes(result)
    setStatus(result.length === 0 ? -1 : 0)
  }, [result])

  function uniqueResult() {
    const set: Set<string> = new Set()
    const newRes: {
      numbers: number[]
      symbols: string[]
    }[] = []

    result.forEach((r) => {
      if (/^(\+|\*|\^|&|\|)$/.test(r.symbols[0])) {
        const patch =
          [r.numbers[0], r.symbols[0], r.numbers[1]].sort().join('') +
          [r.symbols[1], r.numbers[2], r.symbols[2], r.numbers[3]].join('')

        if (!set.has(patch)) {
          set.add(patch)
          newRes.push(r)
        }
      } else newRes.push(r)
    })

    setStatus(1)

    setRes(newRes)
  }

  return (
    <>
      <ResultContainerBannerStyled>
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1H5a1 1 0 0 0 1 1h9.5a.5.5 0 0 1 0 1H6a2 2 0 0 1-2-2V4Zm5.455 2.293a.5.5 0 0 0-.902-.017L7.19 9H6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .447-.276L8.98 7.66l2.066 4.546a.5.5 0 0 0 .884.05L13.283 10h.217a.5.5 0 0 0 0-1H13a.5.5 0 0 0-.429.243l-1.01 1.683l-2.106-4.633Z"
          />
        </svg>
        <span>RESULTS</span>
        <div className="BoxOperations">
          <span
            className={cn({ active: status === 0 })}
            onClick={() => {
              setStatus(0)
              setRes(result)
            }}
          >
            PE&CO
          </span>
          /
          <span className={cn({ active: status === 1 })} onClick={uniqueResult}>
            unique
          </span>
        </div>
      </ResultContainerBannerStyled>
      <ResultBoxStyled>
        <ul className="ResetList">
          {res.map((r, i) => (
            <li
              className="ResultItem"
              key={`${r.numbers[0]}-${r.symbols[0]}-${r.numbers[1]}-${r.symbols[1]}-${r.numbers[2]}-${r.symbols[2]}-${r.numbers[3]}`}
            >
              <span>(</span>
              <span>(</span>
              <span className="ResultNumberItem">{r.numbers[0]}</span>
              <span className="ResultSymbolItem">{r.symbols[0]}</span>
              <span className="ResultNumberItem">{r.numbers[1]}</span>
              <span>)</span>
              <span className="ResultSymbolItem">{r.symbols[1]}</span>
              <span className="ResultNumberItem">{r.numbers[2]}</span>
              <span>)</span>
              <span className="ResultSymbolItem">{r.symbols[2]}</span>
              <span className="ResultNumberItem">{r.numbers[3]}</span>
            </li>
          ))}
        </ul>
        <div className={cn({ ResultBoxMask: true, disable: res.length !== 0 })}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
            <path
              fill="#FFCC4D"
              d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
            />
            <ellipse cx="18" cy="27" fill="#664500" rx="5" ry="6" />
            <path
              fill="#664500"
              d="M5.999 11A1 1 0 0 1 5.2 9.4C8.462 5.05 12.816 5 13 5a1 1 0 0 1 .004 2c-.155.002-3.568.086-6.204 3.6a.998.998 0 0 1-.801.4zm24.002 0a.998.998 0 0 1-.801-.4c-2.64-3.521-6.061-3.598-6.206-3.6a1.002 1.002 0 0 1-.991-1.005A.997.997 0 0 1 23 5c.184 0 4.537.05 7.8 4.4a1 1 0 0 1-.799 1.6z"
            />
            <path fill="#F5F8FA" d="M18 23c-1.657 0-3 1.79-3 4h6c0-2.21-1.343-4-3-4z" />
            <ellipse cx="12" cy="14.5" fill="#664500" rx="2.5" ry="3.5" />
            <ellipse cx="24" cy="14.5" fill="#664500" rx="2.5" ry="3.5" />
          </svg>
          No Result
        </div>
      </ResultBoxStyled>
      <ModeDescStyled>
        <p>
          <strong>PE&CO: </strong>Permutation and combination. This will show all the possibilities.
        </p>
        <p>
          <strong>unique: </strong>Exclude equivalent exchange.
        </p>
      </ModeDescStyled>
    </>
  )
}
