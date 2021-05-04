import React, {Component} from 'react'
import {Grid, Card, Image, Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux' 
import {formatDate} from '../utils/helper'


class BriefQuestion extends Component{
    render(){
        const { question, author } = this.props;
		const { optionOne, timestamp, id } = question;
		const { name, avatarURL } = author;
        return (
            <Grid centered>
                <Grid.Row>
                   <Card.Group>
                       <Card>
                           <Card.Content>
                               <Card.Header>
                                   <Image src={avatarURL} className='mr-3' circular/>
                                   {name} asks:
                               </Card.Header>
                               <Card.Description className='mtb-3'>
                                    <p>{optionOne.text.slice(0, 50)}...?</p>
                                    <Link to={`/questions/${id}`}>
								        <Button variant="outline-dark">View Question</Button>
							        </Link>
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

export default connect(mapStateToProps)(BriefQuestion)