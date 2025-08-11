import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Test/BasicHTML',
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'Hello Storybook!'
    }
  }
};

export default meta;
type Story = StoryObj;

export const SimpleHTML: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; border: 2px solid blue; background: #f0f0f0;">
        <h1>Test Story</h1>
        <p>{{ message }}</p>
        <button>Basic HTML Button</button>
      </div>
    `
  })
};

export const WithStyling: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border-radius: 10px;">
        <h2>Styled Test</h2>
        <p>If you can see this with gradient background, Storybook is working!</p>
        <p>Message: {{ message }}</p>
      </div>
    `
  }),
  args: {
    message: 'Canvas is rendering correctly!'
  }
};
