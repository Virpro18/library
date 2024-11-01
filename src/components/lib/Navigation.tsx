import Link from "next/link";

interface NavigationProps {
  links: string[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  return (
    <nav className="flex gap-4 w-full justify-center sm:w-fit">
      {links?.map((link, index) => {
        return (
          <Link href={`/${link}`} key={index} className="text-color-primary">
            {link}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
