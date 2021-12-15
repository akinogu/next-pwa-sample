import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useReadContext } from '../../src/components/ReadContext'
import styles from '../../styles/Home.module.css'

const key = 'page history'
const Result: NextPage = () => {
  const { result } = useReadContext()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          RESULT
        </h1>
        <div>{result}</div>
        <Link href='read'>戻る</Link>
      </main>
    </div>
  )
}

export default Result