import { useState } from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
const initialVal = [{type: 'paragraph', children: [{ text: ''}]}];

export default function RichTextEntry({onChange = undefined}){
    const [editor] = useState(() => withReact(createEditor()));
    
    return(
    <>
        <div className={'tool-bar'} />
        <Slate editor={editor} value={initialVal} onChange={onChange}>
            <Editable className={'rte-entry'} />
        </Slate>
    </>
    );
}