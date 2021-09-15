export default function NavBar() {
    return (
        <nav className="flex flex-wrap items-center justify-between py-2.5 px-3 bg-primary-light">
            <div className="container max-w-7xl px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <span className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-primary-dark">
                        Lates Home Security & Automation
                    </span>
                </div>
                <div className="lg:flex flex-grow items-center text-xl">
                    <div className="flex lg:items-center flex-col lg:flex-row list-none ml-auto">
                        <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading text-primary-dark rounded-lg" href="/">
                            Cameras
                        </a>
                        <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading text-primary-dark rounded-lg" href="/lights">
                            Lights
                        </a>
                        <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading text-primary-dark rounded-lg" href="/doors">
                            Doors
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
