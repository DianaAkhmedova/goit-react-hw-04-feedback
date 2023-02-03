import { useState } from 'react';
import Feedback from 'modules/Feedback/FeedbackSection';
import Section from 'modules/Feedback/Section/Section';
import FeedbackOptions from 'modules/Feedback/FeedbackOptions/FeedbackOptions';
import Statistics from 'modules/Feedback/Statistics/Statistics';
import Notification from 'modules/Feedback/Notification/Notification';

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = state;
  const total = good + neutral + bad;

  const onLeaveFeedback = feedbackName => {
    setState(prevState => {
      return { ...prevState, [feedbackName]: prevState[feedbackName] + 1 };
    });
  };

  const countPositiveFeedbackPercentage = () => {
    if (!state.good) {
      return 0;
    }

    const positiveFeedbackPercentage = ((state.good / total) * 100).toFixed(0);

    return Number(positiveFeedbackPercentage);
  };

  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Feedback>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {!total ? (
        <Section>
          <Notification message="There is no feedback..." />
        </Section>
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      )}
    </Feedback>
  );
};

export default App;
