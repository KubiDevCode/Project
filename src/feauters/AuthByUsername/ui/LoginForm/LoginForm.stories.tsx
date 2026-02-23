import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import LoginForm from './LoginForm';
import { ThemeDecorator } from '../../../../shared/config/storybook/ThemeDecorator/ThemeDecorator';
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
    },
})]
export const WithLoading = Template.bind({});
WithLoading.args = {
};
WithLoading.decorators = [StoreDecorator({
    loginForm: {
        username: '123',
        password: '123',
        isLoaing: true,
    },
})]
