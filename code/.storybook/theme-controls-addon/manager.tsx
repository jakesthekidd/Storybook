import React, { useState, useEffect } from 'react';
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { PRIMENG_THEMES, themeManager } from '../themes';

const ADDON_ID = 'theme-controls';
const PANEL_ID = `${ADDON_ID}/panel`;

interface TokenControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'color' | 'text' | 'select';
  options?: string[];
}

const TokenControl: React.FC<TokenControlProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  options = [] 
}) => {
  const controlStyle = {
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  };
  
  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize' as const
  };
  
  const inputStyle = {
    padding: '6px 8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace'
  };

  return (
    <div style={controlStyle}>
      <label style={labelStyle}>{label}</label>
      {type === 'color' ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px' }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  );
};

const ThemeControlsPanel: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [tokens, setTokens] = useState(PRIMENG_THEMES.light.tokens);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  useEffect(() => {
    // Listen to theme changes from toolbar
    const channel = addons.getChannel();
    const handleGlobalsUpdated = ({ globals }: any) => {
      if (globals.theme && globals.theme !== currentTheme) {
        setCurrentTheme(globals.theme);
        setTokens(PRIMENG_THEMES[globals.theme].tokens);
      }
    };
    
    channel.on('globalsUpdated', handleGlobalsUpdated);
    return () => channel.off('globalsUpdated', handleGlobalsUpdated);
  }, [currentTheme]);

  const updateToken = (key: string, value: string) => {
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

  const handleImport = async () => {
    if (!importFile) return;
    
    try {
      const text = await importFile.text();
      const imported = JSON.parse(text);
      themeManager.importTokens(imported);
      
      const themeKey = `theme.${currentTheme}`;
      if (imported[themeKey]) {
        setTokens(imported[themeKey]);
      }
    } catch (error) {
      console.error('Failed to import tokens:', error);
      alert('Failed to import tokens. Please check the file format.');
    }
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
  const layoutTokens = ['borderRadius', 'borderRadiusSmall', 'borderRadiusLarge'];
  const typographyTokens = ['fontFamily', 'fontSizeBase', 'fontSizeSmall', 'fontSizeLarge', 'fontWeightNormal', 'fontWeightMedium', 'fontWeightBold', 'lineHeight'];

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={headerStyle}>Theme Controls</h3>
        <div>
          <button 
            style={isAdvanced ? secondaryButtonStyle : buttonStyle}
            onClick={() => setIsAdvanced(false)}
          >
            Simple
          </button>
          <button 
            style={isAdvanced ? buttonStyle : secondaryButtonStyle}
            onClick={() => setIsAdvanced(true)}
          >
            Advanced
          </button>
        </div>
        <div style={{ marginTop: '12px' }}>
          <button style={secondaryButtonStyle} onClick={resetTokens}>
            Reset
          </button>
          <button style={buttonStyle} onClick={exportTokens}>
            Export JSON
          </button>
        </div>
        <div style={{ marginTop: '12px' }}>
          <input
            type="file"
            accept=".json"
            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            style={{ marginRight: '8px', fontSize: '12px' }}
          />
          <button 
            style={buttonStyle} 
            onClick={handleImport}
            disabled={!importFile}
          >
            Import
          </button>
        </div>
      </div>

      {!isAdvanced ? (
        <>
          {/* Simple Mode */}
          <div style={sectionStyle}>
            <h4 style={headerStyle}>Colors</h4>
            {colorTokens.map(token => (
              <TokenControl
                key={token}
                label={token}
                value={tokens[token] || ''}
                onChange={(value) => updateToken(token, value)}
                type="color"
              />
            ))}
          </div>

          <div style={sectionStyle}>
            <h4 style={headerStyle}>Surfaces</h4>
            {surfaceTokens.map(token => (
              <TokenControl
                key={token}
                label={token}
                value={tokens[token] || ''}
                onChange={(value) => updateToken(token, value)}
                type="color"
              />
            ))}
          </div>

          <div style={sectionStyle}>
            <h4 style={headerStyle}>Text</h4>
            {textTokens.map(token => (
              <TokenControl
                key={token}
                label={token}
                value={tokens[token] || ''}
                onChange={(value) => updateToken(token, value)}
                type="color"
              />
            ))}
          </div>

          <div style={sectionStyle}>
            <h4 style={headerStyle}>Layout</h4>
            {layoutTokens.map(token => (
              <TokenControl
                key={token}
                label={token}
                value={tokens[token] || ''}
                onChange={(value) => updateToken(token, value)}
              />
            ))}
          </div>

          <div style={sectionStyle}>
            <h4 style={headerStyle}>Typography</h4>
            {typographyTokens.map(token => (
              <TokenControl
                key={token}
                label={token}
                value={tokens[token] || ''}
                onChange={(value) => updateToken(token, value)}
              />
            ))}
          </div>
        </>
      ) : (
        <div style={sectionStyle}>
          <h4 style={headerStyle}>Advanced Mode - All Tokens</h4>
          {Object.entries(tokens).map(([key, value]) => (
            <TokenControl
              key={key}
              label={key}
              value={String(value)}
              onChange={(newValue) => updateToken(key, newValue)}
              type={key.toLowerCase().includes('color') || key.includes('primary') || key.includes('secondary') || key.includes('surface') || key.includes('text') ? 'color' : 'text'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Register the addon
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theme Controls',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => (
      <AddonPanel active={active || false}>
        <ThemeControlsPanel />
      </AddonPanel>
    ),
  });
});
