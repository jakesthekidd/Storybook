import React, { useState, useEffect } from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
// Use global variables set by themes.js
const PRIMENG_THEMES = window.PRIMENG_THEMES;
const themeManager = window.themeManager;

const ADDON_ID = 'theme-controls';
const PANEL_ID = `${ADDON_ID}/panel`;

const TokenControl = ({ label, value, onChange, type = 'text', options = [] }) => {
  const controlStyle = {
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };
  
  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize'
  };
  
  const inputStyle = {
    padding: '6px 8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace'
  };

  return React.createElement('div', { style: controlStyle }, [
    React.createElement('label', { style: labelStyle, key: 'label' }, label),
    type === 'color' 
      ? React.createElement('div', { 
          style: { display: 'flex', gap: '8px', alignItems: 'center' },
          key: 'color-input'
        }, [
          React.createElement('input', {
            type: 'color',
            value: value,
            onChange: (e) => onChange(e.target.value),
            style: { width: '32px', height: '32px', border: 'none', borderRadius: '4px' },
            key: 'color'
          }),
          React.createElement('input', {
            type: 'text',
            value: value,
            onChange: (e) => onChange(e.target.value),
            style: { ...inputStyle, flex: 1 },
            key: 'text'
          })
        ])
      : React.createElement('input', {
          type: 'text',
          value: value,
          onChange: (e) => onChange(e.target.value),
          style: inputStyle,
          key: 'input'
        })
  ]);
};

const ThemeControlsPanel = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [tokens, setTokens] = useState(PRIMENG_THEMES.light.tokens);
  const [isAdvanced, setIsAdvanced] = useState(false);

  useEffect(() => {
    // Listen to theme changes from toolbar
    const channel = addons.getChannel();
    const handleGlobalsUpdated = ({ globals }) => {
      if (globals.theme && globals.theme !== currentTheme) {
        setCurrentTheme(globals.theme);
        setTokens(PRIMENG_THEMES[globals.theme].tokens);
      }
    };
    
    channel.on('globalsUpdated', handleGlobalsUpdated);
    return () => channel.off('globalsUpdated', handleGlobalsUpdated);
  }, [currentTheme]);

  const updateToken = (key, value) => {
    const newTokens = { ...tokens, [key]: value };
    setTokens(newTokens);
    themeManager.updateTokens(newTokens);
  };

  const resetTokens = () => {
    const baseTokens = PRIMENG_THEMES[currentTheme].tokens;
    setTokens(baseTokens);
    themeManager.reset();
  };

  const exportTokens = () => {
    const exported = themeManager.exportTokens();
    const blob = new Blob([JSON.stringify(exported, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `primeng-theme-${currentTheme}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const containerStyle = {
    padding: '16px',
    height: '100%',
    overflow: 'auto',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif'
  };

  const sectionStyle = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  };

  const headerStyle = {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333'
  };

  const buttonStyle = {
    padding: '8px 12px',
    margin: '0 8px 8px 0',
    border: '1px solid #007acc',
    borderRadius: '4px',
    backgroundColor: '#007acc',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#007acc'
  };

  // Simple mode token groups
  const colorTokens = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help'];
  const surfaceTokens = ['surface', 'surfaceCard', 'surfaceBorder', 'surfaceHover'];
  const textTokens = ['textPrimary', 'textSecondary', 'textMuted'];

  return React.createElement('div', { style: containerStyle }, [
    React.createElement('div', { style: sectionStyle, key: 'controls' }, [
      React.createElement('h3', { style: headerStyle, key: 'title' }, 'Theme Controls'),
      React.createElement('div', { key: 'mode-buttons' }, [
        React.createElement('button', {
          style: isAdvanced ? secondaryButtonStyle : buttonStyle,
          onClick: () => setIsAdvanced(false),
          key: 'simple'
        }, 'Simple'),
        React.createElement('button', {
          style: isAdvanced ? buttonStyle : secondaryButtonStyle,
          onClick: () => setIsAdvanced(true),
          key: 'advanced'
        }, 'Advanced')
      ]),
      React.createElement('div', { style: { marginTop: '12px' }, key: 'action-buttons' }, [
        React.createElement('button', {
          style: secondaryButtonStyle,
          onClick: resetTokens,
          key: 'reset'
        }, 'Reset'),
        React.createElement('button', {
          style: buttonStyle,
          onClick: exportTokens,
          key: 'export'
        }, 'Export JSON')
      ])
    ]),
    
    !isAdvanced 
      ? [
          React.createElement('div', { style: sectionStyle, key: 'colors' }, [
            React.createElement('h4', { style: headerStyle, key: 'title' }, 'Colors'),
            ...colorTokens.map(token => 
              React.createElement(TokenControl, {
                key: token,
                label: token,
                value: tokens[token] || '',
                onChange: (value) => updateToken(token, value),
                type: 'color'
              })
            )
          ]),
          React.createElement('div', { style: sectionStyle, key: 'surfaces' }, [
            React.createElement('h4', { style: headerStyle, key: 'title' }, 'Surfaces'),
            ...surfaceTokens.map(token => 
              React.createElement(TokenControl, {
                key: token,
                label: token,
                value: tokens[token] || '',
                onChange: (value) => updateToken(token, value),
                type: 'color'
              })
            )
          ]),
          React.createElement('div', { style: sectionStyle, key: 'text' }, [
            React.createElement('h4', { style: headerStyle, key: 'title' }, 'Text'),
            ...textTokens.map(token => 
              React.createElement(TokenControl, {
                key: token,
                label: token,
                value: tokens[token] || '',
                onChange: (value) => updateToken(token, value),
                type: 'color'
              })
            )
          ])
        ]
      : React.createElement('div', { style: sectionStyle, key: 'advanced' }, [
          React.createElement('h4', { style: headerStyle, key: 'title' }, 'Advanced Mode - All Tokens'),
          ...Object.entries(tokens).map(([key, value]) => 
            React.createElement(TokenControl, {
              key: key,
              label: key,
              value: String(value),
              onChange: (newValue) => updateToken(key, newValue),
              type: key.toLowerCase().includes('color') || 
                    key.includes('primary') || 
                    key.includes('secondary') || 
                    key.includes('surface') || 
                    key.includes('text') ? 'color' : 'text'
            })
          )
        ])
  ]);
};

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theme Controls',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => 
      React.createElement(AddonPanel, { active: active || false },
        React.createElement(ThemeControlsPanel)
      )
  });
});
