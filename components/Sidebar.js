// Sidebar.js

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-1/4 min-h-screen p-6 bg-gray-800 text-white">
      <h2 className="text-2xl font-semibold mb-6">Navigation</h2>
      <ul>
        <li className="mb-4">
          <Link href="/feedback-list" className="hover:text-accent">
            Feedback List
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/feedback-form" className="hover:text-accent">
            Submit Feedback
          </Link>
        </li>
        <li>
          <Link href="/feedback-graph" className="hover:text-accent">
            Feedback Chart
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
