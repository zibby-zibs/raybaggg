export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          deposit_in_btc: number[] | null
          deposit_made_dollars: number[] | null
          full_name: string | null
          id: string
          interest_rate: number | null
          profit_made: number | null
          referral_link: string | null
          referred_by: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          deposit_in_btc?: number[] | null
          deposit_made_dollars?: number[] | null
          full_name?: string | null
          id: string
          interest_rate?: number | null
          profit_made?: number | null
          referral_link?: string | null
          referred_by?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          deposit_in_btc?: number[] | null
          deposit_made_dollars?: number[] | null
          full_name?: string | null
          id?: string
          interest_rate?: number | null
          profit_made?: number | null
          referral_link?: string | null
          referred_by?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
