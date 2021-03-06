const constantsFiles = require.context('./modules', true, /\.js$/)

export const constants = constantsFiles.keys().reduce((constants, constantPath) => {
  const constantName = constantPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = constantsFiles(constantPath)
  constants[constantName] = value
  return constants
}, {})
