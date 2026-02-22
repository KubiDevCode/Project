import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Input } from './Input';
import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Type text',
    value: '123123',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    placeholder: 'Type text',
    value: '123123',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]
