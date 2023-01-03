export default function NavBar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-secondary-dark py-2.5 px-3">
      <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 text-secondary-light">
        <div className="flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
          <a
            className="whitespace-no-wrap mr-4 inline-block py-2 text-sm font-bold uppercase leading-relaxed"
            href="/"
          >
            Lates Home Security & Automation
          </a>
        </div>
        <div className="hidden flex-grow items-center text-xl lg:flex">
          <div className="ml-auto flex list-none flex-col lg:flex-row lg:items-center">
            <a
              className="leading flex items-center gap-1 rounded-lg px-5 py-4 font-medium uppercase"
              href="/cameras"
            >
              Cameras
            </a>
            <a
              className="leading flex items-center gap-1 rounded-lg px-5 py-4 font-medium uppercase"
              href="/lights"
            >
              Lights
            </a>
            <a
              className="leading flex items-center gap-1 rounded-lg px-5 py-4 font-medium uppercase"
              href="/doors"
            >
              Doors
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
