import { supabase, handleSupabaseError } from '@/lib/supabase'
import type { Category } from '@/types'

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          children:categories(*)
        `)
        .is('parent_id', null)
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch categories')
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          parent:categories(*),
          children:categories(*)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Category not found
        }
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching category:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch category')
    }
  }

  async getCategoryHierarchy(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          children:categories(
            *,
            children:categories(*)
          )
        `)
        .is('parent_id', null)
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching category hierarchy:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch category hierarchy')
    }
  }

  async getFeaturedCategories(limit = 8): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .not('image_url', 'is', null)
        .order('sort_order')
        .limit(limit)

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching featured categories:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to fetch featured categories')
    }
  }

  async searchCategories(query: string): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .ilike('name', `%${query}%`)
        .order('name')

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error searching categories:', error)
      throw new Error(handleSupabaseError(error) || 'Failed to search categories')
    }
  }

  async getCategoryBreadcrumbs(categoryId: string): Promise<Category[]> {
    try {
      const breadcrumbs: Category[] = []
      let currentCategoryId: string | null = categoryId

      while (currentCategoryId) {
        const { data, error } = await supabase
          .from('categories')
          .select('*, parent:categories(*)')
          .eq('id', currentCategoryId)
          .single()

        if (error || !data) break

        const category = data as Category
        breadcrumbs.unshift(category)
        currentCategoryId = category.parent_id || null
      }

      return breadcrumbs
    } catch (error) {
      console.error('Error fetching category breadcrumbs:', error)
      return []
    }
  }
}

export const categoryService = new CategoryService() 