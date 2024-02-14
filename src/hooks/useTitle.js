import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Learnera`;
  }, [title]);
};

export default useTitle;
