import {useState} from "react";

export function useDetectTrackpad() {
    const [isTrackPad, setIsTrackPad] = useState();

    let eventCount = 0;
    let eventCountStart;

    if (eventCount === 0) {
        eventCountStart = performance.now();
    }

    eventCount++;

    if (performance.now() - eventCountStart > 66) {
        if (eventCount > 5) {
            setIsTrackPad(true);
        } else {
            setIsTrackPad(false);
        }
    }
    return [isTrackPad, setIsTrackPad]
}
