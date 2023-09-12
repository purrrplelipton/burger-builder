import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { backDrop, fadeIn } from "./backdrop.module.css";

function Backdrop({ show, onClick, children }) {
  // const [visible, setVisibility] = useState(show);
  const [classList, setClassList] = useState([backDrop]);

  useEffect(() => {
    if (show) setClassList((prv) => prv.concat(fadeIn));
    else {
      const removal$delay = setTimeout(
        () => setClassList((prv) => prv.filter((cn) => cn !== fadeIn)),
        400
      );
      return () => clearTimeout(removal$delay);
    }
    return () => {};
  }, [show]);

  return (
    show && (
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
