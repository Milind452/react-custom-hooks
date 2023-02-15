import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseInterval() {
    const hookCode = `
import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
    const callbackRef = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay == null) return;

        const intervalID = setInterval(() => {
            callbackRef.current();
        }, delay);

        return () => clearInterval(intervalID);
    }, [delay]);
}

export default useInterval;    
    `.trim();

    const hookSampleCode = `
const [func, setFunc] = useState(() => {
    return () => console.log('First');
});
const [delay, setDelay] = useState(2000);
useInterval(func, delay);

// After 2 seconds: First is logged

// After 1 more second:
setDelay(3000);

// After 3 more seconds, First is logged

// After 1 more second:
setFunc(() => {
    return () => console.log('Second');
});

//After 2 more seconds, Second is logged
    `.trim();

    return (
        <article>
            <h2>useInterval()</h2>
            <p>
                The <pre>useInterval</pre> custom hook takes in a required{" "}
                <pre>callback</pre> function, and an optional <pre>delay</pre>{" "}
                as a number in milliseconds.
            </p>
            <p>
                Calling <pre>useInterval</pre> with a <pre>callback</pre> and a{" "}
                <pre>delay</pre> creates an interval on mount, calling the
                callback function every <pre>delay</pre> milliseconds.
            </p>
            <p>
                If the component unmounts, the interval is cancelled. If the{" "}
                <pre>delay</pre> changes, the interval resets, not executing the
                function until the new delay completes.
            </p>
            <p>
                If the <pre>delay</pre> is ever set to <pre>null</pre> or{" "}
                <pre>undefined</pre>, the interval should be cancelled.
            </p>
            <p>
                If the <pre>callback</pre> function changes, the interval is
                updated to call the most recent version of the function.
                However, this does not reset the interval.
            </p>
            <p>
                Code for <pre>useInterval</pre>:
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
