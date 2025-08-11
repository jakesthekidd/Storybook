import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

const meta: Meta = {
  title: 'PrimeNG/Toast',
  decorators: [
    moduleMetadata({
      imports: [ToastModule, ButtonModule],
      providers: [MessageService]
    }),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right', 'center'],
      description: 'Position of the toast messages'
    },
    autoZIndex: {
      control: 'boolean',
      description: 'Whether to automatically manage layering'
    },
    preventOpenDuplicates: {
      control: 'boolean',
      description: 'It prevents displaying duplicate messages'
    },
    preventDuplicates: {
      control: 'boolean',
      description: 'It prevents displaying duplicate messages with same content'
    },
    showTransformOptions: {
      control: 'text',
      description: 'Transform options for show animation'
    },
    hideTransformOptions: {
      control: 'text',
      description: 'Transform options for hide animation'
    },
    showTransitionOptions: {
      control: 'text',
      description: 'Transition options for show animation'
    },
    hideTransitionOptions: {
      control: 'text',
      description: 'Transition options for hide animation'
    }
  },
  args: {
    position: 'top-right',
    autoZIndex: true,
    preventOpenDuplicates: false,
    preventDuplicates: false,
    showTransformOptions: 'translateX(100%)',
    hideTransformOptions: 'translateX(100%)',
    showTransitionOptions: '300ms ease-out',
    hideTransitionOptions: '250ms ease-in'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <h5 class="m-0">Toast Messages</h5>
        <div class="flex flex-wrap gap-2">
          <p-button 
            label="Success" 
            severity="success"
            (click)="showSuccess()">
          </p-button>
          <p-button 
            label="Info" 
            severity="info"
            (click)="showInfo()">
          </p-button>
          <p-button 
            label="Warning" 
            severity="warning"
            (click)="showWarn()">
          </p-button>
          <p-button 
            label="Error" 
            severity="danger"
            (click)="showError()">
          </p-button>
        </div>
        
        <p-toast 
          [position]="position"
          [autoZIndex]="autoZIndex"
          [preventOpenDuplicates]="preventOpenDuplicates"
          [preventDuplicates]="preventDuplicates"
          [showTransformOptions]="showTransformOptions"
          [hideTransformOptions]="hideTransformOptions"
          [showTransitionOptions]="showTransitionOptions"
          [hideTransitionOptions]="hideTransitionOptions">
        </p-toast>
      </div>
    `,
    methods: {
      showSuccess: function() {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Operation completed successfully'
        });
      },
      showInfo: function() {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Here is some important information'
        });
      },
      showWarn: function() {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Please check your input'
        });
      },
      showError: function() {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong'
        });
      }
    }
  })
};

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Success Toast" 
          (click)="showSuccess()">
        </p-button>
        
        <p-toast position="top-right"></p-toast>
      </div>
    `,
    methods: {
      showSuccess: function() {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message sent successfully'
        });
      }
    }
  })
};

export const SuccessToast: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Success" 
          severity="success"
          (click)="showSuccess()">
        </p-button>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showSuccess: function() {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Data saved successfully',
          life: 3000
        });
      }
    }
  })
};

export const InfoToast: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Info" 
          severity="info"
          (click)="showInfo()">
        </p-button>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showInfo: function() {
        this.messageService.add({
          severity: 'info',
          summary: 'Information',
          detail: 'New update available',
          life: 3000
        });
      }
    }
  })
};

export const WarningToast: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Warning" 
          severity="warning"
          (click)="showWarn()">
        </p-button>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showWarn: function() {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Session will expire in 5 minutes',
          life: 3000
        });
      }
    }
  })
};

export const ErrorToast: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Error" 
          severity="danger"
          (click)="showError()">
        </p-button>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showError: function() {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save data. Please try again.',
          life: 5000
        });
      }
    }
  })
};

export const PositionTopLeft: Story = {
  args: {
    position: 'top-left'
  }
};

export const PositionTopCenter: Story = {
  args: {
    position: 'top-center'
  }
};

export const PositionBottomLeft: Story = {
  args: {
    position: 'bottom-left'
  }
};

export const PositionBottomCenter: Story = {
  args: {
    position: 'bottom-center'
  }
};

export const PositionBottomRight: Story = {
  args: {
    position: 'bottom-right'
  }
};

