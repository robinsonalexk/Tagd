import { useEffect, useState } from "react";
import { getTags } from "../../api/items";

export default function TagSelector({onActiveModified, allowFreeform = false}){
    
    const [freeformValue, setFreeformValue] = useState("");
    const [toggleSuggest, setToggleSuggest] = useState(false);
    const [activeTags, setActiveTags] = useState([]);
    const [data, setData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    
    
    function handleSuggestInput(e){
        if(e.target.value){
            if(!toggleSuggest) setToggleSuggest(true);

            setSuggestions(data.filter(x => x.includes(e.target.value)));
            setFreeformValue(e.target.value);
        }
        else{
            setFreeformValue("");
            setToggleSuggest(false);
        }        
    }

    function handleFreeform(e){
        if(e.key === "Enter" && allowFreeform){
            e.preventDefault();
            setActiveTags([...activeTags, freeformValue]);
            setFreeformValue("");
        }
    }

    function selectTag(value){
        if(!activeTags.includes(value)) setActiveTags([...activeTags, value]);
    }

    function removeTag(value){
        let current = [...activeTags];
        let index = current.indexOf(value);
        current.splice(index, 1);
        setActiveTags([...current]);
    }

    useEffect(() => {
        onActiveModified(activeTags);
        setSuggestions([]);
        setToggleSuggest(false);
        setFreeformValue("");
    }, [activeTags])

    useEffect(() => {
        getTags().then((res) => {
            setData(res.data.map(x => x._id));
        })
    }, []);

    return(
        <div>
            <div className={'search'}>
                <p className={'left-align label'}>Tags:</p>
                <input type="text" autoComplete="off" name="autosuggestInput" className={'text-input'} value={freeformValue} onChange={(e) => handleSuggestInput(e)} onKeyDown={(e) => handleFreeform(e)}/>
                {toggleSuggest &&
                    <ul className={"autosuggest"}>
                        {suggestions.map((item) => {
                            return(<li key={item} className={'suggest-item'}onClick={() => selectTag(item)}>{item}</li>)
                        })}
                        {suggestions.length === 0 && <li>No Results Found</li>}
                    </ul>
                }
            </div>
            <div className={'tags'}>
                <div className={'active-tags'}>
                    {activeTags.map(tag => {
                        return (
                            <span key={tag} className={'tag'}>
                                <span className={'tag-name'}>
                                    {tag}
                                </span>
                                <span className={'tag-remove'} onClick={() => removeTag(tag)}>X</span>
                            </span>
                        ) 
                    })}
                </div>
            </div>

        </div>
    )
}