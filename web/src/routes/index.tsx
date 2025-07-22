import { createFileRoute } from '@tanstack/react-router';

import logo from '../assets/project_ida_logo.png';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="text-center flex flex-col items-center mt-16 ">
        <img
          className="w-1/2 h-auto"
          src={logo}
          alt="Project Ida logo depicting three circles overlapping"
        />
        <h1 className="text-3xl font-extrabold">Project IDA</h1>
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">
          Image Viewer
        </h2>
        <div className="flex flex-row justify-around w-1/2 my-6">
          <div className="tooltip" data-tip="Coming soon...">
            <button type="button" className="btn btn-soft btn-primary" disabled>
              Login
            </button>
          </div>
          <div className="tooltip" data-tip="Coming soon...">
            <button type="button" className="btn btn-soft" disabled>
              Upload
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
