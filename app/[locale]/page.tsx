import PetForm from '../components/PetForm'
import PetList from '../components/PetList'

export default function PetPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-2xl px-4">
        <PetForm />
        <PetList />
      </div>
    </div>
  )
}
