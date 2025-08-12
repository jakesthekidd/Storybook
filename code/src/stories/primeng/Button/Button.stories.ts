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
      <div class="enterprise-button-container">
        <button
          pButton
          type="button"
          [label]="label"
          [disabled]="disabled"
          [icon]="icon || null"
          [class]="buttonClasses"
          #buttonElement
        ></button>
        <div class="token-debug-info" *ngIf="showDebug">
          <small>Theme: {{currentTheme}} | Severity: {{severity || 'default'}} | Tokens: {{tokenCount}}</small>
        </div>
      </div>
    `,
    props: {
      ...args,
      showDebug: false, // Set to true to see debug info
      currentTheme: typeof window !== 'undefined' ? localStorage.getItem('storybook-theme-mode') || 'light' : 'light',
      tokenCount: 0,
      buttonClasses: [
        'p-button',
        'enterprise-button',
        args.severity ? `p-button-${args.severity}` : '',
        args.outlined ? 'p-button-outlined' : '',
        args.text ? 'p-button-text' : '',
        args.raised ? 'p-button-raised' : '',
        args.rounded ? 'p-button-rounded' : '',
        args.size || ''
      ].filter(Boolean).join(' ').trim()
    },
    styles: [`
      .enterprise-button-container {
        padding: 1rem;
        background: var(--surface-ground, #ffffff);
        border-radius: var(--border-radius, 6px);
        transition: all 0.2s ease;
      }

      .enterprise-button {
        font-family: var(--font-family, "Inter", system-ui, sans-serif) !important;
        transition: all 0.2s ease !important;
      }

      .token-debug-info {
        margin-top: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: var(--surface-overlay, #f1f5f9);
        border-radius: 4px;
        font-family: monospace;
        font-size: 11px;
        color: var(--text-color-secondary, #64748b);
      }
    `],
    ngOnInit: () => {
      // Subscribe to design system updates
      if (typeof window !== 'undefined') {
        const updateTokenCount = () => {
          const root = document.documentElement;
          const tokenCount = Array.from(root.style).filter(prop =>
            prop.startsWith('--p-') || prop.startsWith('--primary-') || prop.startsWith('--surface-')
          ).length;

          // Update token count in component
          const container = document.querySelector('.enterprise-button-container');
          if (container) {
            (container as any).tokenCount = tokenCount;
          }
        };

        updateTokenCount();

        // Listen for enterprise design system updates
        const handleDesignSystemUpdate = () => {
          updateTokenCount();
          console.log('🎯 Button story: Design system updated');
        };

        window.addEventListener('storybook-controls-changed', handleDesignSystemUpdate);
        window.addEventListener('storybook-story-rendered', handleDesignSystemUpdate);

        // Cleanup function would go here in a real Angular component
      }
    }
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
