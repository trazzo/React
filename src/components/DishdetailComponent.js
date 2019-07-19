import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render() {
        const dish = this.props.dish;
            if (dish != null) {
                return(
                    <div className="container">
                        <div className="row">
                            {this.renderDish(dish)}
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                );
            }
            else {
                return(
                    <div></div>
                );
            }
    }

    renderDish(dish) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        const commentList = comments.map((comment) => {
            return (
                    <ul  key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                    </ul>
            );
        });

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {commentList}
            </div>
        );
    }
}

export default Dishdetail;
