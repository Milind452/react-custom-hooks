import { useState, useEffect } from "react";

function useFetch(url) {
    const [responseJSON, setResponseJSON] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let shouldCancel = false;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const responseJson = await response.json();
                if (shouldCancel) return;
                setResponseJSON(responseJson);
                setError(null);
            } catch (error) {
                if (shouldCancel) return;
                setResponseJSON(null);
                setError(error);
            }

            setIsLoading(false);
        };

        fetchData();

        return () => (shouldCancel = true);
    }, [url]);

    return { responseJSON, isLoading, error };
}

export default useFetch;
