"use client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Mount this once, inside <BrowserRouter>, above/alongside your routes.
// react-router-dom doesn't reset scroll position on navigation the way a
// full page load does — this restores that behavior for every route change.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}