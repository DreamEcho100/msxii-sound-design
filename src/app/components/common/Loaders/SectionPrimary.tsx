const SectionPrimaryLoader = () => {
  return (
    <>
      <span className="loader"></span>
      <style jsx>{`
        .loader {
          transform: rotateZ(45deg);
          perspective: 1000px;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          color: rgb(var(--color-special-secondary-800));
        }
        .loader:before,
        .loader:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }
        .loader:after {
          color: rgb(var(--color-special-primary-800));
          transform: rotateY(70deg);
          animation-delay: 0.4s;
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotateZ(360deg);
          }
        }

        @keyframes rotateccw {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes spin {
          0%,
          100% {
            bx-shadow: 0.2em 0px 0 0px currentcolor;
          }
          12% {
            bx-shadow: 0.2em 0.2em 0 0 currentcolor;
          }
          25% {
            bx-shadow: 0 0.2em 0 0px currentcolor;
          }
          37% {
            bx-shadow: -0.2em 0.2em 0 0 currentcolor;
          }
          50% {
            bx-shadow: -0.2em 0 0 0 currentcolor;
          }
          62% {
            bx-shadow: -0.2em -0.2em 0 0 currentcolor;
          }
          75% {
            bx-shadow: 0px -0.2em 0 0 currentcolor;
          }
          87% {
            bx-shadow: 0.2em -0.2em 0 0 currentcolor;
          }
        }
      `}</style>
    </>
  );
};

export default SectionPrimaryLoader;
