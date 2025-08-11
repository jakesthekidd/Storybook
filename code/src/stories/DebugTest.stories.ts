import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Debug/Test',
  argTypes: {},
  args: {}
};

export default meta;
type Story = StoryObj;

export const PlainHTML: Story = {
  render: () => ({
    template: `<div style="padding: 20px; border: 2px solid red; background: yellow;">
      <h1>Plain HTML Test</h1>
      <p>If you can see this, basic rendering works</p>
    </div>`
  })
};

export const BasicAngular: Story = {
  render: () => ({
    props: { message: 'Hello from Angular' },
    template: `<div style="padding: 20px; border: 2px solid blue; background: lightblue;">
      <h2>{{ message }}</h2>
      <p>Angular interpolation: {{ 1 + 1 }}</p>
    </div>`
  })
};
