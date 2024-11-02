// ../components/ui/tabs.js
import React, { useState } from 'react';

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const clonedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsList || child.type === TabsContent) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return <div>{clonedChildren}</div>;
};

export const TabsList = ({ children, setActiveTab, activeTab }) => (
  <div className="flex space-x-4">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { setActiveTab, activeTab })
    )}
  </div>
);

export const TabsTrigger = ({ value, children, setActiveTab, activeTab }) => (
  <button
    className={`px-4 py-2 rounded ${activeTab === value ? 'bg-primary text-white' : 'bg-gray-200'}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};
