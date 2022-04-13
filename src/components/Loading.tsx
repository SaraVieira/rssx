export const LoadingFire = () => {
  return (
    <div className="fire">
      <div className="flames">
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
      </div>
      <div className="logs"></div>
      <style jsx>{`
        .fire {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -25%);
          height: 20vw;
          width: 20vw;
        }
        .fire .flames {
          position: absolute;
          bottom: 40%;
          left: 50%;
          width: 60%;
          height: 60%;
          transform: translateX(-50%) rotate(45deg);
        }
        .fire .flames .flame {
          position: absolute;
          right: 0%;
          bottom: 0%;
          width: 0%;
          height: 0%;
          background-color: #ffdc01;
          border-radius: 1vw;
        }
        .fire .flames .flame:nth-child(2n + 1) {
          animation: flameodd 1.5s ease-in infinite;
        }
        .fire .flames .flame:nth-child(2n) {
          animation: flameeven 1.5s ease-in infinite;
        }
        .fire .flames .flame:nth-child(1) {
          animation-delay: 0s;
        }
        .fire .flames .flame:nth-child(2) {
          animation-delay: 0.375s;
        }
        .fire .flames .flame:nth-child(3) {
          animation-delay: 0.75s;
        }
        .fire .flames .flame:nth-child(4) {
          animation-delay: 1.125s;
        }
        .fire .logs {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 15%;
        }
        .fire .logs:before,
        .fire .logs:after {
          position: absolute;
          content: '';
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(20deg);
          height: 100%;
          width: 100%;
          border-radius: 1vw;
          background-color: #70392f;
        }
        .fire .logs:before {
          transform: translate(-50%, -50%) rotate(-20deg);
          background-color: #612e25;
        }

        @keyframes flameodd {
          0%,
          100% {
            width: 0%;
            height: 0%;
          }
          25% {
            width: 100%;
            height: 100%;
          }
          0% {
            background-color: #ffdc01;
            z-index: 1000000;
          }
          40% {
            background-color: #fdac01;
            z-index: 1000000;
          }
          100% {
            background-color: #f73b01;
            z-index: -10;
          }
          0% {
            right: 0%;
            bottom: 0%;
          }
          25% {
            right: 1%;
            bottom: 2%;
          }
          100% {
            right: 150%;
            bottom: 170%;
          }
        }

        @keyframes flameeven {
          0%,
          100% {
            width: 0%;
            height: 0%;
          }
          25% {
            width: 100%;
            height: 100%;
          }
          0% {
            background-color: #ffdc01;
            z-index: 1000000;
          }
          40% {
            background-color: #fdac01;
            z-index: 1000000;
          }
          100% {
            background-color: #f73b01;
            z-index: -10;
          }
          0% {
            right: 0%;
            bottom: 0%;
          }
          25% {
            right: 2%;
            bottom: 1%;
          }
          100% {
            right: 170%;
            bottom: 150%;
          }
        }
      `}</style>
    </div>
  );
};
