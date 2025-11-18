import React, { useEffect } from 'react'
import { Button } from '@/components/ui';
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';

type BannerProps = {
    data: number[];
    color?: string;
    handleClick(): void;
    // ? là optional prop, không bắt buộc phải truyền vào
}

export const Banner = ({data, color, handleClick}: BannerProps) => {
  console.log("🚀 ~ Banner ~ color:", color)
  console.log("🚀 ~ Banner ~ data:", data)
  

  const [count, setCount] = React.useState(0);
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

  const {data: banner} = useQuery( {
    queryKey: queryKeys.banner.lists(),
    queryFn: () => quanLyPhimServices.getBanners(),
  })
  console.log("🚀 ~ Banner ~ banner:", banner)

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count+1)}>+ Count </Button>

    </div>
  )
}
