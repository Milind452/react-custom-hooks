import "../prism.css";
import "./hookStyles.css";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export default function UseMap() {
    const hookCode = `
import { useState, useCallback } from "react";

function useMap(initialValue) {
    const [map, setMap] = useState(new Map(initialValue));

    const set = useCallback((key, value) => {
        setMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(key, value);
            return newMap;
        });
    }, []);

    const del = useCallback((key) => {
        setMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(key);
            return newMap;
        });
    }, []);

    const clear = useCallback(() => {
        setMap(new Map());
    }, []);

    return { map, set, delete: del, clear };
}

export default useMap;    
    `.trim();

    const hookSampleCode = `
const {map, set, delete: del, clear} = useMap([
    ['test', 123],
    [456, 'hello world'],
]);

console.log(map.get('test')); // 123
console.log(map.get(456)); // 'hello world'

set(789, true);

// After rerender:
console.log(map.get('test')); // 123
console.log(map.get(456)); // 'hello world'
console.log(map.get(789)); // true

del(456);

// After rerender:
console.log(map.get('test')); // 123
console.log(map.get(456)); // undefined
console.log(map.get(789)); // true

clear();

// After rerender:
console.log(map.get('test')); // undefined
console.log(map.get(456)); // undefined
console.log(map.get(789)); // undefined
    `.trim();

    return (
        <article>
            <h2>useMap()</h2>
            <p>
                The <pre>useMap</pre> custom hook works as a wrapper around the
                native JavaScript{" "}
                <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
                    target="_blank"
                >
                    Map
                </a>{" "}
                object. The function takes in a single optional{" "}
                <pre>initialValue</pre> parameter, which is passed directly to
                the <pre>Map</pre> constructor during initial render.
            </p>
            <p>
                The <pre>useMap</pre> function creates a Map on mount and
                returns an object with the following properties:
            </p>
            <ul>
                <li>
                    <pre>map</pre>: The underlying Map object
                </li>
                <li>
                    <pre>set(key, value)</pre>: A function to add new key-value
                    pair to the Map or to override the value of an existing key.
                </li>
                <li>
                    <pre>delete(key)</pre>: A function to delete a key from the
                    Map if it exists.
                </li>
                <li>
                    <pre>clear()</pre>: A function to clear out all entries from
                    the map.
                </li>
            </ul>
            <p>
                All three of the returned functions (set, delete, and clear) are
                static, meaning that the same function is be returned on every
                render for a giver usage of <pre>useMap</pre> in a component
                instance. However, the map itself is not static. Calling any of
                these functions causes the component instance to rerender.
            </p>
            <p>
                Code for <pre>useMap</pre>:
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
