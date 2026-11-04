"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "../lib/fpixel";

function MetaPixelTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // The initial script tag in <head> already calls PageView on first load.
    // We only trigger pageview on subsequent SPA route transitions.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    pageview();
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracking />
    </Suspense>
  );
}
