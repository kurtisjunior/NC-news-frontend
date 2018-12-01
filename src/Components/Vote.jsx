import React, { Component } from "react";
import * as api from "../api.js";

import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";

class Vote extends Component {
  state = {
    votes: 0
  };
  render() {
    return (
      <>
        <IoIosArrowRoundUp onClick={() => this.decision("up")} />
        <br />
        {this.props.votes + this.state.votes}
        <br />
        <IoIosArrowRoundDown onClick={() => this.decision("down")} />
      </>
    );
  }

  decision = direction => {
    if (direction === "up" && this.state.votes === 0) this.vote("up");
    else if (direction === "up" && this.state.votes === 1) return null;
    else if (direction === "down" && this.state.votes === 0) this.vote("down");
    else if (direction === "down" && this.state.votes === -1) return null;
    else if (direction === "up" && this.state.votes === -1) this.vote("up");
    else if (direction === "down" && this.state.votes === 1) this.vote("down");
  };

  vote = direction => {
    this.setState({
      votes: direction === "up" ? this.state.votes + 1 : this.state.votes - 1
    });

    api.makeVote(this.props.id, direction, this.props.section).then(res => {
      console.log("voted ");
    });
  };
}

export default Vote;
