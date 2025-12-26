/**
 * Enterprise Token Management Addon for Storybook
 * Ensures Storybook controls properly trigger design system updates
 */

import { addons } from '@storybook/manager-api';
import { STORY_CHANGED, STORY_RENDERED } from '@storybook/core-events';

const ADDON_ID = 'enterprise-tokens';
const PANEL_ID = `${ADDON_ID}/panel`;

class EnterpriseTokenAddon {
  private channel: any;
  private lastRenderTime = 0;
  private pendingUpdate = false;

  constructor() {
    this.channel = addons.getChannel();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Listen for story changes
    this.channel.on(STORY_CHANGED, () => {
      this.handleStoryChange();
    });

    // Listen for story renders
    this.channel.on(STORY_RENDERED, () => {
      this.handleStoryRender();
    });

    // Listen for controls changes
    this.channel.on('storybook/controls/updated', (args: any) => {
      this.handleControlsUpdate(args);
    });

    // Listen for args updates (which happen when controls change)
    this.channel.on('storybook/args/updated', (args: any) => {
      this.handleArgsUpdate(args);
    });
  }

  private handleStoryChange() {
    console.log('🏢 Enterprise Token Addon: Story changed');
    this.triggerDesignSystemUpdate();
  }

  private handleStoryRender() {
    const now = Date.now();
    this.lastRenderTime = now;
    
    // Delay to ensure DOM is ready
    setTimeout(() => {
      if (this.lastRenderTime === now) { // Only if no newer render
        this.triggerDesignSystemUpdate();
        console.log('🏢 Enterprise Token Addon: Story rendered and design system updated');
      }
    }, 50);
  }

  private handleControlsUpdate(args: any) {
    console.log('🏢 Enterprise Token Addon: Controls updated', args);
    this.scheduleUpdate();
  }

  private handleArgsUpdate(args: any) {
    console.log('🏢 Enterprise Token Addon: Args updated', args);
    this.scheduleUpdate();
  }

  private scheduleUpdate() {
    if (this.pendingUpdate) return;
    
    this.pendingUpdate = true;
    requestAnimationFrame(() => {
      this.triggerDesignSystemUpdate();
      this.pendingUpdate = false;
    });
  }

  private triggerDesignSystemUpdate() {
    // Emit custom event to trigger design system update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('storybook-controls-changed', {
        detail: { timestamp: Date.now() }
      }));
      
      // Also emit to preview iframe if available
      const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;
      if (previewIframe && previewIframe.contentWindow) {
        previewIframe.contentWindow.dispatchEvent(
          new CustomEvent('storybook-controls-changed', {
            detail: { timestamp: Date.now() }
          })
        );
      }
    }
  }

  // Public method to force update
  public forceUpdate() {
    this.triggerDesignSystemUpdate();
  }
}

// Initialize the addon
const enterpriseTokenAddon = new EnterpriseTokenAddon();

// Export for external use
export { enterpriseTokenAddon };

// Auto-register if in Storybook manager context
if (typeof window !== 'undefined' && (window as any).__STORYBOOK_ADDONS__) {
  console.log('🏢 Enterprise Token Addon initialized');
}
