import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({
    loginForm: {
        username: '123',
        password: '123',
        isLoading: false,
    },
})]
export const WithError = Template.bind({});
WithError.args = {
};
WithError.decorators = [StoreDecorator({
    loginForm: {
        username: '123',
        password: '123',
        error: 'error',
        isLoading: false,
    },
})]
export const WithLoading = Template.bind({});
WithLoading.args = {
};
WithLoading.decorators = [StoreDecorator({
    loginForm: {
        username: '123',
        password: '123',
        isLoading: true,
    },
})]
