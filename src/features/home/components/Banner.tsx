import React, { useEffect } from 'react'
import { Button } from '@/components/ui';
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useQueryBanners } from '../hook';
// import { Card, CardContent } from "@/components/ui/card"
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
    <div className='container mx-auto'>
      <Carousel className="w-full">
          <CarouselContent>
            {banners?.data.content.map((item) => (
              <CarouselItem key={item.maPhim}>
                <img src={item.hinhAnh} alt={`Banner ${item.maPhim}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
    </div>
  )
}
