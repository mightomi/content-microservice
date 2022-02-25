import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import HeaderComp from "../HeaderComp/HeaderComp";

import ArticlePreview from "./ArticlePreview";

export default function Dashboard() {
    const [allContent, setAllContent] = useState(null);

    if (window.localStorage.getItem("userId") === null) {
        return <Navigate to="/login" />;
    }
    const JWT = window.localStorage.getItem("JWT");

    (async () => {
        if (allContent === null) {
            console.log("updating allContent ");
            const res = await axios({
                method: "GET",
                headers: { bearer: JWT },
                url: "/content/getTopContent",
            });
            console.log(res.data);
            setAllContent(res.data);
        }
    })();

    // const _allContent =

    return (
        <div>
            <HeaderComp />

            <div className="allContent">
                <h1 className="sectionTitle">Top Contents to Read</h1>
                <br></br>

                {/* {allContent.map(post => <ArticlePreview post={post} />)} */}

                {allContent === null ? (
                    <p>loading</p>
                ) : (
                    allContent.map(post => <ArticlePreview post={post} />)
                )}
            </div>
        </div>
    );
}
