import { gql } from '@apollo/client';

export const DATASET_ALIASES = gql`
  query DatasetAliases($runId: Int!) {
    getDatasetAliases(runId: $runId) {
      dataset
      aliases {
        alias
      }
    }
  }
`;
