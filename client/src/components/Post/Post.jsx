import { useState } from "react";
import RichTextEntry from "../RichTextEntry/RichTextEntry";
import Timestamp from "../Timestamp/Timestamp";
import { addComments } from "../../api/items"
import { CollapseIcon, ExpandIcon } from "../../common/icons";


export default function Post({item, onSignalRefresh}) {
    const [postExpanded, setPostExpanded] = useState(false);
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [addCommentExpanded, setAddCommentExpanded] = useState(false);
    const [commentContent, setCommentContent] = useState();

    function handleAddComment(){
        
        
       addComments(item._id, commentContent).then(() => {
            onSignalRefresh();
            setAddCommentExpanded(false);          
        });
    }

    return (
        <div className={'post'}>
            <div className={'post-info'}>
                <button type="button" className={'expand-icon'} onClick={() =>setPostExpanded(!postExpanded)}>
                    {postExpanded ? <CollapseIcon /> : <ExpandIcon />}
                </button>
                <div className={'fit-to-size'}>
                    <span className={'post-title'}>{item.title}</span>
                    <span className={'post-stats'}>Post by {item.author} <Timestamp datetime={item.postTime} /></span>
                    <span className={'post-tags'}>
                        {item.tags.map(tag => {
                            return (
                                <span key={tag} className={'tag'}>
                                    {tag}
                                </span>
                            ) 
                        })}
                        
                    </span>
                    <span></span>
                </div>
            </div>
            {postExpanded &&
            <div> 
                <div className={'post-content'}>
                    <span className={'body'}>
                        {item.content.map((val, index) => 
                            <span key={"content"+index}>
                                {val.children[0].text}<br />
                            </span>)}
                    </span>
                </div>
                <div className={'post-add-comment'}>
                    {addCommentExpanded ? <><RichTextEntry onChange={setCommentContent}/><button type="button" className={"square-button top-bottom-spacer right-align"} onClick={() => handleAddComment()}>Add Comment</button></>
                                        : <button type="button" className={"square-button top-bottom-spacer right-align"}  onClick={() => setAddCommentExpanded(!addCommentExpanded)}>Add Comment</button>
                    }
                </div>
            </div>}
            {item.comments?.length > 0 &&
                <div className={'post-comments'}>
                    <span className={'post-comments-toggle'} onClick={() => setCommentsExpanded(!commentsExpanded)}>
                        {commentsExpanded ? "Hide Comments" : `${item.comments.length} Comment${item.comments.length > 1 ? "s" : ""}`}
                    </span>
                    {commentsExpanded && 
                    item.comments?.map(comment => {
                        return (
                            <span key={"c"+comment._cid} className={'comment-content'}>
                                {comment.content.map((content, index) => {
                                    return(<span key={"c"+comment._cid+index}>{content.children[0].text} <br /></span>)
                                })}
                            </span>
                        ) 
                    })}
                    
                </div> 
            }
        </div>
    );
}