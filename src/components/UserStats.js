import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Card, Container, Image} from 'semantic-ui-react'



class UserStats extends Component{
    render(){
        const { user } = this.props
        const { name, avatarURL, answers, questions } = user 
        return (
            <Container>
                <Grid centered>
                    <Grid.Row centered>
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                    <Image src={avatarURL} className='mr-3' circular/>
							        {name}
                                    </Card.Header>
                                    <Card.Description>
                                        <p>
                                            Answered Questions: {Object.keys(answers).length}
								             <br />
								            Created Questions: {questions.length}</p>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    Score: {Object.keys(answers).length + questions.length}
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}


const mapStateToProps = ({users}, {id}) => {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserStats)