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
        <IoIosArrowRoundUp onClick={() => this.vote("up")} disabled={this.state.votes === 1} />
        <br />
        {this.props.votes + this.state.votes}
        <br />
        <IoIosArrowRoundDown onClick={() => this.vote("down")} disabled={this.state.votes === -1} />
      </>
    );
  }

  vote = direction => {
    api.makeVote(this.props.id, direction, this.props.section).then(res => {
      console.log("voted ");
    });

    this.setState({
      votes: direction === "up" ? this.state.votes + 1 : this.state.votes - 1
    });
  };
}

export default Vote;
