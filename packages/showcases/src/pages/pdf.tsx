import dynamic from 'next/dynamic'
import Head from "next/head";

const NoSSR = dynamic(
    () => import('./NoSSR/pdf'),
    { ssr: false }
)

export default function PDF() {


    return (
        <>
            <Head>
                <title>PDF search showcase | Jina AI | Jina AI is a Neural Search Company </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NoSSR />
        </>)
}