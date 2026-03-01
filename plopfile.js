module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create empty component structure',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name (e.g. Button):',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/shared/{{pascalCase name}}/{{pascalCase name}}.tsx',
                template: ''
            },
            {
                type: 'add',
                path: 'src/shared/{{pascalCase name}}/{{pascalCase name}}.module.scss',
                template: ''
            },
            {
                type: 'add',
                path: 'src/shared/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                template: ''
            }
        ],
    });
};