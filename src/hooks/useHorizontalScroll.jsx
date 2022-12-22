import {useEffect, useRef} from "react";

export function useHorizontalScroll() {
    const elRef = useRef();
    console.log("hi");
    useEffect(() => {
        console.log("hi");
        const el = elRef.current;
        if (el) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                if (
                    !(el.scrollLeft === 0 && e.deltaY < 0) &&
                    !(el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 && e.deltaY > 0)
                ) {
                    e.preventDefault();
                }
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth",
                });
                console.log("hi");
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}
