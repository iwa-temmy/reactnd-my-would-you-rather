import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Grid, Form} from 'semantic-ui-react';

import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    render(){
        return(
            <Fragment>
                 <Grid centered>
                    <Grid.Row centered>
                        <h2 className="text-center my-3">
                            <small>Would You Rather...</small>
                        </h2>
                    </Grid.Row>
                    <Grid.Row>
                        <Card.Group>
                            <Card>
                                <Card.Content>
                                    <Form>

                                    </Form>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Grid.Row>
                </Grid>
            </Fragment>

        )
    }
}


export default connect ()(NewQuestion)