import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/TabView',
  decorators: [
    moduleMetadata({
      imports: [TabViewModule, ButtonModule, InputTextModule, FormsModule],
    }),
  ],
  argTypes: {
    activeIndex: {
      control: 'number',
      description: 'Index of the active tab'
    },
    closable: {
      control: 'boolean',
      description: 'Whether tabs are closable'
    },
    scrollable: {
      control: 'boolean',
      description: 'When enabled displays buttons at each side of the tab headers to scroll the tab list'
    }
  },
  args: {
    activeIndex: 0,
    closable: false,
    scrollable: false
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView 
        [activeIndex]="activeIndex"
        [closable]="closable"
        [scrollable]="scrollable">
        <p-tabPanel header="Tab 1">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 2">
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 3">
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
          <p>Deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const Primary: Story = {
  args: {
    activeIndex: 1
  }
};

export const Closable: Story = {
  args: {
    closable: true
  }
};

export const Scrollable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView 
        [scrollable]="true"
        style="width: 400px;">
        <p-tabPanel header="Tab 1 with Long Title">
          <p>Content for the first tab with a very long title.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 2 with Very Long Title">
          <p>Content for the second tab with an even longer title.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 3 Extra Long">
          <p>Content for the third tab.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 4 Super Long Title">
          <p>Content for the fourth tab.</p>
        </p-tabPanel>
        <p-tabPanel header="Tab 5 Extremely Long">
          <p>Content for the fifth tab.</p>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const WithIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <i class="pi pi-user mr-2"></i>
            <span>Profile</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">User Profile</h5>
            <div class="flex flex-column gap-2">
              <label for="username">Username</label>
              <input pInputText id="username" value="john_doe" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="email">Email</label>
              <input pInputText id="email" value="john@example.com" />
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <i class="pi pi-cog mr-2"></i>
            <span>Settings</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">Account Settings</h5>
            <div class="flex align-items-center gap-2">
              <input type="checkbox" id="notifications" />
              <label for="notifications">Enable notifications</label>
            </div>
            <div class="flex align-items-center gap-2">
              <input type="checkbox" id="newsletter" />
              <label for="newsletter">Subscribe to newsletter</label>
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <i class="pi pi-lock mr-2"></i>
            <span>Security</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">Security Settings</h5>
            <div class="flex flex-column gap-2">
              <label for="current-password">Current Password</label>
              <input pInputText type="password" id="current-password" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="new-password">New Password</label>
              <input pInputText type="password" id="new-password" />
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const DisabledTab: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView>
        <p-tabPanel header="Available Tab">
          <p>This tab is available and can be clicked.</p>
        </p-tabPanel>
        <p-tabPanel header="Disabled Tab" [disabled]="true">
          <p>This tab is disabled and cannot be clicked.</p>
        </p-tabPanel>
        <p-tabPanel header="Another Available Tab">
          <p>This tab is also available.</p>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const TabsWithBadges: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <span>Inbox</span>
            <span class="ml-2 bg-blue-500 text-white border-round px-2 py-1 text-xs">5</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">Inbox Messages</h5>
            <p>You have 5 new messages in your inbox.</p>
            <div class="flex flex-column gap-2">
              <div class="p-3 surface-100 border-round">Message 1</div>
              <div class="p-3 surface-100 border-round">Message 2</div>
              <div class="p-3 surface-100 border-round">Message 3</div>
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <span>Drafts</span>
            <span class="ml-2 bg-orange-500 text-white border-round px-2 py-1 text-xs">2</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">Draft Messages</h5>
            <p>You have 2 draft messages.</p>
            <div class="flex flex-column gap-2">
              <div class="p-3 surface-100 border-round">Draft 1</div>
              <div class="p-3 surface-100 border-round">Draft 2</div>
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel>
          <ng-template pTemplate="header">
            <span>Sent</span>
          </ng-template>
          <div class="flex flex-column gap-3">
            <h5 class="m-0">Sent Messages</h5>
            <p>Your sent messages appear here.</p>
          </div>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const DynamicTabs: Story = {
  render: (args) => ({
    props: {
      tabs: [
        { title: 'Tab 1', content: 'Content for Tab 1', closable: true },
        { title: 'Tab 2', content: 'Content for Tab 2', closable: true },
        { title: 'Tab 3', content: 'Content for Tab 3', closable: false }
      ],
      newTabTitle: 'New Tab',
      addTab: function() {
        if (this['newTabTitle'].trim()) {
          this['tabs'].push({
            title: this['newTabTitle'],
            content: `Content for ${this['newTabTitle']}`,
            closable: true
          });
          this['newTabTitle'] = 'New Tab';
        }
      },
      removeTab: function(event: any) {
        this['tabs'].splice(event.index, 1);
      },
      trackByTab: function(index: number, tab: any) {
        return tab.title;
      }
    },
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex gap-2">
          <input
            pInputText
            [(ngModel)]="newTabTitle"
            placeholder="New tab title" />
          <p-button
            label="Add Tab"
            icon="pi pi-plus"
            (click)="addTab()">
          </p-button>
        </div>

        <p-tabView [closable]="true" (onClose)="removeTab($event)">
          <p-tabPanel
            *ngFor="let tab of tabs; trackBy: trackByTab"
            [header]="tab.title"
            [closable]="tab.closable">
            <p>{{ tab.content }}</p>
          </p-tabPanel>
        </p-tabView>
      </div>
    `
  })
};

export const NestedContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-tabView>
        <p-tabPanel header="Dashboard">
          <div class="flex flex-column gap-4">
            <h5 class="m-0">Dashboard Overview</h5>
            <div class="grid">
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card p-3 border-round text-center">
                  <i class="pi pi-users text-4xl text-blue-500 mb-3"></i>
                  <div class="text-2xl font-bold">1,234</div>
                  <div class="text-600">Users</div>
                </div>
              </div>
              <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card p-3 border-round text-center">
                  <i class="pi pi-shopping-cart text-4xl text-green-500 mb-3"></i>
                  <div class="text-2xl font-bold">567</div>
                  <div class="text-600">Orders</div>
                </div>
              </div>
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel header="Analytics">
          <div class="flex flex-column gap-4">
            <h5 class="m-0">Analytics Data</h5>
            <div class="surface-card p-4 border-round">
              <h6>Monthly Revenue</h6>
              <div class="text-3xl font-bold text-green-500">$12,345</div>
              <div class="text-600">+15% from last month</div>
            </div>
          </div>
        </p-tabPanel>
        <p-tabPanel header="Reports">
          <div class="flex flex-column gap-4">
            <h5 class="m-0">Generate Reports</h5>
            <div class="flex flex-column gap-2">
              <label>Report Type</label>
              <select class="p-inputtext">
                <option>Sales Report</option>
                <option>User Activity</option>
                <option>Performance Metrics</option>
              </select>
            </div>
            <div class="flex gap-2">
              <p-button label="Generate" icon="pi pi-file"></p-button>
              <p-button label="Download" icon="pi pi-download" severity="secondary"></p-button>
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    `
  })
};

export const FormTabs: Story = {
  render: (args) => ({
    props: {
      formData: {
        personal: { name: '', email: '' },
        address: { street: '', city: '', zip: '' },
        preferences: { newsletter: false, notifications: true }
      },
      activeIndex: 0
    },
    template: `
      <div class="flex flex-column gap-3">
        <h5 class="m-0">Multi-Step Form</h5>
        <p-tabView [(activeIndex)]="activeIndex">
          <p-tabPanel header="Personal Info">
            <div class="flex flex-column gap-3">
              <div class="flex flex-column gap-2">
                <label for="name">Full Name</label>
                <input pInputText id="name" [(ngModel)]="formData.personal.name" />
              </div>
              <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <input pInputText id="email" [(ngModel)]="formData.personal.email" />
              </div>
              <div class="flex justify-content-end">
                <p-button label="Next" icon="pi pi-arrow-right" (click)="activeIndex = 1"></p-button>
              </div>
            </div>
          </p-tabPanel>
          <p-tabPanel header="Address">
            <div class="flex flex-column gap-3">
              <div class="flex flex-column gap-2">
                <label for="street">Street Address</label>
                <input pInputText id="street" [(ngModel)]="formData.address.street" />
              </div>
              <div class="flex gap-3">
                <div class="flex flex-column gap-2 flex-1">
                  <label for="city">City</label>
                  <input pInputText id="city" [(ngModel)]="formData.address.city" />
                </div>
                <div class="flex flex-column gap-2">
                  <label for="zip">ZIP Code</label>
                  <input pInputText id="zip" [(ngModel)]="formData.address.zip" />
                </div>
              </div>
              <div class="flex justify-content-between">
                <p-button label="Previous" icon="pi pi-arrow-left" severity="secondary" (click)="activeIndex = 0"></p-button>
                <p-button label="Next" icon="pi pi-arrow-right" (click)="activeIndex = 2"></p-button>
              </div>
            </div>
          </p-tabPanel>
          <p-tabPanel header="Preferences">
            <div class="flex flex-column gap-3">
              <div class="flex align-items-center gap-2">
                <input type="checkbox" id="newsletter" [(ngModel)]="formData.preferences.newsletter" />
                <label for="newsletter">Subscribe to newsletter</label>
              </div>
              <div class="flex align-items-center gap-2">
                <input type="checkbox" id="notifications" [(ngModel)]="formData.preferences.notifications" />
                <label for="notifications">Enable notifications</label>
              </div>
              <div class="flex justify-content-between">
                <p-button label="Previous" icon="pi pi-arrow-left" severity="secondary" (click)="activeIndex = 1"></p-button>
                <p-button label="Submit" icon="pi pi-check" severity="success"></p-button>
              </div>
            </div>
          </p-tabPanel>
        </p-tabView>
        
        <div class="mt-3 p-3 surface-100 border-round">
          <small class="text-600">Form Data: {{ formData | json }}</small>
        </div>
      </div>
    `
  })
};
