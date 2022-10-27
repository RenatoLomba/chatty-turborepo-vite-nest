import { useUserStore } from '../stores'

export function Chat() {
  const { user } = useUserStore()

  console.log(user)

  return <h1>Bem vindo, {user?.userName}</h1>
}
