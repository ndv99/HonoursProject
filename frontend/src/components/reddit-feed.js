import axios from 'axios';
import { useEffect, useState } from 'react'
import { Card } from 'reactstrap'
import LoadingSpinner from './loading-spinner.js';
import ReactMarkdown from 'react-markdown'

const RedditFeed = (props) => {

    const [comments, setCommments] = useState()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const before = props.before
    const after = props.after

    useEffect(() => {
        axios.get("/api/pushshift/",
        {headers: {
            "link-id": 'd1ajvd',
            'sort-by': 'created_utc',
            'before': before,
            'after': after
        }})
        .then((res) => {
            setCommments(res.data.data);
            // console.log(comments)
            setLoading(false)
        })
        .catch((err) => setError(err))
    }, [before, after])

    if (isLoading) {
        return(
            <LoadingSpinner />
        )
    } else if (error) {
        return (
            <div>{error}</div>
        )
    } else {
        return(
            <Card>
                <h2>Race Megathread</h2>
                {comments.map((comment, i) => (
                    <ReactMarkdown key={i}>{comment.body}</ReactMarkdown>
                ))}
            </Card>
        )
    }
}

export default RedditFeed;