type MovieDetailErrorProps = {
    onBack?: () => void;
};
// Cha gọi con:
{/* <MovieDetailError onBack={() => navigate('/home')} /> */}
export const MovieDetailError = ({ onBack }: MovieDetailErrorProps) => {
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Không tìm thấy thông tin phim
                </h2>
                <p className="text-gray-600 mb-6">
                    Phim bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
                <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                    ← Quay lại
                </button>
            </div>
        </div>
    );
};
