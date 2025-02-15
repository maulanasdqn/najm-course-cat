import { useFullscreen } from "@/app/(student)/_components/providers/fullscreen";

export const useExam = (props?: {
  onFinish?: (() => Promise<void>) | (() => void);
  onExitFullscreen?: (() => Promise<void>) | (() => void);
}) => {
  const { isFullscreen, setIsFullscreen } = useFullscreen();
  const startExam = () => {
    // enable full screen
    setIsFullscreen?.(true);
    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);
      document.addEventListener("webkitfullscreenchange", exitHandler, false);
    }

    document.documentElement.requestFullscreen();
  };

  const finishExam = async () => {
    setIsFullscreen?.(false);
    if (document.removeEventListener) {
      document.removeEventListener("fullscreenchange", exitHandler, false);
      document.removeEventListener("mozfullscreenchange", exitHandler, false);
      document.removeEventListener("MSFullscreenChange", exitHandler, false);
      document.removeEventListener("webkitfullscreenchange", exitHandler, false);
    }

    await props?.onFinish?.();

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
  };

  const exitFullscreen = async () => {
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
      exitFullscreen();
    } else {
      console.log("enter", event);
    }
  };
  return {
    startExam,
    finishExam,
    isFullscreen,
  };
};
