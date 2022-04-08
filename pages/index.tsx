import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className={'flex flex-col justify-between gap-y-20'}>
      <Head>
        <title>auth-test</title>
      </Head>
      <Header />
      <div>Home Page</div>
    </div>
  );
};

export default Home;
