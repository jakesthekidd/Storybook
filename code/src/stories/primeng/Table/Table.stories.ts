import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
  rating: number;
}

const meta: Meta = {
  title: 'PrimeNG/Table',
  decorators: [
    moduleMetadata({
      imports: [TableModule, ButtonModule, InputTextModule, DropdownModule, TagModule, FormsModule],
    }),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'An array of objects to display'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the table'
    },
    paginator: {
      control: 'boolean',
      description: 'When specified as true, enables the pagination'
    },
    rows: {
      control: 'number',
      description: 'Number of rows to display per page'
    },
    sortable: {
      control: 'boolean',
      description: 'Enables sorting on all columns'
    },
    filterDelay: {
      control: 'number',
      description: 'Delay in milliseconds before filtering'
    },
    globalFilterFields: {
      control: 'object',
      description: 'An array of fields as string to use in global filtering'
    }
  },
  args: {
    data: [
      { id: '1', name: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 25, status: 'INSTOCK', rating: 5 },
      { id: '2', name: 'Wireless Mouse', category: 'Electronics', price: 29, quantity: 8, status: 'LOWSTOCK', rating: 4 },
      { id: '3', name: 'Office Chair', category: 'Furniture', price: 199, quantity: 0, status: 'OUTOFSTOCK', rating: 3 },
      { id: '4', name: 'Standing Desk', category: 'Furniture', price: 399, quantity: 15, status: 'INSTOCK', rating: 4 },
      { id: '5', name: 'Coffee Maker', category: 'Appliances', price: 89, quantity: 3, status: 'LOWSTOCK', rating: 5 }
    ],
    loading: false,
    paginator: false,
    rows: 10,
    sortable: true,
    filterDelay: 0,
    globalFilterFields: ['name', 'category']
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-table 
        [value]="data"
        [loading]="loading"
        [paginator]="paginator"
        [rows]="rows"
        [sortable]="sortable"
        [filterDelay]="filterDelay"
        [globalFilterFields]="globalFilterFields">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price | currency }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <p-tag 
                [value]="product.status"
                [severity]="getStatusSeverity(product.status)">
              </p-tag>
            </td>
          </tr>
        </ng-template>
      </p-table>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      }
    }
  })
};

export const Primary: Story = {
  args: {
    paginator: true,
    rows: 3
  }
};

export const WithPagination: Story = {
  args: {
    paginator: true,
    rows: 3
  }
};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Sortable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-table 
        [value]="data"
        [sortable]="true">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="name">
              Name <p-sortIcon field="name"></p-sortIcon>
            </th>
            <th pSortableColumn="category">
              Category <p-sortIcon field="category"></p-sortIcon>
            </th>
            <th pSortableColumn="price">
              Price <p-sortIcon field="price"></p-sortIcon>
            </th>
            <th pSortableColumn="quantity">
              Quantity <p-sortIcon field="quantity"></p-sortIcon>
            </th>
            <th>Status</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price | currency }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <p-tag 
                [value]="product.status"
                [severity]="getStatusSeverity(product.status)">
              </p-tag>
            </td>
          </tr>
        </ng-template>
      </p-table>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      }
    }
  })
};

export const WithFiltering: Story = {
  render: (args) => ({
    props: {
      ...args,
      globalFilter: ''
    },
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex justify-content-between align-items-center">
          <h5 class="m-0">Products</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input 
              pInputText 
              type="text" 
              [(ngModel)]="globalFilter"
              placeholder="Search products..." />
          </span>
        </div>
        
        <p-table 
          [value]="data"
          [globalFilterFields]="['name', 'category', 'status']"
          [globalFilter]="globalFilter"
          [paginator]="true"
          [rows]="5">
          <ng-template pTemplate="header">
            <tr>
              <th>
                <div class="flex flex-column gap-2">
                  <span>Name</span>
                  <input 
                    pInputText 
                    type="text" 
                    (input)="filterGlobal($event, 'contains')"
                    placeholder="Filter by name"
                    class="p-column-filter" />
                </div>
              </th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price | currency }}</td>
              <td>
                <p-tag 
                  [value]="product.status"
                  [severity]="getStatusSeverity(product.status)">
                </p-tag>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      },
      filterGlobal: function(event: any, matchMode: string) {
        this.globalFilter = event.target.value;
      }
    }
  })
};

