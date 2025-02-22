import unauthorizedVideo from "../../assets/lottieVideos/unauthorized.mp4";

const UnauthorizedPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <video
                loop
                autoPlay
                muted
                playsInline // For better mobile compatibility
            >
                <source src={unauthorizedVideo} type="video/mp4" />
            </video>
        </div>
    );
};

export default UnauthorizedPage;
