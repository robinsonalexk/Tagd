import provider from "./provider";

async function getItems(params = undefined){
    return await provider.get('/items', params ? {params: {tags : params}}: undefined);
}

async function getTags(){ 
    return await provider.get('/items/tags');
}

async function addPost(title, tags, content){
    const req = {
        title: title,
        author: "Test User",
        tags: tags,
        content: content,
    }

    return await provider.post("items", req);
}

async function addComments(id, content){
    let req = {
        _id: id,
        comments: content
    }

    return await provider.put("/items", req);
}


export {getItems, getTags, addPost, addComments}


