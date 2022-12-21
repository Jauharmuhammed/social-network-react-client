import {useGetAllTagsQuery} from "app/api/postApiSlice";
import React, {useEffect, useRef, useState} from "react";

const TagInput = ({tags, setTags, ref}) => {
    const [input, setInput] = useState("");
    const [availableTags, setAvailableTags] = useState([]);

    const tag = useRef()

    const {data: tagsList} = useGetAllTagsQuery();

    function addTag(tagToAdd) {
        if (tagToAdd !== "") {
            setTags([...tags, tagToAdd]);
            setInput("");
        }
    }

    function removeTag(tagToRemove) {
        setTags((tags) => {
            const newState = [...tags.filter((tag) => tag !== tagToRemove)];
            return newState;
        });
    }

    function handleInput(e) {
        if (e.key === "Enter") {
            addTag(input);
        }
        if (e.key === ",") {
            addTag(input.substring(0, input.length - 1));
        }
    }

    function handleRemove(e) {
        if (e.key === "Backspace" && input === "") {
            removeTag(tags[tags.length - 1]);
        }
    }

    useEffect(() => {
        console.log(tagsList);
    }, [tagsList]);

    useEffect(() => {
        tag.current.focus()
    }, []);

    const renderedTags = tags.map((tag) => (
        <li key={tag} className="flex items-center gap-2 px-3 py-1 bg-slate-500 bg-opacity-50 rounded-3xl">
            <span className="whitespace-nowrap">{tag}</span>
            <span className="cursor-pointer" onClick={() => removeTag(tag)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"
                    />
                </svg>
            </span>
        </li>
    ));

    useEffect(() => {
        const filteredTags = tagsList?.filter((tag) => tag.name.toLowerCase().includes(input.toLowerCase()));
        setAvailableTags(filteredTags);
    }, [tagsList, input]);

    function checkExists(inputValue) {
        const x = document.getElementById("availableTags");
        let i;
        let flag = false;
        for (i = 0; i < x.options.length; i++) {
            if (inputValue === x.options[i].value) {
                flag = true;
            }
        }
        return flag;
    }

    function handleSelect(e) {
        if (checkExists(e.target.value) === true) {
            addTag(e.target.value);
            e.target.value = "";
        }
    }

    const options = availableTags?.map((tag) => (
        <option onClick={handleSelect} name="tag" className="lowercase w-full" key={tag.name} value={tag.name}>
            {tag.name}
        </option>
    ));

    return (
        <div className="w-full border-b border-gray-400 py-2 flex flex-wrap gap-1.5">
            {tags.length !== 0 && <ul className=" list-none flex flex-wrap gap-1.5">{renderedTags}</ul>}
            <input
                className="tagInput min-w-[200px] w-72 border-none bg-transparent text-white outline-none"
                type="text"
                value={input}
                onInput={handleSelect}
                list="availableTags"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Press Enter or comma to add tag"
                onKeyUp={handleInput}
                onKeyDown={handleRemove}
                ref={tag}
            />
            <datalist id="availableTags" className="w-full">
                {input && options}
            </datalist>
        </div>
    );
};

export default TagInput;
