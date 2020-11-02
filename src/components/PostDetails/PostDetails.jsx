import React, { Component } from "react";

export class PostDetails extends Component {
    render() {
        return (
            <div className="card card-user">
                <img src={this.props.PostImage} alt="..." />


                <h4 className="title">
                    {this.props.PostTitle}

                </h4>


            </div>

        );
    }
}

export default PostDetails;