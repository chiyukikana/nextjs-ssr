import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Post.module.css'

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <div className={styles.container}>
        <Image
          src={data.sprites.other['official-artwork'].front_default}
          alt="pokemon pic"
          width={400}
          height={400}
        />
        <h1>ID: {id}</h1>
        <h2>Name: {data.name}</h2>
        <h3>Height: {data.height}</h3>
        <h3>Weight: {data.weight}</h3>
      </div>
    </>
  )
}

type Data = {
  name: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}
