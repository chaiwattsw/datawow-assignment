import React, { SVGProps } from "react";

function IconTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.5 6h18M19.5 6v14a2 2 0 01-2 2h-10a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10.5 11v6M14.5 11v6"
      ></path>
    </svg>
  );
}

export default IconTrash;
