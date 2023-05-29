'use client'

import { NewProjectButton } from '@main/components/atoms/NewProjectButton'
import { ICON_COLLECTION } from '@main/components/molecules/IconCollection'
import { Menu } from '@main/components/molecules/Menu'
import { MenuAtom } from '@main/globalState/menu'
import { useAllProjectData } from '@main/hooks/reactQuery/useAllProjectData'
import { manrope } from '@main/utils/fonts'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export type MenuOption = {
  id: string
  label: string
  url?: string
  iconName: keyof typeof ICON_COLLECTION
  options?: MenuOption[]
}
export const ProjectSelectionPanel = () => {
  const router = useRouter()
  const { data: projectData } = useAllProjectData()
  const [menuState, setMenuState] = useAtom(MenuAtom)
  const MENU_OPTIONS: MenuOption[] = [
    {
      id: 'overview',
      label: 'Overview',
      url: '/dashboard/overview',
      iconName: 'overview',
    },
    {
      id: 'research',
      label: 'Research',
      url: '/dashboard/research',
      iconName: 'research',
    },
    {
      id: 'reports',
      label: 'Reports',
      url: '/dashboard/reports',
      iconName: 'reports',
    },
    {
      id: 'projects',
      label: 'Your projects',
      iconName: 'projects',
      options: projectData?.allProjects?.map(project => ({
        iconName: 'reports',
        id: project?.id,
        label: project?.name,
        url: `/dashboard/projects/${project?.id}`,
      })),
    },
  ]

  const handleMenuClick = (
    option: MenuOption,
    { isSubOption }: { isSubOption: boolean },
  ) => {
    if (isSubOption) {
      router.push(option?.url as string)
      return
    }

    /* If option present, handle collapse and expand */
    if (option?.options && option?.options?.length > 0) {
      if (menuState?.expandedMenuIds?.includes(option?.id)) {
        /* If menu is already open, then collapse */
        setMenuState(previousState => ({
          ...previousState,
          selectedMenuId: option?.id,
          expandedMenuIds: previousState?.expandedMenuIds.filter(
            menuId => menuId !== option?.id,
          ),
        }))
      } else {
        /* If collapsed, then expand */
        setMenuState(previousState => ({
          ...previousState,
          selectedMenuId: option?.id,
          expandedMenuIds: [...previousState.expandedMenuIds, option?.id],
        }))
      }
    } else {
      /* Change selectedMenuIds*/
      setMenuState(previousState => ({
        ...previousState,
        selectedMenuId: option?.id,
      }))
    }

    if (option?.url) router.push(option?.url)
  }

  useEffect(() => {
    console.log(menuState)
  }, [menuState])
  return (
    <section className={`${manrope.className} px-6 pt-6 w-full`}>
      {/* New project button */}
      <NewProjectButton />

      {/* Menus  */}
      <h3 className="text-grey-200 text-base font-semibold mb-4">Menu</h3>

      {/* Menu options */}
      <ul className="list-none flex flex-col gap-y-4">
        {MENU_OPTIONS.map(option => (
          <li key={option.id}>
            <Menu
              isActive={menuState.selectedMenuId === option.id}
              onClick={() => {
                handleMenuClick(option, { isSubOption: false })
              }}
            >
              <div className="flex gap-x-3 items-center justify-start">
                <span className="w-6 h-6 text-black-400">
                  {ICON_COLLECTION[option.iconName]}
                </span>
                <p className="text-black-400 text-base">{option.label}</p>
                {option.options && option?.options?.length > 0 && (
                  <span className="w-3 h-2 text-grey-200 justify-self-end">
                    {ICON_COLLECTION['chevron-down']}
                  </span>
                )}
              </div>
            </Menu>

            {/* Expanded menu options  */}

            {menuState?.expandedMenuIds?.includes(option?.id) && (
              <div className="mt-2 pl-1 gap-y-4 flex flex-col">
                {option.options?.map(subOption => (
                  <Menu
                    key={subOption?.id}
                    onClick={() => {
                      handleMenuClick(subOption, { isSubOption: true })
                    }}
                  >
                    <div className="flex gap-x-3 items-center justify-start">
                      <span className="w-6 h-6 text-black-400">
                        {ICON_COLLECTION[subOption.iconName]}
                      </span>
                      <p className="text-black-400 text-base">
                        {subOption.label}
                      </p>
                    </div>
                  </Menu>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
