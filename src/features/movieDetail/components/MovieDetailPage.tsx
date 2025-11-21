import { useParams } from "react-router-dom";
import { useMovieSchedule, useMovieDetailState } from "../hooks";
import { MovieInfo } from "./MovieInfo";
import { TheaterSelector } from "./TheaterSelector";
import { DayFilter } from "./DayFilter";
import { ScheduleList } from "./ScheduleList";
import { TrailerModal } from "./TrailerModal";
import { MovieDetailLoading } from "./MovieDetailLoading";
import { MovieDetailError } from "./MovieDetailError";

export const MovieDetailPage = () => {
    const { maPhim } = useParams<{ maPhim: string }>();
    const { data: movie, isLoading, error } = useMovieSchedule(maPhim);

    const {
        selectedTheater,
        setSelectedTheater,
        selectedDay,
        setSelectedDay,
        isTrailerModalOpen,
        openTrailerModal,
        closeTrailerModal,
        handleBookingClick,
    } = useMovieDetailState(movie);

    // Loading state
    if (isLoading) {
        return <MovieDetailLoading />;
    }

    // Error state
    if (error || !movie) {
        return <MovieDetailError />;
    }

    // Lấy danh sách cụm rạp của hệ thống rạp đã chọn
    const selectedTheaterData = movie.heThongRapChieu.find(
        (theater) => theater.maHeThongRap === selectedTheater
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Movie Info Section */}
            <MovieInfo
                movie={movie}
                onTrailerClick={openTrailerModal}
                onBookingClick={handleBookingClick}
            />

            {/* Schedules Section */}
            <div id="schedules-section" className="flex gap-8">
                {/* Theater Selector (Left Sidebar) */}
                <TheaterSelector
                    theaters={movie.heThongRapChieu}
                    selectedTheater={selectedTheater}
                    onSelectTheater={setSelectedTheater}
                />

                {/* Schedule List (Right Content) */}
                <div className="w-2/3">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Lịch chiếu phim
                    </h3>

                    {/* Day Filter */}
                    <DayFilter
                        selectedDay={selectedDay}
                        onSelectDay={setSelectedDay}
                    />

                    {/* Schedules */}
                    <ScheduleList
                        clusters={selectedTheaterData?.cumRapChieu || []}
                        selectedDay={selectedDay}
                    />
                </div>
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                isOpen={isTrailerModalOpen}
                onClose={closeTrailerModal}
                trailerUrl={movie.trailer}
                movieTitle={movie.tenPhim}
            />
        </div>
    );
};

// MovieDetailPage: Component chính cho trang chi tiết phim
// - useParams để lấy maPhim từ URL
// - useMovieSchedule hook để fetch data
// - State management: selectedTheater, selectedDay, isTrailerModalOpen
// - Loading state: Skeleton animation
// - Error state: Error message + back button
// - Layout: MovieInfo (top) + TheaterSelector (left) + ScheduleList (right)
// - TrailerModal: Modal xem trailer
