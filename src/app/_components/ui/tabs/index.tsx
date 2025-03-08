import { useEffect, useState } from "react";

export type TabsItem = {
  key: React.Key;
  label: string;
  children: React.ReactNode;
};

export type TabsProps = {
  activeTab?: React.Key;
  onTabChange?: (tab: React.Key) => void;
  items: TabsItem[];
};

export const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState<React.Key>();

  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab]);

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {props.items.map((item) => (
          <button
            key={item.key}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === item.key
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => {
              if (props.onTabChange) {
                props.onTabChange(item.key);
              }
              setActiveTab(item.key);
            }}
            aria-selected={activeTab === item.key}
            role="tab"
            id={`${item.key}-tab`}
            aria-controls={`${item.key}-panel`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Summary Tab Panel */}
        {props.items.map((item) => (
          <div
            key={item.key}
            role="tabpanel"
            id={`${item.key}-panel`}
            aria-labelledby={`${item.key}-tab`}
            className={activeTab === item.key ? "block" : "hidden"}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
};
