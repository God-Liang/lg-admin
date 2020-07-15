const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a template',
  prompts: [{
    type: 'input',
    name: 'file',
    message: 'view file please',
    validate: notEmpty('file')
  },
  {
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'api',
    message: 'view api please',
    validate: notEmpty('api')
  },
  {
    type: 'confirm',
    name: 'wantIndex',
    message: 'Do you want index.js?'
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: 'operation',
      value: 'operation',
      checked: true
    }
    ],
    validate(value) {
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const file = '{{file}}'
    const actions = [{
      type: 'add',
      path: `src/views/${file}/${name}/index.vue`,
      templateFile: 'plop-templates/template/template.hbs',
      data: {
        name: name,
        operation: data.blocks.includes('operation')
      }
    },
    {
      type: 'add',
      path: `src/views/${file}/columnsConst/modules/${name}Const.js`,
      templateFile: 'plop-templates/template/columns.hbs',
      data: {
        name: name,
        operation: data.blocks.includes('operation')
      }
    },
    {
      type: 'add',
      path: `src/views/${file}/${name}/modules/detail.vue`,
      templateFile: 'plop-templates/template/detail.hbs',
      data: {
        name: name
      }
    }]
    if (data.wantIndex) {
      actions.push({
        type: 'add',
        path: `src/views/${file}/columnsConst/index.js`,
        templateFile: 'plop-templates/template/index.hbs'
      })
    }
    return actions
  }
}
