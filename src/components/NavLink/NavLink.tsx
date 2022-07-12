import { useRouter } from "next/router";
import Link from "next/link";
import { ReactElement } from "react";

export { NavLink };

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
  activeClass?: string;
  query?: { [x: string]: string };
}

function NavLink({
  href,
  exact = true,
  children,
  className,
  activeClass,
  query,
}: NavLinkProps) {
  const { asPath } = useRouter();

  const isActive = exact ? asPath === href : asPath.startsWith(href);

  return (
    <Link href={{ pathname: href, query: query }}>
      <a className={isActive ? className + " " + activeClass : className}>
        {children}
      </a>
    </Link>
  );
}
