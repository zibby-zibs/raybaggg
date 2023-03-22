import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { imageUrlState, publicUrlState } from '../atoms/urlAtoms'
import { Database } from '../db_types'
import useAuth from '../hooks/useAuth'
import { supabase } from '../libs'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avatar() {

  const {user} = useAuth();
  let filePath = ''
  const [avatarUrl, setAvatarUrl] = useRecoilState<Profiles['avatar_url']>(publicUrlState);
  const [imageUrl, setImageUrl] = useState<string | null>(filePath)
  const [uploading, setUploading] = useState(false)



 
  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      const fileExt = file?.name.split('.').pop()
      const fileName = `${user?.id}.${fileExt}`
      let filePath = `${fileName}`

      if (file){
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, { upsert: false })
  
        if (uploadError) {
          throw uploadError
        } 

        const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)
        
        await supabase.from('profiles')
        .update({avatar_url: data.publicUrl})
        .eq('id', user?.id)

        setAvatarUrl(data.publicUrl)
      }
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
      console.log(imageUrl)
      console.log(avatarUrl)
    }
    
  }

  return (
    <div className='flex flex-col items-center space-y-2'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="object-contain w-40"
          // style={{ height: size, width: size }}
        />
      ) : (
        <div className="border-[#202a2b] border-2"  />
      )}
      <div className="relative">
        <label className="flex justify-center items-center" htmlFor="single">
          <p className=' bg-[#c1f888] p-3 text-black font-semibold'>
            {uploading ? 'Uploading ...' : 'Upload Image'}
          </p>
        
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}