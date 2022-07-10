import withToolTip from "./withToolTip";
import _ from "lodash";
import { useEffect } from "react";
import { NavLink } from "../NavLink/NavLink";

interface NavLinkWithToolTipProps {
  children: JSX.Element;
  to: string;
  tooltipLabel: string;
  showToolTip: boolean;
  exact?: boolean;
  initializeToolTipText: (text: string) => void;
  className: string;
  activeClass?: string;
  [x: string]: any;
}

function NavLinkWithToolTip({
  children,
  to,
  tooltipLabel,
  initializeToolTipText,
  showToolTip,
  className,
  exact,
  activeClass,
  ...props
}: NavLinkWithToolTipProps) {
  useEffect(() => {
    initializeToolTipText(tooltipLabel);
  }, [tooltipLabel]);

  return (
    <NavLink
      className={className}
      href={to}
      activeClass={activeClass}
      exact={exact}
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default withToolTip(NavLinkWithToolTip);
