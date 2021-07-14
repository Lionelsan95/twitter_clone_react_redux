import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {handleAddTweet} from "../actions/tweets";

class NewTweet extends Component{
    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {text} = this.state
        const {parentId} = this.props

        this.props.dispatch(handleAddTweet(text, parentId))

        this.setState(() => ({
            text: '',
            toHome: parentId !== null
        }))
    }

    render() {

        const {text, toHome} = this.state
        const tweetLeft = 280 - text.length

        if(toHome === true){
            return <Redirect to='/' />
        }

        return(
           <div>
               <h3 className='center'>Compose new Tweet</h3>
               <form className='new-tweet' onSubmit={this.handleSubmit}>
                   <textarea
                       placeholder="What's happening ?"
                       value={text}
                       onChange={this.handleChange}
                       className='textarea'
                       maxLength={280}
                   />
                   {tweetLeft <= 100 && (
                       <div className='tweet-length'>
                           {tweetLeft}
                       </div>
                   )}
                   <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}
                   >
                       Submit
                   </button>
               </form>
           </div>
        )
    }
}

function mapSateToPros({authedUser}, {parentId}){
    return {
        authedUser,
        parentId
    }
}

export default connect(mapSateToPros)(NewTweet)