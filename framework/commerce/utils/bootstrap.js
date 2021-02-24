module.exports = ({ features }) => {
  let output = {
    env: {},
  }
  if (!!Object.keys(features).length) {
    Object.keys(features).map(
      (r) => (output.env[`COMMERCE_${r.toUpperCase()}_ENABLED`] = features[r])
    )
  }
  return output
}
