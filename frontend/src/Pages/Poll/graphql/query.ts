import { gql } from '@apollo/client';

export const GetTasksQuery = gql`
    query {
        tasks {
            id
            answers
            question
            cost
            rightAnswer
        }
  }
`;