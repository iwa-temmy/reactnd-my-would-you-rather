import React from 'react';
import { Link } from 'react-router-dom';
import {Header,Container} from 'semantic-ui-react'

function PageNotFound() {
	return (
		<Container centered>
			<Header as='h1' className="display3 text-center">404 ERROR</Header>
			<Header as='h1'className="display4 text-center">
				<Link to="/">Return to Home Page</Link>
			</Header>
		</Container>
	);
}

export default PageNotFound;
