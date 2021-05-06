import React, {Component} from 'react'
import { Card, Form, Grid, Image, Button, Radio} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {handleAddAnswer} from '../actions/questions'
import PageNotFound from './PageNotFound'
import {formatDate} from '../utils/helper'


class UnansweredQuestion extends Component{
    state = {
		errorMsg: '',
        value: '',
	}
    handleChange = (e, { value }) => this.setState({ value });
    handleSubmit = e => {
        e.preventDefault();

        const answer = this.state.value
		const { dispatch, question } = this.props;
        console.log(answer, question.id)

		if (this.state.value !== '') {
			dispatch(handleAddAnswer(question.id, this.state.value));
		} else {
			this.setState({ errorMsg: 'You must make a choice' });
		}
	}
    
    render(){
        const { question, author } = this.props;

		if (question === null) {
			return <PageNotFound />;
		}

		const { optionOne, optionTwo, timestamp} = question;
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
                                <Form onSubmit={this.handleSubmit}> 
                                        {errorMsg ? (
									        <p className="text-danger">{errorMsg}</p>
								            ) : null}
                                        <Form.Field>
                                            <Radio label={optionOne.text}  name='radioGroup' value='optionOne'
                                            checked={this.state.value === 'optionOne'} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <h3>
                                            <p>OR</p>
                                        </h3>
                                        <Form.Field>
                                            <Radio label={optionTwo.text}  name='radioGroup' value='optionTwo'
                                            checked={this.state.value === 'optionTwo'} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Button color="green"
                                            size="tiny" positive content='Vote'/>
                                        </Form.Field>
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