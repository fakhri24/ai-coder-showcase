import { useState } from 'react'
import type { FormEvent } from 'react'
import styles from './CommentForm.module.css'
import { usePostComment } from '../hooks/usePostComment'
import { SignInButton } from '@/features/auth'

export function CommentForm({ workId }: { workId: string }) {
  const [text, setText] = useState('')
  const { post, posting, canPost } = usePostComment(workId)

  if (!canPost) {
    return (
      <div className={styles.signInPrompt}>
        <p>Masuk untuk memberi komentar.</p>
        <SignInButton />
      </div>
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await post(text)
    setText('')
  }

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(event)}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Tulis komentar..."
        maxLength={1000}
        required
      />
      <button className={styles.submitButton} type="submit" disabled={posting || !text.trim()}>
        {posting ? 'Mengirim...' : 'Kirim'}
      </button>
    </form>
  )
}
