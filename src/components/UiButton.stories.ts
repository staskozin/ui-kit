// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/vue3-vite';

import UiButton from './UiButton.vue';

const meta = {
  component: UiButton,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
    },
  },
  decorators: [
    () => ({
      template: '<div style="font-size: 16px"><story /></div>',
    }),
  ],
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'UiButton',
    size: 'medium',
  },
};
