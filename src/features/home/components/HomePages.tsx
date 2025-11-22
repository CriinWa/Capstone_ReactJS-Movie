import { Banner } from './Banner'
import { ListPhim } from './ListPhim'
import { CinemaShowtime } from '@/features/cinemaShowtime/components'

export const HomePages = () => {
  return (
    <div className="home-page w-full">
      <div className="max-w-6xl mx-auto w-full">
        <Banner />
      </div>
      <div className="max-w-6xl mx-auto w-full">
        <ListPhim />
      </div>
      {/* Cinema Showtime */}
      <div className="max-w-6xl mx-auto w-full">
        <CinemaShowtime />
      </div>
    </div>
  )
}
