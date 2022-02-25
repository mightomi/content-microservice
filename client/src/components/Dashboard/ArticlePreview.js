import React from "react";
import "./ArticlePreview.css";

import axios from "axios";


function clickedOnContent(postId) {
    console.log("clicked on div");
    window.location.href = `/content/${postId}`;
}


//
export default function ArticlePreview(props) {
    return (
        <div className="wrapper">
            <div
                className="content"
                onClick={() => clickedOnContent(props.post._id)}
            >

                <h1 className="text-center">{props.post.title}</h1>

                <div className="contentStory">{props.post.storyContent}</div>
                <br></br>

                {props.post.likes} Likes 
            </div>
        </div>
    );
}
