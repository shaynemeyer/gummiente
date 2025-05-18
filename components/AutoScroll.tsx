"use client";

import useIsAtBottom from "@/hooks/useIsAtBottom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function AutoScroll({ trackVisibility = false }) {
  const isAtBottom = useIsAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -150px 0px",
  });

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [inView, entry, isAtBottom, trackVisibility]);

  return <div ref={ref} className="h-px w-full" />;
}
export default AutoScroll;
