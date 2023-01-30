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
