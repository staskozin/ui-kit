import type { Meta, StoryObj } from '@storybook/vue3-vite';

import UiButton from './UiButton.vue';
import Icons from '../assets/icons';


// Meta
const meta = {
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
    },
    icon: {
      options: Object.keys(Icons),
      control: { type: 'select' },
    }
  },
} satisfies Meta<typeof UiButton>;

export default meta;


// Stories
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    size: 'medium',
  },
};

export const Icon: Story = {
  args: {
    size: 'medium',
    icon: 'calendar',
  },
};

export const NormalWithIcon: Story = {
  args: {
    size: 'medium',
    icon: 'calendar',
  },
};
