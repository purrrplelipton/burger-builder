import { bool, element, func, node, oneOfType } from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { backDrop, fadeIn } from "./backdrop.module.css";

function Backdrop({ show, onClick, children }) {
  const [visible, setVisibility] = useState(false);
  const [classList, setClassList] = useState([backDrop]);

  useEffect(() => {
    if (show) {
      setVisibility(true);
      const reveal$delay = setTimeout(
        () => setClassList((prv) => [...prv, fadeIn]),
        50
      );
      return () => clearTimeout(reveal$delay);
    }
    setClassList((prv) => prv.filter((cn) => cn !== fadeIn));
    const removal$delay = setTimeout(() => setVisibility(false), 350);
    return () => clearTimeout(removal$delay);
  }, [show]);

  return (
    visible && (
      <div
        role="presentation"
        className={classList.join(" ")}
        onClick={onClick}
      >
        {children}
      </div>
    )
  );
}
Backdrop.defaultProps = { children: null };

Backdrop.propTypes = {
  children: oneOfType([node, element]),
  show: bool.isRequired,
  onClick: func.isRequired,
};

export default memo(Backdrop);
