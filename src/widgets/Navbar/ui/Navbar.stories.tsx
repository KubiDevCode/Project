import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from './Navbar';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/ThemeProvider';
import { StoreDecorator } from '../../../shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const DarkLogout = Template.bind({});
DarkLogout.args = {}
DarkLogout.decorators = []
DarkLogout.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '123',
            username: '123',
        },
    },
}), ThemeDecorator(Theme.DARK)]

export const Light = Template.bind({});
Light.args = {}
Light.decorators = [StoreDecorator({
    loginForm: {
        username: '123',
        password: '123',
        isLoading: false,
    },
})]
