import React, { Component } from 'react'
import {connect} from 'react-redux'
import PageNotFound from './PageNotFound'
import {Card, Grid, Image, Progress} from 'semantic-ui-react'
import {formatDate} from '../utils/helper'



class AnsweredQuestion extends Component{
    render(){
        const { question, author, authedUser} = this.props

        if(question === null){
            return <PageNotFound />
        }

        const { optionOne, optionTwo, timestamp } = question;
		const { name, avatarURL } = author;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;
		const optionOnePercent = Math.round((optionOne.votes.length / totalVotes) * 100);
		const optionTwoPercent = Math.round((optionTwo.votes.length / totalVotes) * 100);

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
                                <ul>
								<li>
									{optionOne.text}
									{optionOne.votes.includes(authedUser) ? (
										<span className="">
											&lt;- Your choice
										</span>
									) : null}
								</li>
								<Progress
									value={optionOnePercent}
									total={`${optionOnePercent}%`}
                                    progress='percent'
								/>
								<Card.Description className="text-muted">
									chosen by {optionOne.votes.length} out of {totalVotes}{' '}
									users
								</Card.Description>
								<li>
									{optionTwo.text}
									{optionTwo.votes.includes(authedUser) ? (
										<span className="text-danger ml-2">
											&lt;- Your choice
										</span>
									) : null}
								</li>
								<Progress
									value={optionTwoPercent}
									t={`${optionTwoPercent}%`}
									progress='percent'
								/>
								<Card.Description className="text-muted">
									chosen by {optionTwo.votes.length} out of {totalVotes}{' '}
									users
								</Card.Description>
							</ul>
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
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null,
		authedUser
	};
}


export default connect(mapStateToProps)(AnsweredQuestion)