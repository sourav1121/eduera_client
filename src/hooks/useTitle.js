import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Eduera`;
  }, [title]);
};

export default useTitle;
