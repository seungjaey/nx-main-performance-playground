import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const keyFrameRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const keyFrameDash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Wrap = styled.svg`
  animation: ${keyFrameRotate} 2s linear infinite;
  > .path {
    animation: ${keyFrameDash} 1.5s ease-in-out infinite;
  }
`;

interface Props {
  width?: number;
  height?: number;
  stroke?: string;
}

export const LoadingSpinner = ({ width = 50, height = 50, stroke = '#f4f4f4' }: Props) => {
  return (
    <Wrap viewBox="0 0 50 50" width={width} height={height}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="5"
      />
    </Wrap>
  );
};
