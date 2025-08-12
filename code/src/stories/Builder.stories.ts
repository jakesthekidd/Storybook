import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BuilderComponentsModule } from '../builder/builder.module';

const meta: Meta = {
  title: 'Builder.io/Components',
  decorators: [
    moduleMetadata({
      imports: [BuilderComponentsModule],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: var(--p-text-color, #0f172a); font-family: var(--p-font-family, 'Inter', sans-serif); margin-bottom: 2rem;">
          🚀 Builder.io Components Showcase
        </h1>
        
        <div style="background: var(--p-surface-0, #ffffff); border: 1px solid var(--p-surface-300, #cbd5e1); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
          <h2 style="color: var(--p-text-color, #0f172a); margin-top: 0;">Button Component</h2>
          <p style="color: var(--p-text-muted-color, #64748b); margin-bottom: 1.5rem;">
            Ready for drag-and-drop in Builder.io with all PrimeNG variants
          </p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 1rem;">
            <builder-button label="Primary" severity="primary"></builder-button>
            <builder-button label="Secondary" severity="secondary"></builder-button>
            <builder-button label="Success" severity="success"></builder-button>
            <builder-button label="Warning" severity="warning"></builder-button>
            <builder-button label="Danger" severity="danger"></builder-button>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 1rem;">
            <builder-button label="Outlined" severity="primary" [outlined]="true"></builder-button>
            <builder-button label="Raised" severity="info" [raised]="true"></builder-button>
            <builder-button label="Rounded" severity="success" [rounded]="true"></builder-button>
            <builder-button label="Text" severity="secondary" [text]="true"></builder-button>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <builder-button label="Small" severity="primary" size="small"></builder-button>
            <builder-button label="Large" severity="primary" size="large"></builder-button>
            <builder-button label="With Icon" severity="primary" icon="pi pi-search"></builder-button>
          </div>
        </div>

        <div style="background: var(--p-surface-0, #ffffff); border: 1px solid var(--p-surface-300, #cbd5e1); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
          <h2 style="color: var(--p-text-color, #0f172a); margin-top: 0;">Input Component</h2>
          <p style="color: var(--p-text-muted-color, #64748b); margin-bottom: 1.5rem;">
            Form inputs with validation styling and multiple types
          </p>
          
          <div style="display: grid; gap: 1rem;">
            <builder-input 
              label="Full Name" 
              placeholder="Enter your full name" 
              helpText="This will be displayed on your profile">
            </builder-input>
            
            <builder-input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com">
            </builder-input>
            
            <builder-input 
              label="Password" 
              type="password" 
              placeholder="Enter secure password">
            </builder-input>
            
            <builder-input 
              label="Phone Number" 
              type="tel" 
              placeholder="+1 (555) 123-4567">
            </builder-input>
          </div>
        </div>

        <div style="background: var(--p-surface-0, #ffffff); border: 1px solid var(--p-surface-300, #cbd5e1); border-radius: 12px; padding: 2rem;">
          <h2 style="color: var(--p-text-color, #0f172a); margin-top: 0;">Calendar Component</h2>
          <p style="color: var(--p-text-muted-color, #64748b); margin-bottom: 1.5rem;">
            Date/time pickers with multiple selection modes and formats
          </p>
          
          <div style="display: grid; gap: 1.5rem;">
            <builder-calendar 
              label="Event Date" 
              placeholder="Select event date" 
              helpText="Choose when your event will take place">
            </builder-calendar>
            
            <builder-calendar 
              label="Date Range" 
              selectionMode="range" 
              placeholder="Select date range"
              helpText="Pick start and end dates">
            </builder-calendar>
            
            <builder-calendar 
              label="Date & Time" 
              [showTime]="true" 
              placeholder="Select date and time"
              helpText="Choose both date and time">
            </builder-calendar>
          </div>
        </div>

        <div style="background: var(--p-surface-100, #f1f5f9); border: 1px solid var(--p-surface-300, #cbd5e1); border-radius: 12px; padding: 2rem; margin-top: 2rem;">
          <h2 style="color: var(--p-text-color, #0f172a); margin-top: 0;">✅ Ready for Builder.io!</h2>
          <div style="color: var(--p-text-muted-color, #64748b); line-height: 1.6;">
            <p><strong>These components are now registered and ready to drag-and-drop in Builder.io:</strong></p>
            <ul style="margin: 1rem 0;">
              <li>🔘 <strong>PrimeNG Button</strong> - All severities, sizes, and variants</li>
              <li>📝 <strong>PrimeNG Input</strong> - Multiple types with validation styling</li>
              <li>📅 <strong>PrimeNG Calendar</strong> - Date/time selection with ranges</li>
            </ul>
            <p><strong>Theme Integration:</strong> All components automatically use your Token Studio variables and switch with Light/Dark mode.</p>
            <p><strong>Next:</strong> Import BuilderComponentsModule in your app and call registerBuilderComponents() to enable drag-and-drop functionality.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ButtonShowcase: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <h2>Builder Button Component</h2>
        <p>Testing all button variants for Builder.io integration</p>
        
        <div style="display: grid; gap: 20px; margin-top: 20px;">
          <div>
            <h3>Severities</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <builder-button label="Primary" severity="primary"></builder-button>
              <builder-button label="Secondary" severity="secondary"></builder-button>
              <builder-button label="Success" severity="success"></builder-button>
              <builder-button label="Info" severity="info"></builder-button>
              <builder-button label="Warning" severity="warning"></builder-button>
              <builder-button label="Help" severity="help"></builder-button>
              <builder-button label="Danger" severity="danger"></builder-button>
            </div>
          </div>
          
          <div>
            <h3>Styles</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <builder-button label="Normal" severity="primary"></builder-button>
              <builder-button label="Outlined" severity="primary" [outlined]="true"></builder-button>
              <builder-button label="Raised" severity="primary" [raised]="true"></builder-button>
              <builder-button label="Rounded" severity="primary" [rounded]="true"></builder-button>
              <builder-button label="Text" severity="primary" [text]="true"></builder-button>
            </div>
          </div>
          
          <div>
            <h3>Sizes & States</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
              <builder-button label="Small" severity="primary" size="small"></builder-button>
              <builder-button label="Normal" severity="primary"></builder-button>
              <builder-button label="Large" severity="primary" size="large"></builder-button>
              <builder-button label="Disabled" severity="primary" [disabled]="true"></builder-button>
            </div>
          </div>
          
          <div>
            <h3>With Icons</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <builder-button label="Search" severity="primary" icon="pi pi-search"></builder-button>
              <builder-button label="Save" severity="success" icon="pi pi-save"></builder-button>
              <builder-button label="Delete" severity="danger" icon="pi pi-trash"></builder-button>
              <builder-button label="Download" severity="info" icon="pi pi-download"></builder-button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
