import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseFetch() {
    const hookCode = `
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
    `.trim();

    const hookSampleCode = `
function Fetcher() {
    const {responseJSON, isLoading, error} = useFetch(url);
    const [url, setUrl] = useState('');
    return (
        <>
            <input value{url} onChange={(e) => setUrl(e.target.value)} />
            {
                error ? <p>Error: {error}</p> :
                isLoading ? <p>Loading...</p> :
                <p>Response: {responseJSON}</p>
            }
        </>
    );
}
    `.trim();

    return (
        <article>
            <h2>useFetch()</h2>
            <p>
                The <pre>useFetch</pre> custom hook takes in a required{" "}
                <pre>url</pre> as a string or URL object. This parameter is
                directly passed to the native JavaScript{" "}
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/fetch"
                    target="_blank"
                >
                    fetch
                </a>{" "}
                function.
            </p>
            <p>
                Calling <pre>useFetch</pre> in a component makes a fetch request
                when an instance of the component is mounted. Additionally, a
                new request is issued on any render where the <pre>url</pre> has
                changed
            </p>
            <p>
                The <pre>useFetch</pre> function returns an object with three
                keys:
            </p>
            <ul>
                <li>
                    <strong>responseJSON: </strong>The JSON response from the
                    most recent call to <pre>fetch</pre>. If no response has
                    been received yet or the most recent resulted in an error,
                    this will be null.
                </li>
                <li>
                    <strong>isLoading: </strong>When a fetch request is issued,
                    this will be set to <pre>true</pre>, and set to{" "}
                    <pre>false</pre> when the response comes back or an error is
                    thrown.
                </li>
                <li>
                    <strong>error: </strong>If the most recent call to{" "}
                    <pre>fetch</pre> threw an error or retrieving the JSON from
                    the most recent response threw an error, the error should be
                    saved in this value, otherwise it should be null.
                </li>
            </ul>
            <p>
                In the event that the <pre>url</pre> changes before the previous
                fetch request returns, the response from that previous request
                is not used in order to prevent a race condition.
            </p>
            <p>
                Code for <pre>useFetch</pre>:
            </p>
            <div className="code-wrapper">
                <Highlight
                    {...defaultProps}
                    code={hookCode}
                    theme={theme}
                    language="jsx"
                >
                    {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                    }) => (
                        <pre className="language-javascript" style={style}>
                            {tokens.map((line, i) => (
                                <div
                                    className="line"
                                    key={i}
                                    {...getLineProps({ line, key: i })}
                                >
                                    <div className="line-no">{i + 1}</div>
                                    <div className="line-content">
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
            <p>Sample Usage:</p>
            <div className="code-wrapper">
                <Highlight
                    {...defaultProps}
                    code={hookSampleCode}
                    theme={theme}
                    language="jsx"
                >
                    {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                    }) => (
                        <pre className="language-javascript" style={style}>
                            {tokens.map((line, i) => (
                                <div
                                    className="line"
                                    key={i}
                                    {...getLineProps({ line, key: i })}
                                >
                                    <div className="line-no">{i + 1}</div>
                                    <div className="line-content">
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        </article>
    );
}
