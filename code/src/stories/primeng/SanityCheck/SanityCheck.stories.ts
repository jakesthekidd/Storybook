import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

const meta: Meta = {
  title: 'PrimeNG/SanityCheck',
  decorators: [
    moduleMetadata({
      imports: [ButtonModule, CardModule],
    }),
  ],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display'
    }
  },
  args: {
    message: 'Storybook + PrimeNG is working!'
  }
};

export default meta;
type Story = StoryObj;

export const CanvasWorking: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-card class="max-w-30rem mx-auto mt-4">
        <ng-template pTemplate="header">
          <div class="text-center py-3">
            <i class="pi pi-check-circle text-6xl text-green-500"></i>
          </div>
        </ng-template>
        
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-3">✅ Canvas Status</h2>
          <p class="text-lg mb-4">{{ message }}</p>
          
          <div class="flex flex-column gap-3">
            <div class="flex align-items-center justify-content-center gap-2">
              <i class="pi pi-palette text-blue-500"></i>
              <span>PrimeNG Theme: Loaded</span>
            </div>
            <div class="flex align-items-center justify-content-center gap-2">
              <i class="pi pi-cog text-green-500"></i>
              <span>CSS Variables: Active</span>
            </div>
            <div class="flex align-items-center justify-content-center gap-2">
              <i class="pi pi-play text-purple-500"></i>
              <span>Animations: Enabled</span>
            </div>
          </div>
          
          <div class="mt-4">
            <p-button 
              label="Test Button" 
              icon="pi pi-star"
              class="mr-2">
            </p-button>
            <p-button 
              label="Secondary" 
              severity="secondary"
              outlined="true">
            </p-button>
          </div>
        </div>
        
        <ng-template pTemplate="footer">
          <div class="text-center text-sm text-600">
            <p>All PrimeNG components should now render correctly</p>
            <p class="mt-2">
              <span class="font-semibold">Theme:</span> Lara Light Blue | 
              <span class="font-semibold">Tokens:</span> Available | 
              <span class="font-semibold">Icons:</span> PrimeIcons
            </p>
          </div>
        </ng-template>
      </p-card>
    `
  })
};

export const ThemeTokens: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-50rem mx-auto mt-4">
        <p-card>
          <ng-template pTemplate="header">
            <div class="text-center py-3">
              <h2 class="text-2xl font-bold">🎨 Theme Tokens Demo</h2>
            </div>
          </ng-template>
          
          <div class="grid">
            <div class="col-12 md:col-6">
              <h4>Brand Colors</h4>
              <div class="flex flex-column gap-2">
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-primary"></div>
                  <span>Primary: var(--brand-primary)</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-secondary"></div>
                  <span>Secondary: var(--brand-secondary)</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-success"></div>
                  <span>Success: var(--brand-success)</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-warning"></div>
                  <span>Warning: var(--brand-warning)</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-danger"></div>
                  <span>Danger: var(--brand-danger)</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <div class="w-3rem h-2rem border-round brand-bg-info"></div>
                  <span>Info: var(--brand-info)</span>
                </div>
              </div>
            </div>
            
            <div class="col-12 md:col-6">
              <h4>Component Examples</h4>
              <div class="flex flex-column gap-3">
                <p-button 
                  label="Primary" 
                  icon="pi pi-check">
                </p-button>
                <p-button 
                  label="Success" 
                  severity="success"
                  icon="pi pi-thumbs-up">
                </p-button>
                <p-button 
                  label="Warning" 
                  severity="warning"
                  icon="pi pi-exclamation-triangle">
                </p-button>
                <p-button 
                  label="Danger" 
                  severity="danger"
                  icon="pi pi-times">
                </p-button>
              </div>
            </div>
          </div>
          
          <ng-template pTemplate="footer">
            <div class="text-center">
              <small class="text-600">
                All colors use PrimeNG theme tokens. Customize in tokens.css for brand consistency.
              </small>
            </div>
          </ng-template>
        </p-card>
      </div>
    `
  })
};
