import Overview from '@@/components/icons/overview';
import Bag from '@@/components/icons/bag';
import Calendar from '@@/components/icons/calendar';
import Inventory from '@@/components/icons/inventory';
import Star from '@@/components/icons/star';

interface SideBarLinks {
  key: number;
  url: string;
  title: string;
  icon: any;
}

export const SideBarLinks: SideBarLinks[] = [
  {
    key: 1,
    url: '/dashboard',
    title: 'Overview',
    icon: <Overview />,
  },
  {
    key: 2,
    url: '/dashboard',
    title: 'Sales',
    icon: <Bag />,
  },
  {
    key: 3,
    url: '/dashboard',
    title: 'Customers',
    icon: <Calendar />,
  },
  {
    key: 4,
    url: '/dashboard',
    title: 'Inventory',
    icon: <Inventory />,
  },
  {
    key: 5,
    url: '/dashboard',
    title: 'Profit/Loss',
    icon: <Star />,
  },
];
