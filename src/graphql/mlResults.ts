import { gql } from '@apollo/client';

export const ML_MODEL_STATS = gql`
  query MLModelStats($runId: Int!) {
    getMLModelStats(runId: $runId) {
      totalDatasets
      totalPublications
      totalTopics
      datasets {
          dataset
          numPublications
          numTopics
          topics {
            numOccurrences
            topic
          }
      }
    }
  }
`;