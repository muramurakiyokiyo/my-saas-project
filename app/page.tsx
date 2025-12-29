import PetForm from './components/PetForm'
import PetList from './components/PetList'

export default function PetPage() {
  return (
    <div className="p-8">
      <PetForm />
      <PetList />
    </div>
  )
}