export const StickyToast: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Sticky Toast" 
          (click)="showSticky()">
        </p-button>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showSticky: function() {
        this.messageService.add({
          severity: 'info',
          summary: 'Sticky Message',
          detail: 'This message will stay until manually closed',
          sticky: true
        });
      }
    }
  })
};

export const CustomLifetime: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex gap-2">
          <p-button 
            label="3 seconds" 
            (click)="showCustom(3000)">
          </p-button>
          <p-button 
            label="10 seconds" 
            (click)="showCustom(10000)">
          </p-button>
          <p-button 
            label="30 seconds" 
            (click)="showCustom(30000)">
          </p-button>
        </div>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showCustom: function(life: number) {
        this.messageService.add({
          severity: 'info',
          summary: 'Custom Lifetime',
          detail: `This message will disappear in ${life / 1000} seconds`,
          life: life
        });
      }
    }
  })
};

export const MultipleMessages: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex gap-2">
          <p-button 
            label="Add Messages" 
            (click)="showMultiple()">
          </p-button>
          <p-button 
            label="Clear All" 
            severity="secondary"
            (click)="clearAll()">
          </p-button>
        </div>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      showMultiple: function() {
        this.messageService.addAll([
          {
            severity: 'success',
            summary: 'Success 1',
            detail: 'First successful operation'
          },
          {
            severity: 'info',
            summary: 'Info 1',
            detail: 'Important information message'
          },
          {
            severity: 'warn',
            summary: 'Warning 1',
            detail: 'Please be careful about this'
          }
        ]);
      },
      clearAll: function() {
        this.messageService.clear();
      }
    }
  })
};

export const WithPreventDuplicates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Click Multiple Times" 
          (click)="showMessage()">
        </p-button>
        <small class="text-600">
          Try clicking the button multiple times quickly. Duplicate messages will be prevented.
        </small>
        
        <p-toast [preventDuplicates]="true"></p-toast>
      </div>
    `,
    methods: {
      showMessage: function() {
        this.messageService.add({
          severity: 'info',
          summary: 'Duplicate Prevention',
          detail: 'This is the same message content'
        });
      }
    }
  })
};

export const FormSubmissionFlow: Story = {
  render: (args) => ({
    props: {
      formData: {
        name: '',
        email: ''
      },
      isSubmitting: false
    },
    template: `
      <div class="flex flex-column gap-4 p-4 surface-card border-round max-w-20rem">
        <h5 class="m-0">Contact Form</h5>
        
        <div class="flex flex-column gap-2">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            [(ngModel)]="formData.name"
            class="p-inputtext" />
        </div>
        
        <div class="flex flex-column gap-2">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            [(ngModel)]="formData.email"
            class="p-inputtext" />
        </div>
        
        <div class="flex gap-2">
          <p-button 
            label="Submit" 
            [loading]="isSubmitting"
            (click)="submitForm()">
          </p-button>
          <p-button 
            label="Reset" 
            severity="secondary"
            outlined="true"
            (click)="resetForm()">
          </p-button>
        </div>
        
        <p-toast></p-toast>
      </div>
    `,
    methods: {
      submitForm: function() {
        if (!this.formData.name || !this.formData.email) {
          this.messageService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Please fill in all required fields'
          });
          return;
        }
        
        this.isSubmitting = true;
        
        // Simulate API call
        setTimeout(() => {
          this.isSubmitting = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Form submitted successfully!'
          });
          this.resetForm();
        }, 2000);
      },
      resetForm: function() {
        this.formData = { name: '', email: '' };
        this.messageService.add({
          severity: 'info',
          summary: 'Form Reset',
          detail: 'Form has been cleared'
        });
      }
    }
  })
};

export const CustomStyling: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <p-button 
          label="Show Custom Toast" 
          (click)="showCustom()">
        </p-button>
        
        <p-toast styleClass="custom-toast"></p-toast>
        
        <style>
          .custom-toast .p-toast-message {
            background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
            color: white;
            border: none;
            box-shadow: var(--brand-shadow-lg);
          }
          .custom-toast .p-toast-message .p-toast-icon-close {
            color: white;
          }
        </style>
      </div>
    `,
    methods: {
      showCustom: function() {
        this.messageService.add({
          severity: 'info',
          summary: 'Custom Styled Toast',
          detail: 'This toast uses brand tokens for consistent theming',
          life: 4000
        });
      }
    }
  })
};
