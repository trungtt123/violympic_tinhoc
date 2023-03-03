import React, { useState, useEffect, useRef } from 'react';
function ContentNews(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    return (
        <>
            <h2 className="ml-4">
                This's news.
            </h2>
        </>
    );
}
export default ContentNews;