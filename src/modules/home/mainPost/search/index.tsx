'use client'

import React, { useState } from 'react'
import Input from '~/components/from/Input'
import { IconSearch } from '~/components/icons'

const Search = () => {
  const [searchTitle, setSearchTitle] = useState('')

  return (
    <Input
      placeholder="search"
      customClass="main-post-search"
      onChange={() => {}}
    >
      <IconSearch />
    </Input>
  )
}

export default Search
