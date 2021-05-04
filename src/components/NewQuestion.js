import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Grid, Form} from 'semantic-ui-react';

import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
		optionOne: '',
		optionTwo: '',
		toHome: false
	};

	handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		const { optionOne, optionTwo } = this.state;
		const { dispatch } = this.props;

		e.preventDefault();

		this.setState(
			{
				optionOne: '',
				optionTwo: '',
				toHome: true
			},
			() => dispatch(handleAddQuestion(optionOne, optionTwo))
		);
	};
    render(){
        const { optionOne, optionTwo, toHome } = this.state;

		if (toHome === true) return <Redirect to="/" />;
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
                                        <Form.Field>
                                            <Form.Input type='text' label='Option One' placeholder='Option One' 
                                            value={optionOne} onChange={this.handleInputChange} />
                                        </Form.Field>
                                        <h3>
                                            <p>OR</p>
                                        </h3>
                                        <Form.Field>
                                            <Form.Input type='text' label='Option Two' placeholder='Option Two' 
                                            value={optionTwo} onChange={this.handleInputChange} />
                                        </Form.Field>

                                        <Form.Button type="submit" disabled={optionOne === '' || optionTwo === ''}>
                                            Submit
                                        </Form.Button>
 
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