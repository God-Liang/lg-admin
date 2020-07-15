const templateGenerator = require('./plop-templates/template/prompt.js')
const projectTemplateGenerator = require('./plop-templates/project_template/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('template', templateGenerator)
  plop.setGenerator('projectTemplate', projectTemplateGenerator)
}
