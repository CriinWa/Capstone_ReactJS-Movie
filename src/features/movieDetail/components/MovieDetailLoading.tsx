export const MovieDetailLoading = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
                <div className="flex gap-8">
                    <div className="w-1/3 bg-gray-200 h-64 rounded-lg"></div>
                    <div className="w-2/3 bg-gray-200 h-64 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};
