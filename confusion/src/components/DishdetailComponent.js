import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderComments(comments){
    const comment = comments.map((comm) => {
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

function RenderDish(dish) {
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

const Dishdetail = (props) =>
{
    return(
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    {RenderDish(props.dish)}
                </div>
                <div className='col-12 col-md-5 m-1'>
                    {RenderComments(props.comments)}
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;