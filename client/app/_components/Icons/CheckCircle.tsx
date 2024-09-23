import React, { SVGProps } from "react";

function IconCheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g clipPath="url(#clip0_1_10211)">
        <path
          fill="#00A743"
          d="M10 .313C4.65.313.312 4.65.312 10S4.65 19.688 10 19.688c5.35 0 9.688-4.338 9.688-9.688C19.688 4.65 15.35.312 10 .312zm0 1.875A7.808 7.808 0 0117.813 10 7.808 7.808 0 0110 17.813 7.808 7.808 0 012.187 10 7.808 7.808 0 0110 2.187zm5.477 5.088l-.88-.887a.469.469 0 00-.663-.003l-5.522 5.477L6.076 9.51a.469.469 0 00-.663-.003l-.887.88a.469.469 0 00-.003.663l3.546 3.575c.183.184.48.185.663.003l6.742-6.688a.469.469 0 00.003-.663z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1_10211">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconCheckCircle;
