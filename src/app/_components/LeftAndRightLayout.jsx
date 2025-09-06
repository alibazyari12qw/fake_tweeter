"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LeftNavigation from "../_featurs/mainLayout/LeftNavigation";
import RightNavigation from "../_featurs/mainLayout/RightNavigation";

export default function LeftAndRightLayout({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // مسیرهایی که نباید Layout داشته باشند
  const noLayoutPrefix = ["/auth"];
  const isNoLayout = noLayoutPrefix.some((prefix) =>
    pathname.startsWith(prefix)
  );

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setIsScrollable(height > 100);
    }
  }, [children]);

  if (isNoLayout) {
    return <main>{children}</main>;
  }

  return (
    <div className="grid sm:grid-cols-[1fr_5fr_1fr] md:grid-cols-[0.5fr_2fr_1.5fr] grid-cols-[70px_5fr] h-screen">
      <div>
        <LeftNavigation />
      </div>
      <main
        ref={contentRef}
        className={`h-full bg-white dark:bg-black ${
          isScrollable
            ? "overflow-y-scroll custom-scrollbar"
            : "overflow-hidden"
        }`}
      >
        {children}
      </main>
      <div>
        <RightNavigation />
      </div>
    </div>
  );
}
