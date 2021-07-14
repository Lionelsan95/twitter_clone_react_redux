import React, {Component} from "react";
import {connect} from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

class TweetPage extends Component{
    render(){
        console.log('props of tweet page', this.props)
        const {id, replies} = this.props
        return(
            <div>
                <Tweet id={id} />
                <NewTweet parentId={id} />
                {replies.length > 0 && <h3 className='center'>Replies</h3> }
                <ul>
                    {replies.map((tweetId)=> (
                        <li key={tweetId}>
                        <Tweet id={tweetId}/>
                        </li>
                    ))}
                </ul>

            </div>
        )
    }
}

function mapStateToProps({ authedUser, tweets, users}, props){

    const {id} = props.match.params

    return{
        id,
        replies: !tweets[id] ?
            []:
            tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)