import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseWindowSize() {
    const hookCode = `
import { useState, useEffect } from "react";

function useWindowSize() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        function resize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return { width, height };
}

export default useWindowSize;    
    `.trim();

    const hookSampleCode = `
const {width, height} = useWindowSize();
    `.trim();

    return (
        <article>
            <h2>useWindowSize()</h2>
            <p>
                The <pre>useWindowSize</pre> custom hook is used to track
                changes to the size of the browser window.
            </p>
            <p>
                The <pre>useWindowSize</pre> hook returns an object with two
                properties:
            </p>
            <ul>
                <li>
                    <strong>width:</strong> The current <pre>innerWidth</pre> of
                    the window as a number.
                </li>
                <li>
                    <strong>height:</strong> The current <pre>innerHeight</pre>{" "}
                    of the window as a number.
                </li>
            </ul>
            <p>
                If either of these values changes, the hook will cause the
                component tot re-render with the new values.
            </p>
            <p>
                In the event of a resize after an instance of a component using
                the <pre>useWindowSize</pre> hook is unmounted, any created
                event listeners will be removed.
            </p>
            <p>
                Code for <pre>useWindowSize</pre>:
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
