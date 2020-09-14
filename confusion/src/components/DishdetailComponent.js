import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Row, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import { addComment } from '../redux/ActionCreators';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        /* console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values)); */
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    
    render(){
        return(
            <div className='container'>
                <Button outline onClick={this.toggleModal}><span className='fa fa-pencil fa-lg' />Submit commment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                            <Row className='form-group' md={2}>
                                <Label>Rating</Label>
                            </Row>
                            <Row className='form-group' md={10}>
                                <Control.select model='.rating' name="rating" id="rating" className='form-control'>
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Control.select>
                            </Row>
                            <Row className='form-group' md={10}>
                                <Control.text model='.name' name='name' id='name' className='form-control' placeholder='Name' 
                                validators={{minLength: minLength(3), maxLength: maxLength(15)}}/>
                                <Errors className='text-danger'
                                    model='.name'
                                    show='touched'
                                    messages={{
                                        minLength: 'Minimum of 3 letters required',
                                        maxLength: 'Maximum of 15 letters only'}}
                                />
                            </Row>
                            <Row className='form-control' md={2}>
                                <Label>Comments</Label>
                            </Row>
                            <Row className='form-group' md={10}>                                
                                <Control.textarea model='.comment' name='comment' id='comment' className='form-control' />
                            </Row>
                            <Row className='form-group' md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Submit Comment
                                </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments(comments, addComment, dishId){
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
            <CommentForm dishId={dishId} addComment={addComment}/>
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
                    {RenderComments(props.comments, props.addComment, props.dish.id)}
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;