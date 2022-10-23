import styled from '@emotion/styled'
import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import storage from '../utils/storage'
import { CommonCardStyled } from './Card'
import type { CardType } from './Card'
import Input from './Input'

type Props = {
  cardType: 'number' | 'symbol'
  setCardHandle: Dispatch<SetStateAction<CardType[]>>
  valueChecker: (val: string) => boolean
}

const AddCardStyled = styled(CommonCardStyled)`
  border-style: dashed;
  transition: border-color calc(var(--u-dur) * 0.8), color calc(var(--u-dur) * 0.8);

  .CardContentBox {
    height: 100%;
    padding: 1rem 0;

    .Content {
      margin-bottom: var(--u-gap);
      text-align: center;
      font-size: 1.4rem;
      font-weight: 700;
    }

    .SubContent {
      font-weight: 700;

      svg {
        height: 1rem;
        width: 1rem;
        margin-right: calc(var(--u-gap) * 0.5);
        vertical-align: -0.12rem;
      }
    }
  }

  .CardInputMask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--u-gap);
    border-radius: var(--u-gap);
    opacity: 0;
    visibility: hidden;
    background-color: inherit;
    transition: opacity calc(var(--u-dur) * 0.8), visibility calc(var(--u-dur) * 0.8);

    .InputItem:not(:last-child) {
      margin-bottom: var(--u-gap);
    }

    .CardOperations {
      font-size: 0.85rem;
      font-weight: 700;

      span {
        display: inline-block;
        color: var(--c-text-1);
        cursor: pointer;
        text-decoration: underline;
        transition: color calc(var(--u-dur) * 0.8);

        &:last-child {
          float: right;
        }
      }
    }
  }

  &.active {
    .CardInputMask {
      opacity: 1;
      visibility: visible;
    }
  }

  &.error {
    border-color: var(--c-red);

    .CardContentBox {
      color: var(--c-red);
    }

    .CardInputMask .CardOperations span:first-of-type {
      color: var(--c-text-2);
      cursor: not-allowed;
    }
  }

  &:hover {
    color: var(--c-green);
  }
`

export default function AddCard({ cardType, setCardHandle, valueChecker }: Props) {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [amount, setAmount] = useState('')

  const isValid = valueChecker(value) && /^[1-9]\d?$/.test(amount)

  function addCardHandle() {
    setCardHandle((originCards) => {
      const newCard: CardType = {
        value: cardType === 'number' ? Number.parseInt(value, 10) : value,
        amount: Number.parseInt(amount, 10),
      }
      let newCards: CardType[],
        inOriginalCards = false

      for (let i = 0; i < originCards.length; i++) {
        if (originCards[i].value === newCard.value) {
          originCards[i].amount = newCard.amount
          inOriginalCards = true
          break
        }
      }

      if (inOriginalCards) {
        newCards = [...originCards]
      } else {
        newCards = [...originCards, newCard]
      }

      storage.set(cardType === 'number' ? 'numberCards' : 'symbolCards', newCards)
      return newCards
    })
  }

  return (
    <AddCardStyled
      className={cn({ active, error: active && value.length + amount.length !== 0 && !isValid })}
      onClick={() => !active && setActive(true)}
    >
      <div className="CardContentBox">
        <div className="Content">?</div>
        <div className="SubContent">
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z"
              clipRule="evenodd"
            />
          </svg>
          Add
        </div>
      </div>

      <div className="CardInputMask">
        <Input placeholder="Value" inputValue={value} inputHandle={setValue} />
        <Input placeholder="Amount" inputValue={amount} inputHandle={setAmount} />
        <div className="CardOperations">
          <span
            onClick={() => {
              if (isValid) {
                addCardHandle()
                setActive(false)
                setTimeout(() => {
                  setValue('')
                  setAmount('')
                }, 160)
              }
            }}
          >
            OK
          </span>
          <span
            onClick={() => {
              setActive(false)
              setTimeout(() => {
                setValue('')
                setAmount('')
              }, 160)
            }}
          >
            CE
          </span>
        </div>
      </div>
    </AddCardStyled>
  )
}
