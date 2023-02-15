import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseLocalStorage() {
    const hookCode = `
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) ?? initialValue
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;    
    `.trim();

    const hookSampleCode = `
function SaveValues() {
    const [value, setValue] = useLocalStorage('name', '');
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
    `.trim();

    return (
        <article>
            <h2>useLocalStorage()</h2>
            <p>
                The <pre>useLocalStorage</pre> custom hook takes in a required{" "}
                <pre>key</pre> as a string, and an optional{" "}
                <pre>initialValue</pre>.
            </p>
            <p>
                Calling <pre>useLocalStorage</pre> in a component saves the{" "}
                <pre>initialValue</pre> in localStorage at the given{" "}
                <pre>key</pre> when the component first mounts. If a value
                already exists at that key, the <pre>initialValue</pre>{" "}
                parameter will be ignored.
            </p>
            <p>
                The <pre>useLocalStorage</pre> function returns an array with
                the current value as the first element and a setter function as
                the second element. The setter function takes in a new value as
                a parameter and update localStorage at the original{" "}
                <pre>key</pre>.
            </p>
            <p>
                When the setter function is called, the component re-renders,
                just as it would when a standard piece of state is updated.
            </p>
            <p>
                Any value added to localStorage is first passed to{" "}
                <pre>JSON.stringify</pre>. When reading the value from
                localStorage, <pre>JSON.parse</pre> is used to parse the
                original value.
            </p>
            <p>
                For simplicity, the <pre>key</pre> parameter does not change
                between renders.
            </p>
            <p>
                Code for <pre>useLocalStorage</pre>:
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
