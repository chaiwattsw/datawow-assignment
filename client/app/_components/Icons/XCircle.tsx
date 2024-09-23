import React, { SVGProps } from "react";

function IconXCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 36.667c9.204 0 16.666-7.462 16.666-16.666 0-9.205-7.462-16.667-16.666-16.667-9.205 0-16.667 7.462-16.667 16.667 0 9.204 7.462 16.666 16.667 16.666zM25 15L15 25M15 15l10 10"
      ></path>
    </svg>
  );
}

export default IconXCircle;
