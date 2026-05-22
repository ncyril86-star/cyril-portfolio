import { useEffect, type RefObject } from "react";

const CARD_SELECTOR = "[data-carousel-card]";

function applyCardTransform(
  card: HTMLElement,
  offset: number,
  gentle: boolean,
) {
  const clamped = Math.max(-1, Math.min(1, offset));
  const abs = Math.abs(clamped);
  const maxRotate = gentle ? 10 : 18;
  const rotateY = clamped * -maxRotate;
  const scale = 1 - abs * (gentle ? 0.04 : 0.06);
  const translateZ = (1 - abs) * (gentle ? 20 : 36);

  card.style.transform = `rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
  card.style.zIndex = String(Math.round((1 - abs) * 100));
  card.dataset.carouselActive = abs < 0.25 ? "true" : "false";
}

function applyCarousel3D(container: HTMLElement) {
  const cards = container.querySelectorAll<HTMLElement>(CARD_SELECTOR);
  if (!cards.length) return;

  const fitsAll = container.scrollWidth <= container.clientWidth + 4;
  container.classList.toggle("carousel-fits-all", fitsAll);

  if (fitsAll && cards.length > 1) {
    const centerIndex = (cards.length - 1) / 2;
    cards.forEach((card, index) => {
      const offset =
        centerIndex === 0 ? 0 : (index - centerIndex) / centerIndex;
      applyCardTransform(card, offset, true);
    });
    return;
  }

  const bounds = container.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const halfWidth = Math.max(bounds.width / 2, 1);

  cards.forEach((card) => {
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    const offset = (cardCenter - centerX) / halfWidth;
    applyCardTransform(card, offset, false);
  });
}

export function useCarousel3D(
  scrollRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !enabled) return;

    let frame = 0;
    let resizeTimer = 0;

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyCarousel3D(container));
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(schedule, 150);
    };

    schedule();
    container.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      container.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      container.classList.remove("carousel-fits-all");
      container.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        delete card.dataset.carouselActive;
      });
    };
  }, [scrollRef, enabled]);
}
