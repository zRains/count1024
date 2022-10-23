import styled from '@emotion/styled'
import { useState } from 'react'
import storage from '../utils/storage'
import AddCard from './AddCard'
import type { CardType } from './Card'
import Card from './Card'

type Props = {
  boxType: 'number' | 'symbol'
  valueChecker: (val: string) => boolean
}

const CardBoxStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export default function CardBox({ boxType, valueChecker }: Props) {
  const [cards, setCards] = useState<CardType[]>(
    storage.get(boxType === 'number' ? 'numberCards' : 'symbolCards') || [],
  )

  function controlCards(idx: number, diff: number) {
    setCards((originalCards) => {
      let originalAmount = originalCards[idx].amount,
        newCards: CardType[]

      if (originalAmount + diff <= 0) {
        newCards = originalCards.filter((c, i) => i !== idx)
      } else {
        originalCards[idx].amount = Math.min(99, originalAmount + diff)
        newCards = [...originalCards]
      }

      storage.set(boxType === 'number' ? 'numberCards' : 'symbolCards', newCards)
      return newCards
    })
  }

  return (
    <CardBoxStyled>
      <AddCard setCardHandle={setCards} valueChecker={valueChecker} cardType={boxType} />
      {cards.map((c, i) => (
        <Card
          value={c.value}
          amount={c.amount}
          key={`${c.value}-${c.amount}`}
          controlCardHandle={(diff) => controlCards(i, diff)}
        />
      ))}
    </CardBoxStyled>
  )
}
