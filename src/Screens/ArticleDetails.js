import React from 'react'
import { useParams } from "react-router-dom";

function ArticleDetails() {
    let { id } = useParams();
    return (
        <div>
            {id}
        </div>
    )
}

export default ArticleDetails
