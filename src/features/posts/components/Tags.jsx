import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tags = ({ tags }) => {
    const [mouseOverTags, setMouseOverTags] = useState(false);

    const [isTrackPad, setIsTrackPad] = useState();
    const [scrolling, setScrolling] = useState(false);

    const [leftArrow, setLeftArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(false);

    const navigate = useNavigate()

    const tag = useRef();

    // scroll using left and right arrows
    const scroll = (scrollOffset) => {
        tag.current.scrollLeft += scrollOffset;
    };

    function handleScroll() {
        // if started scrolling show left arrow
        if (tag.current.scrollLeft > 0) {
            setLeftArrow(true);
        } else {
            // if reached all the way to the left hide left arrow
            setLeftArrow(false);
        }

        if (tag.current.scrollLeft + tag.current.clientWidth + 1 >= tag.current.scrollWidth) {
            // if scrolled all the way to the right side
            setRightArrow(false);
        } else {
            setRightArrow(true);
        }
    }

    useEffect(() => {
        // coditionally render right arrow only if the tags exceeds the available space
        if (tag?.current?.scrollWidth > tag?.current?.clientWidth) {
            setRightArrow(true);
        }
        else setRightArrow(false)
    }, [tags]);

    // fucntion for horizontal scroll called  when scrolled on tags
    const onWheel = (e) => {
        const el = tag.current;
        if (e.deltaY === 0) return;
        el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: "smooth",
        });
    };

    // block the body from verticall scrolling (or any other element) if mouse is over tags
    useEffect(() => {
        const cancelWheel = (e) => mouseOverTags && e.preventDefault();
        document.body.addEventListener("wheel", cancelWheel, { passive: false });
        return () => document.body.removeEventListener("wheel", cancelWheel);
    }, [mouseOverTags]);

    // function to check if scrolling using mouse or trackpad to choose the scrolling behaviour
    // 1. if scrolling using mouse change the default vertical scrolling behaviour to horizontal
    // 2. else keep the default behaviour for trackpad scrolling
    function checkScroll(e) {
        const isTouchPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0;

        if (isTouchPad) {
            setIsTrackPad(true);
        } else {
            setIsTrackPad(false);
        }
    }

    // add event listener to document when scroll happens to check if it is trackpad or mouse
    useEffect(() => {
        document.addEventListener("mousewheel", checkScroll, false);
        document.addEventListener("DOMMouseScroll", checkScroll, false);
        return () => {
            document.removeEventListener("mousewheel", checkScroll);
            document.removeEventListener("DOMMouseScroll", checkScroll);
        };
    }, [scrolling]);

    // if scrolling using trackpad keep default scrolling behaviour
    // is mouseOverTags is true it will disable the verticall scrolling
    useEffect(() => {
        if (isTrackPad) {
            setMouseOverTags(false);
        }
    }, [isTrackPad, mouseOverTags]);

    return (
        <div onScroll={() => setScrolling(true)} id="tagsContainer" className="relative w-full">
            <ul
                ref={tag}
                onScroll={handleScroll}
                onMouseOver={() => setMouseOverTags(true)}
                onMouseLeave={() => setMouseOverTags(false)}
                onWheel={onWheel}
                className="postPreviewTags list-none flex gap-1.5 w-full overflow-x-auto transition-all duration-150">
                {tags?.map((tag) => (
                    <li
                    onClick={()=> navigate(`/tag/${tag}`)}
                        className="px-3 py-1  bg-white text-darkgray bg-opacity-90 whitespace-nowrap rounded-3xl cursor-pointer"
                        key={tag}>
                        {tag}
                    </li>
                ))}
            </ul>
            {leftArrow && (
                <div className="absolute left-0 top-0 bg-gradient-to-r from-darkgray to-transparent z-10 w-28 h-full flex justify-start items-center ">
                    <span
                        onClick={() => scroll(-200)}
                        className="text-white rotate-180 rounded-full hover:bg-slate-100 hover:bg-opacity-20 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                            />
                        </svg>
                    </span>
                </div>
            )}
            {rightArrow && (
                <div className="absolute right-0 top-0 bg-gradient-to-l from-darkgray to-transparent z-10 w-28 h-full flex justify-end items-center ">
                    <span
                        onClick={() => scroll(200)}
                        className="text-white rounded-full hover:bg-slate-100 hover:bg-opacity-20 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                            />
                        </svg>
                    </span>
                </div>
            )}
        </div>
    );
};

export default Tags;
