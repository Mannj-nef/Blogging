'use client'

import React from 'react'
import Input from '~/components/from/Input'
import { IconSearch } from '~/components/icons'
import { debounce } from 'lodash'

interface IProps {
  onSearch: (title: string) => void
}

const Search = ({ onSearch }: IProps) => {
  const handleSearch = debounce((title: string) => {
    onSearch(title)
  }, 500)

  return (
    <Input
      placeholder="search"
      customClass="main-post-search"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleSearch(e.target.value)
      }
    >
      <IconSearch />
    </Input>
  )
}

export default Search
