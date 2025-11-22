import { useQueryBanners } from '../hook';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// type BannerProps = {
//     data: number[];
//     color?: string;
//     handleClick(): void;
//     // ? là optional prop, không bắt buộc phải truyền vào
// }

export const Banner = () => {
  

  // const [count, setCount] = React.useState(0);
  // const [count, setCount] = React.useState<number>();

  // const getBanners = async () => {
  //   try {
  //     const res = await quanLyPhimServices.getBanners();
  //     // console.log("🚀 ~ getBanners ~ res:", res)
  //     // console.log("🚀 ~ getBanners ~ res:", res.data.content) //định nghĩa bên type.ts kiểu dữ liệu trả về từ BE
  //     // res.data.content.map((item) => {
  //     //   console.log("🚀 ~ getBanners ~ item:", item.maPhim)
  //     // })
    
  //   } catch (error) {
  //     console.error("Failed to fetch banners", error);
  //   }
  // }

  // useEffect(() => {
  //   getBanners()
  // }, [])
  // // [] chỉ chạy 1 lần khi component được mount lên
  // // [count] chạy mỗi khi count thay đổi


  //Buổi 39 tách hook useQueryBanners ra 1 file riêng 
  const {data: banners} = useQueryBanners();
  // const {data: banner} = useQuery( {
  //   queryKey: queryKeys.banner.lists(),
  //   queryFn: () => quanLyPhimServices.getBanners(),
  // })
  console.log("🚀 ~ Banner ~ banner:", banners?.data.content)

  return (
    <div className='container mx-auto px-4'>
      <div className="relative">
        <Carousel 
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {banners?.data.content.map((item) => (
              <CarouselItem key={item.maPhim}>
                <div className="relative w-full bg-black rounded-lg overflow-hidden">
                  <img 
                    src={item.hinhAnh} 
                    alt={`Banner ${item.maPhim}`}
                    className="w-full h-auto object-contain max-h-[600px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation buttons positioned on top of banner */}
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none" />
        </Carousel>
      </div>
    </div>
  )
}
