function LoadingStatus({theme}){

    return <div className="loading-container">
        <h2>generating {theme} story </h2>
        <div className="loading-animation"  >
            <div className="spinner"></div>
        </div>
        <p className="loading-info">
            please wait while the loading complete . .. ...
        </p>
    </div>

}
export  default LoadingStatus;