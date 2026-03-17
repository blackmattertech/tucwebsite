import type { ReactNode } from 'react';
import styled from '@emotion/styled';

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

const StyledWrapper = styled.div`
  .parent {
    width: 100%;
    min-width: 0;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    height: 200px;
    perspective: 1000px;
  }

  @media (min-width: 640px) {
    .parent {
      height: 300px;
    }
  }

  .card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, #fecc00 0%, #fecc00 45%, #f5c200 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(0, 0, 0, 0.08) 0 25px 25px -5px;
    position: relative;
    overflow: hidden;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.75) 100%);
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    transition: all 0.5s ease-in-out;
    pointer-events: none;
  }

  .content {
    padding: 80px 24px 48px 24px;
    transform: translate3d(0, 0, 26px);
    position: relative;
    z-index: 1;
  }

  @media (min-width: 640px) {
    .content {
      padding: 100px 24px 64px 24px;
    }
  }

  .content .title {
    display: block;
    color: #000;
    font-weight: 900;
    font-size: 0.9375rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    font-family: var(--font-heading, system-ui, sans-serif);
  }

  .content .text {
    display: block;
    color: #111;
    font-size: 1rem;
    line-height: 1.5;
    font-family: var(--font-family, system-ui, sans-serif);
  }

  .content .text a {
    color: #111;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease, text-decoration 0.2s ease;
  }

  .content .text a:hover {
    color: #000;
    text-decoration: underline;
  }

  .content .text a.break-all {
    word-break: break-all;
    overflow-wrap: break-word;
  }

  .content .text .link-block {
    display: block;
    margin-top: 0.25rem;
  }

  .bottom {
    padding: 10px 16px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transform: translate3d(0, 0, 26px);
    z-index: 1;
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    background: none;
    border: none;
    color: #000;
    font-weight: 700;
    font-size: 0.8125rem;
    cursor: pointer;
    font-family: var(--font-family, system-ui, sans-serif);
  }

  .bottom .view-more:hover {
    opacity: 0.95;
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    padding: 0;
    cursor: inherit;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 3px;
    width: 14px;
    height: 14px;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
    pointer-events: none;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(0, 0, 0, 0.1) -10px 10px 20px 0;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 120px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 95px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    transition-delay: 0.05s;
  }

  .logo .circle3 {
    width: 72px;
    transform: translate3d(0, 0, 60px);
    top: 16px;
    right: 16px;
    transition-delay: 0.1s;
  }

  .logo .circle4 {
    width: 50px;
    transform: translate3d(0, 0, 80px);
    top: 22px;
    right: 22px;
    transition-delay: 0.15s;
  }

  .logo .circle5 {
    width: 44px;
    transform: translate3d(0, 0, 100px);
    top: 26px;
    right: 26px;
    display: grid;
    place-content: center;
    transition-delay: 0.2s;
    box-shadow: rgba(0, 0, 0, 0.15) -6px 8px 16px 0, rgba(255, 255, 255, 0.4) 0 0 0 1px inset;
  }

  .logo .circle5 .icon-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    transform: translateZ(20px);
    transition: transform 0.5s ease-in-out 0.4s;
  }

  .logo .circle5 .icon-inner svg {
    width: 22px;
    height: 22px;
    display: block;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.1) 0 25px 30px 0;
  }

  .parent:hover .card .bottom .view-more {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(5, 71, 17, 0.2) -5px 20px 10px 0;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
    box-shadow: rgba(0, 0, 0, 0.25) -10px 14px 28px 0, rgba(255, 255, 255, 0.6) 0 0 0 1px inset;
  }

  .parent:hover .card .logo .circle5 .icon-inner {
    transform: translateZ(35px);
  }

  @media (max-width: 639px) {
    .logo .circle1 { width: 100px; }
    .logo .circle2 { width: 78px; }
    .logo .circle3 { width: 58px; }
    .logo .circle4 { width: 40px; }
    .logo .circle5 { width: 34px; top: 24px; right: 24px; }
    .logo .circle5 .icon-inner svg { width: 18px; height: 18px; }
    .content { padding: 72px 16px 44px 16px; }
    .content .title { font-size: 0.875rem; }
    .content .text { font-size: 0.9375rem; }
  }
`;

export function ContactCard({ icon, title, children, actionHref, actionLabel }: ContactCardProps) {
  return (
    <StyledWrapper>
      <div className="parent">
        <div className="card">
          <div className="logo" aria-hidden>
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
              <span className="icon-inner">{icon}</span>
            </span>
          </div>
          <div className="glass" aria-hidden />
          <div className="content">
            <span className="title">{title}</span>
            <div className="text">{children}</div>
          </div>
          {actionHref && actionLabel && (
            <div className="bottom">
              <a href={actionHref} className="view-more" rel="noopener noreferrer">
                <span className="view-more-button">{actionLabel}</span>
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}
