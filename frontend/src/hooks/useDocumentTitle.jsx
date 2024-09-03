import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      console.log("Title not found");
    }
  }, [title]);
}
