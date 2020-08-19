import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props);
        console.log(this.props.dish)
    }

    renderDish(dish){
        if (dish != null){
            return(
                <Card>
                    <CardImg width='100%' top src={dish.image} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(<div></div>);
        }
    }

    renderComments(dish){
        if (dish != null){
            const comment = dish.comments.map((comm) => {
                return(
                    <div key={comm.id}>
                        <p>{comm.comment}<br />--{comm.author},  </p>
                        {/* <p> {new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'short', date:'2-digit'}).format(new Date(Date.parse(comm.date)))}</p> */}
                    </div>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <div>{comment}</div>
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        );
    }
}


export default Dishdetail;