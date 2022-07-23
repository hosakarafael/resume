import { useState, useEffect } from "react";
import css from "./Alert.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ALERT = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
};

export function useAlert(): [
  JSX.Element,
  (message: string, type: "info" | "success" | "warning" | "danger") => void
] {
  const [alert, setAlert] = useState<JSX.Element>(<></>);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!showAlert) {
      setAlert(<></>);
    }
  }, [showAlert]);

  function closeAlert() {
    setShowAlert(false);
  }

  function dispatchAlert(
    message: string,
    type: "info" | "success" | "warning" | "danger"
  ) {
    setShowAlert(true);
    setAlert(<Alert type={type} message={message} closeAlert={closeAlert} />);
  }

  return [alert, dispatchAlert];
}

interface AlertProps {
  message: string;
  type: string;
  closeAlert: () => void;
}

function Alert({ message, type, closeAlert }: AlertProps) {
  return (
    <div id="alert" className={`${css.alert} ${getClass(type)} ignorePDF`}>
      <div>
        <div className={css["label"]}>{getLabel(type)}</div>
        <span className={css["message"]}>{message}</span>
      </div>
      <FontAwesomeIcon
        className={css["close-btn"]}
        icon={faXmark}
        onClick={closeAlert}
        size={"2x"}
      />
    </div>
  );
}

function getLabel(type: string) {
  switch (type) {
    case ALERT.SUCCESS:
      return "Success! ";
    case ALERT.DANGER:
      return "Error! ";
    case ALERT.WARNING:
      return "Warning! ";
    default:
      return "Info! ";
  }
}

function getClass(type: string) {
  switch (type) {
    case ALERT.SUCCESS:
      return `${css["alert--success"]}`;
    case ALERT.DANGER:
      return `${css["alert--danger"]}`;
    case ALERT.WARNING:
      return `${css["alert--warning"]}`;
    default:
      return "";
  }
}
