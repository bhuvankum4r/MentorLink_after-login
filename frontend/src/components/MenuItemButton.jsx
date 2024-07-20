export const MenuItemButton = ({ label,name, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-left"
      name={name}
      onClick={onClick}
    >
        {label}
    </button>
  );
};
