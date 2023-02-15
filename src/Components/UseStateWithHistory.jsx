import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseStateWithHistory() {
    const hookCode = `
import { useState, useRef } from "react";

function useStateWithHistory(initialState) {
    const [state, setInternalState] = useState(initialState);
    const history = useRef([state]);
    const historyIndex = useRef(0);

    function setState(state) {
        history.current.push(state);
        historyIndex.current = history.current.length - 1;
        setInternalState(state);
    }

    function goBack() {
        if (historyIndex.current === 0) return;
        historyIndex.current--;
        const newState = history.current[historyIndex.current];
        setInternalState(newState);
    }

    function goForward() {
        if (historyIndex.current >= history.current.length - 1) return;
        historyIndex.current++;
        const newState = history.current[historyIndex.current];
        setInternalState(newState);
    }

    return [state, setState, goBack, goForward, history.current];
}

export default useStateWithHistory;
    `.trim();

    const hookSampleCode = `
const [
    value, // 10
    setValue, // function
    goBack, // function
    goForward, // function
    history // [10]
] = useStateWithHistory(10);

setValue(15); // value=15, history=[10, 15]
setValue(20); // value=20, history=[10, 15, 20]
goBack(); // value=15, history=[10, 15, 20]
goBack(); // value=10, history=[10, 15, 20]
goBack(); // value=10, history=[10, 15, 20]
goForward(); // value=15, history=[10, 15, 20]
setValue(25); // value=25, history=[10, 15, 20, 25]
setValue(30); // value=30, history=[10, 15, 20, 25, 30]
goBack(); // value=25, history=[10, 15, 20, 25, 30]
goForward(); // value=30, history=[10, 15, 20, 25, 30]
goForward(); // value=30, history=[10, 15, 20, 25, 30]
    `.trim();

    return (
        <article>
            <h2>useStateWithHistory()</h2>
            <p>
                The <pre>useStateWithHistory</pre> custom hook takes in an{" "}
                <pre>initialState</pre> value.
            </p>
            <p>
                Calling <pre>useStateWithHistory</pre> works the same as{" "}
                <pre>useState</pre>, but with an added history with the ability
                to scroll through previous state values.
            </p>
            <p>
                The <pre>useStateWithHistory</pre> hook returns an array with
                five entries in this order:
            </p>
            <ol>
                <li>The current value</li>
                <li>
                    A setter function to update the value. This function takes
                    in the new value as a parameter, just like the setter
                    function returned by <pre>useState</pre>.
                </li>
                <li>
                    A function to "go back" to the previous state value. calling
                    this function updates the state to the previous value, and
                    it causes a re-render just as setting the state to a new
                    value would. If there is no previous state value, this
                    function has no effect.
                </li>
                <li>
                    A function to "go forward" to the next state value. Calling
                    this function updates the state to the next value in the
                    history, and it causes a re-render just as setting the state
                    to a new value would. If there is no next value in the
                    history, this function has no effect.
                </li>
                <li>
                    The history of values as an array, initially containing only
                    the initial value. Every time the setter function is called,
                    the new value is appended to the end of the history array.
                </li>
            </ol>
            <p>
                If the setter function is called after having gone backwards, to
                a previous value, the value is updated to the new value. The new
                value is appended to the end of the history array as if "go
                forwards" had been called until reaching the end of the history
                array before setting a new value (see sample usage below).
            </p>
            <p>
                For simplicity, it is assumed that the <pre>initialState</pre>{" "}
                value and the value passed to the setter function will always be
                primitives.
            </p>
            <p>
                Code for <pre>useStateWithHistory</pre>:
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
