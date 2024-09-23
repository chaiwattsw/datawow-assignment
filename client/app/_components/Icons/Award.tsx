import React, { SVGProps } from "react";

function IconAward(props: SVGProps<SVGSVGElement>) {
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
        d="M20 25c6.443 0 11.666-5.224 11.666-11.667 0-6.444-5.223-11.667-11.666-11.667-6.444 0-11.667 5.223-11.667 11.667 0 6.443 5.223 11.666 11.667 11.666z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.684 23.15l-2.017 15.183 8.333-5 8.334 5-2.017-15.2"
      ></path>
    </svg>
  );
}

export default IconAward;
