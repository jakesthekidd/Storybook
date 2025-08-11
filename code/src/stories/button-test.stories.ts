import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

const meta: Meta = {
  title: 'Test/PrimeNG Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const SimpleButton: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <h3>PrimeNG Button Test</h3>
        <p-button label="Click me!"></p-button>
        <br><br>
        <button>Regular HTML Button</button>
      </div>
    `
  })
};

export const MultipleButtons: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <h3>Multiple PrimeNG Buttons</h3>
        <p-button label="Primary" class="mr-2"></p-button>
        <p-button label="Secondary" severity="secondary" class="mr-2"></p-button>
        <p-button label="Success" severity="success" class="mr-2"></p-button>
        <p-button label="Warning" severity="warning"></p-button>
      </div>
    `
  })
};
