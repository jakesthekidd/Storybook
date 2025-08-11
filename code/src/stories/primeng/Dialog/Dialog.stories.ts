import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/Dialog',
  decorators: [
    moduleMetadata({
      imports: [DialogModule, ButtonModule, InputTextModule, FormsModule],
    }),
  ],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Specifies the visibility of the dialog'
    },
    header: {
      control: 'text',
      description: 'Title text of the dialog'
    },
    modal: {
      control: 'boolean',
      description: 'Defines if background should be blocked when dialog is displayed'
    },
    resizable: {
      control: 'boolean',
      description: 'Enables resizing of the dialog'
    },
    draggable: {
      control: 'boolean',
      description: 'Enables dragging to change the position of the dialog'
    },
    closable: {
      control: 'boolean',
      description: 'Displays a close icon to hide the dialog'
    },
    width: {
      control: 'text',
      description: 'Width of the dialog'
    },
    height: {
      control: 'text',
      description: 'Height of the dialog'
    },
    dismissableMask: {
      control: 'boolean',
      description: 'Specifies if clicking the modal background should hide the dialog'
    },
    maximizable: {
      control: 'boolean',
      description: 'Whether the dialog can be displayed full screen'
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'],
      description: 'Position of the dialog'
    }
  },
  args: {
    visible: true,
    header: 'Dialog Header',
    modal: true,
    resizable: true,
    draggable: true,
    closable: true,
    width: '50vw',
    height: 'auto',
    dismissableMask: false,
    maximizable: false,
    position: 'center'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p-button 
          label="Show Dialog" 
          (click)="visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="visible"
          [header]="header"
          [modal]="modal"
          [resizable]="resizable"
          [draggable]="draggable"
          [closable]="closable"
          [style]="{width: width, height: height}"
          [dismissableMask]="dismissableMask"
          [maximizable]="maximizable"
          [position]="position">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <ng-template pTemplate="footer">
            <p-button 
              label="Cancel" 
              icon="pi pi-times" 
              text="true" 
              (click)="visible = false">
            </p-button>
            <p-button 
              label="Save" 
              icon="pi pi-check" 
              (click)="visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};

export const Primary: Story = {
  args: {
    header: 'Confirmation Dialog',
    width: '30vw'
  }
};

export const BasicDialog: Story = {
  render: (args) => ({
    props: { ...args, visible: false },
    template: `
      <div>
        <p-button 
          label="Basic Dialog" 
          (click)="visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="visible"
          header="Basic Dialog"
          [modal]="true"
          [style]="{width: '25rem'}">
          <span class="p-text-secondary block mb-5">Update your information.</span>
          <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <input pInputText id="username" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex align-items-center gap-3 mb-5">
            <label for="email" class="font-semibold w-6rem">Email</label>
            <input pInputText id="email" class="flex-auto" autocomplete="off" />
          </div>
          <ng-template pTemplate="footer">
            <p-button 
              label="Cancel" 
              icon="pi pi-times" 
              text="true" 
              (click)="visible = false">
            </p-button>
            <p-button 
              label="Save" 
              icon="pi pi-check" 
              (click)="visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};

export const Maximizable: Story = {
  args: {
    maximizable: true,
    header: 'Maximizable Dialog',
    width: '50vw'
  }
};

export const WithoutModal: Story = {
  args: {
    modal: false,
    header: 'Non-Modal Dialog',
    width: '30vw'
  }
};

export const NotResizable: Story = {
  args: {
    resizable: false,
    draggable: false,
    header: 'Fixed Size Dialog',
    width: '25vw'
  }
};

export const DismissableMask: Story = {
  args: {
    dismissableMask: true,
    header: 'Click Background to Close',
    width: '30vw'
  }
};

export const PositionTop: Story = {
  args: {
    position: 'top',
    header: 'Top Position Dialog',
    width: '50vw'
  }
};

export const PositionBottom: Story = {
  args: {
    position: 'bottom',
    header: 'Bottom Position Dialog',
    width: '50vw'
  }
};

export const ConfirmationDialog: Story = {
  render: (args) => ({
    props: { ...args, visible: false },
    template: `
      <div>
        <p-button 
          label="Delete Item" 
          severity="danger"
          (click)="visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="visible"
          header="Confirm Deletion"
          [modal]="true"
          [style]="{width: '25rem'}">
          <div class="flex align-items-center gap-3 mb-3">
            <i class="pi pi-exclamation-triangle text-3xl text-red-500"></i>
            <span>Are you sure you want to delete this item? This action cannot be undone.</span>
          </div>
          <ng-template pTemplate="footer">
            <p-button 
              label="Cancel" 
              icon="pi pi-times" 
              text="true" 
              (click)="visible = false">
            </p-button>
            <p-button 
              label="Delete" 
              icon="pi pi-trash" 
              severity="danger"
              (click)="visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};

export const FormDialog: Story = {
  render: (args) => ({
    props: { 
      ...args, 
      visible: false,
      formData: {
        title: '',
        description: '',
        priority: 'medium'
      }
    },
    template: `
      <div>
        <p-button 
          label="Create Task" 
          icon="pi pi-plus"
          (click)="visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="visible"
          header="Create New Task"
          [modal]="true"
          [style]="{width: '30rem'}">
          <div class="flex flex-column gap-4">
            <div class="flex flex-column gap-2">
              <label for="task-title" class="font-semibold">Title</label>
              <input 
                pInputText 
                id="task-title" 
                [(ngModel)]="formData.title"
                placeholder="Enter task title" />
            </div>
            
            <div class="flex flex-column gap-2">
              <label for="task-desc" class="font-semibold">Description</label>
              <textarea 
                pInputText 
                id="task-desc" 
                [(ngModel)]="formData.description"
                placeholder="Enter task description"
                rows="3">
              </textarea>
            </div>
            
            <div class="flex flex-column gap-2">
              <label class="font-semibold">Priority</label>
              <div class="flex gap-3">
                <div class="flex align-items-center">
                  <input type="radio" id="low" name="priority" value="low" [(ngModel)]="formData.priority" />
                  <label for="low" class="ml-2">Low</label>
                </div>
                <div class="flex align-items-center">
                  <input type="radio" id="medium" name="priority" value="medium" [(ngModel)]="formData.priority" />
                  <label for="medium" class="ml-2">Medium</label>
                </div>
                <div class="flex align-items-center">
                  <input type="radio" id="high" name="priority" value="high" [(ngModel)]="formData.priority" />
                  <label for="high" class="ml-2">High</label>
                </div>
              </div>
            </div>
          </div>
          
          <ng-template pTemplate="footer">
            <p-button 
              label="Cancel" 
              icon="pi pi-times" 
              text="true" 
              (click)="visible = false">
            </p-button>
            <p-button 
              label="Create" 
              icon="pi pi-check" 
              (click)="visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};

export const MultipleDialogs: Story = {
  render: (args) => ({
    props: { 
      dialog1Visible: false,
      dialog2Visible: false
    },
    template: `
      <div class="flex gap-3">
        <p-button 
          label="Dialog 1" 
          (click)="dialog1Visible = true">
        </p-button>
        
        <p-button 
          label="Dialog 2" 
          severity="secondary"
          (click)="dialog2Visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="dialog1Visible"
          header="First Dialog"
          [modal]="true"
          [style]="{width: '25rem'}">
          <p>This is the first dialog.</p>
          <ng-template pTemplate="footer">
            <p-button 
              label="Close" 
              (click)="dialog1Visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
        
        <p-dialog 
          [(visible)]="dialog2Visible"
          header="Second Dialog"
          [modal]="true"
          [style]="{width: '25rem'}"
          position="top">
          <p>This is the second dialog positioned at the top.</p>
          <ng-template pTemplate="footer">
            <p-button 
              label="Close" 
              (click)="dialog2Visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};

export const FullScreenDialog: Story = {
  render: (args) => ({
    props: { ...args, visible: false },
    template: `
      <div>
        <p-button 
          label="Full Screen Dialog" 
          (click)="visible = true">
        </p-button>
        
        <p-dialog 
          [(visible)]="visible"
          header="Full Screen Dialog"
          [modal]="true"
          [style]="{width: '100vw', height: '100vh'}"
          [maximizable]="true">
          <div class="flex flex-column gap-4 h-full">
            <p>This dialog takes up the full screen.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>You can still maximize/restore it using the button in the header.</p>
            <div class="flex-1"></div>
          </div>
          <ng-template pTemplate="footer">
            <p-button 
              label="Close" 
              icon="pi pi-times"
              (click)="visible = false">
            </p-button>
          </ng-template>
        </p-dialog>
      </div>
    `
  })
};
