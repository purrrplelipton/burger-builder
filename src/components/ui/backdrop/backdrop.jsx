import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { backDrop, fadeIn } from "./backdrop.module.css";

function Backdrop({ show, onClick, children }) {
  const [visible, setVisibility] = useState(false);
  const [classList, setClassList] = useState([backDrop]);

  useEffect(() => {
    if (show) {
      setVisibility(true);
      const reveal$delay = setTimeout(
        () => setClassList((prv) => [...prv, fadeIn]),
        10
      );
      return () => clearTimeout(reveal$delay);
    }
    setClassList((prv) => prv.filter((cn) => cn !== fadeIn));
    const removal$delay = setTimeout(() => setVisibility(false), 310);
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
  children: propTypes.node,
  show: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Backdrop;
