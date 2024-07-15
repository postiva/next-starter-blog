"use client";

import { postivaClient } from "@/lib/postiva";
import { Content } from "@postiva/client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { PiHandsClapping } from "react-icons/pi";
import { useDebounceValue } from "usehooks-ts";

export default function Claps({ id, analytics }: Content) {
  const [claps, setClaps] = useState(analytics?.claps || 0);
  const [cacheCount, setCacheCount] = useState(0);
  const [debouncedCacheCount] = useDebounceValue(cacheCount, 1000);

  useEffect(() => {
    if (debouncedCacheCount > 0) {
      const saveClaps = async () => {
        try {
          await postivaClient.contents.clap(id, { count: debouncedCacheCount });
          setCacheCount(0);
        } catch (error) {
          console.error("Failed to save claps:", error);
        }
      };

      saveClaps();
    }
  }, [debouncedCacheCount]);

  const handleClap = useCallback(() => {
    setClaps((claps) => claps + 1);
    setCacheCount((cacheCount) => cacheCount + 1);
  }, []);

  return (
    <Fragment>
      <div className="block h-3 border-e border-gray-300 mx-3"></div>
      <div className="hs-tooltip inline-block select-none">
        <button
          onClick={handleClap}
          type="button"
          className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <PiHandsClapping className="flex-shrink-0 size-4" />
          {claps} claps
        </button>
      </div>
    </Fragment>
  );
}
