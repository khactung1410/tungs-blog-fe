import React from "react";
import styled, { keyframes } from "styled-components";

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const colors = keyframes`
  0% {
    stroke: #4285F4;
  }
  25% {
    stroke: #DE3E35;
  }
  50% {
    stroke: #F7C223;
  }
  75% {
    stroke: #1B9A59;
  }
  100% {
    stroke: #4285F4;
  }
`;

// Cập nhật SpinnerWrapper để chiếm toàn bộ màn hình và có nền mờ
export const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5); /* Nền mờ */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Đảm bảo Spinner nằm trên cùng */
  
  opacity: 1; /* Hiển thị Spinner mặc định */
  visibility: visible; /* Spinner có thể nhìn thấy */
  transition: opacity 1s ease-in-out, visibility 0s 1s; /* Chuyển đổi opacity và delay visibility */
  
  /* Khi Spinner bị ẩn */
  &.hidden {
    opacity: 0; /* Ẩn Spinner */
    visibility: hidden; /* Ẩn Spinner */
    transition: opacity 1s ease-in-out, visibility 0s 0s; /* Chuyển đổi opacity và xóa delay cho visibility */
  }
`;


export const SpinnerSVG = styled.svg`
  animation: ${rotator} 1.4s linear infinite;
  width: 65px;
  height: 65px;
`;

export const SpinnerCircle = styled.circle`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: 
    ${dash} 1.4s ease-in-out infinite, 
    ${colors} 5.6s ease-in-out infinite;
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
`;

export const Message = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  text-align: center;
`;

