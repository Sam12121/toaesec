import { Meta, StoryObj } from '@storybook/react';

import { PlusIcon } from '@/components/icons/Plus';
import TextInput from '@/components/input/TextInput';

const Plus = () => (
  <span className="h-4 w-4">
    <PlusIcon />
  </span>
);

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof TextInput>;

export const Default: StoryObj<typeof TextInput> = {
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'test@toaesecurity.com',
    color: 'error',
  },
};

export const Disabled: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'test@toaesecurity.com',
    disabled: true,
  },
};

export const WithStartIcon: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'test@toaesecurity.com',
    startIcon: <Plus />,
    disabled: false,
    color: 'error',
  },
};

export const WithLabel: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'test@toaesecurity.com',
    startIcon: <Plus />,
    label: 'Username',
  },
};

export const ErrorWithCaption: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'test@toaesecurity.com',
    label: 'Username',
    required: true,
    info: 'Some info text',
    color: 'error',
    helperText: 'Please enter valid email.',
  },
};
