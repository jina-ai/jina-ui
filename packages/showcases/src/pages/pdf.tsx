import dynamic from 'next/dynamic'

const NoSSR = dynamic(
    () => import('./NoSSR/pdf'),
    { ssr: false }
)

export default function PDF() {


    return (
        <>
            <NoSSR/>
        </>)
}