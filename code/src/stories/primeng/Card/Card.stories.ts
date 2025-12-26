import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { colorPaletteManager } from '../../../theme/color-palette';

interface CardArgs {
  header: string;
  subheader?: string;
  content: string;
  footer?: string;
}

if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const CARD_STORY_STYLES = `
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .card-story-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--palette-surface-ground, #EFF2F4);
    border-radius: 20px;
  }

  .card-content {
    color: var(--palette-text-primary, #3D3D3D);
  }

  .card-subtitle {
    color: var(--palette-text-secondary, #373737);
    margin-bottom: 0.75rem;
  }

  .card-footer-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .card-action-button {
    min-width: 120px;
  }

  .card-header-image {
    width: 100%;
    display: block;
    border-radius: 12px 12px 0 0;
  }

  .brand-card {
    background: var(--palette-surface-card, #ffffff) !important;
    border: 1px solid var(--palette-surface-border, #E2E6EB) !important;
    border-radius: 18px !important;
    padding: 2rem !important;
    box-shadow: 0 18px 32px -18px rgba(18, 45, 77, 0.35) !important;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .brand-card:hover {
    box-shadow: 0 20px 32px -14px rgba(18, 45, 77, 0.3) !important;
    transform: translateY(-2px);
  }

  .brand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--palette-primary, #2474BB);
  }

  .brand-text-primary {
    color: var(--palette-primary, #2474BB);
  }

  .brand-text-secondary {
    color: var(--palette-text-secondary, #373737);
  }

  .brand-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--palette-primary, #2474BB);
    color: var(--palette-primary-contrast, #ffffff);
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .brand-caption {
    display: block;
    margin-top: 1rem;
    color: var(--palette-text-muted, #C6CCD6);
  }
`;

const meta: Meta<CardArgs> = {
  title: 'PrimeNG/Card',
  decorators: [
    moduleMetadata({
      imports: [CardModule, ButtonModule],
    }),
  ],
  args: {
    header: 'Card Title',
    subheader: 'Card subtitle',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    footer: 'Card Footer',
  },
  argTypes: {
    header: {
      control: 'text',
      description: 'Header text',
    },
    subheader: {
      control: 'text',
      description: 'Subheader text',
    },
    content: {
      control: 'text',
      description: 'Card content',
    },
    footer: {
      control: 'text',
      description: 'Footer text',
    },
  },
};

export default meta;
type Story = StoryObj<CardArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card [header]="header" [subheader]="subheader">
          <div class="card-content">
            <p>{{ content }}</p>
          </div>
          <ng-template pTemplate="footer" *ngIf="footer">
            <div class="card-footer-actions">
              <span>{{ footer }}</span>
            </div>
          </ng-template>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const SimpleCard: Story = {
  args: {
    content: 'Simple card with just content',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card>
          <div class="card-content">
            <p>{{ content }}</p>
          </div>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const HeaderOnly: Story = {
  args: {
    header: 'Card with Header',
    content: 'Card content without footer',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card [header]="header">
          <div class="card-content">
            <p>{{ content }}</p>
          </div>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const WithActions: Story = {
  args: {
    header: 'Card with Actions',
    subheader: 'This card has action buttons in the footer',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card [header]="header" [subheader]="subheader">
          <div class="card-content">
            <p>{{ content }}</p>
          </div>
          <ng-template pTemplate="footer">
            <div class="card-footer-actions">
              <p-button label="Save" severity="secondary" styleClass="card-action-button"></p-button>
              <p-button label="Cancel" severity="primary" styleClass="card-action-button"></p-button>
            </div>
          </ng-template>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const WithImage: Story = {
  args: {
    header: 'Advanced Card',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card>
          <ng-template pTemplate="header">
            <img alt="Card Header" class="card-header-image" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
          </ng-template>
          <div class="card-content">
            <h4 class="card-subtitle">{{ header }}</h4>
            <p>{{ content }}</p>
          </div>
          <ng-template pTemplate="footer">
            <div class="card-footer-actions">
              <p-button label="Save" icon="pi pi-check" severity="primary" styleClass="card-action-button"></p-button>
              <p-button label="Cancel" icon="pi pi-times" severity="secondary" styleClass="card-action-button" [outlined]="true"></p-button>
            </div>
          </ng-template>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const Minimal: Story = {
  args: {
    header: 'Minimal Card',
    content: 'Clean and simple card design',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card>
          <div class="card-content text-center">
            <h5>{{ header }}</h5>
            <p class="brand-text-secondary">{{ content }}</p>
          </div>
        </p-card>
      </div>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};

export const WithBrandTokens: Story = {
  args: {
    header: 'Brand Token Card',
    content: 'This card demonstrates consistent brand theming using design tokens',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="card-story-wrapper">
        <p-card class="brand-card">
          <div class="card-content text-center">
            <i class="pi pi-star text-4xl brand-icon mb-3"></i>
            <h5 class="m-0">{{ header }}</h5>
            <p class="brand-text-secondary">{{ content }}</p>
            <div class="mt-3">
              <span class="brand-chip">Premium Feature</span>
            </div>
          </div>
        </p-card>
      </div>
      <small class="brand-caption">Palette-driven tokens keep card colors and elevation in sync with the design system.</small>
    `,
    styles: [CARD_STORY_STYLES],
  }),
};
