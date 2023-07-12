import { useEffect, useRef } from "react";
import { Group as PaperGroup } from "paper";

export const useGroup = () => {
  const paperGroup = useRef(new PaperGroup());

  useEffect(() => {
    return () => {
      paperGroup.current.remove();
    };
  }, []);

  return paperGroup.current;
};
