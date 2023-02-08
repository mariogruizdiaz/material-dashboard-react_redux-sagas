// eslint-disable-next-line import/prefer-default-export
const authenthicate = `
    mutation authenticateAlias(
        $token: String!
    ){
        authenticate(
            token: $token
        ) {
            data,
            success,
            errors {
                path,
                message
            }
        }
    }
`;

export default {
  authenthicate,
};
