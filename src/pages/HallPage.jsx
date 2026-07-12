import { hallById } from '../data/halls.js'
import AnglersHall from '../halls/AnglersHall.jsx'
import CultureHall from '../halls/CultureHall.jsx'
import EpilogueHall from '../halls/EpilogueHall.jsx'
import EthicsHall from '../halls/EthicsHall.jsx'
import FishHall from '../halls/FishHall.jsx'
import HistoryHall from '../halls/HistoryHall.jsx'
import PrologueHall from '../halls/PrologueHall.jsx'
import TackleHall from '../halls/TackleHall.jsx'
import TechniquesHall from '../halls/TechniquesHall.jsx'

const SCENES = {
  prologue: PrologueHall,
  history: HistoryHall,
  fish: FishHall,
  tackle: TackleHall,
  techniques: TechniquesHall,
  anglers: AnglersHall,
  culture: CultureHall,
  ethics: EthicsHall,
  epilogue: EpilogueHall,
}

export default function HallPage({ hallId, data }) {
  const hall = hallById(hallId)
  const Scene = SCENES[hallId]
  return (
    <div className={`hall-page hall-${hallId}`}>
      <Scene hall={hall} data={data} />
    </div>
  )
}
