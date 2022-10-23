import type { Dispatch, SetStateAction } from 'react'
import $1024$ from '../utils/$1024$'
import storage from '../utils/storage'
import Button from './Button'
import { CardType } from './Card'

type Props = {
  handleResult: Dispatch<
    SetStateAction<
      {
        numbers: number[]
        symbols: string[]
      }[]
    >
  >
}

export default function CalcButton({ handleResult }: Props) {
  function simplifyCards(cards: CardType[], amount: number): string[] | number[] {
    const result = []
    for (let i = 0; i < cards.length; i++) result.push(...Array(Math.min(cards[i].amount, amount)).fill(cards[i].value))
    return result
  }

  function calc() {
    const numberCards = simplifyCards(storage.get('numberCards') || [], 4) as number[]
    const symbolCards = simplifyCards(storage.get('symbolCards') || [], 3) as string[]
    const result = $1024$(numberCards, symbolCards)

    return result
  }

  return (
    <Button text="Calculate" onClick={() => handleResult(calc())}>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M2 10a8 8 0 1 1 16 0a8 8 0 0 1-16 0Zm6-2.167v4.334a.75.75 0 0 0 1.125.65l4.125-2.384a.5.5 0 0 0 0-.866L9.125 7.184A.75.75 0 0 0 8 7.834Z"
        />
      </svg>
    </Button>
  )
}
