// src/stories/primeng/Button/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

type Severity = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
interface ButtonArgs {
  label: string;
  disabled?: boolean;
  icon?: string;
  severity?: Severity | null;
  outlined?: boolean;
  text?: boolean;
  raised?: boolean;
  rounded?: boolean;
  size?: 'p-button-sm' | 'p-button-lg' | '';
  // Enterprise design system integration
  forceUpdate?: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'PrimeNG/Button',
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
  args: { label: 'Button', disabled: false, severity: 'primary', outlined: false, text: false, raised: false, rounded: false, size: '' },
  argTypes: {
    severity: { control: 'select', options: [null, 'primary','secondary','success','info','warning','help','danger'] },
    size: { control: 'radio', options: ['', 'p-button-sm', 'p-button-lg'] },
  },
  render: (args) => ({
    template: `
      <button
        pButton
        type="button"
        [label]="label"
        [disabled]="disabled"
        [icon]="icon || null"
        [styleClass]="[
          'p-button',
          severity ? 'p-button-' + severity : '',
          outlined ? 'p-button-outlined' : '',
          text ? 'p-button-text' : '',
          raised ? 'p-button-raised' : '',
          rounded ? 'p-button-rounded' : '',
          size || ''
        ].join(' ').trim()"
      ></button>
    `,
    props: args,
  }),
};
export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {};
export const Primary: Story = { args: { severity: 'primary', label: 'Primary Button' } };
export const Secondary: Story = { args: { severity: 'secondary', label: 'Secondary Button' } };
export const Success: Story = { args: { severity: 'success', label: 'Success' } };
export const Info: Story = { args: { severity: 'info', label: 'Info' } };
export const Warning: Story = { args: { severity: 'warning', label: 'Warning' } };
export const Danger: Story = { args: { severity: 'danger', label: 'Danger' } };
export const Outlined: Story = { args: { outlined: true } };
export const Text: Story = { args: { text: true } };
export const Raised: Story = { args: { raised: true } };
export const Rounded: Story = { args: { rounded: true } };
export const WithIcon: Story = { args: { icon: 'pi pi-check', label: 'With Icon' } };
export const IconOnly: Story = { args: { icon: 'pi pi-search', label: '' } };
export const Loading: Story = { render: () => ({ template: `<button pButton type="button" class="p-button" disabled><i class="pi pi-spin pi-spinner mr-2"></i>Loading</button>` }) };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'p-button-sm' } };
export const Large: Story = { args: { size: 'p-button-lg' } };
