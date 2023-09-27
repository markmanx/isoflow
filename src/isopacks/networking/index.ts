import type { IconInput } from 'src/types';
import Cache from './icons/cache.svg';
import CardTerminal from './icons/cardterminal.svg';
import Cloud from './icons/cloud.svg';
import Cronjob from './icons/cronjob.svg';
import Desktop from './icons/desktop.svg';
import Dns from './icons/dns.svg';
import Firewall from './icons/firewall.svg';
import Function from './icons/function.svg';
import Laptop from './icons/laptop.svg';
import LoadBalancer from './icons/loadbalancer.svg';
import Lock from './icons/lock.svg';
import Mail from './icons/mail.svg';
import MailMultiple from './icons/mailmultiple.svg';
import MobileDevice from './icons/mobiledevice.svg';
import Office from './icons/office.svg';
import Package from './icons/package.svg';
import PaymentCard from './icons/paymentcard.svg';
import Printer from './icons/printer.svg';
import Queue from './icons/queue.svg';
import Router from './icons/router.svg';
import Server from './icons/server.svg';
import Speech from './icons/speech.svg';
import Storage from './icons/storage.svg';
import Switch from './icons/switch.svg';
import User from './icons/user.svg';
import VM from './icons/vm.svg';

const category = 'Networking';

const networkingIsopack: IconInput[] = [
  {
    id: 'cache',
    name: 'Cache',
    url: Cache.toString(),
    category
  },
  {
    id: 'cardterminal',
    name: 'Card Terminal',
    url: CardTerminal.toString(),
    category
  },
  {
    id: 'cloud',
    name: 'Cloud',
    url: Cloud.toString(),
    category
  },
  {
    id: 'cronjob',
    name: 'Cronjob',
    url: Cronjob.toString(),
    category
  },
  {
    id: 'desktop',
    name: 'Desktop',
    url: Desktop.toString(),
    category
  },
  {
    id: 'dns',
    name: 'DNS',
    url: Dns.toString(),
    category
  },
  {
    id: 'firewall',
    name: 'Firewall',
    url: Firewall.toString(),
    category
  },
  {
    id: 'function',
    name: 'Function',
    url: Function.toString(),
    category
  },
  {
    id: 'laptop',
    name: 'Laptop',
    url: Laptop.toString(),
    category
  },
  {
    id: 'loadbalancer',
    name: 'Load balancer',
    url: LoadBalancer.toString(),
    category
  },
  {
    id: 'lock',
    name: 'Lock',
    url: Lock.toString(),
    category
  },
  {
    id: 'mail',
    name: 'Mail',
    url: Mail.toString(),
    category
  },
  {
    id: 'mailmultiple',
    name: 'Mail multiple',
    url: MailMultiple.toString(),
    category
  },
  {
    id: 'mobiledevice',
    name: 'Mobile device',
    url: MobileDevice.toString(),
    category
  },
  {
    id: 'office',
    name: 'Office',
    url: Office.toString(),
    category
  },
  {
    id: 'package',
    name: 'Package',
    url: Package.toString(),
    category
  },
  {
    id: 'paymentcard',
    name: 'Payment card',
    url: PaymentCard.toString(),
    category
  },
  {
    id: 'printer',
    name: 'Printer',
    url: Printer.toString(),
    category
  },
  {
    id: 'queue',
    name: 'Queue',
    url: Queue.toString(),
    category
  },
  {
    id: 'router',
    name: 'Router',
    url: Router.toString(),
    category
  },
  {
    id: 'server',
    name: 'Server',
    url: Server.toString(),
    category
  },
  {
    id: 'speech',
    name: 'Speech',
    url: Speech.toString(),
    category
  },
  {
    id: 'storage',
    name: 'Storage',
    url: Storage.toString(),
    category
  },
  {
    id: 'switch',
    name: 'Switch',
    url: Switch.toString(),
    category
  },
  {
    id: 'user',
    name: 'User',
    url: User.toString(),
    category
  },
  {
    id: 'vm',
    name: 'Virtual machine',
    url: VM.toString(),
    category
  }
];

export default networkingIsopack;
