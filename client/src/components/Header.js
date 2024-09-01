// components/Header.js
export function Header() {
    return (
      <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Tender Management</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Profile</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
        </div>
      </header>
    );
  }
  