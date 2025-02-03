export const useExam = ({ onFinish }: { onFinish: (() => Promise<void>) | (() => void) }) => {
  const startExam = () => {
    // enable full screen
    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);
      document.addEventListener("webkitfullscreenchange", exitHandler, false);
    }

    document.documentElement.requestFullscreen();
  };

  const finishExam = async () => {
    if (document.removeEventListener) {
      document.removeEventListener("fullscreenchange", exitHandler, false);
      document.removeEventListener("mozfullscreenchange", exitHandler, false);
      document.removeEventListener("MSFullscreenChange", exitHandler, false);
      document.removeEventListener("webkitfullscreenchange", exitHandler, false);
    }

    await onFinish();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const documentAny: any = document;
    if (documentAny.exitFullscreen) {
      documentAny.exitFullscreen();
    } else if (documentAny.mozCancelFullScreen) {
      documentAny.mozCancelFullScreen();
    } else if (documentAny.webkitExitFullscreen) {
      documentAny.webkitExitFullscreen();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exitHandler = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const documentAny: any = document;
    if (
      !documentAny.webkitIsFullScreen &&
      !documentAny.mozFullScreen &&
      !documentAny.msFullscreenElement
    ) {
      console.log("exit", event);
      finishExam();
    } else {
      console.log("enter", event);
    }
  };
  return {
    startExam,
    finishExam,
  };
};
