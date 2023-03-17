import { gql, useMutation } from '@apollo/client';

import * as types from './typings';

// export const VerificatePostMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificatePost(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

// export const VerificateProjectMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificateProject(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

// export const VerificateCompanyMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificateCompany(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

// export const VerificateEventMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificateEvent(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

// export const VerificateSolutionMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificateSolution(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

// export const VerificateContactMutation = () => {
//   const [response] = useMutation(
//     gql`
//       mutation ($data: VerificateEntityInput!) {
//         verificateContact(data: $data) {
//           verdict
//         }
//       }
//     `,
//   );
//   return (data: types.VerificateEntityInput) => response({ variables: { data } });
// };

export const VerificateMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateMutationInput!) {
        verificateMutation(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateMutationInput) => response({ variables: { data } });
};

export const VerificateUpdatedPostMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificatePostUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};

export const VerificateUpdatedProjectMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificateProjectUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};

export const VerificateUpdatedCompanyMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificateCompanyUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};

export const VerificateUpdatedEventMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificateEventUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};

export const VerificateUpdatedSolutionMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificateSolutionUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};

export const VerificateUpdatedContactMutation = () => {
  const [response] = useMutation(
    gql`
      mutation ($data: VerificateEntityInput!) {
        verificateContactUpdatedVariable(data: $data) {
          verdict
        }
      }
    `,
  );
  return (data: types.VerificateEntityInput) => response({ variables: { data } });
};
