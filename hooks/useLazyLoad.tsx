import { useEffect, useState, useRef } from "react";

export function useLazyLoad<T>(fetchItems: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
          setIsFetching(true);
          fetchItems().then((newItems) => {
            setItems((prev) => [...prev, ...newItems]);
            setIsFetching(false);
          });
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchItems, isFetching]);

  return { items, observerRef };
}