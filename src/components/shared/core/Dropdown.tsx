import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Clickable from '../core/Clickable'

const Dropdown = (props: Partial<Parameters<typeof Menu>[0]>) => {
  return <Menu as="div" className="relative inline-block" {...props} />
}

export default Dropdown

export const DropdownItems = (
  props: Partial<Parameters<typeof Menu.Items>[0]>
) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items
      className="absolute right-0 mt-2 flex w-full origin-top-right flex-col divide-y divide-gray-100 overflow-hidden whitespace-nowrap rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      {...props}
    />
  </Transition>
)

export const DropdownItem = (
  props: Partial<Parameters<typeof Menu.Item>[0]>
) => <Menu.Item className="p-2" {...props} />

export const DropdownButton = ({
  active,
  defaultTextColor = 'text-gray-900',
  ...props
}: Partial<Parameters<typeof Menu.Button>[0]> & {
  active?: boolean
  defaultTextColor?: string
}) => (
  <Menu.Button
    {...props}
    as={Clickable}
    variants={{ btn: null, p: null, rounded: null }}
    className={`${
      active
        ? 'bg-gradient-to-br from-basic-primary-300 to-special-primary-500 text-special-secondary-100 transition-all duration-150'
        : defaultTextColor
    } group flex w-full items-center gap-1 whitespace-nowrap`}
  />
)
