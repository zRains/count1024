import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import ContainerBanner from '../components/ContainerBanner'
import ResultBox from '../components/ResultBox'
import MainLayout from '../layouts/MainLayout'
import type { NextPageWithLayout } from './_app'
import Giscus from '@giscus/react'
import Image from 'next/image'
import Head from 'next/head'

const HomeStyled = styled.div`
  padding-top: 1rem;

  .MainOperations {
    margin-bottom: calc(var(--u-gap) * 3);
  }

  .RulesContainer {
    margin-bottom: 3rem;

    .RulesImage {
      display: block;
      margin: calc(var(--u-gap) * 2) 0;

      img {
        border-radius: var(--u-gap);
      }
    }

    p {
      font-size: 0.95rem;
      margin: 0 0 var(--u-gap) 0;

      u {
        font-size: 1.1rem;
        font-weight: 700;
      }
    }
  }

  .Footer {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    color: var(--c-text-2);
    font-size: 0.88rem;

    .PowerBy {
      svg {
        margin-left: var(--u-gap);
        vertical-align: -0.25rem;
        width: 4rem;
        height: 1rem;
      }
    }

    .Creator a,
    .Inspired a {
      margin-left: var(--u-gap);
      display: inline-block;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .FooterDivider {
      margin: 0 calc(var(--u-gap) * 1.5);
      height: 18px;
      width: 2px;
      background-color: var(--c-text-2);
    }
  }
`

const CardBox = dynamic(
  () => {
    return import('../components/CardBox')
  },
  { ssr: false },
)

const CalcButton = dynamic(
  () => {
    return import('../components/CalcButton')
  },
  { ssr: false },
)

const Page: NextPageWithLayout = () => {
  const [result, setResult] = useState<
    {
      numbers: number[]
      symbols: string[]
    }[]
  >([])

  return (
    <HomeStyled>
      <Head>
        <title>count.1024</title>
      </Head>

      <div className="MainOperations">
        <CalcButton handleResult={setResult} />
      </div>

      <ResultBox result={result} />

      <div className="CardsContainer NumberCardsContainer">
        <ContainerBanner text="MY NUMBER CARD(S)" />
        {/* Number Box */}
        <CardBox boxType="number" valueChecker={(val) => /^\d{1,4}$/.test(val)} />
      </div>

      <div className="CardsContainer SymbolCardsContainer">
        <ContainerBanner text="MY SYMBOL CARD(S)" />
        {/* Symbol Box */}
        <CardBox boxType="symbol" valueChecker={(val) => /^(\+|-|\*|\/\/|<<|>>|\*\*|\^|&|\||%)$/.test(val)} />
      </div>

      <div className="RulesContainer">
        <ContainerBanner text="Rules And Good Luck 😉">
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 7v10h2v-4h.8l1.2 4h2l-1.24-4.15C14.5 12.55 15 11.84 15 11V9a2 2 0 0 0-2-2H9m2 2h2v2h-2V9m1-7a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2Z"
            />
          </svg>
        </ContainerBanner>
        <p>This is an activity from leetcode. Let&apos;s celebrate the arrival of the 1024 festival 🎉.</p>

        <div className="RulesImage">
          <Image src="/count1024_leetcode_banner.webp" height={122} width={700} alt="count1024_leetcode_banner" />
        </div>
        <p>
          <u>1.</u> Use 7 cards for 3 operations, including 2 digital cards and 1 operation symbol card for each
          operation
        </p>
        <p>
          <u>2.</u> After each operation, a number card will be generated based on the last operation result. When the
          last operation result is exactly equal to 1024, it is recorded as &quot;success&quot;.
        </p>

        <p>
          <u>3.</u> It should be noted that before completing 3 operations, each operation is irrevocable, which means
          you need to be very careful with each operation.
        </p>
      </div>

      <Giscus
        repo="zRains/count1024"
        repoId="R_kgDOISZP2g"
        category="General"
        categoryId="DIC_kwDOISZP2s4CSJO9"
        mapping="specific"
        term="Welcome To Count1024"
        reactionsEnabled="0"
        strict="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
      />

      <footer className="Footer">
        <div className="PowerBy">
          Power by
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 116">
            <path
              fill="currentColor"
              d="M255.42 28.976c-19.993 0-34.408 13.039-34.408 32.597c0 19.559 16.226 32.598 36.22 32.598c12.079 0 22.727-4.781 29.32-12.84l-13.855-8.004c-3.658 4.002-9.218 6.338-15.466 6.338c-8.674 0-16.045-4.527-18.78-11.771h50.744c.399-2.029.634-4.13.634-6.339c0-19.54-14.415-32.58-34.409-32.58Zm-17.13 26.259c2.263-7.226 8.457-11.772 17.113-11.772c8.675 0 14.869 4.546 17.114 11.772H238.29Zm212.138-26.26c-19.993 0-34.409 13.04-34.409 32.598c0 19.559 16.226 32.598 36.22 32.598c12.079 0 22.727-4.781 29.32-12.84l-13.855-8.004c-3.658 4.002-9.217 6.338-15.465 6.338c-8.675 0-16.046-4.527-18.78-11.771H484.2c.399-2.029.634-4.13.634-6.339c0-19.54-14.415-32.58-34.408-32.58Zm-17.114 26.26c2.264-7.226 8.457-11.772 17.114-11.772c8.674 0 14.868 4.546 17.113 11.772h-34.227Zm-70.683 6.338c0 10.866 7.1 18.11 18.11 18.11c7.461 0 13.057-3.386 15.937-8.91l13.908 8.023c-5.759 9.598-16.552 15.375-29.845 15.375c-20.011 0-34.408-13.04-34.408-32.598s14.415-32.597 34.408-32.597c13.293 0 24.068 5.777 29.845 15.375l-13.908 8.023c-2.88-5.524-8.476-8.91-15.937-8.91c-10.992 0-18.11 7.243-18.11 18.11ZM512 9.055V92.36h-16.299V9.055H512ZM66.916 0l66.915 115.903H0L66.916 0Zm167.298 9.055l-50.182 86.927l-50.183-86.927h18.817l31.366 54.33l31.366-54.33h18.816Zm106.685 21.732v17.548c-1.811-.525-3.73-.887-5.795-.887c-10.522 0-18.11 7.244-18.11 18.11V92.36h-16.299V30.787h16.299v16.66c0-9.2 10.703-16.66 23.905-16.66Z"
            />
          </svg>
        </div>
        <div className="FooterDivider"></div>
        <div className="Creator">
          Create By
          <Link href={'https://github.com/zRains'}>
            <a target={'_blank'}>@zRain</a>
          </Link>
        </div>
        <div className="FooterDivider"></div>
        <div className="Inspired">
          Inspired By
          <Link href={'https://github.com/LetMeFly666'}>
            <a target={'_blank'}>@LetMeFly666</a>
          </Link>
        </div>
      </footer>
    </HomeStyled>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default Page
