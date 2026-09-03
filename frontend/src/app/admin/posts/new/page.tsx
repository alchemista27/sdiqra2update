'use client';
// Reuse komponen editor yang sama dengan edit
import PostEditor from '@/components/cms/PostEditor';

export default function NewPostPage() {
  return <PostEditor mode="create" />;
}
