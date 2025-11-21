import { Banner } from './Banner'
import { ListPhim } from './ListPhim'

export const HomePages = () => {
  return (
    <div className="home-page w-full">
      <div className="max-w-6xl mx-auto w-full">
        <Banner />
      </div>
      <div className="max-w-6xl mx-auto w-full">
        <ListPhim />
      </div>
    </div>
  )
}
