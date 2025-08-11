import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

const meta: Meta = {
  title: 'PrimeNG/Card',
  decorators: [
    moduleMetadata({
      imports: [CardModule, ButtonModule],
    }),
  ],
  argTypes: {
    header: {
      control: 'text',
      description: 'Header text'
    },
    subheader: {
      control: 'text',
      description: 'Subheader text'
    },
    content: {
      control: 'text',
      description: 'Card content'
    },
    footer: {
      control: 'text',
      description: 'Footer text'
    }
  },
  args: {
    header: 'Card Title',
    subheader: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    footer: 'Card Footer'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card 
        [header]="header" 
        [subheader]="subheader">
        <p>{{ content }}</p>
        <ng-template pTemplate="footer">
          <p>{{ footer }}</p>
        </ng-template>
      </p-card>
    `
  })
};

export const SimpleCard: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card>
        <p>{{ content }}</p>
      </p-card>
    `
  }),
  args: {
    content: 'Simple card with just content'
  }
};

export const HeaderOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card [header]="header">
        <p>{{ content }}</p>
      </p-card>
    `
  }),
  args: {
    header: 'Card with Header',
    content: 'Card content without footer'
  }
};

export const WithActions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card 
        [header]="header" 
        [subheader]="subheader">
        <p>{{ content }}</p>
        <ng-template pTemplate="footer">
          <div class="flex gap-3 mt-1">
            <p-button 
              label="Save" 
              severity="secondary" 
              outlined="true" 
              class="w-full sm:w-auto">
            </p-button>
            <p-button 
              label="Cancel" 
              class="w-full sm:w-auto">
            </p-button>
          </div>
        </ng-template>
      </p-card>
    `
  }),
  args: {
    header: 'Card with Actions',
    subheader: 'This card has action buttons in the footer',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
};

export const WithImage: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card [header]="header">
        <ng-template pTemplate="header">
          <img alt="Card Header" src="https://primefaces.org/cdn/primeng/images/usercard.png" style="width: 100%" />
        </ng-template>
        <p>{{ content }}</p>
        <ng-template pTemplate="footer">
          <div class="flex gap-3 mt-1">
            <p-button 
              label="Save" 
              icon="pi pi-check">
            </p-button>
            <p-button 
              label="Cancel" 
              severity="secondary" 
              outlined="true" 
              icon="pi pi-times">
            </p-button>
          </div>
        </ng-template>
      </p-card>
    `
  }),
  args: {
    header: 'Advanced Card',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
};

export const Minimal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card>
        <div class="text-center">
          <h5 class="m-0">{{ header }}</h5>
          <p class="text-600">{{ content }}</p>
        </div>
      </p-card>
    `
  }),
  args: {
    header: 'Minimal Card',
    content: 'Clean and simple card design'
  }
};

export const WithBrandTokens: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card class="brand-card">
        <div class="text-center">
          <i class="pi pi-star text-4xl brand-text-primary mb-3"></i>
          <h5 class="m-0">{{ header }}</h5>
          <p class="brand-text-secondary">{{ content }}</p>
          <div class="flex justify-content-center mt-3">
            <div class="brand-bg-primary text-white px-3 py-2 border-round text-sm font-semibold">
              Premium Feature
            </div>
          </div>
        </div>
      </p-card>
      <style>
        .brand-card {
          background: var(--brand-surface-card) !important;
          border: var(--brand-card-border) !important;
          border-radius: var(--brand-border-radius) !important;
          box-shadow: var(--brand-shadow) !important;
          padding: var(--brand-card-padding) !important;
        }
        .brand-card:hover {
          box-shadow: var(--brand-shadow-md) !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
      </style>
      <small class="text-600 block mt-3">Uses PrimeNG theme tokens. Customize in tokens.css.</small>
    `
  }),
  args: {
    header: 'Brand Token Card',
    content: 'This card demonstrates consistent brand theming using design tokens'
  }
};
