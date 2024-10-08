const TabSwitcher = ({ activeTab, setActiveTab, tabs, widen }) => {
  return (
    <div className="flex font-semibold border-b-4 border-b-yellow-500">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`px-3 py-1 rounded-t-xl ${
            activeTab === tab ? "bg-yellow-500" : ""
          } ${widen && 'flex-1 text-center'} cursor-pointer`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;
