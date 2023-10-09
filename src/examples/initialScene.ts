/* eslint-disable import/no-extraneous-dependencies */
import { InitialScene } from 'src/Isoflow';
import { flattenCollections } from '@isoflow/isopacks/dist/utils';
import isoflowIsopack from '@isoflow/isopacks/dist/isoflow';
import awsIsopack from '@isoflow/isopacks/dist/aws';
import gcpIsopack from '@isoflow/isopacks/dist/gcp';
import azureIsopack from '@isoflow/isopacks/dist/azure';
import kubernetesIsopack from '@isoflow/isopacks/dist/kubernetes';

const isopacks = flattenCollections([
  isoflowIsopack,
  awsIsopack,
  azureIsopack,
  gcpIsopack,
  kubernetesIsopack
]);

// The data used in this visualisation example has been derived from the following blog post
// https://www.altexsoft.com/blog/travel/airport-technology-management-operations-software-solutions-and-vendors/

export const initialScene: InitialScene = {
  title: 'Airport Management Software',
  zoom: 0.4,
  icons: isopacks,
  nodes: [
    {
      id: 'b6cf011d-0bc2-474d-8a4b-022d24ecc5d5',
      tile: { x: 0, y: 0 },
      label: 'Airport Operational Database',
      description:
        '<p>Each airport has its own central database that stores and updates all necessary data regarding daily flights, seasonal schedules, available resources, and other flight-related information, like billing data and flight fees. AODB is a key feature for the functioning of an airport.</p><p><br></p><p>This database is connected to the rest of the airport modules: <em>airport information systems, revenue management systems, and air traffic management</em>.</p><p><br></p><p>The system can supply different information for different segments of users: passengers, airport staff, crew, or members of specific departments, authorities, business partners, or police.</p><p><br></p><p>AODB represents the information on a graphical display.</p><p><br></p><p><strong>AODB functions include:</strong></p><p>- Reference-data processing</p><p>- Seasonal scheduling</p><p>- Daily flight schedule processing</p><p>- Processing of payments</p>',
      labelHeight: 140,
      icon: 'storage'
    },
    {
      id: '815b0205-516c-48a9-ac34-2007bb155d75',
      tile: { x: 11, y: 3 },
      label: 'Apron handling',
      description:
        '<p>Apron (or ground handling) deals with aircraft servicing. This includes passenger boarding and guidance, cargo and mail loading, and apron services. Apron services include aircraft guiding, cleaning, drainage, deicing, catering, and fueling. At this stage, the software facilitates dealing with information about the weight of the baggage and cargo load, number of passengers, boarding bridges parking, and the ground services that must be supplied to the aircraft. By entering this information into the system, their costs can be calculated and invoiced through the billing system.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '085f81b9-651d-47a1-94ec-c4cd02bb08c4',
      tile: { x: 11, y: 0 },
      label: 'ATC Tower',
      description:
        '<p>The Air Traffic Control Tower is a structure that delivers air and ground control of the aircraft. It ensures safety by guiding and navigating the vehicles and aircraft. It is performed by way of visual signaling, radar, and radio communication in the air and on the ground. The main focus of the tower is to make sure that all aircraft have been assigned to the right place, that passengers aren’t at risk, and that the aircraft will have a suitable passenger boarding bridge allocated on the apron.</p><p>The ATC tower has a control room that serves as a channel between landside (terminal) and airside operations in airports. The control room personnel are tasked with ensuring the security and safety of the passengers as well as ground handling. Usually, a control room has CCTV monitors and air traffic control systems that maintain the order in the terminal and on the apron.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: 'e4909db0-da09-49a3-8cfd-927ce191c28d',
      tile: { x: 11, y: -3 },
      label: 'Aeronautical Fixed Telecommunication Network (AFTN) Systems',
      description:
        '<p>AFTN Systems handle communication and exchange of data including navigation services. Usually, airports exchange traffic environment messages, safety messages, information about the weather, geographic material, disruptions, etc. They serve as communication between airports and aircraft.</p><p>Software for aeronautical telecommunications stores flight plans and flight information, entered in ICAO format and UTC. The information stored can be used for planning and statistical purposes. For airports, it’s important to understand the aircraft type and its weight to assign it to the right place on the runway. AFTN systems hold the following information:</p><p><br></p><p>- Aircraft registration</p><p>- Runway used</p><p>- Actual time of landing and departure</p><p>- Number of circuits</p><p>- Number and type of approaches</p><p>- New estimates of arrival and departure</p><p>- New flight information</p><p><br></p><p>Air traffic management is performed from an ATC tower.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '680a2ad0-839f-4cfc-8b35-24c557fa1e8f',
      tile: { x: -9, y: -5 },
      label: 'Passenger facilitation services',
      description:
        '<p>include passenger processing (check-in, boarding, border control) and baggage handling (tagging, dropping and handling). They follow passengers to the shuttle buses to carry them to their flights. Arrival operations include boarding control and baggage handling.</p>',
      labelHeight: 120,
      icon: 'user'
    },
    {
      id: '8277f135-e833-40b3-8232-0461b86added',
      tile: { x: -9, y: 5 },
      label: 'Terminal management systems',
      description:
        '<p>The software Includes maintenance and monitoring of management systems for assets, buildings, electrical grids, environmental systems, and vertical transportation organization. It also facilitates staff communications and management.</p>',
      labelHeight: 120,
      icon: 'function-module'
    },
    {
      id: 'ca560fc6-da8b-49cc-b4eb-fdc300ff6aed',
      tile: { x: -9, y: 9 },
      label: 'Maintenance and monitoring',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '8f02ce50-0aa4-4950-b077-c1daf5da023b',
      tile: { x: -12, y: 9 },
      label: 'Resource management',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '308dfac4-fc9a-4985-9b5c-9616e0674ac4',
      tile: { x: -15, y: 9 },
      label: 'Staff management',
      description:
        '<p>Staff modules provide the necessary information about ongoing processes in the airport, such as data on flights (in ICAO or UTC formats) and other important events to keep responsible staff members updated. Information is distributed through the airport radio system, or displayed on a PC connected via the airport LAN or on mobile devices.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '2420494b-312a-4ddf-b8c3-591fa55563cb',
      tile: { x: -9, y: -10 },
      label: 'Border control',
      description:
        '<p><strong>Customs and security services. </strong>In airports, security services usually unite perimeter security, terminal security, and border controls. These services require biometric authentication and integration into government systems to allow a customs officer to view the status of a passenger.</p>',
      labelHeight: 60,
      icon: 'block'
    },
    {
      id: '2557a6bd-0c92-4522-b704-f1f6d076be80',
      tile: { x: -12, y: -10 },
      label: 'Common use services',
      description:
        '<p><strong>(self-service check-in systems).&nbsp;</strong>An airport must ensure smooth passenger flow. Various&nbsp;<a href="https://www.altexsoft.com/blog/travel/how-airline-industry-streamlines-check-in-and-boarding-with-digital-self-services/" rel="noopener noreferrer" target="_blank">digital self-services</a>, like check-in kiosks or automated self-service gates, make it happen. Self-service options, especially check-in kiosks, remain popular. Worldwide in 2018, passengers used kiosks to check themselves in&nbsp;<a href="https://www.statista.com/statistics/617396/self-service-passenger-check-in/" rel="noopener noreferrer" target="_blank">88 percent of the time</a>.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: '7c422bf4-bbd2-4364-ad9b-5250c2877695',
      tile: { x: -15, y: -10 },
      label: 'Baggage handling',
      description:
        '<p>Obviously, a passenger must check a bag before it’s loaded on the aircraft. The time the baggage is loaded is displayed and tracked until the destination is reached and the bag is returned to the owners.</p>',
      labelHeight: 80,
      icon: 'block'
    },
    {
      id: 'fd5dd3ed-b8de-41ed-a642-b8bd71aaebf8',
      tile: { x: 5, y: 0 },
      label: 'Airside operations',
      description:
        '<p>include systems to handle aircraft landing and navigation, airport traffic management, runway management, and ground handling safety.</p>',
      labelHeight: 100,
      icon: 'plane'
    },
    {
      id: 'cb6b557e-01c8-4208-88f8-2076351aa53c',
      tile: { x: 0, y: -5 },
      label: 'Invoicing and billing',
      description:
        '<p>Each flight an airport handles generates a defined revenue for the airport paid by the airline operating the aircraft. Aeronautical invoicing systems make payment possible for any type and size of aircraft. It accepts payments in cash and credit in multiple currencies. The billing also extends to ATC services.</p><p><br></p><p>Depending on the aircraft type and weight and ground services provided, an airport can calculate the aeronautical fee and issue an invoice with a bill.&nbsp;It is calculated using the following data:</p><p><br></p><p>- Aircraft registration</p><p>- Parking time at the airport</p><p>- Airport point of departure and/or landing</p><p>- Times at the different points of entry or departure</p><p><br></p><p>The data is entered or integrated from ATC. Based on this information, the airport calculates the charges and sends the bills.</p>',
      labelHeight: 80,
      icon: 'paymentcard'
    },
    {
      id: '1789808d-6d52-4714-aeea-954f3e4aba66',
      tile: { x: -2, y: -11 },
      label: 'ATC Tower Billing',
      labelHeight: 60,
      icon: 'block'
    },
    {
      id: '5096a0f1-7548-4cba-8477-7f07e3bdc206',
      tile: { x: 2, y: -11 },
      label: 'Non Aeronautical revenue',
      labelHeight: 60,
      icon: 'block'
    },
    {
      id: '0e1ecd31-ee64-49b9-a5be-3375bd3cece6',
      tile: { x: 3, y: 13 },
      label: 'Automatic Terminal Information Service (ATIS)',
      description:
        '<p>broadcasts the weather reports, the condition of the runway, or other local information for pilots and crews.</p><p>Some airport software vendors offer off-the-shelf solutions to facilitate particular tasks, like maintenance, or airport operations. However, most of them provide integrated systems that comprise modules for several operations. Let’s look at some of them.</p>',
      labelHeight: 100,
      icon: 'block'
    },
    {
      id: 'b0368dfe-cc6e-405a-9471-0867c4c51d08',
      tile: { x: 0, y: 13 },
      label: 'Flight Information Display Systems (FIDS)',
      description:
        '<p>exhibit the status of boarding, gates, aircraft, flight number, and other flight details.&nbsp;A computer controls the screens that are connected to the data management systems and display up-to-date information about flights in real time. Some airports have a digital FIDS in the form of apps or on their websites. Also, the displays may show other public information such as the weather, news, safety messages, menus, and advertising. Airports can choose the type, languages, and means of entering the information, whether it be manually or loaded from a central database.</p>',
      labelHeight: 100,
      icon: 'block'
    },
    {
      id: '9f1417b9-8785-498b-bb4e-4ee9a827e611',
      tile: { x: -3, y: 13 },
      label: 'Public address (PA) systems',
      description:
        '<p>inform passengers and airport staff about any changes and processes of importance, for instance, gates, times of arrival, calls, and alerts. Also, information can be communicated to pilots, aircraft staff, crew, etc. PA systems usually include voice messages broadcasted through loudspeakers.</p>',
      labelHeight: 100,
      icon: 'block'
    },
    {
      id: '7f9e0f95-b490-4e03-99c7-8df10788d6df',
      tile: { x: 0, y: 6 },
      label: 'Information management',
      description:
        '<p>relates to the collection and distribution of daily flight information, storing of seasonal and arrival/departure information, as well as the connection with airlines.</p>',
      labelHeight: 80,
      icon: 'queue'
    },
    {
      id: 'bf5b31ed-97fc-4e23-9ccf-107ba9f1bb58',
      tile: { x: -5, y: 0 },
      label: 'Landside operations',
      description:
        '<p>are aimed at serving passengers and maintenance of terminal buildings, parking facilities, and vehicular traffic circular drives. Passenger operations include baggage handling and tagging. Terminal operations comprise resource allocation and staff management.</p>',
      labelHeight: 180,
      icon: 'office'
    }
  ],
  connectors: [
    {
      id: 'be41366a-be8e-43f5-a85c-1528cc380b70',
      color: '#a0b9f8',
      anchors: [
        {
          id: '612d1f4e-588e-468e-a819-9e9b5528abe2',
          ref: { node: '308dfac4-fc9a-4985-9b5c-9616e0674ac4' }
        },
        {
          id: '82ce8f7c-1315-4bae-9966-435a3504de9a',
          ref: { tile: { x: -15, y: 7 } }
        }
      ]
    },
    {
      id: '42ca703f-42cd-489c-adb5-1bda300018dd',
      color: '#a0b9f8',
      anchors: [
        {
          id: '0a2db998-6774-49c3-ae50-c889a5aa59d2',
          ref: { node: '7c422bf4-bbd2-4364-ad9b-5250c2877695' }
        },
        {
          id: '7305cdb4-cc0e-4393-b094-3aa028ce985f',
          ref: { tile: { x: -15, y: -7 } }
        }
      ]
    },
    {
      id: 'be678975-abc7-4345-82b3-2e829486fe3c',
      color: '#a0b9f8',
      anchors: [
        {
          id: '4d4868ff-53df-414b-b51f-2de31fd125e6',
          ref: { tile: { x: -9, y: -7 } }
        },
        {
          id: 'bec7a569-6f1f-46f8-8ddf-b6ace6354f88',
          ref: { node: '680a2ad0-839f-4cfc-8b35-24c557fa1e8f' }
        }
      ]
    },
    {
      id: 'b155cdd6-da92-4553-b295-3c1a3262169d',
      color: '#a0b9f8',
      anchors: [
        {
          id: '80a0fa48-f4b2-46e7-8ede-0c725a279b52',
          ref: { node: 'ca560fc6-da8b-49cc-b4eb-fdc300ff6aed' }
        },
        {
          id: '6681a140-8535-4c14-ab87-656476c81c06',
          ref: { tile: { x: -9, y: 7 } }
        }
      ]
    },
    {
      id: '7de0c574-1b29-4869-9691-b68080e8b2da',
      color: '#a0b9f8',
      anchors: [
        {
          id: '63f6e718-f410-4171-9e85-8321184d103d',
          ref: { node: '2420494b-312a-4ddf-b8c3-591fa55563cb' }
        },
        {
          id: '9684dbd3-8fe8-441f-9b73-2f35a554b87e',
          ref: { tile: { x: -9, y: -7 } }
        }
      ]
    },
    {
      id: '1b3bcf33-ca67-461b-8f80-a70eba87e6ab',
      color: '#a0b9f8',
      anchors: [
        {
          id: 'b1d4cc02-056d-4a06-bb93-932c8630c7a0',
          ref: { tile: { x: -9, y: -7 } }
        },
        {
          id: 'e7b2facb-c137-49f1-acdd-095739b51e05',
          ref: { tile: { x: -15, y: -7 } }
        }
      ]
    },
    {
      id: '87b538b5-e908-495d-bb12-05f068f1b6ee',
      color: '#a0b9f8',
      anchors: [
        {
          id: 'ca0d0583-8d87-4365-ae77-e420ae6a25cf',
          ref: { node: '2557a6bd-0c92-4522-b704-f1f6d076be80' }
        },
        {
          id: 'a5a1520b-5914-414e-82aa-5ebdf3fbda16',
          ref: { tile: { x: -12, y: -7 } }
        }
      ]
    },
    {
      id: 'eb44bfe6-66c3-492c-949c-3f8faba4c455',
      color: '#a0b9f8',
      anchors: [
        {
          id: '54d16963-57ad-4252-ae54-42417c4116a5',
          ref: { node: '8277f135-e833-40b3-8232-0461b86added' }
        },
        {
          id: '24eacb98-43cf-4e4c-8e4e-453247edfafc',
          ref: { tile: { x: -9, y: 7 } }
        },
        {
          id: '95c2eca2-c3ce-4fb3-abac-241ccd7a2f56',
          ref: { tile: { x: -15, y: 7 } }
        }
      ]
    },
    {
      id: '110033ad-b542-4415-bb95-6bad8de33198',
      color: '#a0b9f8',
      anchors: [
        {
          id: '9ccd7127-1ed6-4ac0-9fcd-31e17c306987',
          ref: { node: '8f02ce50-0aa4-4950-b077-c1daf5da023b' }
        },
        {
          id: '4c4f7d59-2b06-46cc-8eed-f3cd2b2af9b3',
          ref: { tile: { x: -12, y: 7 } }
        }
      ]
    },
    {
      id: 'f7b5f65c-0503-479b-983d-6b3be7d4355b',
      color: '#bbadfb',
      anchors: [
        {
          id: 'fbeb8d12-597a-4654-92f4-41006b57beb8',
          ref: { node: '815b0205-516c-48a9-ac34-2007bb155d75' }
        },
        {
          id: '6f88cf82-23d9-4d95-9823-3c76b1956c9c',
          ref: { tile: { x: 9, y: 3 } }
        }
      ]
    },
    {
      id: '1c7ccb81-9f31-4cc3-90ee-2f92c4be1e8f',
      color: '#bbadfb',
      anchors: [
        {
          id: '199f843d-f8ce-4a26-b71a-1b4f799109a9',
          ref: { node: 'e4909db0-da09-49a3-8cfd-927ce191c28d' }
        },
        {
          id: 'd2d63da6-a60a-4569-af9f-5d497013bd8e',
          ref: { tile: { x: 9, y: -3 } }
        }
      ]
    },
    {
      id: '48435cd4-297f-4078-b5d4-79209babaa0f',
      color: '#bbadfb',
      anchors: [
        {
          id: '9316ac7f-7913-489e-8516-fb74eb9aed9c',
          ref: { tile: { x: 9, y: 3 } }
        },
        {
          id: 'd53e7165-c645-4e8f-b4c7-84ebc4369f4a',
          ref: { tile: { x: 9, y: 0 } }
        },
        {
          id: '01860aaf-3b57-45f2-b833-15fcafdd4abb',
          ref: { tile: { x: 9, y: -3 } }
        }
      ]
    },
    {
      id: '1a58a13e-d136-4c99-a111-143097873147',
      color: '#bbadfb',
      anchors: [
        {
          id: 'fe873a58-afdc-4c8b-b89c-b01332e6264b',
          ref: { node: '085f81b9-651d-47a1-94ec-c4cd02bb08c4' }
        },
        {
          id: '93286249-0ee8-4a0d-ae09-c17736b0535f',
          ref: { tile: { x: 9, y: 0 } }
        }
      ]
    },
    {
      id: '3abc77ea-357b-4671-95a7-6b17e0219032',
      color: '#b3e5e3',
      anchors: [
        {
          id: '0077477a-8978-48dc-9051-51f9322519bc',
          ref: { node: '9f1417b9-8785-498b-bb4e-4ee9a827e611' }
        },
        {
          id: 'e69310e4-f794-4771-aa5f-39291aa090ef',
          ref: { tile: { x: -3, y: 11 } }
        }
      ]
    },
    {
      id: '75200d73-06f4-4403-923f-32f0041c9701',
      color: '#b3e5e3',
      anchors: [
        {
          id: '9f5616ae-e638-40af-ba0b-b25f6adae2f7',
          ref: { node: '0e1ecd31-ee64-49b9-a5be-3375bd3cece6' }
        },
        {
          id: 'e86b8651-a385-4a96-90cc-2ed2b6daa9f2',
          ref: { tile: { x: 3, y: 11 } }
        }
      ]
    },
    {
      id: '4a7ccc74-f296-4d0b-be11-8117c990795d',
      color: '#fad6ac',
      anchors: [
        {
          id: '7b721b82-220d-45f6-87d4-479c1b847a60',
          ref: { node: 'b6cf011d-0bc2-474d-8a4b-022d24ecc5d5' }
        },
        {
          id: '1908c227-8066-4c8d-ba55-d5822c224d52',
          ref: { node: '7f9e0f95-b490-4e03-99c7-8df10788d6df' }
        }
      ]
    },
    {
      id: '9f6bc159-507f-4b56-9171-d95f00490230',
      color: '#a0b9f8',
      anchors: [
        {
          id: 'b41f10e5-5d29-4cee-8102-0005cf146300',
          ref: { node: '8277f135-e833-40b3-8232-0461b86added' }
        },
        {
          id: '3f5bfd1b-f8b3-4a00-976e-6bc4382749ee',
          ref: { tile: { x: -9, y: 0 } }
        },
        {
          id: '3792f3db-edd1-4d43-9f16-0be811687c85',
          ref: { node: 'bf5b31ed-97fc-4e23-9ccf-107ba9f1bb58' }
        }
      ]
    },
    {
      id: '5b47caae-fbdd-4d1b-8cc5-0068536fb8b2',
      color: '#a0b9f8',
      anchors: [
        {
          id: '16ba31e6-a713-403d-b23e-4c40b19e7d66',
          ref: { node: '680a2ad0-839f-4cfc-8b35-24c557fa1e8f' }
        },
        {
          id: '59675d93-8ad7-4abd-85d4-cfe0004384c1',
          ref: { tile: { x: -9, y: 0 } }
        },
        {
          id: '1ab79aec-2587-47eb-9b2f-42e9eb44fe77',
          ref: { node: 'bf5b31ed-97fc-4e23-9ccf-107ba9f1bb58' }
        }
      ]
    },
    {
      id: 'a6c63183-ce9a-4d54-9487-569f2a8a8add',
      color: '#fad6ac',
      anchors: [
        {
          id: '8a2d4f72-5f62-4531-b2f7-b0eed5e533a5',
          ref: { node: 'bf5b31ed-97fc-4e23-9ccf-107ba9f1bb58' }
        },
        {
          id: 'ab054b9f-7574-4195-9465-c4a127b8e03e',
          ref: { node: 'b6cf011d-0bc2-474d-8a4b-022d24ecc5d5' }
        }
      ]
    },
    {
      id: 'afa7915a-c1f6-4f40-87c0-ace0ecacf5bb',
      color: '#b3e5e3',
      anchors: [
        {
          id: '2b18ab38-7f76-4e63-ae79-ca6cfaa2ee49',
          ref: { tile: { x: -3, y: 11 } }
        },
        {
          id: 'a926bd20-a16e-4349-8e31-bb4109ab0387',
          ref: { tile: { x: 3, y: 11 } }
        }
      ]
    },
    {
      id: 'c1263273-a57c-4e0b-92b8-04c21b805b29',
      color: '#b3e5e3',
      anchors: [
        {
          id: 'b1ee48ad-70f7-44ff-9d84-b3893ce3dff1',
          ref: { node: 'b0368dfe-cc6e-405a-9471-0867c4c51d08' }
        },
        {
          id: 'e6148182-5a09-4e0a-85f4-1389dfb33f8b',
          ref: { tile: { x: 0, y: 11 } }
        }
      ]
    },
    {
      id: '5706f58e-6b29-4ec7-aa0b-c59ce6198870',
      color: '#b3e5e3',
      anchors: [
        {
          id: '5a8e0e07-7e0c-40eb-b50c-bba2a2403c2f',
          ref: { tile: { x: 0, y: 11 } }
        },
        {
          id: 'b3611f56-35c2-4cc3-8dc6-461c182937e5',
          ref: { node: '7f9e0f95-b490-4e03-99c7-8df10788d6df' }
        }
      ]
    },
    {
      id: '17547863-f8f3-4653-92ec-f76d3ec0835f',
      color: '#fad6ac',
      anchors: [
        {
          id: '0445d65f-05b4-47cf-9163-dd0d6eefa4af',
          ref: { node: 'b6cf011d-0bc2-474d-8a4b-022d24ecc5d5' }
        },
        {
          id: 'e77a4942-1625-4893-a4f5-634dbc528321',
          ref: { node: 'fd5dd3ed-b8de-41ed-a642-b8bd71aaebf8' }
        }
      ]
    },
    {
      id: '2656820b-e1fb-41fd-980f-7b94d6e9906e',
      color: '#bbadfb',
      anchors: [
        {
          id: '2717739f-a2d4-44cf-bc45-5d8ae8bb67dd',
          ref: { node: 'fd5dd3ed-b8de-41ed-a642-b8bd71aaebf8' }
        },
        {
          id: 'b0399a5a-3bc3-4864-aa1b-c2194437f644',
          ref: { tile: { x: 9, y: 0 } }
        }
      ]
    },
    {
      id: 'e9f0546e-d2f3-4ae3-b6dd-55d3cf774093',
      color: '#a8dc9d',
      anchors: [
        {
          id: '7cca17bf-700b-4192-be94-7b347b73a77a',
          ref: { node: '1789808d-6d52-4714-aeea-954f3e4aba66' }
        },
        {
          id: '6e8d5fb2-b995-4e0e-9465-b664ea793f50',
          ref: { tile: { x: -2, y: -9 } }
        }
      ]
    },
    {
      id: '6dce44fd-0fb5-4a08-9daa-1716313c59d8',
      color: '#a8dc9d',
      anchors: [
        {
          id: '5a3751f2-bd9f-4ddc-808a-f0f23a2eecd8',
          ref: { node: '5096a0f1-7548-4cba-8477-7f07e3bdc206' }
        },
        {
          id: '0f6673bf-b5c4-4e1b-b3aa-bcdca9f24e81',
          ref: { tile: { x: 2, y: -9 } }
        }
      ]
    },
    {
      id: '725419a0-6ca4-4d1b-b6a4-a7ae7feabcb0',
      color: '#fad6ac',
      anchors: [
        {
          id: 'dfdda749-2f06-4a32-903e-35e336d3842d',
          ref: { node: 'b6cf011d-0bc2-474d-8a4b-022d24ecc5d5' }
        },
        {
          id: '354700b6-6b10-49cb-a943-f2eeb8e4741b',
          ref: { node: 'cb6b557e-01c8-4208-88f8-2076351aa53c' }
        }
      ]
    },
    {
      id: '41431713-1647-4b47-b258-9d3ec4665b77',
      color: '#a8dc9d',
      anchors: [
        {
          id: 'f579ae26-9023-4041-ba62-33da290ca83f',
          ref: { tile: { x: 2, y: -9 } }
        },
        {
          id: '2a123a41-1481-4c87-9aca-89a819ee4478',
          ref: { tile: { x: -2, y: -9 } }
        }
      ]
    },
    {
      id: '3410464e-d12b-4cf2-bdc4-9eb338ea1c1a',
      color: '#a8dc9d',
      anchors: [
        {
          id: '832bad08-bd8a-4a57-b849-016b0482138c',
          ref: { node: 'cb6b557e-01c8-4208-88f8-2076351aa53c' }
        },
        {
          id: 'fe2422cd-1ced-4f4a-a79c-a9f052977cc5',
          ref: { tile: { x: 0, y: -9 } }
        }
      ]
    }
  ],
  textBoxes: [
    {
      id: '29e365cf-5f40-4355-8a2d-db45a509b140',
      orientation: 'Y',
      fontSize: 0.6,
      tile: { x: -1, y: -2 },
      text: 'AODB'
    },
    {
      id: '40964f5b-7ebd-4c0d-9666-f8ff2de65dc8',
      orientation: 'Y',
      fontSize: 0.6,
      tile: { x: 8, y: -1 },
      text: 'Airside operations'
    },
    {
      id: 'c6d16ec6-7110-4082-9370-44e127984b90',
      orientation: 'X',
      fontSize: 0.6,
      tile: { x: -3, y: -13 },
      text: 'Invoicing & Billing'
    },
    {
      id: '57156c5e-9b82-4652-852d-422014228b74',
      orientation: 'X',
      fontSize: 0.6,
      tile: { x: -16, y: -12 },
      text: 'Passenger facilitation'
    },
    {
      id: '92637173-542c-4d25-addf-ab50eda7a573',
      orientation: 'X',
      fontSize: 0.6,
      tile: { x: -16, y: 6 },
      text: 'Terminal management'
    },
    {
      id: 'e555aad0-9e21-48db-9d71-53125c33c214',
      orientation: 'X',
      fontSize: 0.6,
      tile: { x: -4, y: 10 },
      text: 'Information management'
    }
  ],
  rectangles: [
    {
      id: '82ef2751-9ea7-40fc-b3f5-3ea8ce1e1d67',
      color: '#fad6ac',
      from: { x: -1, y: 1 },
      to: { x: 1, y: -1 }
    },
    {
      id: '7d730e86-7884-400d-857a-8af7f22a9937',
      color: '#a0b9f8',
      from: { x: -8, y: -7 },
      to: { x: -16, y: -11 }
    },
    {
      id: 'f41434d1-bbe6-4d6d-a13d-7c9ad52e8e62',
      color: '#a0b9f8',
      from: { x: -16, y: 10 },
      to: { x: -8, y: 7 }
    },
    {
      id: '4ffe42ed-9cd0-48a9-93a0-6099ab53a146',
      color: '#a8dc9d',
      from: { x: -3, y: -9 },
      to: { x: 3, y: -12 }
    },
    {
      id: 'dc93e93b-2c6c-43a1-bb82-ad93c04f7707',
      color: '#bbadfb',
      from: { x: 9, y: 4 },
      to: { x: 12, y: -4 }
    },
    {
      id: 'eec5c861-6192-4eb6-a378-7554bda4d9a7',
      color: '#b3e5e3',
      from: { x: -4, y: 14 },
      to: { x: 4, y: 11 }
    }
  ]
};
