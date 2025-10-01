import dynamic from 'next/dynamic';
import Loading from './Loading';

const ComponentLazyMap = {
  Dashboard: dynamic(() => import('@/app/(dashboard)/home/page'), {
    ssr: true,
    loading: () => <Loading />,
  }),
  User: dynamic(() => import('@/app/(dashboard)/user/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  CreateUser: dynamic(() => import('@/app/(dashboard)/user/create/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  ViewUser: dynamic(() => import('@/app/(dashboard)/user/[slug]/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  Tour: dynamic(() => import('@/app/(dashboard)/tour/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  CreateTour: dynamic(() => import('@/app/(dashboard)/tour/create/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  ViewTour: dynamic(() => import('@/app/(dashboard)/tour/[slug]/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  Blog: dynamic(() => import('@/app/(dashboard)/blog/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  CreateBlog: dynamic(() => import('@/app/(dashboard)/blog/create/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  ViewBlog: dynamic(() => import('@/app/(dashboard)/blog/[slug]/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  Booking: dynamic(() => import('@/app/(dashboard)/booking/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
  ViewOrder: dynamic(() => import('@/app/(dashboard)/booking/[slug]/page'), {
    ssr: false,
    loading: () => <Loading />,
  }),
};

export default ComponentLazyMap;
