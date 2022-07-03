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
}

function NavLink({
  href,
  exact = true,
  children,
  className,
  activeClass,
}: NavLinkProps) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <a className={isActive ? className + " " + activeClass : className}>
        {children}
      </a>
    </Link>
  );
}
