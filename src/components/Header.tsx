import Link from "next/link";
import InputSearch from './lib/InputSearch';
import Navigation from './lib/Navigation';

const Header = () => {
  return (
    <header className="flex bg-color-secondary p-4 justify-between sm:flex-row sm:gap-0 gap-2 flex-col flex-wrap items-center">
      <Link href="/" className="font-bold text-2xl text-white">
        Library
      </Link>
      <Navigation links={["sasa","test","azki"]}/>
      <InputSearch/>
    </header>
  );
};

export default Header;
