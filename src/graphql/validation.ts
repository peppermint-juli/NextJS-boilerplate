import { gql } from '@apollo/client';

export const STATS = gql`
  query stats($runId: Int!) {
    getStats(runId: $runId) {
      numDatasets
      numDyads
      numSnippetsNonEmpty
      numSnippetsTotal
      numPublications
      progress {
        numReviewedSnippets
    	  numTotalSnippets
        percentage
      }
    }
  }
`;

export const REVIEWERS_STATS = gql`
  query reviewers($runId: Int!) {
    getReviewers(runId: $runId) {
      reviewer {
        id
        firstName
        lastName
        roles
      }
      numReviewedSnippets
      numAssignedSnippets
    }
  }
`;

export const DATASET_STATS = gql`
  query datasetStats($runId: Int!) {
    getDatasetReviewStats(runId: $runId){
      parentDataset{
        id
        datasetName
        numUnreviewed
        numCorrectlyPredicted
        numIncorrectlyPredicted
      }
      aliases {
        id
        alias
        numUnreviewed
        numCorrectlyPredicted
        numIncorrectlyPredicted
      }
    }
  }
`;