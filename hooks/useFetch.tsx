import React, { useState } from "react";
import { toast } from "sonner";
function useFetch(cb) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<any>(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);
      setData(res);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
