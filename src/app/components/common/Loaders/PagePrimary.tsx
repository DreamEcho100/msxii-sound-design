const PagePrimaryLoader = () => {
  return (
    <>
      <span className="loader"></span>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 4px solid;
          background: rgba(255, 255, 255, 0.2);
          border-color: transparent #fff #fff transparent;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          bx-sizing: border-bx;
          animation: rotation 1s ease-in-out infinite;
        }
        .loader::after {
          content: "";
          bx-sizing: border-bx;
          position: absolute;
          left: 50%;
          top: 50%;
          border: 12px solid;
          border-color: transparent #ff3d00 #ff3d00 transparent;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default PagePrimaryLoader;
