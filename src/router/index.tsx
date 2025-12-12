import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { MorningCallList } = await import('@/features')
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
