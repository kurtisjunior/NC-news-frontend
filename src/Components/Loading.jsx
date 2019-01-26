import React from "react";
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 10%;
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={"orange"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loading;
