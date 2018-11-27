import React, { Component } from 'react';
import * as api from '../api'

/*  
Home page to hold articles in state
Display: Nav bar, Side bar, Annie
*/

class Home extends Component {
    state = [
        {
            _id: "5bd324bda2eb70f78abd4d9e",
            votes: 11,
            title: "Running a Node App",
            created_by: {
                _id: "5bd324bda2eb70f78abd4d9d",
                username: "jessjelly",
                name: "Jess Jelly",
                avatar_url: "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
                __v: 0
            },
            body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: "2016-08-18T12:07:52.389Z",
            belongs_to: "coding",
            __v: 0,
            comment_count: 10
        },
        {
            _id: "5bd324bda2eb70f78abd4d9f",
            votes: 3,
            title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
            created_by: {
                _id: "5bd324bda2eb70f78abd4d9d",
                username: "jessjelly",
                name: "Jess Jelly",
                avatar_url: "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
                __v: 0
            },
            body: "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
            created_at: "2017-07-20T20:57:53.256Z",
            belongs_to: "coding",
            __v: 0,
            comment_count: 6
        },
    ]
    render() {
        return (
            <div>
                <h1>articles</h1>
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles()
    }

    componentDidUpdate(prevProp) {
        if (prevProp.topic_slug !== this.props.topic_slug)
            this.fetchArticles()
    }


    fetchArticles = () => {
        api.getArticles(this.props.topic_slug)
            .then(articles => {
                console.log(articles, 'here')
            })


    }
}

export default Home;