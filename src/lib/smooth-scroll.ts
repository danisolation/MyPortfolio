type EasingFunction = (t: number) => number;

// Smooth easing - gentle start and end
const easeInOutQuad: EasingFunction = (t) => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

interface SmoothScrollOptions {
  duration?: number;
  easing?: EasingFunction;
}

export function smoothScrollTo(
  element: HTMLElement | null,
  targetPosition: number,
  options: SmoothScrollOptions = {}
): void {
  if (!element) return;

  const { duration = 1500, easing = easeInOutQuad } = options;
  const startPosition = element.scrollTop;
  const distance = targetPosition - startPosition;

  if (distance === 0) return;

  let startTime: number | null = null;
  const scrollElement = element;

  // Disable scroll snap for smooth animation
  const originalSnapType = scrollElement.style.scrollSnapType;
  scrollElement.style.scrollSnapType = "none";

  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easing(progress);

    scrollElement.scrollTop = startPosition + distance * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      // Re-enable scroll snap after complete
      setTimeout(() => {
        scrollElement.style.scrollSnapType = originalSnapType;
      }, 100);
    }
  }

  requestAnimationFrame(animation);
}

export function scrollToSection(sectionId: string, instant = true): void {
  const section = document.getElementById(sectionId);
  const mainElement = document.querySelector("main") as HTMLElement;

  if (section && mainElement) {
    if (instant) {
      mainElement.scrollTop = section.offsetTop;
    } else {
      smoothScrollTo(mainElement, section.offsetTop, { duration: 600 });
    }
  }
}
