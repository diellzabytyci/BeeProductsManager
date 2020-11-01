import Card from "components/Card/Card";
import React, { Component } from "react";

export class CardPost extends Component {

    render() {
        return (
            <div className="card-post">
                <div className="card-post-image">
                    <img src="" alt="card-post-title" />
                    {/* this should be hidden and only shown on hover */}
                    <div className="card-post-details">
                        hidden section t
                    </div>
                </div>
                <div className="card-post-title">
                    Some title
                </div>
            </div>
        );
    }

}

export default CardPost;