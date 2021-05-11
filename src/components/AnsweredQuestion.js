import React, { Component } from 'react'
import {connect} from 'react-redux'
import PageNotFound from './PageNotFound'
import {Card, Grid, Icon, Image, Progress, Segment} from 'semantic-ui-react'
import {formatDate} from '../utils/helper'



class AnsweredQuestion extends Component{
    render(){
        const { question, author, authedUser} = this.props

        if(question === null){
            return <PageNotFound />
        }

        const { optionOne, optionTwo, timestamp } = question;

		const { name, avatarURL } = author
		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes



        return (
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
								<Segment className='answerList-item'>
									{optionOne.text}
									{optionOne.votes.includes(authedUser) ? (
										<div>
											<br/>
										<span>
											<Icon name="check circle outline positive"/> Your choice
										</span>
										</div>
									) : null}

								<Progress
									percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                                    progress
								/>
								<p>
								chosen by {optionOneVotes} out of {totalVotes}{' '}
									users
								</p>
								</Segment>
								<br />
								<Segment>
									{optionTwo.text}
									{optionTwo.votes.includes(authedUser) ? (
									<div>
										<br/>
									<span className='choice'>
									<Icon name="check circle"/> Your choice
									</span>
									</div>
									) : null}
									<Progress
									percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
									progress
									/>
									<p>chosen by {optionTwo.votes.length} out of {totalVotes}{' '}
									users</p>
								</Segment>
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

function mapStateToProps({ questions, users, authedUser }, { id }) {
	const user = users[authedUser];
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null,
		authedUser,
		user,
	};
}


export default connect(mapStateToProps)(AnsweredQuestion)