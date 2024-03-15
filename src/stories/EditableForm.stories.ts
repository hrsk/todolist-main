import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { EditableForm } from '../EditableForm';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableForm> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        value: {
            description: 'Start value empty. Add value push button set string.'
        },
        callback: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableForm>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
    args: {
        value: 'Start value',
        callback: action('Value EditableSpan changed')
    }
};
