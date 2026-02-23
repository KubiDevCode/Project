import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Text',
    text: 'Text',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Text',
    text: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'Text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Text',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Error = Template.bind({});
Error.args = {
    title: 'Text',
    text: 'Text',
    theme: TextTheme.ERROR,
};
