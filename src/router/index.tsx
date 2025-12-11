import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { MorningCallList } = await import('@/features/morningCall')
      return { Component: MorningCallList }
    },
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
