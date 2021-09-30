export default function NavBar() {
  return (
    <nav className="flex flex-wrap items-center justify-between py-2.5 px-3 bg-secondary-dark">
      <div className="container max-w-7xl px-4 mx-auto flex flex-wrap items-center justify-between text-secondary-light">
        <div className="w-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase" href="/">
            Lates Home Security & Automation
          </a>
        </div>
        <div className="hidden lg:flex flex-grow items-center text-xl">
          <div className="flex lg:items-center flex-col lg:flex-row list-none ml-auto">
            <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading rounded-lg" href="/cameras">
              Cameras
            </a>
            <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading rounded-lg" href="/lights">
              Lights
            </a>
            <a className="px-5 py-4 flex gap-1 items-center uppercase font-medium leading rounded-lg" href="/doors">
              Doors
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
