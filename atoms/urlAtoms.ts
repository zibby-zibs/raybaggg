import { atom } from 'recoil'
import { Database } from '../db_types'
import { supabase } from '../libs'
type Profiles = Database['public']['Tables']['profiles']['Row']

export const publicUrlState = atom<Profiles['avatar_url'] >({
    key: 'publicUrlState',
    default: null,
})
export const imageUrlState = atom<Profiles['avatar_url'] >({
    key: 'imageUrlState',
    default: null,
})