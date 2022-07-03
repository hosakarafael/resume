import withToolTip from "./withToolTip";
import _ from "lodash";
import { useEffect } from "react";
import { NavLink } from "../NavLink/NavLink";

interface NavLinkWithToolTipProps {
  children: JSX.Element;
  to: string;
  faClasses: string;
  tooltipLabel: string;
  showToolTip: boolean;
  initializeToolTipText: (text: string) => void;
  className: string;
  activeClass?: string;
  activeURLs?: string[];
  [x: string]: any;
}

function NavLinkWithToolTip({
  children,
  to,
  tooltipLabel,
  initializeToolTipText,
  showToolTip,
  className,
  activeClass,
  activeURLs,
  ...props
}: NavLinkWithToolTipProps) {
  useEffect(() => {
    initializeToolTipText(tooltipLabel);
  }, []);

  return (
    <NavLink
      className={className}
      href={to}
      activeClass={activeClass}
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default withToolTip(NavLinkWithToolTip);
