import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import BriefQuestionsList from './BriefQuestionsList'

export class Home extends Component {
  render() {
    const { userQuestionData } = this.props;

    return <Tab panes={panes({ userQuestionData })} className="tab" />;
  }
}

const panes = props => {
  const { unansweredQuestionIds, answeredQuestionIds } = props.userQuestionData;
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          <BriefQuestionsList idsList={unansweredQuestionIds}
          emptyListNote="No more Unswered Questions! Time to create some new ones! "/>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
           <BriefQuestionsList idsList={answeredQuestionIds}
           emptyListNote="No more Unswered Questions! Time to create some new ones! "/>
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authedUser, users, questions }) {
  const answeredQuestionIds = Object.keys(questions)
  .filter((id) => users[authedUser].answers.hasOwnProperty(id))
  .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

const unansweredQuestionIds = Object.keys(questions)
  .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
  .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    userQuestionData: {
      answeredQuestionIds,
      unansweredQuestionIds
    }
  };
}

export default connect(mapStateToProps)(Home);