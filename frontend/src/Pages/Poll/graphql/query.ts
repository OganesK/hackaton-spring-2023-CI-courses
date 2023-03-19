import { gql } from '@apollo/client';

export const GetTasksQuery = gql`
query {
    tests{
      name
      tasks{
        question
        answers
        rightAnswer
      }
    }
  }
`;