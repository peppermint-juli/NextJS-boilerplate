import { gql } from '@apollo/client';

export const TOPICS_PUBS = gql`
  query TopicsPubs($runId: Int!) {
    getTopicsPubs(runId: $runId) {
      topic
      numPublications
    }
  }
`;
