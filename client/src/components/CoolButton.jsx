import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CoolButton(props) {
  const { linkColor, shadowColor, linkText, destination } = props;
  const [height, setHeight] = useState(50);

  const divStyle = {
    // height: `${height}px`,
  };
  const styles = {
    backgroundColor: `${linkColor}`,
    borderRadius: "10%",
    boxShadow: `-3px 3px 3px ${shadowColor}`,
    padding: "10px 15px",
    marginRight: "20px",
    fontSize: "14px ",
    color: "#fff ",
    textDecoration: "none ",
  };

  return (
    <div
      style={divStyle}
      onMouseEnter={() => {
        setHeight((prev) => prev * 0.5);
      }}
      onMouseLeave={() => setHeight(50)}
    >
      <Link style={styles} to={destination}>
        {linkText}
      </Link>
    </div>
  );
}