export const WithSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedProducts: []
    },
    template: `
      <div class="flex flex-column gap-3">
        <h5 class="m-0">Select Products</h5>
        
        <p-table 
          [value]="data"
          [(selection)]="selectedProducts"
          selectionMode="multiple"
          [metaKeySelection]="false">
          <ng-template pTemplate="header">
            <tr>
              <th style="width: 3rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
              </th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price | currency }}</td>
              <td>
                <p-tag 
                  [value]="product.status"
                  [severity]="getStatusSeverity(product.status)">
                </p-tag>
              </td>
            </tr>
          </ng-template>
        </p-table>
        
        <div class="mt-3 p-3 surface-100 border-round" *ngIf="selectedProducts.length > 0">
          <small class="text-600">Selected: {{ selectedProducts.length }} product(s)</small>
        </div>
      </div>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      }
    }
  })
};

export const WithActions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-table [value]="data">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price | currency }}</td>
            <td>
              <p-tag 
                [value]="product.status"
                [severity]="getStatusSeverity(product.status)">
              </p-tag>
            </td>
            <td>
              <div class="flex gap-2">
                <p-button 
                  icon="pi pi-pencil" 
                  size="small"
                  text="true"
                  (click)="editProduct(product)">
                </p-button>
                <p-button 
                  icon="pi pi-trash" 
                  size="small"
                  text="true"
                  severity="danger"
                  (click)="deleteProduct(product)">
                </p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      },
      editProduct: function(product: any) {
        console.log('Edit product:', product);
      },
      deleteProduct: function(product: any) {
        console.log('Delete product:', product);
      }
    }
  })
};

export const ResponsiveTable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-table 
        [value]="data"
        [responsive]="true"
        breakpoint="960px">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>
              <span class="p-column-title">Name</span>
              {{ product.name }}
            </td>
            <td>
              <span class="p-column-title">Category</span>
              {{ product.category }}
            </td>
            <td>
              <span class="p-column-title">Price</span>
              {{ product.price | currency }}
            </td>
            <td>
              <span class="p-column-title">Quantity</span>
              {{ product.quantity }}
            </td>
            <td>
              <span class="p-column-title">Status</span>
              <p-tag 
                [value]="product.status"
                [severity]="getStatusSeverity(product.status)">
              </p-tag>
            </td>
          </tr>
        </ng-template>
      </p-table>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      }
    }
  })
};

export const EmptyState: Story = {
  render: (args) => ({
    props: {
      emptyData: []
    },
    template: `
      <p-table [value]="emptyData">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price | currency }}</td>
            <td>{{ product.status }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4" class="text-center p-4">
              <div class="flex flex-column align-items-center gap-3">
                <i class="pi pi-inbox text-4xl text-400"></i>
                <div class="text-600">No products found</div>
                <p-button label="Add Product" icon="pi pi-plus"></p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    `
  })
};

export const AdvancedTable: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedProducts: [],
      globalFilter: '',
      statusOptions: [
        { label: 'All', value: null },
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex justify-content-between align-items-center">
          <h5 class="m-0">Product Management</h5>
          <div class="flex gap-2">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input 
                pInputText 
                type="text" 
                [(ngModel)]="globalFilter"
                placeholder="Search..." />
            </span>
            <p-button 
              label="Export" 
              icon="pi pi-download"
              severity="secondary"
              outlined="true">
            </p-button>
            <p-button 
              label="Add Product" 
              icon="pi pi-plus">
            </p-button>
          </div>
        </div>
        
        <p-table 
          [value]="data"
          [(selection)]="selectedProducts"
          selectionMode="multiple"
          [globalFilterFields]="['name', 'category', 'status']"
          [globalFilter]="globalFilter"
          [paginator]="true"
          [rows]="5"
          [rowsPerPageOptions]="[5, 10, 20]"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          styleClass="p-datatable-striped">
          <ng-template pTemplate="caption">
            <div class="flex align-items-center justify-content-between">
              <span>Total: {{ data.length }} products</span>
              <span *ngIf="selectedProducts.length > 0" class="text-sm text-600">
                {{ selectedProducts.length }} selected
              </span>
            </div>
          </ng-template>
          <ng-template pTemplate="header">
            <tr>
              <th style="width: 3rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
              </th>
              <th pSortableColumn="name">
                Name <p-sortIcon field="name"></p-sortIcon>
              </th>
              <th pSortableColumn="category">
                Category <p-sortIcon field="category"></p-sortIcon>
              </th>
              <th pSortableColumn="price">
                Price <p-sortIcon field="price"></p-sortIcon>
              </th>
              <th pSortableColumn="quantity">
                Quantity <p-sortIcon field="quantity"></p-sortIcon>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
            <tr [class.surface-100]="selectedProducts.includes(product)">
              <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price | currency }}</td>
              <td>
                <span [class]="getQuantityClass(product.quantity)">
                  {{ product.quantity }}
                </span>
              </td>
              <td>
                <p-tag 
                  [value]="product.status"
                  [severity]="getStatusSeverity(product.status)">
                </p-tag>
              </td>
              <td>
                <div class="flex gap-1">
                  <p-button 
                    icon="pi pi-eye" 
                    size="small"
                    text="true"
                    severity="info">
                  </p-button>
                  <p-button 
                    icon="pi pi-pencil" 
                    size="small"
                    text="true">
                  </p-button>
                  <p-button 
                    icon="pi pi-trash" 
                    size="small"
                    text="true"
                    severity="danger">
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    `,
    methods: {
      getStatusSeverity: function(status: string) {
        switch (status) {
          case 'INSTOCK': return 'success';
          case 'LOWSTOCK': return 'warning';
          case 'OUTOFSTOCK': return 'danger';
          default: return 'info';
        }
      },
      getQuantityClass: function(quantity: number) {
        if (quantity === 0) return 'text-red-500 font-bold';
        if (quantity < 10) return 'text-orange-500 font-semibold';
        return 'text-green-500';
      }
    }
  })
};
