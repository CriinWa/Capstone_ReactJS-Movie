import { PATH } from "@/constants/paths";
import { useSignUp } from "@/features/signUp/hooks";
import { useAuth } from "@/hooks";
import { Controller } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";

export const SignUpPage = () => {
    const { form, onSubmit, isLoading } = useSignUp();
    const { control, handleSubmit, formState: { errors } } = form;

    const { user } = useAuth();
    if (user) {
        return <Navigate to={PATH.HOME} />
    }
    // Nếu đã đăng nhập rồi thì không cho vào trang sign-up, chuyển hướng về trang home

    return (
        <div className="flex items-center justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-linear-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                            Sign Up
                        </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-6">
                        {/* Tài khoản Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="taiKhoan"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Tài khoản
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Họ tên Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="hoTen"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Họ tên
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            type="email"
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Email
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Số điện thoại Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="soDT"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            type="tel"
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Số điện thoại
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="matKhau"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            type="password"
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Mật khẩu
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative h-11 w-full min-w-[200px]">
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input 
                                            {...field}
                                            type="password"
                                            placeholder="" 
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                                        />
                                        <label className="before:content[' '] after:content[' pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500! peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500! peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Xác nhận mật khẩu
                                        </label>
                                        {fieldState.error && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <button 
                            data-ripple-light="true" 
                            type="submit" 
                            disabled={isLoading}
                            className="block w-full select-none rounded-lg bg-linear-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            {isLoading ? "Đang đăng ký..." : "Sign Up"}
                        </button>
                        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                            Bạn đã có tài khoản?
                            <Link 
                                to={PATH.SIGN_IN} 
                                className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased hover:underline"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
