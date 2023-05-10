import React, { useState } from 'react'
import { createEditor } from 'slate';

import { Slate, Editable, withReact } from 'slate-react'
import TagSelector from '../TagSelector/TagSelector';
import { addPost } from '../../api/items';

const initialVal = [{type: 'paragraph', children: [{ text: ''}]}];

export default function AddPostMenu({onClose}){
    const [editor] = useState(() => withReact(createEditor()));
    const [title, setTitle] = useState();
    const [postContent, setPostContent] = useState();
    const [tags, setTags] = useState([]);

    function handleSubmit(){
        addPost(title, tags, postContent).then(() => {
            onClose();
        });
    }

    return(
        <div className={'add-post-menu'}>
            <div className={'header'} >Add New Post<span className={'right-align exit-button'} onClick={onClose}>X</span></div>
            <div className={'body'}>
                <div className={'new-post-section'}>
                    <p className={'left-align label'}>Title</p>
                    <input type="text" className={'text-input'} onChange={(i) => setTitle(i.target.value)}/>
                </div>
                <div className={'new-post-section'}>          
                    <p className={'left-align label'}>Post</p>      
                    <div className={'tool-bar'} />
                    <Slate editor={editor} value={initialVal} onChange={setPostContent}>
                        <Editable className={'rte-entry'} />
                    </Slate>
                </div>
                <div className={'new-post-section'}>
                    <TagSelector onActiveModified={(i) => setTags([...i])} allowFreeform />
                </div>
                <div className={'bottom-align'}>
                    <button type="button" className={'square-button bottom'} onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>
    )
}