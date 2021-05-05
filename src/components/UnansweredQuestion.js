import React, {Component} from 'react'
import { Card, Form, Grid, Image, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux'
import {handleAddAnswer} from '../actions/questions'
import PageNotFound from './PageNotFound'
import {formatDate} from '../utils/helper'


class UnansweredQuestion extends Component{
    state = {
		errorMsg: ''
	}
    handleChange = (e, {value}) => this.setState({value})
    handleSubmit = (id, e) => {
		const answer = this.form.value;
        console.log(answer)
		const { dispatch } = this.props;

		e.preventDefault();

		if (answer !== '') {
			dispatch(handleAddAnswer(id, answer));
		} else {
			this.setState({ errorMsg: 'You must make a choice' });
		}
	}
    
    render(){
        const { question, author } = this.props;

		if (question === null) {
			return <PageNotFound />;
		}

		const { optionOne, optionTwo, timestamp, id } = question;
		const { name, avatarURL } = author;
		const { errorMsg} = this.state;
        return(
            <Grid centered>
                <Grid.Row centered>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                            <Card.Header>
                                    <Image src={avatarURL} className='mr-3' circular/>
                                    {name} asks:
                            </Card.Header>
                            <Card.Description>
                                <Form onSubmit={(e) => this.handleSubmit(id, e)}
                                    ref={(f) => (this.form = f)}
                                > 
                                        {errorMsg ? (
									        <p className="text-danger">{errorMsg}</p>
								            ) : null}
                                        <Form.Field>
                                            <Form.Radio label={optionOne.text}  name='answer' value='optionOne'
                                            checked={this.state.value === 'optionOne'} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Form.Radio label={optionTwo.text}  name='answer' value= 'optionTwo'
                                            checked={this.state.value === 'optionTwo'} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Button positive onSubmit={this.handleSubmit}>Submit</Button>   
                                </Form>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {formatDate(timestamp)}
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null
	};
}

export default connect(mapStateToProps)(UnansweredQuestion)