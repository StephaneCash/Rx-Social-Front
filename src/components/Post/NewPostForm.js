import React, { useState } from 'react'

function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState(null);
    const [video, setVideo] = useState("");

    return (
        <div>NewPostForm</div>
    )
}

export default NewPostForm