import withToolTip from "./withToolTip";
import { useEffect } from "react";

interface DivWithToolTipProps {
  children: JSX.Element;
  tooltipLabel: string;
  className: string;
  showToolTip: boolean;
  onClick: () => void;
  initializeToolTipText: (text: string) => void;
}

function DivWithToolTip({
  children,
  tooltipLabel,
  className,
  onClick,
  initializeToolTipText,
}: DivWithToolTipProps) {
  useEffect(() => {
    initializeToolTipText(tooltipLabel);
  }, [tooltipLabel]);
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
}

export default withToolTip(DivWithToolTip);
