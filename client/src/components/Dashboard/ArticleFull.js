import React, { useState } from "react";
import axios from "axios";
import "./ArticlePreview.css";
import { showToastWarn } from "../../utils/toast";

function getPostId() {
    return window.location.href.split("/").pop();
}

async function getContentById(postId) {
    const JWT = window.localStorage.getItem("JWT");

    const res = await axios({
        method: "POST",
        data: { postId: postId },
        headers: { bearer: JWT },
        url: "/content/getContentById",
    });
    return res.data;
}

async function postWasLiked(postId, content, setContent) {
    const JWT = window.localStorage.getItem("JWT");
    const userId = window.localStorage.getItem("userId");

    console.log("\n post was liked", postId);
    const res = await axios({
        method: "POST",
        data: { postId: postId , userId: userId},
        headers: { bearer: JWT },
        url: "/content/postLiked",
    });
    console.log(res.data);

    if(res.data.success) {
        let newContent = {...content};
        newContent.likes++;

        setContent(newContent);
    }
    else {
        showToastWarn(res.data.error);
    }
}

export default function ArticleFull(props) {
    const [postId, setPostId] = useState(null);
    const [content, setContent] = useState(null);

    if (postId === null) setPostId(getPostId); // last parm of the url is the postId

    if (content === null && postId) {
        (async () => {
            console.log("updating curr Content ");
            const data = await getContentById(postId);
            // console.log(data);
            setContent(data);
        })();
    }

    return (
        <>
            {content === null ? (
                <p>loading</p>
            ) : (
                <div>
                    <h1 className="content-title">{content.title}</h1>

                    <br></br>

                    <p className="content-story">{content.storyContent}</p>

                    <br></br>
                    <br></br>

                    <p>Current Likes {content.likes}</p>
                    <button onClick={() => postWasLiked(content._id, content, setContent)}>Like</button>
                </div>
            )}
        </>
    );
}
