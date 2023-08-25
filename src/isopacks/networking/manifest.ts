import type { SceneInput } from 'src/types';
import { createCategoryIcon } from '../utils';
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

const createIcon = createCategoryIcon('Networking');

export const networkingIsopack: SceneInput['icons'] = [
  createIcon({
    id: 'cache',
    name: 'Cache',
    url: Cache
  }),
  createIcon({
    id: 'cardterminal',
    name: 'Card Terminal',
    url: CardTerminal
  }),
  createIcon({
    id: 'cloud',
    name: 'Cloud',
    url: Cloud
  }),
  createIcon({
    id: 'cronjob',
    name: 'Cronjob',
    url: Cronjob
  }),
  createIcon({
    id: 'desktop',
    name: 'Desktop',
    url: Desktop
  }),
  createIcon({
    id: 'dns',
    name: 'DNS',
    url: Dns
  }),
  createIcon({
    id: 'firewall',
    name: 'Firewall',
    url: Firewall
  }),
  createIcon({
    id: 'function',
    name: 'Function',
    url: Function
  }),
  createIcon({
    id: 'laptop',
    name: 'Laptop',
    url: Laptop
  }),
  createIcon({
    id: 'loadbalancer',
    name: 'Load balancer',
    url: LoadBalancer
  }),
  createIcon({
    id: 'lock',
    name: 'Lock',
    url: Lock
  }),
  createIcon({
    id: 'mail',
    name: 'Mail',
    url: Mail
  }),
  createIcon({
    id: 'mailmultiple',
    name: 'Mail multiple',
    url: MailMultiple
  }),
  createIcon({
    id: 'mobiledevice',
    name: 'Mobile device',
    url: MobileDevice
  }),
  createIcon({
    id: 'office',
    name: 'Office',
    url: Office
  }),
  createIcon({
    id: 'package',
    name: 'Package',
    url: Package
  }),
  createIcon({
    id: 'paymentcard',
    name: 'Payment card',
    url: PaymentCard
  }),
  createIcon({
    id: 'printer',
    name: 'Printer',
    url: Printer
  }),
  createIcon({
    id: 'queue',
    name: 'Queue',
    url: Queue
  }),
  createIcon({
    id: 'router',
    name: 'Router',
    url: Router
  }),
  createIcon({
    id: 'server',
    name: 'Server',
    url: Server
  }),
  createIcon({
    id: 'speech',
    name: 'Speech',
    url: Speech
  }),
  createIcon({
    id: 'storage',
    name: 'Storage',
    url: Storage
  }),
  createIcon({
    id: 'switch',
    name: 'Switch',
    url: Switch
  }),
  createIcon({
    id: 'user',
    name: 'User',
    url: User
  }),
  createIcon({
    id: 'vm',
    name: 'Virtual machine',
    url: VM
  })
];
