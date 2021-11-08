export const checkIsUserVerifyEmailMutation = /* GraphQL */ `
 mutation checkIsUserVerifyEmail($emailAddress: String!) {
  checkIsUserVerifyEmail(emailAddress: $emailAddress) {
    isUserExisted
    isVerified
  }
}
`
