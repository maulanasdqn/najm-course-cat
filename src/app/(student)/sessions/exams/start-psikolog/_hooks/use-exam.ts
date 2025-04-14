import { useFullscreen } from "@/app/(student)/_components/providers/fullscreen";

export const useExam = (props?: {
  onFinish?: (() => Promise<void>) | (() => void);
  onExitFullscreen?: (() => Promise<void>) | (() => void);
  onFallback?: (() => Promise<void>) | (() => void);
}) => {
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const startExam = async () => {
    try {
      // enable full screen
      setIsFullscreen?.(true);
      if (document.addEventListener) {
        document.addEventListener("fullscreenchange", exitHandler, false);
        document.addEventListener("mozfullscreenchange", exitHandler, false);
        document.addEventListener("MSFullscreenChange", exitHandler, false);
        document.addEventListener("webkitfullscreenchange", exitHandler, false);
      }

      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.error(error);
      props?.onFallback?.();
    }
  };

  const finishExam = async () => {
    try {
      setIsFullscreen?.(false);
      if (document.removeEventListener) {
        document.removeEventListener("fullscreenchange", exitHandler, false);
        document.removeEventListener("mozfullscreenchange", exitHandler, false);
        document.removeEventListener("MSFullscreenChange", exitHandler, false);
        document.removeEventListener("webkitfullscreenchange", exitHandler, false);
      }

      await props?.onFinish?.();

      // Check if document is in fullscreen mode before trying to exit
      if (
        document.fullscreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).mozFullScreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).webkitFullscreenElement ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if ((document as any).mozCancelFullScreen) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (document as any).mozCancelFullScreen();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if ((document as any).webkitExitFullscreen) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (error) {
      console.error(error);
      props?.onFallback?.();
    }
  };

  const exitFullscreen = async () => {
    try {
      setIsFullscreen?.(false);
      if (document.removeEventListener) {
        document.removeEventListener("fullscreenchange", exitHandler, false);
        document.removeEventListener("mozfullscreenchange", exitHandler, false);
        document.removeEventListener("MSFullscreenChange", exitHandler, false);
        document.removeEventListener("webkitfullscreenchange", exitHandler, false);
      }

      await props?.onExitFullscreen?.();

      if (document.exitFullscreen!) {
        document.exitFullscreen();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((document as any).mozCancelFullScreen) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).mozCancelFullScreen();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if ((document as any).webkitExitFullscreen) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).webkitExitFullscreen();
      }
    } catch (error) {
      console.error(error);
      props?.onFallback?.();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exitHandler = (event: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const documentAny: any = document;
      if (
        !documentAny.webkitIsFullScreen &&
        !documentAny.mozFullScreen &&
        !documentAny.msFullscreenElement
      ) {
        console.log("exit", event);
        exitFullscreen();
      } else {
        console.log("enter", event);
      }
    } catch (error) {
      console.error(error);
      props?.onFallback?.();
    }
  };
  return {
    startExam,
    finishExam,
    isFullscreen,
  };
};