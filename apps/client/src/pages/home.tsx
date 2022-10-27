import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { useUserStore } from '../stores'

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 character(s)' }),
})

type FormFields = z.infer<typeof formSchema>

type GithubUserData = {
  id: number
  avatar_url?: string
  login: string
}

async function getGithubUserData(
  username: string,
): Promise<GithubUserData | null> {
  const response = await fetch(`https:api.github.com/users/${username}`)

  if (!response.ok) return null

  return response.json()
}

type UserData = {
  id: number
  userName: string
  avatarUrl?: string
}

async function getUserData(id: number): Promise<UserData | null> {
  const response = await fetch(`http://localhost:3000/users/${id}`)

  if (!response.ok) return null

  return response.json()
}

async function createUser(data: UserData): Promise<UserData> {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export function Home() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })
  const navigate = useNavigate()
  const { login, user } = useUserStore()

  const { mutateAsync, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      reset()
      login(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    if (user) {
      navigate('/chat')
    }
  }, [user, navigate])

  const onFormSubmit = async ({ username }: FormFields) => {
    const githubUserData = await getGithubUserData(username)

    if (!githubUserData) return

    const userData = await getUserData(githubUserData.id)

    if (userData) {
      login(userData)
      return
    }

    await mutateAsync({
      id: githubUserData.id,
      userName: githubUserData.login,
      avatarUrl: githubUserData.avatar_url,
    })
  }

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center">
      <section className="max-w-[720px] w-full bg-slate-800 flex flex-col items-center rounded-md py-6 px-8">
        <h1 className="text-5xl text-pink-500 font-semibold">Chatty</h1>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col w-full mt-8 gap-8"
        >
          <label className="flex flex-col w-full gap-2">
            <span>Username:</span>
            <input
              {...register('username')}
              type="text"
              placeholder="johndoe"
              className="bg-slate-700 px-4 py-2 rounded-md focus:outline-none focus:outline-1 focus:outline-pink-400"
            />

            {errors?.username && (
              <small className="text-red-300 text-sm">
                {errors.username.message}
              </small>
            )}
          </label>

          <div>
            <button
              disabled={isSubmitting || isLoading}
              className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
