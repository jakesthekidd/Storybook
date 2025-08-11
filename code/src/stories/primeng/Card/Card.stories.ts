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
