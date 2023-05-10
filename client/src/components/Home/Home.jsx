import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import AddPostMenu from "../AddPostMenu/AddPostMenu";
import TagSelector from "../TagSelector/TagSelector";
import { getItems } from "../../api/items";


export default function Home(){
    const [feed, setFeed] = useState([]);
    const [toggleAddPostMenu, setToggleAddPostMenu] = useState(false);
    const [tags, setTags] = useState([]);

    function loadFeed() {
        getItems().then((res) => setFeed(res.data));
    }

    useEffect(() => {
        getItems(tags).then((res) => {
            setFeed(res.data);
        });
    }, [tags])

    useEffect(() => {
        loadFeed();
    }, [])
    
    return(
        <div className={'home'}>
            <div className={'post-feed'}>
                {feed.map(item => <Post key={`post${item._id}`} item={item} onSignalRefresh={loadFeed} />)}
            </div>
            <div className={'sidebar'}>
                <div className={'search-box'}>
                    <TagSelector onActiveModified={(i) => setTags([...i])}/>
                </div>
            </div>
            <span className={'add-post-button'}>
                <button type="button" className={'circle-button'} onClick={() => setToggleAddPostMenu(true)}>+</button>
            </span>
            {toggleAddPostMenu && <AddPostMenu onClose={() => {
                setToggleAddPostMenu(false);
                loadFeed();    
            }}/>}
        </div>
    )
}