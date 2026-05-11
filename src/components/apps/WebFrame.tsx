import React from 'react';

export const WebFrame: React.FC<{url: string}> = ({ url }) => (
  <div className="w-full h-full"><iframe src={url} className="w-full h-full" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" title="app" style={{background:'#111'}}/></div>
);
