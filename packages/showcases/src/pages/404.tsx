import React from 'react'
import Image from "next/image";
import comingSoonImageDesktop from '../images/coming-soon-background-desktop.svg'
import comingSoonImageMobile from '../images/coming-soon-background-mobile.svg'

export default function ComingSoon () {
    return (
        <main className="-m-4">
            <Image className="" src={comingSoonImageDesktop} alt="coming soon image" />
            <h1 className="font-bold mb-6 text-center text-3xl text-gray-700">Coming Soon...</h1>
        </main>
    )
}