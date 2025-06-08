import { useEffect, useState } from "react";

type FetchResult<T> = {
  isLoading: boolean;
  hasError: boolean;
  data: T | undefined;
};

export const useFetch = <T,>(
  url: string | undefined,
  accessToken?: string,
  successCallback?: (data: T) => void
): FetchResult<T> => {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!url || !accessToken) return;

    let isMounted = true;

    const fetchData = async () => {
      console.log('in fetch');
      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log('res', res);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const jsonData: T = await res.json();
        if (isMounted) {
          setData(jsonData);
          setLoading(false);
          successCallback?.(jsonData);
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, accessToken]);

  return { isLoading, hasError, data };
};
