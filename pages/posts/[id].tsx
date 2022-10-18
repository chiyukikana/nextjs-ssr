import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>ID: {id}</h1>
      <h2>Name: {data.name}</h2>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <p>
        <Image
          src={data.sprites.other["official-artwork"].front_default}
          alt="pokemon pic"
          width={400}
          height={400}
        />
      </p>
    </div>
  );
}

type Data = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};
