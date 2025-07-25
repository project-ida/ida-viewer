import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="w-page min-h-page">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
