import React from 'react'
const comingSoonImageDesktop = 'assets/coming-soon-background-desktop.svg'
const comingSoonImageMobile = 'assets/coming-soon-background-mobile.svg'

export default function ComingSoon () {
    return (
        <main className="-m-4">
            <img className="" src={comingSoonImageDesktop} alt="coming soon image" />
            <h1 className="font-bold mb-6 text-center text-3xl text-gray-700">Coming Soon...</h1>
        </main>
    )
}